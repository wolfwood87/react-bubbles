import React, { useState } from "react";

import axios from 'axios';


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [cred, setCred] = useState({username: '', password: ''})
  const [load, setLoad] = useState(false);


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
          <input
            type='text'
            name='username'
            placeholder='Username'
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            />
            <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
