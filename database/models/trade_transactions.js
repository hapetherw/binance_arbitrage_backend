'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trade_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  trade_transaction.init({
    symbol1: DataTypes.STRING,
    symbol2: DataTypes.STRING,
    symbol3: DataTypes.STRING,
    first_pair: DataTypes.STRING,
    first_symbol1_amount: DataTypes.DOUBLE,
    first_symbol2_amount: DataTypes.DOUBLE,
    first_pair_type: DataTypes.ENUM('buy', 'sell'),
    first_exchange_price: DataTypes.DOUBLE,
    second_pair: DataTypes.STRING,
    second_symbol1_amount: DataTypes.DOUBLE,
    second_symbol2_amount: DataTypes.DOUBLE,
    second_pair_type: DataTypes.ENUM('buy', 'sell'),
    second_exchange_price: DataTypes.DOUBLE,
    third_pair: DataTypes.STRING,
    third_symbol1_amount: DataTypes.DOUBLE,
    third_symbol2_amount: DataTypes.DOUBLE,
    third_pair_type: DataTypes.ENUM('buy', 'sell'),
    third_exchange_price: DataTypes.DOUBLE,
    fee_amount: DataTypes.DOUBLE,
    fee_percentage: DataTypes.DOUBLE,
    profit_amount: DataTypes.DOUBLE,
    profit_percentage: DataTypes.DOUBLE,
    status: DataTypes.ENUM('COMPLETE', 'PROGRESS', 'FAIL'),
    note: DataTypes.STRING,
    result_fee_amount: DataTypes.DOUBLE,
    result_fee_percentage: DataTypes.DOUBLE,
    result_profit_amount: DataTypes.DOUBLE,
    result_profit_percentage: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'trade_transaction',
  });
  return trade_transaction;
};