'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        let endpoint = "https://api.cert.platform.sabre.com/v2/auth/token";
    
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Basic VmpFNk1UVXpOamd3T2pOSFRVdzZRVUU9OmJXVmtNalZrYlcwPQ=="
        );
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };
    
        fetch(endpoint, requestOptions)
          .then((response) => response.json())
          .then(async (result) => {
            let token = await JsonHandler.findOne({
              where: { type: appConst.sabreFlights },
            });
    
            if (token) {
              await JsonHandler.update(
                { information: result },
                { where: { id: token.id } }
              );
    
              const message = `[${new Date().toISOString()}] Authentication Token Updated\n`;
              console.log("token created");
            } else {
              await JsonHandler.create({
                information: result,
                type: appConst.sabreFlights,
              });
              const message = `[${new Date().toISOString()}] Authentication Token Created\n`;
              fs.appendFileSync(logFilePath, message, "utf8");
              console.log("cron executed");
            }
          })
          .catch((error) => {
            console.log(error)
          });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
