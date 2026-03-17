'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Category, User } = require('../models');

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Await the promises and extract IDs
    const categoryResults = await Category.findAll({ attributes: ['id'] });
    const userResults = await User.findAll({ attributes: ['id'] });

    const categoryIds = categoryResults.map(c => c.id);
    const userIds = userResults.map(u => u.id);

    const sampleData = Array.from({ length: 10 }).map((_, index) => ({
      created_by: getRandomItem(userIds),
      category_id: getRandomItem(categoryIds),
      title: `Sample Title ${index + 1}`,
      image: null,
      description: `This is a description for item ${index + 1}.`,
      is_published: Math.random() < 0.5 ? 0 : 1,
    }));

    await queryInterface.bulkInsert('blogs', sampleData); 
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogs', null, {}); 
  }
};
