import React from 'react'
import { useSelector } from 'react-redux'
import "swiper/css";
import './Today.css'
import Card from './Card'

const Right = () => {

    const { weather } = useSelector(state => state.weather);
    if (!weather) {
        return <div>Loading...</div>
    }
    const { hourly } = weather;

    return <>
        <div className="right1">
            <h1 className='heading'>Today</h1>
            <div className="today">
                {
                    hourly.slice(0, 4).map((hour, index) => (
                        <Card key={index} hour={hour} >
                            <p>{(new Date(hour.dt * 1000)).toLocaleString(navigator.language,{hour: '2-digit', minute:'2-digit'})}</p>
                            <img src={`/weather_icons/${hour.weather[0].icon}.png`} alt={hour.weather[0].description} />
                            <h1>{hour.temp}</h1>
                            <p>{hour.weather[0].description}</p>
                        </Card>
                    ))
                }
            </div>
        </div>
    </>
}

export default Right