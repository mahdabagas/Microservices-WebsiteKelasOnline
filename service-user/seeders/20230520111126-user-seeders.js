"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Bagas",
        profession: "Admin Micro",
        role: "admin",
        email: "Bagas@gmail.com",
        password: await bcrypt.hash("rahasia123", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mahda",
        profession: "Front End Developer",
        role: "student",
        email: "Mahda@gmail.com",
        password: await bcrypt.hash("rahasia1234", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
