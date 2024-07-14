const express = require('express');
const { getPatients, getPatientById, linkPatientToDoctor } = require('../controllers/patient.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', verifyToken, getPatients);
router.get('/:id', verifyToken, getPatientById);
router.post('/link', verifyToken, linkPatientToDoctor);

module.exports = router;
