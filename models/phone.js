import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate(models) {
      // associations here
    }
  }

  Phone.init(
      {
        model: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [1, 100],
          },
        },

        brand: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [2, 50],
          },
        },

        productionYear: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 2000,
            max: new Date().getFullYear(),
          },
        },

        ramSize: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
          },
        },

        processor: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },

        screenDiagonal: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            min: 1,
          },
        },

        hasNfc: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Phone",
      },
  );

  return Phone;
};