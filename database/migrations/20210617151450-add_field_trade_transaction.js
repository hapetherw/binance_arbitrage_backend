'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('trade_transactions', 'result_profit_amount', {
			type: Sequelize.DOUBLE
		});
    await queryInterface.addColumn('trade_transactions', 'result_profit_percentage', {
			type: Sequelize.DOUBLE
		});
    await queryInterface.addColumn('trade_transactions', 'result_fee_amount', {
			type: Sequelize.DOUBLE
		});
    await queryInterface.addColumn('trade_transactions', 'result_fee_percentage', {
			type: Sequelize.DOUBLE
		});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('trade_transactions', 'result_profit_amount');
    await queryInterface.removeColumn('trade_transactions', 'result_profit_percentage');
    await queryInterface.removeColumn('trade_transactions', 'result_fee_amount');
    await queryInterface.removeColumn('trade_transactions', 'result_fee_percentage');
  }
};
