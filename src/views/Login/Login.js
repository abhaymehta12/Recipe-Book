import { Footer } from '../../components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionCreators } from '../../actions/profile';
import { useAuth } from '../../context/auth';
import './style.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // To navigate programmatically
  const dispatch = useDispatch(); // To dispatch actions to Redux
  const { user, login } = useAuth();
  const profile = user;

  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState({
    username: '',
    password: '',
    errors: {
      username: '',
      password: ''
    },
    loginStatus: '',
    submitted: false
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
      submitted: false
    }));
  };

  const validateForm = () => {
    let valid = false;
    if (!profile) {
      setState(prevState => ({
        ...prevState,
        loginStatus: 'Not Registered'
      }));
    } else if (profile && profile.username === state.username && profile.password === state.password) {
      valid = true;
    } else if (profile && (state.username || state.password)) {
      if (profile.username !== state.username) {
        state.errors.username = 'Enter Valid User Name';
      } else if (profile.password !== state.password) {
        state.errors.password = 'Enter Valid Password';
      }
    } else {
      state.errors.password = 'Enter Valid Password';
      state.errors.username = 'Enter Valid User Name';
      setState(prevState => ({
        ...prevState,
        loginStatus: 'Login Failed! Invalid Username and Password'
      }));
    }
    setState(prevState => ({ ...prevState, submitted: true }));
    return valid;
  };

  const loginForm = (event) => {
    event.preventDefault();
    state.errors.username = '';
    state.errors.password = '';
    setState(prevState => ({
      ...prevState,
      loginStatus: ''
    }));
    if (validateForm()) {
      profile.loggedin = true
      login(profile)
      dispatch(ActionCreators.login(profile)); // Dispatch login action
      navigate('/Recipe-Book/home'); // Navigate to the home page
    }
  };

  const togglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const { username, password, errors, submitted, loginStatus } = state;

  return (
    <div className="container">
      <div className="loginStatus">
        {submitted && loginStatus.length > 0 && <span className='error'>{loginStatus}</span>}
      </div>
      <div className="loginForm">
        <form>
          <div className="mt-2">
            <input
              type="text"
              value={username}
              name="username"
              onChange={inputChange}
              className="form-control"
              placeholder="User Name"
            />
            {submitted && errors.username.length > 0 && <span className='error'>{errors.username}</span>}
          </div>

          <div className="mt-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="on"
              name="password"
              onChange={inputChange}
              className="form-control"
              placeholder="Password"
            />
            <i onClick={togglePassword} className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            {submitted && errors.password.length > 0 && <span className='error'>{errors.password}</span>}
          </div>

          <div className="display-flex mt-4">
            <button type="submit" className="button" onClick={loginForm}>Login</button>
            <Link to="/Recipe-Book/register">Register</Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;