const { Op } = require('sequelize');
const { Role , User , UserRole , RecoveryRequest } = require('../database/models');
const bcrypt = require('bcrypt');
const appConst = require('../appConst');
const LogActivityHandler = require('../Helpers/logActivityHandler');
const path = require('path');
require('dotenv').config();

module.exports = {

    getRoleslist : async (request, response) => {
        try {
            let roles = await Role.findAll({
                where: {
                  title: {
                    [Op.ne]: "user"
                  }
                }
              });
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

    list : async (request , response) =>{
        try{
            let skip = (parseInt(request.body.pageNo) - 1) * 10;
            let status = request.body.status;
            let whereCondition = {};
            if(status){
                whereCondition.status = status
            }
            const activeUsers = await User.findAll({
                include : {
                    model : Role,
                    where : {
                        title : 'user'
                    },
                    required : false
                },
                where : whereCondition,
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

    listUsers: async (request, response) => {
        try {
          let skip = (parseInt(request.body.pageNo) - 1) * 10;
    
          let users = await User.findAll({
            attributes: ["id", "email", "name", "number", "status"],
            include: [
              {
                model: Violation,
                as: "violations",
                attributes: ["id", "reason"],
              },
            ],
            offset: skip,
            limit: 10,
          });
    
          let formattedUsers = users.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.name,
            number: user.number,
            status: user.status,
            violation_count: user.violations.length,
            violations: user.violations.map((v) => v.reason),
          }));
    
          return response.status(200).json({
            status: true,
            data: formattedUsers,
          });
        } catch (error) {
          return response.status(500).json({
            status: false,
            message: "Something Went Wrong",
            error: error.message,
          });
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

    statusList : async (request , response) =>{
        try{

           let statusList = [
            {inactiveUser : appConst.inactiveUser},
            {activeUser : appConst.activeUser},
            {bannedUser : appConst.bannedUser}
           ]


            return response.status(200).json({
                status: true,
                data : statusList
            })
        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            })
        }
    },

    updateAccountStatus : async (request ,response) =>{
        try{
            const { userId , status } = request.body;
            console.log(status);
            console.log(userId);
            await User.update(
                {status : status},
                {where : {id : userId}}
            );

            

            return response.status(200).json({
                status: true,
                message : 'Account status updated successfully'
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
            const imageUrl =  `${process.env.APP_URL}/uploads/image`;
            
            return response.status(200).json({
                status : true,
                userDetail : user,
                imageUrl : imageUrl
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
           let nemberList = await  User.findAll({
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
                members : nemberList
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
                request.body.uId,
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
                        });


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

            //here start work
            let userRecoveryRequest = await User.findAll({
                where : { status : 0 },
                include : {
                    model : RecoveryRequest,
                    required : true,
                    
                },
                offset : skip,
                limit : 10
            })

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
    },


    updateProfilePassword : async ( request , response ) => {
        try {

            const { previousPassword , password , confirmPassword } = request.body;
            const userDetail = request.user;
            let user = await User.findOne({ where : { id : userDetail.id}});
            
            const match = await bcrypt.compare(previousPassword, user.password);

            if (!match) {
            return response
                .status(200)
                .json({ status: false, error: "Your password doesn't match" });
            }

            let saltcount  = 10;
            let hashedPassword = await bcrypt.hash( password , saltcount);

            await User.update(
                {password : hashedPassword},
                {where : {id : userDetail.id} }
            )


            return response.status(200).json({
                status: true,
                message: 'Password Updated Successfully',
            })
        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }
    },

    updateProfileDetail : async (request , response ) => {
        try {

            const { username , phone } = request.body;
            const user = request.user;

            await User.update(
                {name : username , number : phone},
                {where : {id : user.id} }
            )


            return response.status(200).json({
                status: true,
                message: 'Profile Updated Successfully',
            })


        } catch (error){
            return response.status(500).json({
                status : false,
                message : error.message
            })
        }
    }


     

};








