function displayWeather() {
    let city = document.getElementById('city-input').value
    let desiredCity = city.replace(' ', '+');
    console.log(desiredCity);
    let state = document.getElementById('state-input').value;

    const moreInfoDiv = document.getElementById('addition-info'); 

    function displayMoreInfo() {
        moreInfoDiv.style.display = 'flex';
    }

    function loadModule() {
        const module = document.getElementById('module');
        module.style.display = 'flex';
        module.style.flexDirection = 'column';
        module.style.justifyContent = 'space-evenly';
    }
    
    async function getWeatherData(City) {
        let promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City},${state},us&units=imperial&APPID=f5b2fcba915a037ebff7f36dc5806378`);
        let weatherObject = await promise.json();
        console.log(weatherObject);
        return weatherObject ;
    }

    getWeatherData(desiredCity).then((data) => {
        const cityDisplay = document.querySelector('h1');
        const tempDisplay = document.getElementById('temp-display');
        const rangeDisplay = document.getElementById('temp-range');
        const conditionDisplay = document.getElementById('condition-display');
        const feelsLikeTemp = document.getElementById('feels-like-temp');
        const humidty = document.getElementById('humidity');
        const windSpeed = document.getElementById('wind-speed');

        switch (data.weather[0].main) {
            case 'Clouds':
                document.body.style.backgroundImage = 'url(./images/Cloudy.PNG)' 
                break;
            case 'Clear':
                document.body.style.backgroundImage = 'url(./images/Clear.PNG)'
                break;
            case 'Rain':
                document.body.style.backgroundImage = 'url(./images/Rain.PNG)'
                break;
            case 'Mist':
                document.body.style.backgroundImage = 'url(./images/Fog.PNG)'
                break;
            case 'Fog':
                document.body.style.backgroundImage = 'url(./images/Fog.PNG)'
                break;
                break;
            default:
                document.body.style.backgroundColor = 'blue'
                break;
        }

        cityDisplay.innerText = data.name;
        tempDisplay.innerText = Math.round(data.main.temp) +'°F';
        rangeDisplay.innerText =`Low ${data.main.temp_min}° | High ${data.main.temp_max}°`;
        conditionDisplay.innerText = data.weather[0].description;
        feelsLikeTemp.innerText = `Feels Like - ${data.main.feels_like}°`;
        if(data.main.humidity == undefined) {
            humidty.innerText = 'Humidity - NA';
        } else {
            humidty.innerText = `Humidity - ${data.main.humidity}%`;
        }
        windSpeed.innerText = `Windspeed - ${data.wind.speed} mph`;})
        .then(() => {
        document.getElementById('city-input').value = null;
        document.getElementById('state-input').value = null;
        closeMoreInfo();
        loadModule();
    });
}

function displayMoreInfo() {
    moreInfoDiv.style.display = 'flex';
}

function closeMoreInfo() {
    moreInfoDiv.style.display = 'none';
}

const moreInfoDiv = document.getElementById('addition-info'); 

const myButton = document.querySelector('button');
myButton.addEventListener('click', displayWeather);

const infoButton = document.getElementById('info-button');
infoButton.addEventListener('click',displayMoreInfo);

const icon = document.getElementById('icon');
icon.addEventListener('click', closeMoreInfo);