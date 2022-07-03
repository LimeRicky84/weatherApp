const cityEl = document.getElementById("city")
const tempEl = document.getElementById("temp")
const windEl = document.getElementById("wind")
const humidityEl = document.getElementById("humidity")
const uVindexEl = document.getElementById("index-uv")
const buttonEl = document.getElementById("search")
const citySearch = document.querySelector("#city-search")
const cityListEl = document.querySelector("#city-list")
const apiKey = "3da86ef1a041c1f049c863a14b970862"
let cities = []

buttonEl.addEventListener("click", function(event) {
// searchFunc is going to take the input from the search bar and request coordinates from Geocoding APi
    event.preventDefault()
    console.log("clicked")
    let cityName = citySearch.value.trim()
    console.log(cityName)
    cities.concat(cityName)
    storeCity()
    renderCity()
// searchFunc needs to log the coordinate response from Geocoding API in local storage
    getWeatherResponse()  
  
});
// another function is going to list the inputted city in html <button> tags below the search form


// another function is going to send coordinate data to the weather API to return weather info and input it into the html
const init = () => {

    const storedCities = JSON.parse(localStorage.getItem('cities'))
    if (storedCities !== null) {
        cities = storedCities
    }
}

const storeCity = () => {
   
    localStorage.setItem('cities', JSON.stringify(cities))
    console.log(localStorage.cities)
}

const renderCity = () => {
    if(cities.length === 0) {
        cityListEl.textContent = "cities will list here"
        return;
    }

    for(let i = 0; i < cities.length; i++) {
        let city = cities[i]

        let cityItemEl = document.createElement('button');
        cityItemEl.classList = "btn btn-default"


        cityListEl.appendChild(cityItemEl)

    }
    
}

// function to request weather data for stored coordinates for cities the page has already made a button for

const getWeatherResponse = () => {
    const queryApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch.value + '&appid=' + apiKey;
    console.log(citySearch.value)
    console.log(apiKey)
    fetch(queryApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                console.log(data)
                // displayfunction...
            })
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert("You're not even wrong bro!")
        })

}

init()