const { CronJob } = require("cron");
const path = require("path");
const fs = require("fs");
const { JsonHandler, FlightBooking, Flight } = require("../database/models");
const AppConst = require("../appConst");
const { Op } = require("sequelize");

const getSabreUrl = () => {
    return process.env.NODE_ENV === 'production' ? process.env.SABRE_API_URL_PROD : process.env.SABRE_API_URL_DEV;
}

// * * * * * *
// 0 */4 * * *

const cancelBookingJob = new CronJob("0 */4 * * *", async function () {
    const logFilePath = path.join(__dirname, "..", "storage", "cron-logs.js");
    const dir = path.dirname(logFilePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
        // 1. Fetch access token
        const tokenDetail = await JsonHandler.findOne({
            where: { type: AppConst.sabreFlights },
        });

        if (!tokenDetail) {
            throw new Error("Sabre access token not found in JsonHandler");
        }

        const accessToken =
            typeof tokenDetail.information === "string"
                ? JSON.parse(tokenDetail.information).access_token
                : tokenDetail.information.access_token;

        const headers = {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        // 2. Find bookings to cancel (Pending: 0, Booked/PNR Generated: 1)
        const bookings = await FlightBooking.findAll({
            where: {
                status: {
                    [Op.in]: [0, 1]
                }
            }
        });

        if (bookings.length === 0) {
            console.log("No bookings found for cancellation.");
            return;
        }

        const endpoint = `${getSabreUrl()}/v1/trip/orders/cancelBooking`;

        for (const booking of bookings) {
            try {
                const flights = await Flight.findAll({
                    where: { booking_id: booking.id },
                });

                if (!flights.length) {
                    const message = `[${new Date().toISOString()}] No flights found for booking ID: ${booking.id}\n`;
                    fs.appendFileSync(logFilePath, message, "utf8");
                    continue;
                }

                let canceledCount = 0;
                let totalFlights = flights.length;

                for (const f of flights) {
                    if (!f.pnr) {
                        continue;
                    }

                    const payload = {
                        confirmationId: f.pnr,
                        cancelAll: true,
                        retrieveBooking: true,
                        targetPcc: "3GML",
                    };

                    const requestOptions = {
                        method: "POST",
                        headers,
                        body: JSON.stringify(payload),
                    };

                    const response = await fetch(endpoint, requestOptions);
                    const result = await response.json();

                    if (result.booking || (result.status === "Complete" || result.status === "Success")) {
                        // Update flight status (using AppConst.bookingCanceled which is 2, or following controller logic)
                        // The controller uses 0 for flight booking_status, let's stick to consistent logic if possible.
                        // AppConst has flightCanceled: 3, flightPartiallyCanceled: 4.
                        // But flightController uses: status 4 for main booking (completely canceled), 3 for partial.
                        // And for individual flights: { booking_status: 0 }

                        await Flight.update(
                            { booking_status: 0 },
                            { where: { id: f.id } }
                        );
                        canceledCount++;
                    }
                }

                // Update main booking status
                if (canceledCount === totalFlights) {
                    await FlightBooking.update({ status: 4 }, { where: { id: booking.id } });
                    const message = `[${new Date().toISOString()}] Booking ${booking.id} (PNR: ${booking.pnr || 'N/A'}) completely canceled.\n`;
                    fs.appendFileSync(logFilePath, message, "utf8");
                } else if (canceledCount > 0) {
                    await FlightBooking.update({ status: 3 }, { where: { id: booking.id } });
                    const message = `[${new Date().toISOString()}] Booking ${booking.id} (PNR: ${booking.pnr || 'N/A'}) partially canceled.\n`;
                    fs.appendFileSync(logFilePath, message, "utf8");
                }

            } catch (innerError) {
                const errorMessage = `[${new Date().toISOString()}] Error processing booking ${booking.id}: ${innerError.message}\n`;
                fs.appendFileSync(logFilePath, errorMessage, "utf8");
            }
        }

        console.log("Cancel booking job executed successfully.");
    } catch (error) {
        const errorMessage = `[${new Date().toISOString()}] Cron Error: ${error.stack}\n`;
        fs.appendFileSync(logFilePath, errorMessage, "utf8");
        console.error("Cancel booking job failed:", error);
    }
});

module.exports = cancelBookingJob;
