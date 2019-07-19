const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoURL = 'mongodb+srv://Moy1234:Moy1234@firstdb-5axkr.mongodb.net/test?retryWrites=true&w=majority';
const {Poli} = require('./models/user');
const {Reporte} = require('./models/reportes');
const {Admin} = require('./models/Admin')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

mongoose.connect(mongoURL, {useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('Todo chido en mongo');
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
        let newPoli = Poli ({
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

app.post('/new/reporte', (req, res) => {
    const params = req.body
    if(params.code && params.descripcion) {
        let newReprote = Reporte ({
            code: params.code,
            descripcion: params.descripcion
        })

        newReprote.save((err, reporte) => {
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

app.get('/reportes', (req, res) => {
    Reporte.find().exec((err, report) => {
        if(err) {
            return res.status(404).json({message: 'Usuarios no encontrados'});
        } else {
            return res.status(200).json({report});
        }
    })
});


app.post('/new/admin', (req, res) => {
    const params = req.body
    if(params.email && params.password) {
        let newAdmin = Admin ({
            email: params.email,
            password: params.password
        })

        newAdmin.save((err, admin) => {
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


app.get('/administradores', (req, res) => {
    Admin.find().exec((err, admin) => {
        if(err) {
            return res.status(404).json({message: 'Usuarios no encontrados'});
        } else {
            return res.status(200).json({admin});
        }
    })
});



app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
})