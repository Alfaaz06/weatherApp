import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout, Quote, removePlace, savedPlaces } from '../Actions/userAction';
import Card2 from './Card2';
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { weather } = useSelector(state => state.weather);
    const { user } = useSelector(state => state.user);
    const { savedPlaceData } = useSelector(state => state.savedPlace);
    const { quote } = useSelector(state => state.quote);
    const { RemoveMessage } = useSelector(state => state.removePlace)
    const {logoutMessage}=useSelector(state=>state.logout)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        dispatch(Quote());
        dispatch(savedPlaces());
    }, [dispatch]);

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000);
    }, []);

    useEffect(() => {
        if (RemoveMessage) {
            alert(RemoveMessage)
            dispatch(savedPlaces())
            dispatch({ type: 'clearMessage' });
        }
        if (logoutMessage) {
            alert(logoutMessage)
            dispatch({ type: 'clearMessage' });
            navigate('/')
        }
    }, [RemoveMessage, dispatch, navigate, logoutMessage]);






    let greeting;
    const geetTime = new Date().getHours();
    if (geetTime >= 4 && geetTime < 12) {
        greeting = "Good Morning";
    }
    else if (geetTime >= 12 && geetTime < 16) {
        greeting = "Good Afternoon";
    }
    else if (geetTime >= 16 && geetTime < 20) {
        greeting = "Good Evening";
    } else greeting = "Good Night";

    if (!weather && !user) {
        return <div>Loading</div>
    }

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(getUser());
        navigate('/');
    }





    return <>
        <div className="profilePage">
            <div className="time">
                <h1>{time.toLocaleTimeString('fr-FR')},&nbsp;{time.toLocaleString(navigator.language, { weekday: 'long' })}</h1>
            </div>
            <div className="greeting">
                <h2>{greeting}, {user.username}</h2>
                <h2><Link to='/'>Home</Link></h2>
            </div>
               <div className="logdiv">
               <h2 className='logout' onClick={logoutHandler} >Logout</h2>
               </div>
            <div className="quote">
                {quote ? <h2><i>{quote}</i></h2> : <h2>Fetching some inspiration for you...</h2>}
            </div>
            <div className="profile">
                {savedPlaceData && savedPlaceData.map((item, index) => (
                    <Card2 key={index}>
                        <div className="delete"><h2 onClick={() => {
                            dispatch(removePlace({ place: item.city }))
                        }}>X</h2></div>
                        <div className="dataBox">
                            <div className="one">
                                <p>{item.city}</p>
                                <p>{item.temperature}</p>
                            </div>
                            <div className="img">
                                <img src={`/weather_icons/${item.icon}.png`} alt="" />
                                <p>{item.description}</p>
                            </div>
                            <div className="two">
                                <p>{item.min}</p>
                                <p>{item.max}</p>
                            </div>
                        </div>
                    </Card2>
                ))}
            </div>
        </div>
    </>
}

export default Profile