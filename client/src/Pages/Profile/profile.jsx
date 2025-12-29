import react, { useEffect, useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import './profile.css'

const UserProfile = () => {
    const navigate = useNavigate()
    const { isAuthenticated, user, logout } = useAuth0()
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // if (isAuthenticated && user) {
        //     localStorage.setItem('picture', user.picture)
        //  } else {
        //      localStorage.removeItem('picture')
        //  }
        // console.log(localStorage.getItem('picture'));

    }, [])

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('#profileimg')) {
            setShowDropdown(false);
        }
    };
    document.addEventListener('click', handleOutsideClick);

    const handleSignOutGoogle = async () => {
        logout({ logoutParams: { returnTo: window.location.origin } })
        // try {
        //     const response = await axios.post('https://blogbook-v1-backend.onrender.com/google/user/signout', {}, {
        //         withCredentials: true
        //     })

        //     // console.log('response from logout function ', response.data);
        //     logout({ logoutParams: { returnTo: window.location.origin } })

        // } catch (error) {
        //     // console.log('error from logout function react ', error);
        // }
    }



    return (

            <div id='profilelogo' onClick={toggleDropdown}>

                <img id='profileimg' src={localStorage.getItem('picture')} alt="UserProfile" />
                {/* {userProfile && (<img id='profileimg' onClick={toggleDropdown} src={localStorage.getItem('picture')} alt="UserProfile" />)} */}

                {showDropdown && (
                    <div className="dropdown-menu">
                        <p onClick={() => navigate('/user/dashboard')} id='dashboard'>
                            <svg id='profilelogosvgs' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z" fill="currentColor"></path><path d="M10.9684 14.0022C11.1062 14.537 10.7843 15.0823 10.2495 15.22C7.46676 15.9369 5.5 18.2894 5.5 20.9999C5.5 21.5522 5.05228 21.9999 4.5 21.9999C3.94772 21.9999 3.5 21.5522 3.5 20.9999C3.5 17.2714 6.1909 14.2002 9.75054 13.2833C10.2854 13.1455 10.8306 13.4674 10.9684 14.0022Z" fill="currentColor"></path><path d="M17.25 15.625C17.25 16.5225 16.5225 17.25 15.625 17.25C14.7275 17.25 14 16.5225 14 15.625C14 14.7275 14.7275 14 15.625 14C16.5225 14 17.25 14.7275 17.25 15.625Z" fill="currentColor"></path><path d="M21.75 15.625C21.75 16.5225 21.0225 17.25 20.125 17.25C19.2275 17.25 18.5 16.5225 18.5 15.625C18.5 14.7275 19.2275 14 20.125 14C21.0225 14 21.75 14.7275 21.75 15.625Z" fill="currentColor"></path><path d="M21.75 20.125C21.75 21.0225 21.0225 21.75 20.125 21.75C19.2275 21.75 18.5 21.0225 18.5 20.125C18.5 19.2275 19.2275 18.5 20.125 18.5C21.0225 18.5 21.75 19.2275 21.75 20.125Z" fill="currentColor"></path><path d="M17.25 20.125C17.25 21.0225 16.5225 21.75 15.625 21.75C14.7275 21.75 14 21.0225 14 20.125C14 19.2275 14.7275 18.5 15.625 18.5C16.5225 18.5 17.25 19.2275 17.25 20.125Z" fill="currentColor"></path></svg>
                            Dashboard</p>
                        {/* <div className='linegap'></div> */}
                        <p id='setting'>
                            <svg id='profilelogosvgs' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M11.5677 3.5C11.2129 3.5 10.8847 3.68789 10.7051 3.99377L9.89391 5.37524C9.3595 6.28538 8.38603 6.84786 7.3304 6.85645L5.73417 6.86945C5.3794 6.87233 5.0527 7.06288 4.87559 7.3702L4.43693 8.13135C4.2603 8.43784 4.25877 8.81481 4.43291 9.12273L5.22512 10.5235C5.74326 11.4397 5.74326 12.5603 5.22512 13.4765L4.43291 14.8773C4.25877 15.1852 4.2603 15.5622 4.43693 15.8687L4.87559 16.6298C5.0527 16.9371 5.3794 17.1277 5.73417 17.1306L7.33042 17.1436C8.38605 17.1522 9.35952 17.7146 9.89393 18.6248L10.7051 20.0062C10.8847 20.3121 11.2129 20.5 11.5677 20.5H12.4378C12.7926 20.5 13.1208 20.3121 13.3004 20.0062L14.1116 18.6248C14.646 17.7146 15.6195 17.1522 16.6751 17.1436L18.2714 17.1306C18.6262 17.1277 18.9529 16.9371 19.13 16.6298L19.5687 15.8687C19.7453 15.5622 19.7468 15.1852 19.5727 14.8773L18.7805 13.4765C18.2623 12.5603 18.2623 11.4397 18.7805 10.5235L19.5727 9.12273C19.7468 8.81481 19.7453 8.43784 19.5687 8.13135L19.13 7.3702C18.9529 7.06288 18.6262 6.87233 18.2714 6.86945L16.6751 6.85645C15.6195 6.84786 14.646 6.28538 14.1116 5.37524L13.3004 3.99377C13.1208 3.68788 12.7926 3.5 12.4378 3.5H11.5677ZM8.97978 2.98131C9.5186 2.06365 10.5033 1.5 11.5677 1.5H12.4378C13.5022 1.5 14.4869 2.06365 15.0257 2.98131L15.8369 4.36278C16.015 4.66616 16.3395 4.85365 16.6914 4.85652L18.2877 4.86951C19.352 4.87818 20.3321 5.4498 20.8635 6.37177L21.3021 7.13292C21.832 8.05239 21.8366 9.18331 21.3142 10.1071L20.522 11.5078C20.3493 11.8132 20.3493 12.1868 20.522 12.4922L21.3142 13.893C21.8366 14.8167 21.832 15.9476 21.3021 16.8671L20.8635 17.6282C20.3321 18.5502 19.352 19.1218 18.2877 19.1305L16.6914 19.1435C16.3395 19.1464 16.015 19.3339 15.8369 19.6372L15.0257 21.0187C14.4869 21.9363 13.5022 22.5 12.4378 22.5H11.5677C10.5033 22.5 9.5186 21.9363 8.97978 21.0187L8.16863 19.6372C7.99049 19.3339 7.666 19.1464 7.31413 19.1435L5.71789 19.1305C4.65357 19.1218 3.67347 18.5502 3.14213 17.6282L2.70347 16.8671C2.17358 15.9476 2.16899 14.8167 2.6914 13.893L3.48361 12.4922C3.65632 12.1868 3.65632 11.8132 3.48361 11.5078L2.6914 10.1071C2.16899 9.18331 2.17358 8.05239 2.70347 7.13292L3.14213 6.37177C3.67347 5.4498 4.65357 4.87818 5.71789 4.86951L7.31411 4.85652C7.66599 4.85366 7.99048 4.66616 8.16862 4.36278L8.97978 2.98131Z" fill="currentColor"></path><path d="M12.0028 10.5C11.1741 10.5 10.5024 11.1716 10.5024 12C10.5024 12.8284 11.1741 13.5 12.0028 13.5C12.8315 13.5 13.5032 12.8284 13.5032 12C13.5032 11.1716 12.8315 10.5 12.0028 10.5ZM8.50178 12C8.50178 10.067 10.0692 8.5 12.0028 8.5C13.9364 8.5 15.5038 10.067 15.5038 12C15.5038 13.933 13.9364 15.5 12.0028 15.5C10.0692 15.5 8.50178 13.933 8.50178 12Z" fill="currentColor"></path></svg>
                            Setting</p>
                        <div className='linegap'></div>
                        <p onClick={() => {
                            if(isAuthenticated && user.email){
                                window.location.href = `https://accounts.google.com/AccountChooser?Email=${user.email}&continue=https://myaccount.google.com/`
                            }else toast.info('Request Failed! Try Again')
                        }} id='manageacc'>

                            <svg id="profilelogosvgs" className='profilelogosvgs' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                                <path d="M13.9201,6h-6.9201v2h4.89893c-0.464661,2.2793 -2.4845,4 -4.89893,4c-2.75684,0 -5,-2.24316 -5,-5c0,-2.75684 2.24316,-5 5,-5c1.12341,0 2.15027,0.385986 2.98602,1.01398l1.43512,-1.43512c-1.20636,-0.985657 -2.74542,-1.57886 -4.42114,-1.57886c-3.85986,0 -7,3.14062 -7,7c0,3.85938 3.14014,7 7,7c3.51947,0 6.43225,-2.61377 6.9201,-6c0.0471802,-0.327515 0.079895,-0.659607 0.079895,-1c0,-0.340393 -0.0327148,-0.672485 -0.079895,-1Z" transform="translate(1 1)"></path>
                            </svg>
                            Manage Google Account</p>
                        <p id='aboutusprofilelogo' >
                            <svg id='profilelogosvgs' className='adminpanelsvg' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
                                <g>
                                    <path d="M22.3,16.7l1.4-1.4L20,11.6l-5.8,5.8c-0.5-0.3-1.1-0.4-1.7-0.4C10.6,17,9,18.6,9,20.5s1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5   c0-0.6-0.2-1.2-0.4-1.7l1.9-1.9l2.3,2.3l1.4-1.4l-2.3-2.3l1.1-1.1L22.3,16.7z M12.5,22c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5   s1.5,0.7,1.5,1.5S13.3,22,12.5,22z" />
                                    <path d="M2,19c0-3.9,3.1-7,7-7c2,0,3.9,0.9,5.3,2.4l1.5-1.3c-0.9-1-1.9-1.8-3.1-2.3C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6   S3,2.7,3,6c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h8v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z" />
                                </g>
                            </svg>
                            Admin Panel</p>
                        <div className='linegap'></div>
                        <p onClick={handleSignOutGoogle}>
                            <svg id='profilelogosvgs' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H10C10.5523 20 11 20.4477 11 21C11 21.5523 10.5523 22 10 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H10C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4H6ZM15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929L17.5858 13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H17.5858L15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289Z" fill="currentColor"></path></svg>
                            Logout
                        </p>
                    </div>
                )}

            </div>

    )
}

export default UserProfile
