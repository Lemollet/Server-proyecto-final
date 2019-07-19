const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reporte = new Schema ({
    code: String,
    descripcion: String
});

const Reporte = mongoose.model('Reporte', reporte)

module.exports = {Reporte}