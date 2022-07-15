import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import './App.css'
import Login from './Components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './Actions/userAction'
import Profile from './Components/Profile'
import Register from './Components/Register'


export const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getUser());
  },[dispatch])
  const {isAuthenticated,user} = useSelector(state=>state.user);
  return<>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={isAuthenticated?<Home/>:<Login/>}/>
      <Route path={isAuthenticated?`/user/${ user.username}`:`/login`} element={isAuthenticated?<Profile/>:<Login/>}/>
      <Route path="/register" element={isAuthenticated?<Home/>:<Register/>} />
    </Routes>
  </BrowserRouter>
  </>
}

