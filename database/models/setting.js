'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  setting.init({
    base_coin: DataTypes.STRING,
    init_amount: DataTypes.DOUBLE,
    profit_percentage: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'setting',
  });
  return setting;
};