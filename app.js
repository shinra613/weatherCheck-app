const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode(process.argv[2], (error, data)=>{

    if(error){
        return console.log(error)
    }
    console.log('Data: ', data)
    forecast(data.latitude,data.longitude, (error, data) => {
        if(error){
            return console.log(error)
        }

        console.log('Error', error)
        console.log('Data', data)
      })
})
