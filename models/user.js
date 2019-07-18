const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poli = new Schema ({
    name: String,
    code: String,
    badge: String,
    delegacion: String,
    jefe: String
})

const POLI = mongoose.model('Poli', poli)
module.exports = {POLI}