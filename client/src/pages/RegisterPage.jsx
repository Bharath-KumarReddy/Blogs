import {useState} from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const naviagte = useNavigate();
  async function register(ev) {
    ev.preventDefault();
    if(username===''){
        toast.error('Registration failed', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
    }else if(password === ''){
        toast.error('Registration failed', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
    } else {

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
        toast.success('Registration successful', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
    
    naviagte('/login');
    } else {
    //   alert('registration failed');
    toast.error('Registration failed', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
}
  }
  return (
    <form className="register" onSubmit={register}>
         <ToastContainer />
      <h1>Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
      <p  style={{marginTop:"10px"}}>Already had an account ? <span style={{color:"blue"}} ><Link to="/login">Login</Link></span></p>
    </form>
  );
}