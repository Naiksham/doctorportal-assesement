const mongoose = require('mongoose');

const doctorPatientSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  }
});

doctorPatientSchema.index({ doctorId: 1, patientId: 1 }, { unique: true });

const DoctorPatient = mongoose.model('DoctorPatient', doctorPatientSchema);

module.exports = DoctorPatient;
