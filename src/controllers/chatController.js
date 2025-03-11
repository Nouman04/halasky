require('dotenv').config();

module.exports = {

    askQuestion : async (request , response ) =>{
        try{
            
            const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
            const API_KEY = process.env.DEEPSEEK_KEY;

            // { role: 'system', content: 'You are a helpful assistant.' },
            const requestData = {
                model: 'deepseek-chat',
                messages: [
                    { role: 'user', content: 'Hello!' }
                ],
                stream: false
            };

            const response = await fetch(DEEPSEEK_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify(requestData) // Convert data to JSON
            })
            .then((res) => res.json()) 
            .then(async (result) => {
                console.log(result);
                // return response.status(200).json({
                //     status: true,
                //     message: result,
                // })
            })
            .catch( err =>{
                console.log(err);
                // return response.status(500).json({
                //     status: false,
                //     message: 'Something Went Wrong',
                //     error: err
                // });
            })


            
            // console.log(response);

            // return response.status(200).json({
            //     status: true,
            //     message: 'Blog added successfully',
            // })

        } catch (error){
            // return response.status(500).json({
            //     status: false,
            //     message: 'Something Went Wrong',
            //     error: error.message
            // });
        }
    },

}
