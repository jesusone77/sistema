// const express = require('express');
import  express  from 'express';
// const morgan = require('morgan');
import morgan from 'morgan';
// const cors =  require('cors');
import cors from 'cors';
import path from 'path';
import router from './routes';
//BD conec
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const dburl = 'mongodb://localhost:27017/sbsistema';
mongoose.connect(dburl, {useNewUrlParser: true})
.then(mongoose => console.log('conectado 27017'))
.catch(err => console.log(err+"ASDFASDFASDFASDF") );


const app = express();
app.use(morgan('dev'));
app.use(cors());
//usamos json para poder recibir json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);
app.set('port', process.env.PORT || 3000);

// app.get('/hola', function(req, res) {
//     res.send('hola kittens');
// });

app.listen(app.get('port'), ()=> {
    console.log('puerto: ' + app.get('port'));
});