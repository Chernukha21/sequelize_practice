import multer from 'multer';
import { CONSTANTS } from '../constants.js';
import path from 'path';
import createHttpError from 'http-errors';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(CONSTANTS.STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

function fileFilter(req, file, cb) {
  const MIMETYPE_REG_EXP = /^image\/(gif|jpeg|png)$/;
  cb(null, MIMETYPE_REG_EXP.test(file.mimetype));
}

const upload = multer({ storage, fileFilter });

export const uploadPhonePhoto = upload.single('phoneImage');
