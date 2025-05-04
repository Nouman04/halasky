require('dotenv').config();
const OpenAI  = require('openai');

module.exports = {

    askQuestion : async (request , response ) =>{
        try{
            const {question} = request.body;
            const openAiKey = process.env.OPEN_AI_KEY;
            
            const openai = new OpenAI({
                apiKey: openAiKey,
            });

            const chatResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                  { role: "system", content: "You are a helpful chatbot." },
                  { role: "user", content: question },
                ],
              });

            return response.status(200).json({
                status: true,
                message: chatResponse.choices[0].message.content,
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    sendMessage : (request ,response , io ) => {

        const { message } = request.body;


    }

    

}
