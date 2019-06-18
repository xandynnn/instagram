const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//  permitir http protocolo ou websocket
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://localhost:27017/instagram', {
  useNewUrlParser: true,
});

//  criacao de um proprio middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

//  todas urls e todas as portas podem usar para acessar essa api
app.use(cors());

//  quando acessar a rota /files vamos acessar na verdade essa pasta
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

//  para permitir que utilize tanto o protocolo http quanto websocket, utilizamos o server.listen ao invés de app
server.listen(3333);
