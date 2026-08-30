/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Phones', 'color', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Phones', 'phoneImage', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Phones', 'color');
    await queryInterface.removeColumn('Phones', 'phoneImage');
  },
};
