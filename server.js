// Doing a check that we are not in our production environment, coz we only want to load our env variable in development environment.
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').parse()
// }
// require('dotenv')
require('dotenv').config()



const express = require('express')      // Importing express
// Body parser is used to handle the input elements on the server 
const bodyParser = require('body-parser')

const app = express()

const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

// Setting our view engine, in our case we are using EJS as our view engine to display HTML as output.
app.set('view engine', 'ejs')
// Next we set up from where our views are coming from, here the views directory. SERVER WINDOW VIEWS.
app.set('views', __dirname + '/views')
// Hooking up express layouts that will contain the redundant code, like, Header and Footer.
app.set('layout', 'layouts/layout')
// Tell our express application that we need to use express layouts.
app.use(expressLayouts)
// We also need to tell express where our public files(CSS, JS, images, etc.) are gonna be, refer to the 'public' folder. PUBLIC VIEWS.
app.use(express.static('public'))

// Here we are sending values through a url to our server, hence, urlencoded() is used. Then 'lomit' is used to increase the limit size that our server can accept.
app.use(bodyParser.urlencoded({ limit: '10mb', extended:false }))

const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  }) // This throws error
mongoose.connect( "mongodb://localhost:27017/library", { useNewUrlParser: true,  })

// To check that we are connected to the DB or not
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))         // This will run only once, when we 1st connect to our DB.


app.use('/', indexRouter)
app.use('/authors', authorRouter)

// Runnig express on a port.
app.listen(process.env.PORT || 3000)



