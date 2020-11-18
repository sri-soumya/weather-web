const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url= "http://api.weatherstack.com/current?access_key=2238413487770fdaa7c4f4773a6b246d&query="+latitude+","+longitude;

    request({url: url, json: true}, (error, {body})=>{
        if(error)
        {
            callback("Unable to connect with weather services!", undefined);
        }

        else if(body.error)
            callback("Unable to find location.", undefined);

        else
        callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees. There is "+body.current.precip+" percent chance of rain" );
    })
}

module.exports= forecast;