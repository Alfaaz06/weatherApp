import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getWeather } from '../Actions/action';
import { getUser, savePlace } from '../Actions/userAction';
import Loading from './Loading'
import './Left.css'


const Left = () => {

    const { isAuthenticated, user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const [city, searchCity] = useState("");
    let time;

    const { message } = useSelector(state => state.savePlace);

   

    const placeHandler = () => {
        city !== "" ? dispatch(savePlace({ cityName: city })) : dispatch(savePlace({ cityName: "Delhi" }));
        dispatch(getUser());
    }

    useEffect(() => {
        dispatch(getWeather({ cityName: "Delhi" }));

    }, [dispatch]);

    useEffect(() => {
        if (message) {
            alert(message)
            dispatch({type:'clearMessage'});
        }
    }, [message,dispatch]);


    const { weather } = useSelector(state => state.weather);

    if (!weather) {
        return <Loading />
    }

    const { current } = weather;


    const searchHandler = (e) => {
        e.preventDefault();
        searchCity(e.target.value);
        const city = e.target.value;
        clearTimeout(time);
        time = setTimeout(() => {
            city !== "" ? dispatch(getWeather({ cityName: city })) : dispatch(getWeather({ cityName: "Delhi" }));
        }, [500]);
    }

    return <>
        <div className="left">
            <form onSubmit >
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" className='search' name="searchCity" placeholder={city === "" ? "Search for a place" : { city }} value={city} onInput={searchHandler} />
            </form>
            <div className="veri">
                <div className='login'><Link to={isAuthenticated ? `/user/${user && user.username}` : '/login'}>{isAuthenticated ? `Hi, ${user && user.username}` : 'LOGIN'}</Link></div>
                <div className='save' onClick={placeHandler}>{isAuthenticated ? `Save` : `Save`}</div>
            </div>
            <img src={`/weather_icons/${current.weather[0].icon}.png`} alt="" />
            <h1 className='temp'>{current.temp}</h1>
            <p>Feels like {current.feels_like}</p>
            <p className='description'><i className="fa-brands fa-cloudversify"></i>&nbsp;{current.weather[0].description}</p>
            <h2>{new Date(current.dt * 1000).toLocaleString(navigator.language, { weekday: 'long' })}, {(new Date(current.dt * 1000)).toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</h2>
            <div className="divider"></div>
            <div className="moon">
                <h3>Moonrise: {new Date(weather.daily[0].moonrise * 1000).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</h3>
                <h3>Moonset: {new Date(weather.daily[0].moonset * 1000).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</h3>
                <h2 className='cityName'>{city !== "" ? city : "Delhi"}, {weather.timezone}</h2>
            </div>
        </div>
    </>
}

export default Left