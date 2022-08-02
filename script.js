function displayWeather() {
    let city = document.getElementById('city-input').value
    let desiredCity = city.replace(' ', '+');
    console.log(desiredCity);
    let state = document.getElementById('state-input').value;

    function loadModule() {
        const module = document.getElementById('module');
        module.style.display = 'flex';
        module.style.flexDirection = 'column';
        module.style.justifyContent = 'space-evenly';
    }
    
    async function getWeatherData(City) {
        let promise = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${City},${state},us&units=imperial&APPID=f5b2fcba915a037ebff7f36dc5806378`);
        let weatherObject = await promise.json();
        console.log(weatherObject);
        return weatherObject ;
    }

    getWeatherData(desiredCity).then((data) => {
        const cityDisplay = document.querySelector('h1');
        const tempDisplay = document.getElementById('temp-display');
        const rangeDisplay = document.getElementById('temp-range')
        const conditionDisplay = document.getElementById('condition-display');
        cityDisplay.innerText = data.name;
        tempDisplay.innerText = `${data.main.temp}°F`;
        rangeDisplay.innerText =`Low ${data.main.temp_min}° | High ${data.main.temp_max}°`;
        conditionDisplay.innerText = data.weather[0].description;
    }).then(() => {
        document.getElementById('city-input').value = null;
        document.getElementById('state-input').value = null;
        loadModule();
    });
}

const myButton = document.querySelector('button');
myButton.addEventListener('click', displayWeather);
