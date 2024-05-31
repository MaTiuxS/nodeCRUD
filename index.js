const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParse = require('body-parser')
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

// rutas de la app
app.use('/', routes());

// puerto 
app.listen(5000);
