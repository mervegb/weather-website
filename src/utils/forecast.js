const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6a4ff72a9de1f25cc0244aa7b5f6a845&query=' + latitude + ',' + longitude 

    request({url,json:true},(error,{body}) =>{
 
        if(error) {
           callback('Unable to connect to location',undefined) 
        }
        else if(body.error) {

            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined, body.current.temperature + ' degress out.')
        }
        })
    }


module.exports=forecast
