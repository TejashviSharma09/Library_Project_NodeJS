// Doing a check that we are not in our production environment, coz we only want to load our env variable in development environment.
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').parse()
// }
require('dotenv')



const express = require('express')      // Importing express
const app = express()

const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

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

const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  }) // This throws error
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true,  })

// To check that we are connected to the DB or not
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))         // This will run only once, when we 1st connect to our DB.


app.use('/', indexRouter)

// Runnig express on a port.
app.listen(process.env.PORT || 3000)



