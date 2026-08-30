import db from '../models/index.js';

const { Phone, Sequelize, sequelize } = db;
const { Op } = Sequelize;

export async function createPhone() {
  const phone = await Phone.create({
    model: 'iPhone 15',
    brand: 'Apple',
    productionYear: 2024,
    ramSize: 8,
    processor: 'A16 Bionic',
    screenDiagonal: 6.1,
    hasNfc: true,
  });

  console.log(phone.toJSON());
}

export async function getPhonesPage3() {
  const page = 3;
  const limit = 4;
  const offset = (page - 1) * limit;

  const phonesByYear = await Phone.findAll({
    raw: true,
    order: [['productionYear']],
    limit,
    offset,
  });

  console.log(phonesByYear);
  return phonesByYear;
}

export async function getCurrentYearPhones() {
  const currentYear = new Date().getFullYear();
  const modernPhones = await Phone.findAll({
    raw: true,
    where: {
      productionYear: currentYear,
    },
  });
  console.log(modernPhones);
  return modernPhones;
}

export async function getPhonesBefore2023() {
  const phonesBefore2023 = await Phone.findAll({
    raw: true,
    where: {
      productionYear: {
        [Op.lt]: 2023,
      },
    },
  });

  console.log(phonesBefore2023);
  return phonesBefore2023;
}

export async function updateRamSizeById() {
  const updatedPhone = await Phone.update(
    { ramSize: 10 },
    {
      where: { id: 1 },
      raw: true,
      returning: true,
    }
  );

  console.log(updatedPhone[1][0]);
}

export async function addNfcToPhones2024() {
  const UpdateNfcToPhonesIn2024 = await Phone.update(
    { hasNfc: true },
    {
      where: {
        productionYear: 2024,
      },
      raw: true,
      returning: true,
    }
  );
  console.log(UpdateNfcToPhonesIn2024[1][0]);
}

export async function deletePhoneById() {
  const deletedPhone = await Phone.destroy({
    where: {
      id: 2,
    },
  });
  console.log(deletedPhone);
}

export async function deletePhonesByYear2016() {
  const deletedPhones = await Phone.destroy({
    where: {
      productionYear: 2016,
    },
  });
  console.log(deletedPhones);
}

export async function getAverageRamSize() {
  const averageRamSize = await Phone.aggregate('ramSize', 'AVG');

  console.log(averageRamSize);
  return averageRamSize;
}

export async function getPhonesCountByBrand() {
  const phonesByBrand = await Phone.findAll({
    raw: true,
    attributes: [
      'brand',
      [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'phonesCount'],
    ],
    group: ['brand'],
  });

  console.log(phonesByBrand);
  return phonesByBrand;
}

export async function getBrandsWithMaxDiagonalMoreThan66() {
  const brands = await Phone.findAll({
    raw: true,
    attributes: [
      'brand',
      [
        db.sequelize.fn('MAX', db.sequelize.col('screenDiagonal')),
        'maxScreenDiagonal',
      ],
    ],
    group: ['brand'],
    having: db.sequelize.literal('MAX("screenDiagonal") > 6.6'),
  });
  console.log(brands);
  return brands;
}
