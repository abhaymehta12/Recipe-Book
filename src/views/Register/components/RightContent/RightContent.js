import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionCreators } from '../../../../actions/profile';
import { isValidEmail, setStore } from '../../../../utils';
import './style.css';
import { Link } from 'react-router-dom';

const RightContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    loggedin: false,
    recipeList: [],
    subscribenewsletter: true,
  });

  const [errors, setErrors] = useState({
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    resetErrorMsg();
  }, []);

  // Validate a single field
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 1 ? 'Enter Name' : '';
      case 'email':
        return isValidEmail(value.trim()) ? '' : 'Email is not valid!';
      case 'telephone':
        return value.trim().length < 1 || value.trim().length > 10 ? 'Enter valid telephone number' : '';
      case 'username':
        return value.trim().length < 1 ? 'Enter Username' : '';
      case 'password':
        return value.trim().length < 5 ? 'Password should be at least 5 characters' : '';
      default:
        return '';
    }
  };

  // Handle input changes
  const inputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Handle checkbox change
  const checkboxChange = (event) => {
    const { name, checked } = event.target;
    setUser({ ...user, [name]: checked });
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {
      name: validateField('name', user.name),
      email: validateField('email', user.email),
      telephone: validateField('telephone', user.telephone),
      username: validateField('username', user.username),
      password: validateField('password', user.password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  // Handle form submission
  const submitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setStore('user', user);
      dispatch(ActionCreators.formSubmittionStatus(true));
      dispatch(ActionCreators.login(user));
      alert('Congratulation your profile Completed successfully!');
      navigate('/Recipe-Book/login');
    }
  };

  // Reset error messages
  const resetErrorMsg = () => {
    setErrors({
      name: '',
      telephone: '',
      email: '',
      username: '',
      password: '',
    });
  };

  // Display error message
  const displayError = (field) => {
    return submitted && errors[field] ? <span className="error errorPosition">{errors[field]}</span> : null;
  };

  const togglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="rightPanel">
      <div>
        <input
          type="text"
          value={user.name}
          name="name"
          onChange={inputChange}
          className="form-control"
          placeholder="Name*"
        />
        {displayError('name')}
      </div>

      <div className="mt-4">
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={inputChange}
          className="form-control"
          placeholder="abc@gmail.com"
        />
        {displayError('email')}
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={user.telephone}
          name="telephone"
          onChange={inputChange}
          className="form-control"
          placeholder="(+91)9810-1000*"
        />
        {displayError('telephone')}
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={user.username}
          name="username"
          onChange={inputChange}
          className="form-control"
          placeholder="Username*"
        />
        {displayError('username')}
      </div>

      <div className="mt-4">
        <input
          type={showPassword ? "text" : "password"}
          value={user.password}
          name="password"
          onChange={inputChange}
          className="form-control"
          placeholder="Password*"
        />
        <i onClick={togglePassword} className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        {displayError('password')}
      </div>

      <div className="mt-3">
        <label htmlFor="subscribenewsletter">
          <input
            type="checkbox"
            checked={user.subscribenewsletter}
            name="subscribenewsletter"
            onChange={checkboxChange}
            id="subscribenewsletter"
            style={{ margin: '10px' }}
          />
          Subscribe to the newsletter
        </label>
      </div>

      <div className="display-flex mt-1">
        <button type="button" className="button" onClick={submitForm}>
          Submit
        </button>
        <Link to="/Recipe-Book/login">Login</Link>
      </div>
    </div>
  );
};

export default RightContent;