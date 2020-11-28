const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

// define path for express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlerbars engine and views locatiom
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup for static dir
app.use(express.static(pubDirPath))

app.get('/',(req,res)=>{
    res.render('index',{
        creator:'Akhil'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        creator:'Akhil',
        define:'legend'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        creator:'Akhil'
    })
})


app.get("/weather", (req,res)=>{

   if(!req.query.address){
       return res.send({error:'Address is required'})
   }    
   
   geocode(req.query.address, (error, data)=>{

    if(error){
        return res.send({errorDat: error})
    }
    
    forecast(data.latitude,data.longitude, (error, weather) => {
        if(error){
            return console.log(error)
        }
          
        res.send({address: req.query.address,weather}) 

      })
})

})

app.get("/help/*", (req,res)=>{
    res.render('404',{
        error:"404: article not found",
        creator:'Akhil'
    })
})

app.get("/*", (req,res)=>{
    res.render('404',{
        error:"404: Page not found",
        creator:'Akhil'
    })
})


app.listen(port,()=>{
    console.log('server is up on port '+port)
})