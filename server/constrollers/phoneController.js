import db from '../models/index.js';
import createHttpError from 'http-errors';
import { CONSTANTS } from '../constants.js';
import { Op } from 'sequelize';
const { Phone } = db;

export async function getPhones(req, res, next) {
  try {
    const { limit, offset } = req.pagination;
    const brand = req.query.brand?.trim();

    const where = {};

    if (brand) {
      where.brand = {
        [Op.iLike]: `%${brand}%`,
      };
    }

    const { count, rows } = await Phone.findAndCountAll({
      where,
      raw: true,
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    const page = Math.floor(offset / limit) + 1;

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      data: rows,

      pagination: {
        total: count,
        limit,
        offset,
        page,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
}
export async function createPhone(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'Request body is required',
        status: 400,
      });
    }

    const phoneData = {
      ...req.body,
      productionYear: Number(req.body.productionYear),
      ramSize: Number(req.body.ramSize),
      screenDiagonal: Number(req.body.screenDiagonal),
      hasNfc: req.body.hasNfc === 'true',
      phoneImage: req.file?.filename ?? null,
    };

    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    console.log('PHONE DATA:', phoneData);

    const createdPhone = await Phone.create(phoneData);

    const { createdAt, updatedAt, ...preparedPhone } = createdPhone.get();

    setTimeout(() => {
      return res.status(201).json({
        data: preparedPhone,
      });
    }, 1500);
  } catch (error) {
    next(error);
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
export async function updatePhoneById(req, res, next) {
  try {
    const { id } = req.params;

    const phone = await Phone.findByPk(id);

    if (!phone) {
      return res.status(404).json({
        status: 404,
        message: 'Phone not found',
      });
    }

    const changes = Object.fromEntries(
      Object.entries(req.body).filter(([field]) =>
        CONSTANTS.ALLOWED_FIELDS.includes(field)
      )
    );

    if (Object.keys(changes).length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'No valid fields to update',
      });
    }

    const updatedPhone = await phone.update(changes);

    const { createdAt, updatedAt, ...preparedPhone } = updatedPhone.get();

    setTimeout(() => {
      return res.status(200).json({
        data: preparedPhone,
        message: 'Phone updated successfully',
      });
    }, 1000);
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

export async function uploadPhoneImage(req, res, next) {
  try {
    const {
      file,
      params: { id },
    } = req;

    if (!file) {
      return next(createHttpError(422, 'Image is required'));
    }

    const [updatedPhoneCount, updatedPhones] = await Phone.update(
      {
        phoneImage: file.filename,
      },
      {
        where: { id },
        raw: true,
        returning: true,
      }
    );

    if (!updatedPhoneCount) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const [updatedPhone] = updatedPhones;

    const { createdAt, updatedAt, ...preparedPhone } = updatedPhone;

    res.status(200).send({
      data: preparedPhone,
    });
  } catch (err) {
    next(err);
  }
}
