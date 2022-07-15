import React from 'react'
import { useSelector } from 'react-redux';
import './Highlight.css';

const Highlight = () => {
    const { weather } = useSelector(state => state.weather);
    if (!weather) {
        return <div>Loading...</div>
    }
    const { current } = weather;
    let dayTime="";
    if(current.dt<current.sunrise||current.dt>current.sunset){
       dayTime="night";
    }
    else dayTime="day";
    return <>
        <h1 className='heading'>Today's Highlight</h1>
        <div className="highlight">
            <div className="highlightCard">
                    <div className="sunCard">
                        <div className=' sunRise'>
                            <img src={`/weather_icons/sunrise.png`} alt="" />
                            <div className="data">
                                <p>{new Date(current.sunrise * 1000).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</p>
                                <p>Sunrise</p>
                            </div>
                        </div>
                        <div className='sunRise'>
                            <img src={`/weather_icons/sunrise.png`} alt="" />
                            <div className="data">
                                <p>{new Date(current.sunrise * 1000).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</p>
                                <p>Sunrise</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="highlightCard">
                    <p>Humidity</p>
                    <img src={`/weather_icons/humidity.png`} alt=""/>
                    <p>{current.humidity}%</p>
            </div>
            <div className="highlightCard">
                    <p>Clouds</p>
                    <img src={`/weather_icons/clouds.png`} alt=""/>
                    <p>{current.clouds}%</p>
            </div>
            <div className="highlightCard">
                    <p>Wind Speed</p>
                    <img src={`/weather_icons/wind-${dayTime}.png`} alt=""/>
                    <p>{current.humidity}%</p>
            </div>
            <div className="highlightCard">
                    <p>UV Index</p>
                    <img src={`/weather_icons/uv.png`} alt=""/>
                    <p>{current.uvi}</p>
            </div>
            <div className="highlightCard">
                    <p>Pressure</p>
                    <img src={`/weather_icons/pressure.png`} alt=""/>
                    <p>{current.pressure}hPa</p>
            </div>

        </div>
    </>
}

export default Highlight