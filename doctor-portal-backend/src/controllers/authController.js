const jwt = require('jsonwebtoken');
const { createDoctor, findDoctorByEmail } = require('../models/doctorModel');
require('dotenv').config();

const signup = async (req, res) => {
  const { name, email, password, specialty } = req.body;

  try {
    const newDoctor = await createDoctor({ name, email, password, specialty });
    res.status(201).json({ doctor: newDoctor });
  } catch (err) {
    res.status(400).json({ error: 'Error creating doctor' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await findDoctorByEmail(email);
    if (!doctor || !await bcrypt.compare(password, doctor.passwordhash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ doctorId: doctor.doctorid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

module.exports = { signup, login };
