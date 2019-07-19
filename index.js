const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://Moy1234:Moy1234@firstdb-5axkr.mongodb.net/test?retryWrites=true&w=majority';
const {Poli} = require('./models/user');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');

mongoose.connect(mongoURL, {useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('Todo chido aqui en mongo');
    }
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('<h1> exprees y mongo </h1>');
});

app.get('/policias', (req, res) => {
    Poli.find().exec((err, poli) => {
        if(err) {
            return res.status(404).json({message: 'Usuarios no encontrados'});
        } else {
            return res.status(200).json({poli});
        }
    })
});

app.get('/policias/:code', (req, res) => {
    const code = req.params.code
    Poli.find({code: code }).exec((err, poli) => {
        if(err) {
            return res.status(404).json({message: 'Usuarios no encontrados'});
        } else {
            return res.status(200).json({poli});
        }
    })
})

app.post('/new/poli', (req, res) => {
    const params = req.body
    if(params.name && params.code) {
        let newPoli = POLI ({
            name: params.name,
            code: params.code,
            badge: params.badge,
            delegacion: params.delegacion,
            jefe: params.jefe
        })

        newPoli.save((err, policia) => {
            if(err){
                res.status(500).json({message: 'Ocurrio un problema'})
            } else if (res) {
                res.status(201).json({data: params})
            }
        })
    } else {
        res.status(400).json({message: 'Peticion no permitida'})
    }
})


app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
})