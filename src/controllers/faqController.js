const { FrequentlyAskQuestion , User}= require('../database/models');
const LogActivityHandler = require('../Helpers/logActivityHandler');

module.exports = {

     add : async (request , response ) =>{
            try{
                let userId = request.body.userId;
                let question= request.body.question;
                let answer = request.body.answer;
                await FrequentlyAskQuestion.create({
                                question : question,
                                answer: answer,
                                created_by : userId
                            });

                await LogActivityHandler(
                    userId,
                    'Frequently ask question', // title
                    'Add', //action
                    `Add Frequently ask question `, //information
                );
    
                return response.status(200).json({
                    status: true,
                    message: 'Question added successfully',
                })
    
    
            } catch (error){
                return response.status(500).json({
                    status: false,
                    message: 'Something Went Wrong',
                    error: error.message
                });
            }
        },
    


    edit : async (request , response ) =>{
        try{
            let userId = request.body.userId;
            let question= request.body.question;
            let answer = request.body.answer;
            let id = request.body.id;
            await FrequentlyAskQuestion.update({
                            question : question,
                            answer: answer,
                        } , {
                            where : { id : id }
                        });

            await LogActivityHandler(
                userId,
                'Frequently ask question', // title
                'Update', //action
                `Update frequently ask question `, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Question updated successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    list : async ( request , response ) => {
        try{

           let questions = await FrequentlyAskQuestion.findAll({
                    include : [
                                {
                                    model: User, 
                                    as: 'createdBy', 
                                    required : true
                                },
                            ],
           });


            return response.status(200).json({
                status: true,
                data: questions,
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },



    delete: async (request, response) => {
        try {
            const questionId = request.body.questionId;
    
            await FrequentlyAskQuestion.destroy({
                where: {
                    id: questionId,
                },
            });

            await LogActivityHandler(
                request.body.userId,
                'Frequently ask question', // title
                'Delete', //action
                `Delete frequently ask question `, //information
            );
    
            return response.status(200).json({
                status: true,
                message: 'Question deleted successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },




}
