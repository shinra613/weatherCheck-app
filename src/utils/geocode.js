const request = require('request')


const geocode=(address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWtoaWx0ZWNod2l6IiwiYSI6ImNrZXQzOHg3YzBxZjYzMW82MHJlMzR1cDEifQ.cBVXJwW6hRWWolEgyrn8wA&limit=1'
    
    
    request({url:url,json:true},(error,response)=>{
        if (error)
        {
            callback('unable to connect to weather services',undefined)
        }
        else if (response.body.features[0]===undefined) 
        {
            callback('searched place is not available',undefined)
        }
        else {
            callback(undefined,{ 
                latitude: response.body.features[0].center[1],
                longitude : response.body.features[0].center[0]
            })
       }

    })
}

module.exports =  geocode