//Express
let express = require('express');
let cookieParser = require('cookie-parser');
let bluebird = require('bluebird');
//incorporo cors
let cors = require('cors');

//importo router
let indexRouter = require('./routes/index');
let apiRouter = require('./routes/user.route');
let cinemaRouter = require('./routes/cinema.route')
let movieRouter = require('./routes/movie.route')
let roomsRouter = require('./routes/room.route')
// let contactRouter = require('./routes/contact.route')
// let utilRouter = require('./routes/utils');

//instancio el servidor
let app = express();

//engine que permite renderizar paginas web
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());

//Indico las rutas de los endpoint
app.use('/', indexRouter);
app.use('/users', apiRouter);
app.use('/cinemas', cinemaRouter)
app.use('/rooms', roomsRouter)
app.use('/movies', movieRouter);
// app.use('/comments', commentRouter)
// app.use('/contacts', contactRouter)


require('./config').config();


// Database connection --
let mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
console.log("BD", url);
let opts = {
  useNewUrlParser: true,
  connectTimeoutMS: 20000,
  useUnifiedTopology: true
};

mongoose.connect(url, opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`)
    console.log(e)
  })


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

});


// Setup server port
let port = 8080;
// Escuchar en el puerto
app.listen(port, () => {
  console.log('Servidor de ABM Users iniciado en el puerto ', port);
});


module.exports = app;