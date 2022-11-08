import React, { useState, useEffect } from "react";
import './weatherWidget.scss'
import { WiHumidity, WiDaySunny, WiThermometer } from "react-icons/wi";


const WeatherWidget = () => {
    const [weatherStats, setWeatherStats] = useState(null); 
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);

    const successCallback = (position) => {
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

    const date = new Date();

    let minutes = date.getMinutes() < 11 ? "0" + date.getMinutes() : date.getMinutes();    

    let time = date.getHours() + ":" + minutes;

    useEffect(() => {
        getWeatherStats();
    }, []);

  return (
    <div className='widget'>
        <div className="widget-top">
            {weatherStats ? <h2 className="widget-top__location">{weatherStats.location.name}, {weatherStats.location.country}</h2> : null}
            {weatherStats ? <h2 className="widget-top__temp">{weatherStats.current.temp_c}&#176;C</h2> : null}
            {weatherStats ? (
            <img className="weatherIcon"
                src={weatherStats.current.condition.icon}
                alt={weatherStats.current.condition.text}
            />
        ) : null}
        </div>
        <div className="widget-bottom">
            <div className="widget-bottom__property">
                <div className="widget-bottom__property-header">
                    <WiThermometer className="widget-bottom__property-header__icon"/> 
                    <p className="widget-bottom__property-header__title">FEELS LIKE</p>
                </div>
                {weatherStats ? <p className="widget-bottom__property-stat">{weatherStats.current.feelslike_c}&#176;C</p> : null}
            </div>
            <div className="widget-bottom__property">
                <div className="widget-bottom__property-header">
                    <WiHumidity className="widget-bottom__property-header__icon"/> 
                    <p className="widget-bottom__property-header__title">HUMIDITY</p>
                </div>
                {weatherStats ? <p className="widget-bottom__property-stat">{weatherStats.current.humidity}%</p> : null}
            </div>
            <div className="widget-bottom__property">
                <div className="widget-bottom__property-header">
                    <WiDaySunny className="widget-bottom__property-header__icon"/> 
                    <p className="widget-bottom__property-header__title">UV INDEX</p>
                </div>
                {weatherStats ? <p className="widget-bottom__property-stat">{weatherStats.current.uv}</p> : null}
            </div>
        </div>
    </div>
  )
}

export default WeatherWidget

// WeatherWidget
// {weatherStats ? <h2 className="place">{weatherStats.location.name}, {weatherStats.location.country}</h2> : null}
// {weatherStats ? <h2 className="weatherCondition">{weatherStats.current.condition.text}</h2> : null}  
// {weatherStats ? (
//             <img className="weatherIcon"
//                 src={weatherStats.current.condition.icon}
//                 alt={weatherStats.current.condition.text}
//             />
//         ) : null}