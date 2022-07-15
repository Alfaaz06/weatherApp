import React from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getUser, login } from '../Actions/userAction'
import './Login.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {message,error}=useSelector(state=>state.login)


    const formHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    }

    useEffect(()=>{
        if (message) {
            alert(message)
            dispatch({ type: 'clearMessage' });
            dispatch(getUser());
            navigate('/')
        }
        if(error){
            alert(error)
            dispatch({ type: 'clearErrors' });
        }
    },[dispatch,message,navigate,error])




    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    return <>
        <div className="loginPage">
            <div className="loginLeft">
                <h2 className='toHome' ><Link to='/' >Home</Link></h2>
                <img src={`weather_icons/11d.png`} alt="" />
            </div>
            <div className="loginRight">
                <form onSubmit={formHandler}>
                    <div className="formData">
                        <div className="loginHeading">
                            <h1>Login</h1>
                        </div>
                        <input required type="text" name='username' placeholder="Your Username is ..." value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input required type="password" name='password' placeholder="Your Password is..." value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" className='submitBtn' value="Submit" />
                    </div>
                    <h2>Haven't registered yet ! <Link to='/register'><br />REGISTER ME 😅</Link></h2>
                </form>
            </div>
        </div>
    </>
}

export default Login