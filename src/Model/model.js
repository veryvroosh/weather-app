export {fetchAPI, getInfo}

async function fetchAPI(city = "istanbul") {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=KJC8ZDGEGLXRY9TJA5UMQYVVM`)
    const json = await response.json();
    console.log(json);
    return json;
}

async function getInfo(city = "istanbul") {
    const json = await fetchAPI(city);
    return {
        cityCountryName: json.resolvedAddress,
        curIcon: json.currentConditions.icon,
        curTemp: json.currentConditions.temp,
        curFeelsLike: json.currentConditions.feelslike,
        curWindSpeed: json.currentConditions.windspeed,
        curPrecipProb: json.currentConditions.precipprob
    }
}