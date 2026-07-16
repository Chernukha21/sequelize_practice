/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Phones", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      model: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      brand: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      productionYear: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      ramSize: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      processor: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      screenDiagonal: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },

      hasNfc: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Phones");
  },
};