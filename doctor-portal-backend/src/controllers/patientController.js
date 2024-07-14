const { getPatients, linkPatientToDoctor } = require('../models/patientModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchPatients = async (req, res) => {
  try {
    const patients = await getPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching patients' });
  }
};

const linkPatient = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const doctorId = decoded.doctorId;
  const { patientId } = req.body;

  try {
    const result = await linkPatientToDoctor(doctorId, patientId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error linking patient' });
  }
};

module.exports = { fetchPatients, linkPatient };
