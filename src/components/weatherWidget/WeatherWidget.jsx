import React, { useState, useEffect } from "react";
import './weatherWidget.scss'

const WeatherWidget = () => {
    const [weatherStats, setWeatherStats] = useState(null); 
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);

    const successCallback = (position) => {
        // console.log(position);
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);
        setUserLongitude(position.coords.longitude);
        setUserLatitude(position.coords.latitude);
    };

    const errorCallback = (error) => {
        console.error(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


    const getWeatherStats = () => {
        fetch(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${(userLatitude,userLongitude)}&aqi=no`)
            .then((response) => response.json())
            .then((jsonResponse) => setWeatherStats(jsonResponse))
            .catch((err) => console.log(err));
    };    

    useEffect(() => {
        getWeatherStats();
    }, []);

  return (
    <div className='widget'>
        WeatherWidget
        {weatherStats ? <h2 className="place">{weatherStats.location.name}, {weatherStats.location.country}</h2> : null}
        {weatherStats ? <h2 className="weatherCondition">{weatherStats.current.condition.text}</h2> : null}  
    </div>
  )
}

export default WeatherWidget