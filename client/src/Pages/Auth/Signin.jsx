import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";

import axios from "axios";
import './auth.css'

import { toast, } from 'react-toastify'
import { Oval } from 'react-loader-spinner';

const LoginForm = ({ closeSlide }) => {



  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  // const [test, setTest] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9010/user/signin", formData, {
        withCredentials: true,
      });
      if (response.data.message) {
        console.log("Response from server : " + response.data.message)
        toast.success('Login Successful')
        setTimeout(() => {
          navigate('/')
          closeSlide()
        }, 1500);
        setIsLoading(false)
      }

    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  };

  function showpassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }



  return (

    <div className="signinpage">

      <div>
        <div className="authbox">
          {/* <div className="crossicon">
            <svg onClick={handlecross} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="cross">
              <path d="M31.5,2.42828c0-0.51752-0.20148-1.00427-0.56763-1.36987c-0.73224-0.73224-2.00751-0.73224-2.73975,0L16,13.25104L3.80737,1.05841c-0.73224-0.73224-2.00751-0.73224-2.73975,0C0.70154,1.42401,0.5,1.91077,0.5,2.42828c0,0.51746,0.20154,1.00421,0.56763,1.36987l12.19263,12.19263L1.06763,28.18341C0.70154,28.54901,0.5,29.03577,0.5,29.55328c0,0.51746,0.20154,1.00421,0.56763,1.36987c0.73224,0.73224,2.00751,0.73224,2.73975,0L16,18.73053l12.19263,12.19263c0.36615,0.36609,0.85242,0.56763,1.36987,0.56763c0.51752,0,1.00378-0.20154,1.36987-0.56763C31.29852,30.5575,31.5,30.07074,31.5,29.55328c0-0.51752-0.20148-1.00427-0.56763-1.36987L18.73975,15.99078L30.93237,3.79816C31.29852,3.4325,31.5,2.94574,31.5,2.42828z"></path>
            </svg>
          </div> */}
          <form id="signinform" onSubmit={handleSubmit}>
            <div id="signinforminsidediv">

              <h1 id="signinheading">SIGN IN</h1>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username......"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password......"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="checkboxes">
                <div id="showpassword"><input type="checkbox" onClick={showpassword} />Show Password</div>

                <div id="checkbox">
                  <input type="checkbox" id="checkboxpolicy" name="checkbox" required />
                  <label htmlFor="checkbox">Accept terms & policy of the company.</label>
                </div>
              </div>

              <button id="signinbutton" disabled={isLoading} type="submit">
                {isLoading ? (
                  <Oval type="Oval" color="#ffffff" height={30} width={30} strokeWidth={7}
                    secondaryColor="#ffffff95"
                    ariaLabel="oval-loading" />
                ) : (
                  'SIGN IN'
                )}
              </button>
            </div>

           

            <div className="signup">
              <p>new user ? <Link id="signup" to='/signup'>signup here</Link></p>
            </div>
          </form>
          
          <div className="line"></div>
          <div onClick={() => loginWithRedirect()} id='signin'>Login with
              <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google">
                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
              </svg>
            </div>
          {/* <button id="test" disabled={test}> 
                {test ? (
                  <Oval type="Oval" color="#ffffff" height={30} width={30} strokeWidth={7} 
                  secondaryColor="#ffffff95" 
                  ariaLabel="oval-loading" />
                ) : (
                  'SIGN IN'
                )}
                </button> */}
        </div>


      </div>

    </div>
  );
};

export default LoginForm;
