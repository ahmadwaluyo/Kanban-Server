'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'custom-constraint-email'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users','custom-constraint-email' );
  }
};
