"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.DataTypes.STRING,
      number: Sequelize.DataTypes.STRING,
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      is_platform_logged: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      platform_type: {
        type: Sequelize.DataTypes.ENUM("google", "facebook"),
        allowNull: true,
      },
      platform_image: {
        type: Sequelize.DataTypes.TEXT("long"),
        allowNull: true,
      },
      status: {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false
      },
      password : {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull : false
      },
      token : {
        type : Sequelize.DataTypes.TEXT('long'),
        allowNull : true
      },
      expires_at : {
        type : Sequelize.DATE,
        allowNull : true
      },
      is_email_verified : {
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue : 0,
        allowNull :false
      },
      created_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.fn('NOW')
      },
      updated_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.fn('NOW')
      },

    });
  },



  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  },
};
