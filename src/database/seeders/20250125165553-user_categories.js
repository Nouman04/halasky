'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let categories = [
      {title : 'Flights'},
      {title : 'Hotels'},
      {title : 'Other'},
    ]

    queryInterface.bulkInsert( 'categories' , categories);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories' , null , {});
  }
};
