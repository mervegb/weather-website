const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static diretory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
 res.render('index',{
    title:'Weather',
    name:'Merve Baykara' 
 })
})


app.get('/about',(req,res) => {
    res.render('about', {
        title:'About Me',
        name:'Merve Baykara'
    })
})

app.get('/help',(reg,res) => {
    res.render('help', {
        helpText:'We are here for you to help',
        title:'Help',
        name: 'Merve Baykara'
    })
})

app.get('/weather',(req,res) => {
   
    if(!req.query.address) {
     return res.send({
         error:'You must provide an adress'
     })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error) {
                return res.send({error})
            }
              res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
          })
    })
   
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
     return res.send({
          error:'You must provide a search term'
      })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
res.render('404', {
    title:'404 Help',
    name:'Merve Baykara',
    errorMessage:'Help Article Not Found'
})
})

app.get('*',(req,res) => {
res.render('404', {
     title:'404 Not Found',
    name:'Merve Baykara' ,
    errorMessage:'Page Not Found'
    })
})



app.listen(3000, () => {
console.log('Server is up on port')
})