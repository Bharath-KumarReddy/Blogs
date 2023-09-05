import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import './LoginPage.css'; // Import your custom CSS file
import {ToastContainer , toast} from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
    //   alert('Wrong credentials or user must register');
    toast.error('Wrong credentials OR user must register', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
  
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="login-container">
        <ToastContainer/>
      <form className="login-form" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button>Login</button>
        <p  style={{marginTop:"10px"}}>Don't had an account ? <span style={{color:"blue"}}><Link to="/register">Register</Link></span></p>
      </form>
    </div>
  );
}
