const tokenJob = require('./token-job');
const cancelBookingJob = require('./cancel-booking-job');

const startJob = () => {
    tokenJob.start();
    cancelBookingJob.start();
}

module.exports = startJob;