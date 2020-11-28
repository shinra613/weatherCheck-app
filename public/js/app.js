

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#msg-1') 
const messageTwo = document.querySelector('#msg-2') 



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = searchTerm.value 
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch ('/weather?address='+encodeURIComponent(location)+'').then((response)=>{
        response.json().then(
           (data)=>{
               if (data.error){
              
               messageOne.textContent = data.error
               }
               else{
               console.log(data)
               messageOne.textContent = data.address.toUpperCase()
               messageTwo.textContent = 'temperature is '+data.weather.temperature+'*c but feels like '+data.weather.feelslike+'*c. The day will be '+data.weather.forecast+'.'
            }
           }
        )
    })

})