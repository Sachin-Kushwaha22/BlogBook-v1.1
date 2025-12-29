import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import './Footer.css'
import { toast, } from 'react-toastify'
import { Oval } from 'react-loader-spinner';

function footer() {
    const navigate = useNavigate()

    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [error, setError] = useState('')

    function handlefeedbackchange(e) {
        e.preventDefault()
        setFeedback(e.target.value);
    }

    const handlefeedbacksubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (isAuthenticated && user) {
            try {
                const response = await axios.post('https://blogbook-v1-backend.onrender.com/feedback', { userid: user.sub, feedback: feedback }, {
                    withCredentials: true,
                })
                // console.log(response.data);
                if (response.data.message) {
                    toast('Feedback Send')
                }
                setTimeout(() => {
                    setFeedback('')
                    setLoading(false)
                }, 1000);
            } catch (error) {
                setError(error)
                // console.log(error);
                toast.error('An unexpected error occur. Try again')
                setLoading(false)

            }
        }
        else {
            toast.error('Please login to send feedback')
            loginWithRedirect()
            setLoading(false)
        }

    }


    return (
        <div className='footer'>

            <div className='footer-inside'>
                <div className='logopart'>
                    <div id='logo' className='logo-footer'>BLOGBOOK</div>
                    <p id='copyright'>Copyright © BLOGBOOK, Inc</p>
                </div>
                <div className='contact-about'>
                    <div className='contactus'>
                        <h2 className='contactheading underline'>Contact Us</h2>
                        <div className='email-phone'>


                            <div className='phone-box'>
                                <svg className='colorinvert' id='phone' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"></path>
                                </svg>
                                <p className='underline'>123-456-7890</p>
                            </div>

                            <div className='email-box'>
                                <svg className='colorinvert' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="email">
                                    <path d="M34.05 50 9 66.31V33.69L34.05 50zm31.9 0L91 66.31V33.69L65.95 50zm-3.66 2.39-11.2 7.29c-.33.21-.71.32-1.09.32s-.76-.11-1.09-.32l-11.2-7.29L10.66 70l-1.57 1.02C9.58 73.84 12.04 76 15 76h70c2.96 0 5.42-2.15 5.91-4.98L89.33 70 62.29 52.39zM50 55.61 89.33 30l1.58-1.02C90.42 26.15 87.96 24 85 24H15c-2.96 0-5.42 2.16-5.91 4.98L10.66 30 50 55.61z"></path>
                                </svg>
                                <p className='underline'>sachin2219n@gmail.com</p>
                            </div>

                        </div>
                        <div className='socialmedialogo'>
                            <a href='https://www.instagram.com/itz_sachinn/' target="_blank" rel="noopener noreferrer">
                                <svg className='sociallogo colorinvert' id='instagram' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                                </svg>
                            </a>

                            <a href='https://www.linkedin.com/in/sachin-kushwaha-245055258' target="_blank" rel="noopener noreferrer">
                                <svg id='linkedin' className='sociallogo colorinvert' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                    <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M7.738,17L7.738,17 c-0.697,0-1.262-0.565-1.262-1.262v-4.477C6.477,10.565,7.042,10,7.738,10h0C8.435,10,9,10.565,9,11.262v4.477 C9,16.435,8.435,17,7.738,17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2 S8.551,8.717,7.694,8.717z M16.779,17L16.779,17c-0.674,0-1.221-0.547-1.221-1.221v-2.605c0-1.058-0.651-1.174-0.895-1.174 s-1.058,0.035-1.058,1.174v2.605c0,0.674-0.547,1.221-1.221,1.221h-0.081c-0.674,0-1.221-0.547-1.221-1.221v-4.517 c0-0.697,0.565-1.262,1.262-1.262h0c0.697,0,1.262,0.565,1.262,1.262c0,0,0.282-1.262,2.198-1.262C17.023,10,18,10.977,18,13.174 v2.605C18,16.453,17.453,17,16.779,17z"></path>
                                </svg>
                            </a>

                            <a href='https://twitter.com/Sachin_K2219' target="_blank" rel="noopener noreferrer">
                                <svg id='x' className='sociallogo colorinvert' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                    <path d="M 2.8671875 3 L 9.7363281 12.818359 L 2.734375 21 L 5.3808594 21 L 10.919922 14.509766 L 15.460938 21 L 21.371094 21 L 14.173828 10.697266 L 20.744141 3 L 18.138672 3 L 12.996094 9.0097656 L 8.7988281 3 L 2.8671875 3 z"></path>
                                </svg>
                            </a>

                            <a href='https://github.com/Sachin-Kushwaha22' target="_blank" rel="noopener noreferrer">
                                <svg className='sociallogo colorinvert' id='github' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z"></path>
                                </svg>
                            </a>

                        </div>
                    </div>
                <div className='aboutsection'>
                    <div>
                        <h2 className='aboutusheading underline'>About Us</h2>
                        <ul className='aboutuslist '>
                            <li className='underline' style={{cursor:'pointer'}} onClick={() => window.open("https://github.com/Sachin-Kushwaha22/")}>Creator</li>
                            <li className='underline'>Designer</li>
                            <li className='underline'>Location</li>
                            <li className='underline'>Authors</li>
                        </ul>
                    </div>
                </div>
                </div>
                <div>
                    <div >
                        <form onSubmit={handlefeedbacksubmit} className='feedback'>
                            <p className='feedbackheading underline'>GIVE US FEEDBACK</p>
                            <textarea required id='feedback-box' placeholder='Write here.....' rows="6" value={feedback} onChange={handlefeedbackchange}></textarea>
                            <button id='feedback-button' type='submit' disabled={loading}>
                                {loading ? (
                                    <Oval type="Oval" color="#ffffff" height={30} width={30} strokeWidth={7}
                                        secondaryColor="#ffffff95"
                                        ariaLabel="oval-loading" />
                                ) : (
                                    'SUBMIT'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default footer
