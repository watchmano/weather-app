console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address='+ location).then((response) => {
        response.json().then((weatherData) => {
            if(weatherData.error) {
                messageOne.textContent = weatherData.error
            } else{
                console.log(weatherData)
                //object destructuring 을 할떄는 오른쪽에 적힌 객체의 바로 1단계 하위 변수만 바로 픽 할 수 있다.
                //만약 오른쪽에 주어진 객체가, 오리지널로 전달받은 객체에서 한단계 이미 안으로 들어온 상태인데, 
                //<<왜냐하면, 주로 쓰이는 값들을 destructuring으로 얻으려고 하니까,>>
                //이 단계에서 destructuring 해서 얻기에 적합하지 않은 속성값의 경우는 바로 아래 코드처럼 따로 지정해주면 된다.
                const {location = weatherData.location, description, temperature, feelslike} = weatherData.data
                messageOne.textContent = "location: " + location
                messageTwo.textContent = "Now the weather is " + description + ", and the temperature is " + temperature + " and it feels like " + feelslike + "!!"
                
            }
        })
    })
})