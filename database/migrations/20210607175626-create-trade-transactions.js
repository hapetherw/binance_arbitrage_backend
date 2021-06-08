'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trade_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_pair: {
        type: Sequelize.STRING
      },
      first_pair_type: {
        type: Sequelize.ENUM('buy', 'sell')
      },
      first_symbol1: {
        type: Sequelize.STRING
      },
      first_symbol2: {
        type: Sequelize.STRING
      },
      first_symbol1_amount: {
        type: Sequelize.DOUBLE
      },
      first_symbol2_amount: {
        type: Sequelize.DOUBLE
      },
      first_exchange_price: {
        type: Sequelize.DOUBLE
      },
      second_pair: {
        type: Sequelize.STRING
      },
      second_pair_type: {
        type: Sequelize.ENUM('buy', 'sell')
      },
      second_symbol1: {
        type: Sequelize.STRING
      },
      second_symbol2: {
        type: Sequelize.STRING
      },
      second_symbol1_amount: {
        type: Sequelize.DOUBLE
      },
      second_symbol2_amount: {
        type: Sequelize.DOUBLE
      },
      second_exchange_price: {
        type: Sequelize.DOUBLE
      },
      third_pair: {
        type: Sequelize.STRING
      },
      third_pair_type: {
        type: Sequelize.ENUM('buy', 'sell')
      },
      third_symbol1: {
        type: Sequelize.STRING
      },
      third_symbol2: {
        type: Sequelize.STRING
      },
      third_symbol1_amount: {
        type: Sequelize.DOUBLE
      },
      third_symbol2_amount: {
        type: Sequelize.DOUBLE
      },
      third_exchange_price: {
        type: Sequelize.DOUBLE
      },
      fee_amount: {
        type: Sequelize.DOUBLE
      },
      fee_percentange: {
        type: Sequelize.DOUBLE
      },
      profit_amount: {
        type: Sequelize.DOUBLE
      },
      profit_percentage: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('trade_transactions');
  }
};