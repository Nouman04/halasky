const { CustomerQuery , Feedback } = require('../database/models')
const appConst = require('../appConst');
const LogActivityHandler = require('../Helpers/logActivityHandler');
module.exports = {

    addQuery : async (request , response) => {
        try{
            let customerId = request.body.userId;
            let subject = request.body.subject;
            let query  = request.body.query;
            let status = appConst.pendingQuery;
            let priority = appConst.pendingQuery;

            await CustomerQuery.create({
                            user_id : customerId,
                            subject : subject,
                            query: query,
                            status: status,
                            priority : priority 
                        });

            await LogActivityHandler(
                customerId,
                'Customer Query', // title
                'Add', //action
                `add customer query`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Query added successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    editQuery : async (request , response) => {
        try{
            let subject = request.body.subject;
            let query  = request.body.query;
            let queryId = request.body.queryId;
            await CustomerQuery.update({
                            subject : subject,
                            query: query,
                        } , {
                            where : { id : queryId}
                        });

            await LogActivityHandler(
                request.body.userId,
                'Customer Query', // title
                'Update', //action
                `Update customer query`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Query updated successfully',
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },


    updateStatus: async (request , response) => {
        try{
            let status = request.body.status;
            let queryId = request.body.queryId;
            await CustomerQuery.update({
                            status : status,
                        } , {
                            where : { id : queryId}
                        });

            await LogActivityHandler(
                request.body.userId,
                'Customer Query', // title
                'Update', //action
                `Update customer query status`, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Query status updated successfully',
            })
            


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    updatePriority: async (request , response) => {
        try{
            let priority = request.body.priority;
            let queryId = request.body.queryId;
            await CustomerQuery.update({
                        priority : priority,
                        } , {
                            where : { id : queryId}
                        });

            await LogActivityHandler(
                request.body.userId,
                'Customer Query', // title
                'Update', //action
                `Update customer query priority `, //information
            );

            return response.status(200).json({
                status: true,
                message: 'Query priority status updated successfully',
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

    deleteQuery: async (request, response) => {
        try {
            const queryId = request.body.queryId;
    
            await CustomerQuery.destroy({
                where: {
                    id: queryId,
                },
            });

            await LogActivityHandler(
                request.body.userId,
                'Customer Query', // title
                'Delete', //action
                `Delete customer query`, //information
            );
    
            return response.status(200).json({
                status: true,
                message: 'Query deleted successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },
    


    list : async ( request , response ) => {
        try{
           let skip = (parseInt(request.body.pageNo) - 1) * 10;
           let priority = request.body.priority;
           let userId = request.body.userId;
           let status = request.body.status;
           let rating = request.body.rating;
           let attendedBy = request.body.attendedBy;


           let whereCondition = feedbackCondition = {};
           if(priority){
                whereCondition.priority = priority;
           }

           if(attendedBy){
                whereCondition.attended_by = attendedBy;
           }

           if(userId){
                whereCondition.user_id = userId;
           }

           if(status){
                whereCondition.status = status;
           }

           if(rating){
                feedbackCondition.rating = rating;
            }
            
           let queries = await CustomerQuery.findAll({
                    include : [
                                {
                                    model: User, 
                                    as: 'attendedBy',
                                    required : false 
                                },
                                {
                                    model: User, 
                                    as: 'user',
                                    required : userId ? true : false
                                },
                                {
                                    model: Feedback,
                                    where : feedbackCondition,
                                    required : rating ? true : false
                                }
                            ],
                            where : whereCondition,
                            offset : skip,
                            limit: 10,
           })


            return response.status(200).json({
                status: true,
                data: queries,
            })


        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },



    addFeedback: async (request, response) => {
        try {
            const queryId = request.body.queryId;
            const rating = request.body.rating;
            const feedback = request.body.feedback;

            await Feedback.create({
                query_id : queryId, 
                rating : rating, 
                feedback : feedback
            });

            await LogActivityHandler(
                request.body.userId,
                'Customer Query Feedback', // title
                'Add', //action
                `Add customer query feedback `, //information
            );
    
            return response.status(200).json({
                status: true,
                message: 'Feedback added successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },


    updateFeedback: async (request, response) => {
        try {
            const feedbackId = request.body.feedbackId;
            // const queryId = request.body.queryId;
            const rating = request.body.rating;
            const feedback = request.body.feedback;

            await Feedback.update({
                rating : rating, 
                feedback : feedback
            } , { where : {id : feedbackId}} );

            await LogActivityHandler(
                request.body.userId,
                'Customer query feedback', // title
                'Update', //action
                `Update customer query feedback`, //information
            );
    
            return response.status(200).json({
                status: true,
                message: 'Feedback updated successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },



    deleteFeedback: async (request, response) => {
        try {
            const feedbackId = request.body.feedbackId;
    
            await Feedback.destroy({
                where: {
                    id: feedbackId,
                },
            });

            await LogActivityHandler(
                request.body.userId,
                'delete customer query feedback', // title
                'Delete', //action
                `Delete customer query feedback `, //information
            );
    
            return response.status(200).json({
                status: true,
                message: 'Feedback deleted successfully',
            });
    
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message,
            });
        }
    },


    feedbackList: async (request, response) => {
        try {
            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            let userId = request.body.userId;
            let attendedBy = request.body.attendedBy;
            let ratingCount = request.body.ratingCount;

            let feedbackCondition = {};
            let customerQueryCondition = {};

            if(ratingCount){
                feedbackCondition.rating = ratingCount;
            }

            if(userId){
                customerQueryCondition.user_id = userId;
            }

            if(attendedBy){
                customerQueryCondition.attended_by = attendedBy;
            }

            let feedbackList = await Feedback.findAll({
                include : {
                    model : CustomerQuery,
                    as : 'customerQuery',
                    where : customerQueryCondition,
                    required : true
                },
                where : feedbackCondition,
                offset : skip,
                limit: 10,
            });

            return response.status(200).json({
                status: true,
                data: feedbackList,
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
