import { Model } from 'sequelize';

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
        type: DataTypes.ENUM('pending', 'confirmed', 'done'),
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
