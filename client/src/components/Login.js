import React, { useState } from "react";

import axios from 'axios';


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [cred, setCred] = useState({username: '', password: ''})
  // const [load, setLoad] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    setCred({
      ...cred,
      [e.target.name]: e.target.value
    })
  };

  const login = e => {
    e.preventDefault();
    setTimeout(() => {console.log('Loading');
    axios
        .post('http://localhost:5000/api/login', cred)
        .then(res => {
          console.log('bk: Login.js: Login: login: res: ', res)
          localStorage.setItem('token', res.data.payload)
          props.history.push('/bubble-page')
        })
        .catch(err => {console.log(err.message)})
  })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login} className="login-form">
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={cred.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={cred.password}
            onChange={handleChange}
            />
            <button className="login-button">Log In</button>
      </form>
    </>
  );
};

export default Login;
