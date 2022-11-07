// const weatherApi = () => {
//     const [weatherStats, setWeatherStats] = useState(null); //


//     const getWeatherStats = (userLatitude, userLongitude) => {
//         fetch(
//             `http://api.weatherapi.com/v1/current.json?key=e38763e617664e56ab8162340220102&q=${(userLatitude,userLongitude)}&aqi=no`)
//             .then((response) => response.json())
//             .then((jsonResponse) => setWeatherStats(jsonResponse))
//             .catch((err) => console.log(err));
//             return weatherStats
//         // console.log(weatherStats.location.name);
//     };

// }

// export default weatherApi;