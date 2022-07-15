import React from 'react'
import { useSelector } from 'react-redux'
import './Daily.css'
import Card from './Card'

const Daily = () => {
    const {weather} = useSelector(state=>state.weather);
    if (!weather) {
        return <div>Loading</div>
    }
    const {daily}=weather;
  return <>
  <div className="daily">
    <h1 className='heading'>This Week</h1>
    <div className="weekdays">
        {
            daily.map((element,index)=>(
                <Card key={index}>
                    <p>{(new Date(element.dt * 1000)).toLocaleString(navigator.language,{weekday:'long'})}, {(new Date(element.dt * 1000)).toLocaleDateString()}</p>
                    <img src={`/weather_icons/${element.weather[0].icon}.png`} alt="" />
                    <p>{element.weather[0].description}</p>
                    <p><span> {element.temp.max}</span><span>{element.temp.min} </span></p>
                </Card>
            ))
        }
    </div>
  </div>
  </>
}

export default Daily