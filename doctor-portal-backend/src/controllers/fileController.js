const s3 = require('../config/s3Config');
const jwt = require('jsonwebtoken');
const { createPDF } = require('../models/pdfModel');
require('dotenv').config();

const uploadFile = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const doctorId = decoded.doctorId;
  const file = req.file;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${doctorId}/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  try {
    const data = await s3.upload(params).promise();
    await createPDF(doctorId, data.Location);
    res.status(201).json({ filePath: data.Location });
  } catch (err) {
    res.status(500).json({ error: 'File upload error' });
  }
};

module.exports = { uploadFile };
