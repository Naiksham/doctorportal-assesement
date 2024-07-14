const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
