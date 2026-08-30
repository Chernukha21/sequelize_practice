import db from './models/index.js';
const { Student, sequelize } = db;

// try {
//   await db.sequelize.sync();
//   console.log('Sync is ok');
//
//   const newStudent = {
//     firstName: 'Wane',
//     lastName: 'Riksby',
//     email: 'Patrick@test.com',
//     birthday: '1983-02-05',
//     isMale: true,
//     activity: 2,
//   };
//
//   const createdStudent = await Student.create(newStudent);
//
//   console.log(createdStudent.get());
// } catch (err) {
//   console.log(err);
// } finally {
//   await db.sequelize.close();
// }

try {
    // const users = await Student.findAll({ raw: true });
    // const student = await Student.findByPk(1, { raw: true });
    // const studentsNames = await Student.findAll({
    //   raw: true,
    //   attributes: ['id', 'firstName'],
    // });
    // console.log(studentsNames);
    // const studentsNames = await Student.findAll({
    //   raw: true,
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    // });
    // const studentsNames = await Student.findAll({
    //   raw: true,
    //   order: [['activity', 'DESC']],
    // });
    // const studentsNames = await Student.findAll({
    //   raw: true,
    //   order: [['activity', 'DESC']],
    //   limit: 1,
    //   offset: 1,
    // });
    // console.log(studentsNames);
    // const studentsNames = await Student.findAll({
    //   raw: true,
    //   order: [['firstName']],
    //   limit: 3,
    //   offset: 2,
    // });
    // console.log(studentsNames);
    // const studentById = await Student.findOne({
    //   where: {
    //     isMale: false,
    //     activity: 2,
    //   },
    //   raw: true,
    // });
    // const studentsCount = await Student.findAll({
    //   raw: true,
    //   attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'studentsCount']],
    // });
    const updatedStudent = await Student.update(
        { firstName: 'Jason' },
        {
            raw: true,
            where: {
                firstName: 'John',
            },
            returning: true,
        }
    );
    console.log(updatedStudent);
} catch (e) {
    console.log(e);
    throw e;
}
