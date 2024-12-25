'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions',[
      {
        title: 'book_hotel_flight',
      },
      {
        title: 'make_payment',
      },
      {
        title: 'view_bookings',
      },
      {
        title: 'manage_bookings',
      },
      {
        title: 'leave_reviews',
      },
      {
        title: 'update_profile',
      },
      {
        title: 'access_financial_booking_report',
      },
      {
        title: 'respond_reviews',
      },
      {
        title: 'view_modify_booking_data',
      },
      {
        title: 'access_customer_support_tickets',
      },
      {
        title: 'generate_reports',
      },
      {
        title: 'manage_accounts',
      },
      {
        title: 'system_configuration_settings',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions' , null , {});
  }
};
