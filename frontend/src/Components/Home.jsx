import React from 'react'
import Left from './Left'
import Right from './Right'
import './Home.css';

const Home = () => {
 
  return <>
    <div className="mainPage" >
      <Left />
      <div className="line"></div>
      <div className="right" >
        <Right />
      </div>
    </div>
  </>
}

export default Home