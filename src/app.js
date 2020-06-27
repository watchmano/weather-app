const path = require('path')
const express = require('express')

const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "mark87"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mark87'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is some helful text.',
        title: 'Help', 
        name: "Mark87"

    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Help 404 Error', 
        name: "Mark87",
        errorMessage: 'Help Page not Found'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })   
        }
        
        
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                latitude: latitude,
                longitude: longitude,
                location: location,
                data: data
            })
          })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a seartch term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404', 
        name: "Mark87",
        errorMessage: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})

