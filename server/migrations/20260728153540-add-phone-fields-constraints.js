import { Op, fn } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Phones', {
      fields: ['model'],
      type: 'check',
      name: 'phones_model_length_check',
      where: {
        model: {
          [Op.and]: [
            { [Op.ne]: '' },
            Sequelize.where(
              fn('char_length', Sequelize.col('model')),
              '<=',
              100
            ),
          ],
        },
      },
    });

    await queryInterface.addConstraint('Phones', {
      fields: ['brand'],
      type: 'check',
      name: 'phones_brand_length_check',
      where: {
        [Op.and]: [
          {
            brand: {
              [Op.ne]: '',
            },
          },
          Sequelize.where(
            Sequelize.fn('char_length', Sequelize.col('brand')),
            Op.lte,
            50
          ),
        ],
      },
    });

    await queryInterface.addConstraint('Phones', {
      fields: ['productionYear'],
      type: 'check',
      name: 'phones_production_year_check',
      where: {
        productionYear: {
          [Op.gte]: 2000,
        },
      },
    });

    await queryInterface.addConstraint('Phones', {
      fields: ['ramSize'],
      type: 'check',
      name: 'phones_ram_size_check',
      where: {
        ramSize: {
          [Op.gte]: 1,
        },
      },
    });

    await queryInterface.addConstraint('Phones', {
      fields: ['screenDiagonal'],
      type: 'check',
      name: 'phones_screen_diagonal_check',
      where: {
        screenDiagonal: {
          [Op.gte]: 1,
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'Phones',
      'phones_model_length_check'
    );

    await queryInterface.removeConstraint(
      'Phones',
      'phones_brand_length_check'
    );

    await queryInterface.removeConstraint(
      'Phones',
      'phones_production_year_check'
    );

    await queryInterface.removeConstraint('Phones', 'phones_ram_size_check');

    await queryInterface.removeConstraint(
      'Phones',
      'phones_screen_diagonal_check'
    );
  },
};
