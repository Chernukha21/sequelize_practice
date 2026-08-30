import { Op } from 'sequelize';

const CUSTOMER_PHONES = [
  '+380500000001',
  '+380500000002',
  '+380500000003',
  '+380500000004',
  '+380500000005',
  '+380500000006',
  '+380500000007',
  '+380500000008',
];

export default {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      'Preorders',
      [
        {
          phoneId: 1,
          orderDate: '2026-08-10',
          status: 'done',
          quantity: 1,
          customerPhone: '+380500000001',
          createdAt: now,
          updatedAt: now,
        },
        {
          phoneId: 1,
          orderDate: '2026-08-18',
          status: 'pending',
          quantity: 2,
          customerPhone: '+380500000002',
          createdAt: now,
          updatedAt: now,
        },
        {
          phoneId: 2,
          orderDate: '2026-08-12',
          status: 'confirmed',
          quantity: 1,
          customerPhone: '+380500000003',
          createdAt: now,
          updatedAt: now,
        },
        {
          phoneId: 2,
          orderDate: '2026-08-20',
          status: 'pending',
          quantity: 3,
          customerPhone: '+380500000004',
          createdAt: now,
          updatedAt: now,
        },
        {
          phoneId: 3,
          orderDate: '2026-08-14',
          status: 'done',
          quantity: 2,
          customerPhone: '+380500000005',
          createdAt: now,
          updatedAt: now,
        },
        {
          phoneId: 5,
          orderDate: '2026-08-19',
          status: 'confirmed',
          quantity: 1,
          customerPhone: '+380500000006',
          createdAt: now,
          updatedAt: now,
        },
        {
          phoneId: 7,
          orderDate: '2026-08-21',
          status: 'pending',
          quantity: 4,
          customerPhone: '+380500000007',
          createdAt: now,
          updatedAt: now,
        },
        {
          phoneId: 10,
          orderDate: '2026-08-22',
          status: 'confirmed',
          quantity: 1,
          customerPhone: '+380500000008',
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'Preorders',
      {
        customerPhone: {
          [Op.in]: CUSTOMER_PHONES,
        },
      },
      {}
    );
  },
};
