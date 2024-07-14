const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('../middleware/auth.middleware');
const { uploadFile } = require('../controllers/file.controller');
const router = express.Router();

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload PDF file
router.post('/upload', verifyToken, upload.single('file'), uploadFile);

module.exports = router;
