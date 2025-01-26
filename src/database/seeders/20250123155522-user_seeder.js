'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    let saltcount  = 10;

    let activeUsers = [
      {name : 'Nouman Riaz' , number : '3453453455' , email : 'mnoumanb@gmail.com' , password : 'nouman123' , status : 1 },
      {name : 'Usman Alam' , number : '2342342343' , email : 'usman@gmail.com' , password : 'usman123' , status : 1 },
      {name : 'Arsalan Khattak' , number : '56786746565' , email : 'arsalan@gmail.com' , password : 'arsalan123' , status : 1 },
    ];

   
    let nonActiveUsers = [
      {name : 'Haris Rauf' , number : '5756756766' , email : 'haris@gmail.com' , password : 'haris123' , status : 0 },
      {name : 'Basit' , number : '3453454454' , email : 'basit@gmail.com' , password : 'basit123' , status : 0 },
      {name : 'Shakir khattak' , number : '34536754754' , email : 'shakir@gmail.com' , password : 'shakir123' , status : 0 },
    ];

    async function processUsers() {
      activeUsers = await Promise.all(
        activeUsers.map(async (user) => {
          const mutatedPassword = await bcrypt.hash(user.password, saltcount);
          return { ...user, password: mutatedPassword };
        })
      );
    
      nonActiveUsers = await Promise.all(
        nonActiveUsers.map(async (user) => {
          const mutatedPassword = await bcrypt.hash(user.password, saltcount);
          return { ...user, password: mutatedPassword };
        })
      );
    
      const userList = [...activeUsers, ...nonActiveUsers];
    
     return userList;
    }

    let users = await processUsers()

    queryInterface.bulkInsert('users', users);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users' , null , {});
  }
};
