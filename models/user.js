'use strict';
const {
  Model
} = require('sequelize');

const { isUnique } = require('../utils/validate')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      // validate: {
      //   isUnique: isUnique('User', 'firstName')
      // }
    },
    lastName: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hashPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    } 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};