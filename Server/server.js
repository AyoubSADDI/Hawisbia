const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path");
const multer = require("multer");
//const socketio = require('socket.io');
//const http = require('http');
//const {addUser, removeUser, getUser, getUsersOfRoom} = require('./users')





// Config dotev
require('dotenv').config({
    path: './config/config.env'
})


const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/font-awesome', express.static(__dirname + 'public/font-awesome'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))


// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
  res.render('index', { text: 'This is EJS'})
})


app.get('/map', function(req, res) {
  res.sendFile('demo.html',{root:path.join(__dirname, './views')});
});
app.get('/map/1', function(req, res) {
  res.sendFile('index2.html',{root:path.join(__dirname, './views')});
});
app.get('/map/2', function(req, res) {
  res.sendFile('map1.html',{root:path.join(__dirname, './views')});
});
app.get('/map/3', function(req, res) {
  res.sendFile('googlemap.html',{root:path.join(__dirname, './views')});
});

app.get('/intro', function(req, res) {
  res.sendFile('agency.html',{root:path.join(__dirname, './views')});
});




// Connect to database
connectDB();

// body parser
app.use(bodyParser.json())
// Load routes
const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')
var imagesRouter = require('./routes/images');
var contactsRouter = require('./routes/contacts');
var productsRouter = require('./routes/products');
var eventsRouter = require('./routes/events');
var myuserRouter=require('./routes/myusers');
var castronomyRouter = require('./routes/castronomy');
var jeuxRouter = require('./routes/jeux');
var maisonRouter = require('./routes/maisonD');
var placeRouter = require('./routes/placee');
var imagessRouter = require('./routes/imagess');
var testcloud = require('./routes/testcloud');
var restaurantRouter = require('./routes/restaurants');
var accomodationRouter = require('./routes/accomodationCrud');
var campingRouter = require('./routes/campingCenters');








// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: [process.env.CLIENT_URL,process.env.CLIENT_URL1,process.env.CLIENT_URL2]
    }))
    app.use(morgan('dev'))
}

// Use Routes
app.use('/api', authRouter)
app.use('/api', userRouter)

app.use('/uploads',express.static('uploads'));
app.use('/images', imagesRouter);
app.use('/contacts', contactsRouter);
app.use('/products', productsRouter);
app.use('/events', eventsRouter);
app.use("/users",myuserRouter);
app.use('/Castronomy', castronomyRouter);
app.use('/Jeux', jeuxRouter);
app.use('/maison', maisonRouter);
app.use('/place', placeRouter);
app.use('/imagess', imagessRouter);
app.use('/test', testcloud);
app.use('/restaurants', restaurantRouter);
app.use('/accomodation', accomodationRouter);
app.use('/camping', campingRouter);









app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})
const PORT = process.env.PORT || 5000
/*
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{
    socket.on('join',({name},callback)=>{
      const room="zaghouan"
      const {error, user} = addUser({id:socket.id, name, room});
  
      if(error)
        return callback(error);
  
      socket.join(user.room);
  
      //admin generated messages are called 'message'
      //welcome message for user
      socket.emit('message',{user:"admin",text:`${user.name}, welcome to the room ${user.room}`})
  
      //message to all the users of that room except the newly joined user
      socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});
  
  
      io.to(user.room).emit('roomData',{room:user.room, users:getUsersOfRoom(user.room)})
  
      callback();
    })
  
    //user generated message are called 'sendMessage'
    socket.on('sendMessage',(message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit('message',{user:user.name, text:message});
      io.to(user.room).emit('roomData',{room:user.room, users:getUsersOfRoom(user.room)});
  
      callback();
    })
  
    socket.on('disconnect',()=>{
      const user = removeUser(socket.id);
      if(user){
        io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left.`})
      }
    })
  })
*/


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});