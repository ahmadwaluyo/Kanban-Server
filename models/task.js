'use strict';
module.exports = (sequelize, DataTypes) => {
  class Task extends sequelize.Sequelize.Model {}
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Tittle must be filled'
        }
      }
    },
    category: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    hooks: {
      beforeCreate: (Task, option) => {
        Task.category = 'PRELOG'
      }
    },
    sequelize,
    modelName: 'Task'
  })

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id'})
  };
  return Task;
};