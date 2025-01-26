const { sequelize, DataTypes, Op } = require('sequelize');
// const User = require('../database/models/User');
// const Role = require('../database/models/Role');
const { Role , User , UserRole , RecoveryRequest } = require('../database/models');
const bcrypt = require('bcrypt');
const appConst = require('../appConst');
const LogActivityHandler = require('../Helpers/logActivityHandler');

module.exports = {

    getRoleslist : async (request, response) => {
        try {
            let roles = await Role.findAll();
            return response.status(200).json({
                status: true,
                roles: roles
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            })
        }
    },

    activeUser : async (request , response) =>{
        try{
            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            const activeUsers = await User.findAll({
                include : {
                    model : Role,
                    where : {
                        title : 'user'
                    },
                    // through: { attributes: [] },
                    required : false
                },
                where : {
                    status : 1
                },
                offset : skip,
                limit: 10,
            });



            return response.status(200).json({
                status: true,
                activeUsers: activeUsers
            })

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            })
        }

    },

    nonActiveUser : async (request , response) =>{
        try{
            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            const nonActiveUser = await User.findAll({
                include : {
                    model : Role,
                    where : {
                        title : 'user'
                    },
                    required : false
                },
                where : {
                    status : 0
                },
                offset : skip,
                limit: 10,
            });

            
            return response.status(200).json({
                status: true,
                nonActiveUser: nonActiveUser
            })
        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            })
        }
    },

    searchUser : async (request , response) => {
        try{
            const { searchQuery } = request.body;

            const searchedUsers = await User.findAll({
                where : {
                    [Op.or]: [
                        {name : {[Op.like] : `%${searchQuery}%`} },
                        {email : {[Op.like] : `%${searchQuery}%`} }
                    ]
                },
                limit: 10,
            });


            return response.status(200).json({
                status: true,
                searchedUsers : searchedUsers
            })
        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            })
        }
    },

    updateAccountPassword : async (request , response) =>{
        try {
            let userId = request.body.id;
            let password = request.body.password
            let saltcount  = 10;
            let hashedPassword = await bcrypt.hash( password , saltcount);

            User.update( 
                {password : hashedPassword}, 
                { where : { id : userId } }
            );

            await LogActivityHandler(
                    request.body.userId,
                    'User Password', // title
                    'Update', //action
                    'change user password', //information
            );
        
            return response.status(200).json({
                status : true,
                message : "Password updated successfully"
            });
            

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            })  
        }
    },


    userAccountDetail : async (request , response) =>{
        try{
            const userId = request.body.id;
            const user = await User.findOne({
                where : { id : userId}
            });
            return response.status(200).json({
                status : true,
                userDetail : user
            });
        } catch (error) {
            return response.status(500).json({
                status : false,
                message : error.message
            })
        } 
    }, 

    getMembers : async (request , response) => {
        try{
           let skip = (parseInt(request.body.pageNo) - 1) * 10;
           let status = request.body.status;
           let activeMembers = await  User.findAll({
                                            include : {
                                                model : Role,
                                                where : {
                                                    title : {
                                                        [Op.in] : ['admin' , 'support_staff']
                                                    },
                                                },
                                                required : true
                                            },
                                            where : {
                                                status : status
                                            },
                                            offset : skip,
                                            limit : 10
                                        });
            return response.status(200).json({
                status : true,
                activeMembers : activeMembers
            });
        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }
    },

    getRoleMembers : async (request , response )=> {
        try {
            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            let roleId  = request.body.roleId;
            let status = request.body.status;
            let members = await User.findAll({
                where : {
                    status : status
                },
                include : {
                    model : Role,
                    where : {
                        id : roleId
                    },
                    required : true 
                },
                offset : skip,
                limit : 10
            });

            return response.status(200).json({
                status : true,
                members : members
            })

        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }
    },


    updateUserRole : async (request , response) => {
        try {
            let uId = request.body.uId;
            let rId = request.body.rId;
            let userId = request.body.userId;

            let userRole = await UserRole.findOne({ where : {user_id : uId}});
            
            if(userRole){
                await UserRole.update(
                    { role_id : rId },
                    { where : { user_id : uId} }
                );
            } else {
                await UserRole.create({ role_id : rId  , user_id : uId});
            }

          
            await LogActivityHandler(
                request.body.userId,
                'User role', // title
                'Update', //action
                'change user role', //information
            );
            
            return response.status(200).json({
                status : false,
                message : 'User role updated successfully'
            })

        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }
    },

    addMember : async ( request , response ) => {
        try {
            let name = request.body.name;
            let email = request.body.email;
            let roleId = request.body.roleId;
            
            let userCount = await User.count({
                where : {
                    email : email
                }
            });

            if(userCount)
            {
                return response.status(200).json({
                    status : false,
                    message : 'User already exists with same email'
                })
            } else {
                let member = await User.create({
                    status : 1,
                    email : email,
                    name : name
                });

                await UserRole.create({
                    role_id : roleId,
                    user_id : member.id
                })

                await LogActivityHandler(
                    request.body.userId,
                    'Member', // title
                    'Add', //action
                    'Add member and assign role', //information
                );

                return response.status(200).json({
                    status : true,
                    message : "Member created successfully"
                });

            }
        

        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }
    },


    userRecoveryRequest : async (request , response ) => {
        try {

            let email = request.body.email;
            let user = await User.findOne({
                            where: {
                                email : email 
                            }
                        })
            if(!user){
                return response.status(200).json({
                    status : false,
                    message : 'No user exist with this email'
                });
            }

            if(user.status == 1){
                return response.status(200).json({
                    status : false,
                    message : 'User is already active'
                });
            }

            await RecoveryRequest.create({
                user_id : user.id,
                status : 0
            });

            await LogActivityHandler(
                user.id,
                'Recovery Request', // title
                'Add', //action
                'Add recovery request', //information
            );

            return response.status(200).json({
                status : true,
                message : 'Recovery request added succesfully'
            });


        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }
    },

    getRecoveryRequests : async (request , response) =>{
        try {   
            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            let requestStatus = request.body.status;

            if(!requestStatus){
                requestStatus = appConst.requestPending;
            }

            let userRecoveryRequest = await RecoveryRequest.findAll({
                    where : {status : requestStatus},
                    include : {
                        model : User,
                        where : {
                            status : 0
                        },
                        required : true
                    },
                    offset : skip,
                    limit : 10
            });

            return response.status(200).json({
                status : true,
                data : userRecoveryRequest
            });

        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }

    },

    getRoles : async (request , response ) =>{
        try {   
            
            let roles = await Role.findAll({
                                include : {
                                    model : Permission,
                                },
                            });

            return response.status(200).json({
                status : true,
                data : roles
            });         

        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        } 
    },


    updateRecoveryRequest : async (request , response) => {
        try {   
            let userId = request.body.uId;
            let status  = request.body.status;
            RecoveryRequest.update(
                { status : status},
                { 
                    where : {
                        user_id : userId,
                        status : appConst.recoveryPending
                    }
                }
            );


            await LogActivityHandler(
                request.body.userId,
                'Recovery request', // title
                'Update', //action
                'change recovery request', //information
            );

            return response.status(200).json({
                status : true,
                data : 'Recovery request updated successfully'
            });  

        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        } 
    }


    


     

};








