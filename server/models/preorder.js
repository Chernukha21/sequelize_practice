import { Model } from 'sequelize';
import { CONSTANTS } from '../constants.js';

export default (sequelize, DataTypes) => {
  class Preorder extends Model {
    static associate(models) {
      Preorder.belongsTo(models.Phone, {
        foreignKey: 'phoneId',
      });
    }
  }
  Preorder.init(
    {
      orderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...CONSTANTS.PREORDER_STATUSES),
        validate: {
          isIn: [CONSTANTS.PREORDER_STATUSES],
        },
        allowNull: false,
        defaultValue: 'pending',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      customerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Preorder',
    }
  );
  return Preorder;
};
