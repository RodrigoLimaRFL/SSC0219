import React from "react";
import { useState , useEffect } from "react";

import "./WeatherDisplay.css";

const WeatherDisplay = (props) => {
    let [latitude, setLatitude] = useState("");
    let [longitude, setLongitude] = useState("");

    useEffect(() => {
        handleSearch(props.search);
    }, [props.search]);

    const handleSearch = (search) => {
        fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + search + "&count=1")
            .then(function(response) {
                return response.json();
            }
        ).then(function(data) {
            setLatitude(data.results[0].latitude);
            setLongitude(data.results[0].longitude);
        }).catch(function(err) {
            console.log(err);
        });
        
        getWeather();
    };

    let [temp, setTemp] = useState("");
    let [condition, setCondition] = useState("");
    let [imgSrc, setImgSrc] = useState("");

    function getWeather()

        {
            fetch("http://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current_weather=true")
                .then(function(response) {
                    return response.json();
        })
        .then(function(data) {
            setTemp(data.current_weather.temperature);
            setCondition(data.current_weather.weathercode);

            if(condition == 1 || condition == 2)
            {
                // sol
                setImgSrc("http://openweathermap.org/img/wn/01d@2x.png");
            }
            else if (3 <= condition && condition<=48)
            {
                // nuvens
                setImgSrc("http://openweathermap.org/img/wn/03d@2x.png");
            }
            else
            {
                // chuva
                setImgSrc("http://openweathermap.org/img/wn/10d@2x.png");
            }
        }).catch(function(err) {
            console.log(err);
        })
    }

    return (
        <>
            <p> Latitude: {latitude} </p>
            <p> Longitude: {longitude} </p>
            
            
            <div className="weather">
                <h2>Temperature: {temp}°C</h2>
            <img src={imgSrc}/>
            </div>
        </>
    );
}

export default WeatherDisplay;