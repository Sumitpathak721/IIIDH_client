import React, { useEffect} from 'react'; // Import useState for controlled inputs 
import { useAuth } from '../context/auth.js'; // Import the useAuth hook
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

function Login() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const jsonData = {
          email:event.target.email.value,
          password:event.target.password.value
        }
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const {data} = await axios.post(process.env.REACT_APP_API_KEY+'/user/login', JSON.stringify(jsonData),config);
        console.log(data);
    
        if (data.success){
          toast.success(data.message);
          setAuth(data.token);
          navigate("/")
        }else{
          toast.error(data.message);
        }
        
      }
    if(auth) return <Navigate to="/" replace/>
    
    return (    

        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email"/>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password"/>
                <button type="submit">Log in</button>
            </form>
            <p>New on our platform? <Link to={"/register"}>Create an account</Link></p>
        </div>
        
        );
}

export default Login