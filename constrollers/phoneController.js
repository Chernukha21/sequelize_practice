import db from '../models/index.js';
import createHttpError from 'http-errors';
const { Phone } = db;

export async function getPhones(req, res, next) {
  const { limit, offset } = req.pagination;
  try {
    const phones = await Phone.findAll({
      raw: true,
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
      limit,
      offset,
      order: ['id'],
    });

    return res.json({ data: phones });
  } catch (error) {
    next(error);
  }
}
export async function createPhone(req, res, next) {
  const { body } = req;

  try {
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        message: 'Request body is required',
        status: 400,
      });
    }
    const createdPhone = await Phone.create(body);
    const { createdAt, updatedAt, ...preparedPhone } = createdPhone.get();
    if (!preparedPhone) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    res.status(201).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
}
export async function getPhoneById(req, res, next) {
  const { id } = req.params;

  try {
    const foundedPhone = await Phone.findByPk(id, {
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!foundedPhone) {
      return next(createHttpError(404, 'Phone not found ):'));
    }

    res.status(200).send({ data: foundedPhone });
  } catch (err) {
    next(err);
  }
}
export async function updateOrCreatePhone(req, res, next) {
  try {
    const { id } = req.params;

    const [updatedRows, [updatedPhone]] = await Phone.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedRows > 0) {
      const { createdAt, updatedAt, ...preparedPhone } = updatedPhone.get();

      return res.status(200).json(preparedPhone);
    }

    const createdPhone = await Phone.create({
      ...req.body,
      id,
    });

    const { createdAt, updatedAt, ...preparedPhone } = createdPhone.get();

    return res.status(201).json(preparedPhone);
  } catch (error) {
    next(error);
  }
}
export async function deletePhoneById(req, res, next) {
  const { id } = req.params;

  try {
    const deletedPhone = await Phone.destroy({ where: { id } });
    if (!deletedPhone) {
      return next(createHttpError(404, 'Phone not found ):'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
