import db from './models/index.js';
import {
  createPhone,
  getPhonesPage3,
  getCurrentYearPhones,
  getPhonesBefore2023,
  updateRamSizeById,
  addNfcToPhones2024,
  deletePhoneById,
  deletePhonesByYear2016,
  getAverageRamSize,
  getPhonesCountByBrand,
  getBrandsWithMaxDiagonalMoreThan66,
} from './queries/ phoneQueries.js';

async function main() {
  try {
    // await createPhone();
    // await seedPhones();
    // await getPhonesPage3();
    // await getCurrentYearPhones();
    // await getPhonesBefore2023();
    // await updateRamSizeById();
    // await addNfcToPhones2024();
    // await deletePhoneById();
    // await deletePhonesByYear2016();
    // await getAverageRamSize();
    // await getPhonesCountByBrand();
    // await getBrandsWithMaxDiagonalMoreThan66();
  } catch (error) {
    console.error(error);
  } finally {
    await db.sequelize.close();
  }
}

main();
