import { Op } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Preorders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phoneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Phones',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      orderDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'done'),
        allowNull: false,
        defaultValue: 'pending',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      customerPhone: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.addConstraint('Preorders', {
      fields: ['quantity'],
      type: 'check',
      name: 'preorders_quantity_positive_check',
      where: {
        quantity: {
          [Op.gte]: 1,
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Preorders');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Preorders_status";'
    );
  },
};
