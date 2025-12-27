const fs = require("fs");
const path = require("path");

module.exports.writeFlightLog = async ({
  flightId,
  type,
  payload,
  response,
}) => {
  const date = new Date().toISOString().split("T")[0];
  const timestamp = Date.now();

  const dirPath = path.join(
    __dirname,
    `../public/uploads/logs/${type}`
  );

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const fileName = `${date}-id_${flightId}-${timestamp}.json`;
  const fullPath = path.join(dirPath, fileName);

  const fileData = {
    flight_id: flightId,
    type,
    payload,
    response,
    created_at: new Date(),
  };

  fs.writeFileSync(fullPath, JSON.stringify(fileData, null, 2));

  return `/uploads/logs/${type}/${fileName}`;
};
