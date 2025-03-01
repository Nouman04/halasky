const { CronJob } = require('cron')
const path = require('path')
const fs = require('fs');
// const { Json } = require('sequelize/lib/utils');
const { JsonHandler } = require('../database/models');
const appConst = require('../appConst');
// 0 1 * * 1,5
// * * * * * *
const tokenJob = new CronJob("0 1 * * 1,5" , async function(){
    const logFilePath = path.join(__dirname, '..', 'storage', 'cron-logs.js');
    const dir = path.dirname(logFilePath);
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    try{
        let endpoint = 'https://api.cert.platform.sabre.com/v2/auth/token';

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic VmpFNk1UVXpOamd3T2pOSFRVdzZRVUU9OmJXVmtNalZrYlcwPQ==");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        };

        fetch( endpoint , requestOptions)
        .then((response) => response.json()) 
        .then(async (result) => {

            let token = await JsonHandler.findOne({
                where : { type : appConst.sabreFlights }
            })



            if(token) {
                await JsonHandler.update(
                    {information : result},
                    {where : { id : token.id}}
                );

                const message = `[${new Date().toISOString()}] Authentication Token Updated\n`;
                fs.appendFileSync(logFilePath, message, 'utf8');
                console.log("cron executed");
            } else {
                await JsonHandler.create({
                    information : result,
                    type : appConst.sabreFlights
                });
                const message = `[${new Date().toISOString()}] Authentication Token Created\n`;
                fs.appendFileSync(logFilePath, message, 'utf8');
                console.log("cron executed");
            }
        })
        .catch((error) => {
            const errorMessage = `[${new Date().toISOString()}] ${error}\n`;
            fs.appendFileSync(logFilePath, errorMessage, 'utf8');
        });

    } catch (error){
        
        const errorMessage = `[${new Date().toISOString()}] ${error.stack}\n`;
        fs.appendFileSync(logFilePath, errorMessage, 'utf8');
    }
});


module.exports = tokenJob;

