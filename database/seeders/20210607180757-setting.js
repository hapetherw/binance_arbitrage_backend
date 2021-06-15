'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
     await queryInterface.bulkInsert('settings', [{
       base_coin: 'BUSD',
       init_amount: 5,
       profit_percentage: 0.1,
       is_paused: false,
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
