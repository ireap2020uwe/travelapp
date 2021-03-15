import fetch from "node-fetch";

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const apiKey = 'b620cfcf89710fcee6caad3aa9803b62';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
document.getElementById('generate').addEventListener('click',performAction);
const port=8085

async function postData (data){
    console.log(data);
        const res = await fetch (`http://localhost:${port}/addWeatherData`,{
            method:'POST',
            credentials: 'same-origin',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),

        });

        try {
            const newData = await res.json();
            console.log(newData,'postDatasuccessful');
            return newData;
          } 
        catch(error) {
          console.log("error", error);
          }
}

async function performAction(e){
    const newZipcode =  document.getElementById('zip').value;
    const newFeelings = document.getElementById('feelings').value;
    console.log(newDate)
    getWeatherData(baseURL,newZipcode, apiKey)
    .then(function(data){
        
        postData(`http://localhost:${port}/addWeatherData`,{temp:data.main.temp, date: newDate, newFeelings:newFeelings})
    .then(
        updateUI()
    )
    console.log('performActionSuccessful')
    })
}
    
async function getWeatherData (baseURL, zipCode, key){
    //const res = await fetch(baseURL+zipCode+'&appid='+apiKey);
    const res = await fetch(baseURL+zipCode+'&appid='+apiKey+'&units=imperial');
      try {
    
        const data = await res.json();
        console.log(data,'getWeatherData')
        return data;
      }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
    }

async function updateUI (){
    const req = await fetch(`http://localhost:${port}/all`);
    console.log("updatesuccessful")
    try{
        const allData=await req.json();
        document.getElementById('date').innerHTML=allData.date;
        document.getElementById('temp').innerHTML=allData.temp;
        document.getElementById('content').innerHTML=allData.newFeelings;
    } catch(error){
        console.log("error",error);
    }
}


  


export {postData}
export {performAction}
export {updateUI}
export {getWeatherData}

