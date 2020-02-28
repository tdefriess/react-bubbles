import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })  
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        console.log('Login:', res.data.payload);
        window.localStorage.setItem('Token', res.data.payload);
        props.history.push('/bubble-page')
      })
      .catch(err => console.log('Login error:', err));
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type='text'
          name='password'
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
