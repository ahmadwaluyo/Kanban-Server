'use strict';
const userData = [
  {
    "email" : "ahmad@gmail.com",
    "password" : "test123",
    "createdAt" : new Date(),
    "updatedAt" : new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', userData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
