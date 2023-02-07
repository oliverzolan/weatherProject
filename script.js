window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
        })
    }
})
let weather = {
    apiKey: "fe6d04e98d40ce93b2623cec22d746b7",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey)
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    fetchAQI: function (city){
        fetch("http://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=" + this.apiKey)
    },
    displayWeather: function(data){
        const {name} = data;
        const {lon, lat} = data.coord;
        const {icon, description} = data.weather[0];
        const {temp, humidity, feels_like} = data.main;
        const {speed} = data.wind;
        const celcius = (temp - 32) * (5/9);
        const feelsCelcius = (feels_like - 32) * (5/9);
        const speedMeter = speed * 1.609;
        const aqi = data.air;
        console.log(name, icon, description, temp, humidity, feels_like, speed)
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = celcius.toFixed() + "\xa0°C" + "\xa0\xa0 / \xa0\xa0" + temp.toFixed() + "\xa0°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".feelslike").innerText = "Feels like: " + feelsCelcius.toFixed() + "\xa0°C" + "\xa0 / \xa0" + feels_like.toFixed() + "\xa0°F";
        document.querySelector(".wind").innerText = "Wind Speed: " + speedMeter.toFixed() + "\xa0kph" + "\xa0 / \xa0" + speed.toFixed() + "\xa0mph";
        document.querySelector(".weather").classList.remove("loading");
        document.querySelector(".longitude").innerText = lon;
        document.querySelector(".latitude").innerText = lat;
        document.querySelector(".aqi").innerText = aqi;
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

    // coordinates: function(){

    // },

    setMap: function(){
        
    },

    setDateTime: function(){
        
    }
};

document.querySelector(".search button").addEventListener("click", function() {
        weather.search();
});

document.querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
});

navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
});

weather.fetchWeather("San Francisco");