'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Users', 
        'username', 
        { 
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Users', 
        'hashPassword', 
        { 
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      await queryInterface.removeColumn('Users', 'username', { transaction });
      await queryInterface.removeColumn('Users', 'password', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
