const request = require('request')

const forecast=(lat,lon,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=9b4b70b64415ab59e4f958ef84c5a459&query='+lat+','+lon+''
    
    request({url:url,json:true},(error,response)=>{
        if (error)
        {
            callback('unable to connect to weather services',undefined)
        }
        else if (response.body.error) 
        {
            callback('searched place is not available',undefined)
        }
        else {
            callback(undefined,{ 
                temperature : response.body.current.temperature,
                feelslike : response.body.current.feelslike,
                forecast : response.body.current.weather_descriptions[0]
            })
       }

    })
}

module.exports= forecast