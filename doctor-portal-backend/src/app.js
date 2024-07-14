const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const doctorRoutes = require('./routes/doctor.route');
const patientRoutes = require('./routes/patient.route');
const pdfRoutes = require('./routes/pdf.route');
const doctorPatientRoutes = require('./routes/doctorPatient.route');

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/pdfs', pdfRoutes);
app.use('/api/doctor-patient', doctorPatientRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
