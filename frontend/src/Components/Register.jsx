import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { register } from '../Actions/userAction';

const Register = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const { message, error } = useSelector(state => state.register);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formHandler = (e) => {
        e.preventDefault();
        dispatch(register({ username, password, confirmPassword }));
    }

    useEffect(() => {
        if (message) {
            alert(message + "\nJust authenticate yourself to continue");
            navigate('/login');
        }
        else if (error) {
            alert(error);
        }

    }, [message, error, navigate, dispatch]);





    return <>
        <div className="loginPage">
            <div className="loginLeft">
                <h2 className='toHome'><Link to='/'>Home</Link></h2>
                <img src={`weather_icons/11d.png`} alt="" />
            </div>
            <div className="loginRight">
                <form onSubmit={formHandler}>
                    <div className="formData">
                        <div className="loginHeading">
                            <h1>Register</h1>
                        </div>
                        <input required type="text" name='username' value={username} placeholder="My username will be..." onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" name='password' value={password} placeholder="My password will be..." onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" name='password' value={confirmPassword} placeholder="I confirm, my password will be..." onChange={(e) => setConfirmPassword(e.target.value)} />
                        <input type="submit" className='submitBtn' value="Register" />
                        <h2>I am already registered <br /><Link to="/login">Log me In  🥱</Link></h2>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Register