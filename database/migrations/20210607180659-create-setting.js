'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      base_coin: {
        type: Sequelize.STRING,
        defaultValue: 'BUSD'
      },
      init_amount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      profit_percentage: {
        type: Sequelize.DOUBLE
      },
      is_paused: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('settings');
  }
};