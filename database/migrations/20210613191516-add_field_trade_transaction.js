'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('trade_transactions', 'status', {
			type: Sequelize.ENUM('COMPLETE', 'PROGRESS', 'FAIL'),
			defaultValue: 'COMPLETE',
		});
    await queryInterface.addColumn('trade_transactions', 'note', {
			type: Sequelize.STRING,
      allowNull: true
		});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('trade_transactions', 'status');
    await queryInterface.removeColumn('trade_transactions', 'note');
  }
};
