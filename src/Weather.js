import React, { useState } from 'react'
import axios from 'axios'

export default function Weather() {
    const [city, setCity] = useState();
    const [weather, setWeather] = useState();
    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'d910bd39b720d77c799fc24991fae7cf'}`);
            setWeather(response);
            console.log(response); 
            // :: (to check wether reponse variable is getting values or not from the weather API)(and than we have to store the extracted values)
        }
        catch (error) {
            console.log("Error in fetching the data from API", error);
        }

    }
    const handleClick = () => {
        fetchWeather();
    }
    return (
        <>
            <div className="container weather">
                <input type="text" placeholder="enter city name" value={city} onChange={handleCityChange} />
                <button className="btn btn-outline-danger mt-4" onClick={handleClick}>Get Weather</button>
                {weather && <>
                    <div className="weather-data">
                        <h1>{weather.data.name}</h1>
                        <p>{Math.floor(weather.data.main.temp)}°C</p>
                        <p>{weather.data.weather[0].description}</p>
                    </div>
                </>}
            </div>
        </>
    )
}