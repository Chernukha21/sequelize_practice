import db from '../models/index.js';
import createHttpError from 'http-errors';
const { Phone, Preorder } = db;

export async function getPreorders(req, res, next) {
  try {
    const { status } = req.query;
    const PREORDER_STATUSES = ['pending', 'confirmed', 'done'];

    const whereCondition = {};

    if (status) {
      whereCondition.status = status;
    }

    if (status && !PREORDER_STATUSES.includes(status)) {
      return next(createHttpError(400, 'Invalid preorder status'));
    }

    const preorders = await Preorder.findAll({
      where: whereCondition,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Phone,
          attributes: ['brand', 'model', 'color'],
        },
      ],
    });

    res.status(200).send({ data: preorders });
  } catch (err) {
    next(err);
  }
}

export async function getPhonePreorders(req, res, next) {
  const { id } = req.params;
  try {
    const foundedPhone = await Phone.findByPk(id);

    if (!foundedPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const foundPhonesPreorders = await foundedPhone.getPreorders({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundPhonesPreorders });
  } catch (err) {
    next(err);
  }
}

export async function createPreorder(req, res, next) {
  try {
    const { id } = req.params;
    const { orderDate, status, quantity, customerPhone } = req.body;

    const phone = await Phone.findByPk(id);

    if (!phone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const preorderData = {
      orderDate,
      quantity,
      customerPhone,
    };

    if (status !== undefined) {
      preorderData.status = status;
    }

    const createdPreorder = await phone.createPreorder(preorderData);
    const { createdAt, updatedAt, ...preparedPreorder } = createdPreorder.get();

    res.status(201).send({
      data: preparedPreorder,
    });
  } catch (err) {
    next(err);
  }
}
