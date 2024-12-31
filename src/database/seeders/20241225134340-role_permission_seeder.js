'use strict';

const { Op } = require('sequelize');
const { Role , Permission , RolePermission } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
                    
    const [adminRole  , supportRole , userRole ] = await Promise.all([
                                            Role.findOne({
                                              attributes : ['id'],
                                              where : {
                                                title : 'admin'
                                              }
                                          }),
                                          Role.findOne({
                                              attributes : ['id'],
                                              where : {
                                                title : 'support_staff'
                                              }
                                          }),
                                          Role.findOne({
                                            attributes : ['id'],
                                            where : {
                                              title : 'user'
                                            }
                                          })
    ]);



    const [ adminPermissions , supportPermissions , userPermissions ] = await Promise.all([
                                                    Permission.findAll({
                                                      attributes : ['id'],
                                                      where : {
                                                        title : {
                                                          [Op.in] : [ 
                                                            'view_bookings', 
                                                            'update_profile', 
                                                            'access_financial_booking_report',
                                                            'access_customer_support_tickets',
                                                            'generate_reports',
                                                            'manage_accounts',
                                                            'system_configuration_settings'
                                                          ]
                                                        }
                                                      }
                                                    }),
                                                    Permission.findAll({
                                                      attributes : ['id'],
                                                      where : {
                                                        title : {
                                                          [Op.in] : [ 
                                                            'book_hotel_flight', 
                                                            'update_profile', 
                                                            'access_financial_booking_report',
                                                            'access_customer_support_tickets',
                                                            'generate_reports',
                                                          ]
                                                        }
                                                      }   
                                                }),
                                                Permission.findAll({
                                                  attributes : ['id'],
                                                  where : {
                                                    title : {
                                                      [Op.in] : [ 
                                                        'book_hotel_flight', 
                                                        'make_payment', 
                                                        'view_bookings',
                                                        'manage_bookings',
                                                        'leave_reviews',
                                                        'update_profile',
                                                        'respond_reviews',
                                                        'view_modify_booking_data',
                                                      ]
                                                    }
                                                  }   
                                            })

    ]);

    let adminPermissionList = adminPermissions.map( permission => {
      return { role_id : adminRole.id , permission_id : permission.id};
    })

    let supportPermissionList = supportPermissions.map( permission => {
      return { role_id : supportRole.id , permission_id : permission.id};
    })

    let userPermissionList = userPermissions.map( permission => {
      return { role_id : userRole.id , permission_id : permission.id};
    });

    
    await RolePermission.bulkCreate([...adminPermissionList , ...supportPermissionList , ...userPermissionList]);
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions' , null , {});
  }
};
