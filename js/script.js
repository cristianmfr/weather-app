
// api key's

const apiKey = "b3e00daff7a38d0b100731b7b6421fd8";
const apiCountry = "https://www.countryflagicons.com/FLAT/32/";

// input and submit button

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

// elements to search in api

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const contryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

// select container to hide

const weatherContainer = document.querySelector("#weather-data");

// erro message container

const errorMessageContainer = document.querySelector("#error-message");

// loading animation icon

const loader = document.querySelector("#loader");

// sugestions

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// get weather data in api

const getWeatherData = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return(data);
};

// show error message

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
  };
  
  //hiding information

  const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  };

// show city name or hide 

const showWeatherData = async (city) => {

    hideInformation();

    const data = await getWeatherData (city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
      }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    contryElement.setAttribute("src", apiCountry + data.sys.country + `.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}Km/h`;

    // removing hide class
    
    weatherContainer.classList.remove("hide");
};

// click button submit event

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
  
    const city = cityInput.value;
  
    showWeatherData(city);
  });

  // enter submit event

  cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
  })