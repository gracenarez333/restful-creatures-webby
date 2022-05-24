// importinh express and ejs layouts
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const fs = require('fs')
// have the app run on a PORT
const PORT = 3333
// creating an instance of an express app
const app = express()
// tell express that we are using ejs as the view engine
app.set('view engine', 'ejs')
// tell app to use ejs layouts
app.use(ejsLayouts)
// body parser middleware
app.use(express.urlencoded({extended: false}))
// allow non GET/POST methods from an html5 form
app.use(methodOverride('_method'))
// ROUTES
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/creatures'))

// listen on the port
app.listen(PORT, () => {
    console.log(`cruddy dinos on port: ${PORT}`)
})