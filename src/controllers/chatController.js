require('dotenv').config();
const { Op } = require('sequelize');
const OpenAI  = require('openai');
const { AiChat , Chat , User} = require('../database/models');
const { askQuestionValidation , aiMessageSchema , sendMessageSchema , chatMessageSchema } = require('../validations/chatValidation');
module.exports = {

    askQuestion : async (request , response ) =>{
        try{
            
        const { error } = askQuestionValidation.validate(request.body, { abortEarly: false });
        
          if (error) {
                return response.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
                });
            }

            const {question} = request.body;
            const openAiKey = process.env.OPEN_AI_KEY;
            
            const openai = new OpenAI({
                apiKey: openAiKey,
            });

            const chatResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                  { role: "system", content: 'You are a helpful assistant for Halasky, an application for hotel and flight booking using Sabre. - You must only provide information about Halasky’s features, booking procedures, flight and hotel information available through Halasky. - Do NOT provide general knowledge, unrelated advice, or personal opinions. - If the user asks something unrelated to Halasky, respond politely with: "I am here to provide information only about Halasky, the hotel and flight booking application." - Always keep responses concise, relevant, and specific to Halasky."' },
                  { role: "user", content: question },
                ],
              });

            const answer = chatResponse?.choices?.[0]?.message?.content;

            if (!answer || answer.trim() === "") {
                return response.status(400).json({
                status: false,
                message: "AI did not return a valid answer.",
                });
            }

            await AiChat.create({
                questioned_by: request.user.id, // or request.body.questioned_by
                question: question,
                answer: answer,
            });

            return response.status(200).json({
                status: true,
                message: answer,
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    aiMessages : async ( request , response ) => {
        try{

            const { error } = aiMessageSchema.validate(request.body, { abortEarly: false });
                    
                      if (error) {
                            return response.status(400).json({
                            success: false,
                            message: "Validation failed",
                            details: error.details.map((d) => d.message),
                            });
                        }


            let { offset } = request.body;
            offset = offset ? parseInt(offset) : 0;
            limit = 50;
            const previousChats = await AiChat.findAll({
                where: { questioned_by: request.user.id },
                order: [['created_at', 'DESC']],
                limit,
                offset
            });

            return response.status(200).json({
                status: true,
                data : previousChats,
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    sendMessage : async (request ,response , io , socketConnectedUser ) => {
        try {
            const { error } = chatMessageSchema.validate(request.body, { abortEarly: false });
                    
                      if (error) {
                            return response.status(400).json({
                            success: false,
                            message: "Validation failed",
                            details: error.details.map((d) => d.message),
                            });
                        }

            const { message , send_to }  = request.body;
            const user = request.user;
            userSocketDetail = socketConnectedUser.get(send_to);
            if(userSocketDetail){
                io.to(userSocketDetail.socketId).emit('recieve-message' , { message , username : userSocketDetail.username});
            }

            await Chat.create({
                sender_id: user.id,
                receiver_id: send_to,
                message: message
            });

            return response.status(200).json({ status: true, message : 'Send successfully' });

        } catch (error) {
            return response.status(500).json({ status: false , error : error });
        }

    },

    chatMessages : async (request ,response  ) => {
        try{ 
            const { error } = blogListSchema.validate(request.body, { abortEarly: false });
                    
                      if (error) {
                            return response.status(400).json({
                            success: false,
                            message: "Validation failed",
                            details: error.details.map((d) => d.message),
                            });
                        }

            let { offset , person_id } = request.body;
            const userId = request.user.id;
            offset = offset ? parseInt(offset) : 0;
            limit = 50;
            const previousChats = await Chat.findAll({
            where: {
                [Op.or]: [
                {
                    sender_id: userId,
                    receiver_id: person_id,
                },
                {
                    sender_id: person_id,
                    receiver_id: userId,
                },
                ],
            },
            include : [
                {model : User , as : 'sender'},
                {model : User , as : 'receiver'},
            ],
            order: [['created_at', 'DESC']],
            limit,
            offset,
            });


            return response.status(200).json({
                status: true,
                data : previousChats,
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }

    },

    

}
