import {getInfo} from "../Model/model.js";
import sunnyIcon from '../Assets/icons/sunny.svg';
import nightIcon from '../Assets/icons/night.svg';
import cloudIcon from '../Assets/icons/cloud.svg';
import windyIcon from '../Assets/icons/windy.svg';
import rainyIcon from '../Assets/icons/rainy.svg';
import snowyIcon from '../Assets/icons/snowy.svg';
import stormyIcon from '../Assets/icons/stormy.svg';
import sunnyBG from '../Assets/bg/sunny.jpg';
import nightBG from '../Assets/bg/night.jpg';
import cloudBG from '../Assets/bg/cloud.jpg';
import windyBG from '../Assets/bg/windy.jpg';
import rainyBG from '../Assets/bg/rainy.jpg';
import snowyBG from '../Assets/bg/snowy.jpg';
import stormyBG from '../Assets/bg/stormy.jpg';
export {displayInfo, EagleToNormal, NormalToEagle, currentInfo, initializeApp}

const loadingDiv = document.querySelector("#loading");
const mainDiv = document.querySelector("#main-div");
const secondaryDiv = document.querySelector("#secondary-div");

const weatherBG = document.querySelector("#weather-overlay");
const cityP = document.querySelector("#city-p");
const weatherP = document.querySelector("#weather-p");
const weatherIcon = document.querySelector("#weather-icon");
const tempP = document.querySelector("#temp-p");
const feelsLikeP = document.querySelector("#feelslike-p");
const windSpeedP = document.querySelector("#windspeed-p");
const precipProbP = document.querySelector("#precipprob-p");

let currentInfo;

async function displayInfo(city = "istanbul") {
    displayLoading();
    const info = await getInfo(city);
    dismissLoading();
    const weatherIconSrc = getWeatherIcon(info.curIcon);
    const weatherBGSrc = getWeatherBG(info.curIcon)

    weatherBG.src = weatherBGSrc;

    weatherIcon.src = weatherIconSrc;
    currentInfo = info;

    cityP.textContent = `${info.cityCountryName}`;

    weatherP.textContent = getWeatherDescription(info.curIcon);
    tempP.textContent = `Temperature: ${info.curTemp}`;
    feelsLikeP.textContent = `Feels Like: ${info.curFeelsLike}`;
    windSpeedP.textContent = `Wind Speed: ${info.curWindSpeed}`;
    precipProbP.textContent = `Precipitation Probability: ${info.curPrecipProb}%`;
    EagleToNormal(info);

    await Promise.all([
        preloadImg(weatherIconSrc),
        preloadImg(weatherBGSrc)
    ]);
}

function displayLoading() {
    loadingDiv.style.display = "flex";
    mainDiv.style.display = "none";
    secondaryDiv.style.display = "none";
}

function dismissLoading() {
    loadingDiv.style.display = "none";
    mainDiv.style.display = "flex";
    secondaryDiv.style.display = "flex";
}

function preloadImg(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
    })
}

async function initializeApp() {
    weatherBG.src = cloudBG;
    await displayInfo();
}

function EagleToNormal(info) {
    let formattedTemp = ((5/9)*(info.curTemp-32)).toFixed(1);
    tempP.textContent = `Temperature: ${formattedTemp} C°`;

    let formattedFeelsLike = ((5/9)*(info.curFeelsLike-32)).toFixed(1);
    feelsLikeP.textContent = `Feels Like: ${formattedFeelsLike} C°`;

    let formattedSpeed = (info.curWindSpeed*1.60934).toFixed(2);
    windSpeedP.textContent = `Wind Speed: ${formattedSpeed} km/h`;
}

function NormalToEagle(info) {
    tempP.textContent = `Temperature: ${info.curTemp} F°`;
    feelsLikeP.textContent = `Feels Like: ${info.curFeelsLike} F°`;
    windSpeedP.textContent = `Wind Speed: ${info.curWindSpeed} mp/h`;
}

function getWeatherDescription(icon) {
    const descriptions = {
        "clear-day": "Sunny",
        "clear-night": "Clear Night",
        "partly-cloudy-day": "Partly Cloudy",
        "partly-cloudy-night": "Cloudy Night",
        "cloudy": "Cloudy",
        "fog": "Foggy",
        "wind": "Windy",
        "rain": "Raining",
        "showers-day": "Light Rain",
        "showers-night": "Light Rain",
        "snow": "Snowing",
        "snow-showers-day": "Light Snow",
        "snow-showers-night": "Light Snow",
        "thunder": "Thunderstorm",
        "thunder-rain": "Stormy",
        "thunder-showers-day": "Stormy",
        "thunder-showers-night": "Stormy"
    };
    return descriptions[icon] || "Unknown Weather";
}

function getWeatherIcon(icon) {
    switch (icon) {
        case "clear-day":
            return sunnyIcon;
        case "clear-night":
            return nightIcon;
        case "partly-cloudy-day":
        case "partly-cloudy-night":
        case "cloudy":
        case "fog":
            return cloudIcon;
        case "wind":
            return windyIcon;
        case "rain":
        case "showers-day":
        case "showers-night":
            return rainyIcon;
        case "snow":
        case "snow-showers-day":
        case "snow-showers-night":
            return snowyIcon;
        case "thunder":
        case "thunder-rain":
        case "thunder-showers-day":
        case "thunder-showers-night":
            return stormyIcon;
    }
}

function getWeatherBG(icon) {
    const images = {
        "clear-day": sunnyBG,
        "clear-night": nightBG,
        "partly-cloudy-day": cloudBG,
        "partly-cloudy-night": cloudBG,
        "cloudy": cloudBG,
        "fog": cloudBG,
        "wind": windyBG,
        "rain": rainyBG,
        "showers-day": rainyBG,
        "showers-night": rainyBG,
        "snow": snowyBG,
        "snow-showers-day": snowyBG,
        "snow-showers-night": snowyBG,
        "thunder": stormyBG,
        "thunder-rain": stormyBG,
        "thunder-showers-day": stormyBG,
        "thunder-showers-night": stormyBG
    };
    return images[icon] || "Unknown Weather";
}