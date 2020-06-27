const fs = require('fs')
const request = require('postman-request')

const forecast  = (a, b, callback) => {
    const weather_url = "http://api.weatherstack.com/current?access_key=5dc7c4cb950e9b8942489b407a3d5212&units=s&query=" + a + "," + b + "&units=f"
    
    
    //API 서버가 6/22 11시 기준 문제가 있는 듯. 나중에 서버가 다시 잘 돌아가면 축약된 문법을 써서 코드를 고치자. response.body 부분
    
    request(weather_url, (error, response) => {
       const data = JSON.parse(response.body)
       console.log(data)
        if(error){
            callback("Unable to connect to weather service", undefined)
            
        } else if(response.body.error){
            callback("Unable to find location", undefined)
        } else{
            const data = {
                description: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast