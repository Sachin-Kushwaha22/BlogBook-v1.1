import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Footer from '../Home/Footer'
import './auth.css'
import { toast, } from 'react-toastify'
import { Oval } from 'react-loader-spinner';

function SignUp() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("");
    const [agemessage, setAgeMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [mainPasswordMessage, setMainPasswordMessage] = useState("");
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        age: "",
        email: "",
        username: "",
        password: "",
    })

    function handleMultipleOnChange(event) {
        // Call the first function
        handleformdata(event);

        // Call the second function
        handleageinput(event);

        // Add more functions as needed
        handleconfirmpassword(event)
    }

    const handleformdata = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handlesignup(e) {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9010/user/signup", formData, {
                withCredentials: true,
            });
            if (response.data.message) {
                console.log("Response from server : " + response.data.message)
                toast.success('Account created Successfully')
                setTimeout(() => {
                    navigate('/signin')
                    setLoading(false)
                }, 1000);
            }

        } catch (error) {
            console.error("Error signing up:", error.response?.data || error.message);
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    function showpassword() {
        const passwordInput1 = document.getElementById('signuppassword1');
        const passwordInput2 = document.getElementById('signuppassword2');
        if (passwordInput1.type === "password" && passwordInput2.type === "password") {
            passwordInput1.type = "text";
            passwordInput2.type = "text";
        } else {
            passwordInput1.type = "password";
            passwordInput2.type = "password";
        }
    }

    function handleconfirmpassword(event) {

        const passwordInput1 = document.getElementById('signuppassword1');
        const passwordInput2 = document.getElementById('signuppassword2');
        const messagecheck = document.getElementsByClassName('confirmpasswordcheck')[0];
        setMessage('')

        if (event.target === passwordInput1) {
            setMainPasswordMessage('')
            if (passwordInput1.value.length < 8 || passwordInput1.value.length > 50) {
                setMainPasswordMessage('Password must be between 8 and 50 characters')
            }
        }
        if (event.target === passwordInput2) {
            if (passwordInput2.value === "") {
                setMessage("Cannot leave empty")
            } else {
                setTimeout(() => {
                    if (passwordInput2.value !== passwordInput1.value) {
                        setMessage(
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="cross-alert">
                                    <g>
                                        <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"></path>
                                        <path d="M22.71 9.29a1 1 0 0 0-1.42 0L16 14.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L17.41 16l5.3-5.29a1 1 0 0 0 0-1.42Z"></path>
                                    </g>
                                </svg>
                                {'Wrong Password'}
                            </>)
                    } else {
                        setMessage('')
                    }
                }, 1000);
            }

        }

    }

    function handleageinput(event) {
        const ageInput = document.getElementById('age');
        setMessage('')

        if (event.target === ageInput) {
            const ageValue = Number(ageInput.value);
            setTimeout(() => {
                if (ageInput.value < 15 || ageInput.value > 100 || isNaN(ageValue)) {
                    setAgeMessage('Invalid age limit')
                } else {
                    setAgeMessage('')
                }
            }, 1000);
        }
    }

    function handleAgeBlur() {
        const ageInput = document.getElementById('age');
        if (ageInput.value === "") {
            setAgeMessage('');
        }
    }

    function handleemailinput() {
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value
        setEmailMessage('')
        if (emailInput.value === "") {
            setEmailMessage("")
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            setEmailMessage('Invalid email')
        }
    }

    function handlemainpassword() {
        const passwordInput = document.getElementById('signuppassword1');
        const passwordValue = passwordInput.value;
        setMainPasswordMessage('')
        if (passwordValue.length < 8 || passwordValue.length > 50) {
            setMainPasswordMessage(<>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="cross-alert">
                    <g>
                        <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"></path>
                        <path d="M22.71 9.29a1 1 0 0 0-1.42 0L16 14.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L17.41 16l5.3-5.29a1 1 0 0 0 0-1.42Z"></path>
                    </g>
                </svg>
                {'Password must be between 8 to 50 characters'}
            </>)
        }
    }



    return (
        <>
            <div className="signuppage">
                <div>
                    <div>
                        <div className="formcontainer">
                            <form id="signupform" onSubmit={handlesignup}>
                                <div className="signupformheader">
                                    <h1>SIGN UP </h1>
                                    <h3>FILL THE DETAILS</h3>
                                </div>

                                <div className="signupformfullname">
                                    <label >FIRST NAME</label>
                                    <input type="text" name="firstname" value={formData.firstname} onChange={handleformdata} placeholder="ex. Sachin" required />
                                    <label>LAST NAME</label>
                                    <input type="text" name="lastname" value={formData.lastname} onChange={handleformdata} placeholder="ex. Kushwaha" required />
                                </div>

                                <div className="ageandemail">
                                    <label>AGE </label>
                                    <input onBlur={handleAgeBlur} value={formData.age} onChange={handleMultipleOnChange} id="age" type="text" onInput="this.value = this.value.replace(/[^0-9]/g, '');" name="age" placeholder="ex. 19" required />
                                    <p className="agecheck">{agemessage}</p>
                                    <label>EMAIL </label>
                                    <input onBlur={handleemailinput} id="emailsignup" type="email" name="email" value={formData.email} onChange={handleformdata} placeholder="ex. sachinkushwaha@gmail.com" required />
                                    <p>{emailMessage}</p>
                                </div>
                                <div className="usernamepassword">
                                    <label htmlFor="username">CREATE USERNAME  </label>
                                    <input id="usernamesignup" type="text" name="username" value={formData.username} onChange={handleformdata} placeholder=" " required />
                                    <div className="passwordbigdiv">
                                        <div className="passwordsectionsignup">
                                            <div className="createpassword">
                                                <label htmlFor="password">CREATE PASSWORD </label>
                                                <div className="mainpasswordmessageincludebox">
                                                    <input onBlur={handlemainpassword} id="signuppassword1" onChange={handleMultipleOnChange} type="password" name="password" value={formData.password} placeholder=" " required />
                                                    <p style={{ margin: '2px', height: '40px', fontSize: '.85rem' }}>{mainPasswordMessage}</p>
                                                </div>
                                            </div>
                                            <div className="confirmpassword">
                                                <label htmlFor="confirmpassword">CONFIRM PASSWORD </label>
                                                <input id="signuppassword2" onChange={handleconfirmpassword} type="password" name="confirmpassword" required />
                                                <p className="confirmpasswordcheck">{message}</p>

                                            </div>

                                        </div>
                                        <div className="showpassworddiv">
                                            <input type="checkbox" name="showpassword" onClick={showpassword} />
                                            <label htmlFor="showpassword">Show Password</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="signuppolicy">
                                    <input id="signuppolicy" type="checkbox" name="signuppolicy" required />
                                    <label>
                                        <h4>Terms and Conditions</h4>
                                        By signing up, you agree to our Terms and Conditions. You are responsible for the content you post, and it must comply with our guidelines. We value your privacy and handle your data as outlined in our Privacy Policy. Violation of these terms may result in account suspension.
                                        <a href="/companypolicy"></a>
                                    </label>

                                </div>
                                <button id="signupbutton" type="submit" disabled={loading}>
                                    {loading ? (
                                        <Oval type="Oval" color="#ffffff" height={40} width={40} strokeWidth={7}
                                            secondaryColor="#ffffff95"
                                            ariaLabel="oval-loading" />
                                    ) : (
                                        'CREATE ACCOUNT'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default SignUp