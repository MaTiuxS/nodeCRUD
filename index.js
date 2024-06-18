const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParse = require('body-parser')

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos
const cors = require('cors');


// conectar a mongo

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRM', {
    useNewUrlParser: true,
    family: 4
})
.then(()=> {
    console.log('conectado')
})
.catch((err)=> {
    console.log(err)
});

// Crea el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

// hanilitar cors
app.use(cors());

// rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

// puerto 
app.listen(5000);

module.exports = app;
