'use strict';

const TABLE_NAME = 'Preorders';
const CONSTRAINT_NAME = 'Preorders_phoneId_fkey';

export default {
  async up(queryInterface) {
    await queryInterface.removeConstraint(TABLE_NAME, CONSTRAINT_NAME);

    await queryInterface.addConstraint(TABLE_NAME, {
      fields: ['phoneId'],
      type: 'foreign key',
      name: CONSTRAINT_NAME,
      references: {
        table: 'Phones',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(TABLE_NAME, CONSTRAINT_NAME);

    await queryInterface.addConstraint(TABLE_NAME, {
      fields: ['phoneId'],
      type: 'foreign key',
      name: CONSTRAINT_NAME,
      references: {
        table: 'Phones',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
