import react, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserDashBoard.css'
import { toast } from 'react-toastify'
import { useAuth0 } from '@auth0/auth0-react'
import config from '../../../config'
import axios from 'axios'
import numeral from 'numeral';


function UserDashBoard() {
    const navigate = useNavigate('')
    const { isAuthenticated, user } = useAuth0()
    const [userData, setUserData] = useState()
    const [blogData, setBlogData] = useState([])
    const [commentsData, setCommentsData] = useState([])
    const [isAuth, setIsAuth] = useState(false)
    const [isVisible, setIsVisible] = useState(window.matchMedia("(max-width: 768px)").matches)
    const [newComment, setNewComment] = useState([])
    const [deleteConfirmationPopup, setDeleteConfirmationPopup] = useState(false)

    const checkUserAuth = async () => {
        try {

            const response = await axios.get(`${config.serverUrl}/user/api/checkAuth`, {
                withCredentials: true
            })

            if (response.status == 200) {
                setUserData(user)
                setIsAuth(true)
            }

        } catch (error) {
            console.log("error generated from user dashboard checkUserAuth func", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message)
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.post(`${config.serverUrl}/post/user/viewblog`, { userid: user.sub }, {
                withCredentials: true
            });
            if (response.status == 200) {
                setBlogData(response.data);
            }

            const commentsResponse = await axios.post(`${config.serverUrl}/post/viewblog/comments`, { AuthorId: user.sub }, {
                withCredentials: true
            });
            if (commentsResponse.status == 200) {
                console.log("this is comment", commentsResponse.data);

                setCommentsData(commentsResponse.data);
                setNewComment(commentsResponse.data)
                console.log("new comment", newComment);
            }



        } catch (error) {
            console.log("error generated from user dashboard fetchData func", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message)
        }
    };

    useEffect(() => {
        // toast.info('User DashBoard Open')
        if (isAuthenticated && user) {
            checkUserAuth();
            fetchData();
        }


    }, [isAuthenticated, user])

    const handleLogout = async () => {

        try {
            const response = await axios.post(`${config.serverUrl}/user/api/logout`, null, {
                withCredentials: true,
            });

            if (response.status == 200) {
                setTimeout(() => {
                    toast.info("You are Logged Out")
                    navigate('/')
                }, 1500);
            }
        } catch (error) {
            console.log('Error from logout details:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message)
        }
    }


    function date(datedata) {
        const date = new Date(datedata);
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        });

        return formattedDate
    }

    function formatDateTime(timestamp) {
        const date = new Date(timestamp);

        // Get the day of the week (e.g., Monday, Tuesday)
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

        // Get the formatted date (e.g., 27 Oct, 2020)
        const formattedDate = date.toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        // Get the formatted time with AM/PM
        const formattedTime = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        const commentDate = `${dayOfWeek}, ${formattedDate}, ${formattedTime}`;
        return commentDate;

    }


    const handleSpecificComments = (blogid) => {

        setNewComment(commentsData.filter((comment) => comment.blogId === blogid))
        console.log(newComment);

    }

    const handleBlogDelete = async (id) => {
        try {
            // console.log(id)
            const blogDeleteResponse = await axios.post(`${config.serverUrl}/post/delete/blog/${id}`, {
                withCredentials: true
            })

            if (blogDeleteResponse.status == 200) {
                toast.success('Blog Deleted')
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
            console.log('error from handleBlogDelete func ', error.response?.data?.message || error.message);

        }
    }

    return (
        <>
            {isAuth &&
                (
                    <div className='userDashboard'>
                        <div className='ud-body'>


                            <div style={{ transform: !isVisible ? 'translateX(0)' : 'translateX(-100%)', animation: !isVisible ? 'slideIn 0.2s ease-out forwards' : 'slideOut 0.2s ease-out forwards', display: !isVisible ? 'flex' : 'flex' }} className="ud-sidebar">
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '10px 0' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="ud-svgs">
                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                            <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path>
                                        </svg>
                                        <h1 className='ud-sidebar-title'>Dashboard</h1>
                                    </div>
                                    <div className='ud-userProfile'>
                                        <img src={userData.picture} alt="userpic" />
                                    </div>
                                </div>

                                <div className="ud-sidebar-options">
                                    <div className='ud-options-list'>
                                        <div className='ud-option'>
                                            <svg id='ud-svgs2' xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" >
                                                <path d="M9.94513 2.25H14.0549C15.4225 2.24998 16.5248 2.24996 17.3918 2.36652C18.2919 2.48754 19.0497 2.74643 19.6517 3.34835C20.2536 3.95027 20.5125 4.70814 20.6335 5.60825C20.75 6.47522 20.75 7.57754 20.75 8.94513V15.8924C20.75 17.179 20.7501 18.2296 20.6366 19.0061C20.5224 19.7871 20.2572 20.5614 19.4836 20.9374C18.7099 21.3135 17.9372 21.0436 17.2525 20.6508C16.5719 20.2604 15.7458 19.6113 14.7342 18.8164L14.0079 18.2457C13.4003 17.7683 12.9961 17.4523 12.6603 17.2481C12.3419 17.0543 12.1574 17.0078 12 17.0078C11.8426 17.0078 11.6581 17.0543 11.3397 17.2481C11.0039 17.4523 10.5997 17.7683 9.99208 18.2458L9.26589 18.8163C8.25424 19.6112 7.42814 20.2604 6.74748 20.6508C6.06284 21.0436 5.29011 21.3135 4.51644 20.9374C3.74277 20.5614 3.47757 19.7871 3.36342 19.0061C3.24994 18.2296 3.24997 17.179 3.25 15.8924L3.25 8.94513C3.24998 7.57754 3.24996 6.47522 3.36652 5.60825C3.48754 4.70814 3.74644 3.95027 4.34835 3.34835C4.95027 2.74643 5.70814 2.48754 6.60825 2.36652C7.47522 2.24996 8.57754 2.24998 9.94513 2.25ZM6.80812 3.85315C6.07435 3.9518 5.68577 4.13225 5.40901 4.40901C5.13225 4.68577 4.9518 5.07435 4.85315 5.80812C4.75159 6.56347 4.75 7.56458 4.75 9V15.8276C4.75 17.1948 4.75196 18.1344 4.84766 18.7891C4.94458 19.4524 5.10153 19.554 5.17215 19.5884C5.24277 19.6227 5.41967 19.6833 6.00106 19.3497C6.57504 19.0205 7.31508 18.4415 8.3901 17.5968L9.10023 17.0389C9.66367 16.5961 10.1384 16.2231 10.56 15.9666C11.0077 15.6943 11.4657 15.5078 12 15.5078C12.5343 15.5078 12.9923 15.6943 13.44 15.9666C13.8617 16.2231 14.3364 16.5961 14.8998 17.0389L15.6099 17.5968C16.6849 18.4415 17.425 19.0205 17.9989 19.3497C18.5803 19.6833 18.7572 19.6227 18.8279 19.5884C18.8985 19.554 19.0554 19.4524 19.1523 18.7891C19.248 18.1344 19.25 17.1948 19.25 15.8276V9C19.25 7.56458 19.2484 6.56347 19.1469 5.80812C19.0482 5.07435 18.8678 4.68577 18.591 4.40901C18.3142 4.13225 17.9257 3.9518 17.1919 3.85315C16.4365 3.75159 15.4354 3.75 14 3.75H10C8.56459 3.75 7.56347 3.75159 6.80812 3.85315Z" />
                                            </svg>
                                            Dashboard
                                        </div>
                                        <div className='ud-option'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="ud-svgs2">
                                                <g>
                                                    <path d="M26 12h-2V8a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v12a1 1 0 0 0 2 0V8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v5a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3 1 1 0 0 0-2 0 5 5 0 0 0 5 5h16a5 5 0 0 0 5-5v-9a3 3 0 0 0-3-3Z"></path>
                                                    <path d="M11.5 14h4a2.5 2.5 0 0 0 0-5h-4a2.5 2.5 0 0 0 0 5zm0-3h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1zm0 12h9a2.5 2.5 0 0 0 0-5h-9a2.5 2.5 0 0 0 0 5zm0-3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1z"></path>
                                                </g>
                                            </svg>
                                            Blogs
                                        </div>
                                        <div className='ud-option'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="ud-svgs2">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"></path>
                                            </svg>
                                            Connections
                                        </div>
                                        <div className='ud-option'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="ud-svgs2">
                                                <path d="M30.92 1.62a1 1 0 0 0-.54-.54A1 1 0 0 0 30 1H26a1 1 0 0 0 0 2h1.59L26.23 4.36 21.74 9.75 16.45 7.11a1 1 0 0 0-1.16.19L9.9 12.74l-4.39-2.6a1 1 0 0 0-1.06 0l-3 2a1 1 0 0 0 1.1 1.66L5 12.18l4.52 2.68a1.06 1.06 0 0 0 .51.14 1 1 0 0 0 .71-.3L16.2 9.22l5.35 2.67a1 1 0 0 0 1.22-.25l4.94-5.93L29 4.41V6a1 1 0 0 0 2 0V2A1 1 0 0 0 30.92 1.62zM8 21H2a1 1 0 0 0-1 1v3H9V22A1 1 0 0 0 8 21zM1 30a1 1 0 0 0 1 1H8a1 1 0 0 0 1-1V27H1zM19 17H13a1 1 0 0 0-1 1v3h8V18A1 1 0 0 0 19 17zM12 30a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V27H12z"></path>
                                                <rect width="8" height="2" x="12" y="23"></rect>
                                                <rect width="8" height="2" x="23" y="23"></rect>
                                                <rect width="8" height="2" x="23" y="19"></rect>
                                                <path d="M23 30a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V27H23zM30 13H24a1 1 0 0 0-1 1v3h8V14A1 1 0 0 0 30 13z"></path>
                                            </svg>
                                            Earning
                                        </div>
                                        <div className='ud-option'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" id="ud-svgs2">
                                                <path d="M11 5H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2h-3a4.97 4.97 0 0 1 .9 2H18a1 1 0 0 1 0 2h-2.1a5.002 5.002 0 0 1-4.9 4h-.586l6.293 6.293a1 1 0 0 1-1.414 1.414l-8-8A1 1 0 0 1 8 11h3a3 3 0 0 0 2.829-2H6a1 1 0 0 1 0-2h7.829A3 3 0 0 0 11 5Z"></path>
                                            </svg>
                                            Billing
                                        </div>
                                        <div className='ud-option'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="ud-svgs2">
                                                <path d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 Z M8,10.5 C8.41421356,10.5 8.75,10.8357864 8.75,11.25 C8.75,11.6642136 8.41421356,12 8,12 C7.58578644,12 7.25,11.6642136 7.25,11.25 C7.25,10.8357864 7.58578644,10.5 8,10.5 Z M8,4.5 C9.1045695,4.5 10,5.3954305 10,6.5 C10,7.23053233 9.7882219,7.63969063 9.24604859,8.20790744 L8.98196082,8.47745399 C8.60450815,8.87101977 8.5,9.08310002 8.5,9.5 C8.5,9.77614237 8.27614237,10 8,10 C7.72385763,10 7.5,9.77614237 7.5,9.5 C7.5,8.76946767 7.7117781,8.36030937 8.25395141,7.79209256 L8.51803918,7.52254601 C8.89549185,7.12898023 9,6.91689998 9,6.5 C9,5.94771525 8.55228475,5.5 8,5.5 C7.44771525,5.5 7,5.94771525 7,6.5 C7,6.77614237 6.77614237,7 6.5,7 C6.22385763,7 6,6.77614237 6,6.5 C6,5.3954305 6.8954305,4.5 8,4.5 Z"></path>
                                            </svg>
                                            Help
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='ud-rightside-body'>
                                <div className="navbar-dimension"></div>
                                <div className='ud-navbar'>
                                    <p className='ud-navbar-greeting'>Hello {userData.name} 👋🏼,</p>
                                    <div onClick={() => setIsVisible(!isVisible)} className='menubutton'><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 16 16" id="ud-svgs2">
                                        <path d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z" />
                                        <path d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" />
                                        <path d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z" />
                                    </svg></div>
                                    <div className='ud-nav-buttons'>

                                        <p onClick={() => navigate(-1)} className='backbutton'><svg  id='ud-svgs2' xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>Back</p>
                                        <p className='logoutbutton' onClick={handleLogout}>LogOut<svg id='ud-svgs2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H10C10.5523 20 11 20.4477 11 21C11 21.5523 10.5523 22 10 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H10C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4H6ZM15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929L17.5858 13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H17.5858L15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289Z" fill="currentColor"></path></svg> </p>
                                    </div>
                                </div>

                                <div className="ud-analytics">
                                    <div className='ud-analytics-box'>
                                        <div className='svgbox'>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="ud-svgs3" enable-background="new 0 0 64 64" viewBox="0 0 64 64">
                                                <rect width="7.1" height="14.9" x="3.2" y="43.4" fill="#34afaa"></rect>
                                                <polygon fill="#fcd66f" points="19.4 33.6 22.9 36 22.9 58.3 15.7 58.3 15.7 36.9"></polygon>
                                                <polygon fill="#f7747e" points="31.9 42 35.3 39 35.3 58.3 28.2 58.3 28.2 39.6"></polygon>
                                                <polygon fill="#5dafd8" points="47.8 30.1 47.8 58.3 40.7 58.3 40.7 34.5 45 30.8 45.5 30.1"></polygon>
                                                <polygon fill="#445c6c" points="57.7 11.4 60.4 13.2 60.4 58.3 53.3 58.3 53.3 18.1"></polygon>
                                                <polygon fill="#e95c60" points="60.8 10.6 59.4 4.1 52.9 5.5 56 7.5 43.5 26.6 31.7 36.7 19.2 28.3 6.1 39.9 7.5 41.4 19.4 30.8 31.8 39.2 45 27.9 57.7 8.6"></polygon>
                                                <rect width="64" height="3" y="56.9" fill="#58717f"></rect>
                                            </svg>
                                        </div>
                                        <div className='analytics-databox'>
                                            <p className='databox-title'>Total Views</p>
                                            <p className='databox-number'>{numeral(blogData.reduce((acc, blog) => acc + blog.views, 0)).format('0.a').toUpperCase()}</p>
                                            <p className="databox-analytics-value">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="databox-arrow">
                                                    <path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"></path>
                                                </svg>
                                                <p>16%</p>this month
                                            </p>
                                        </div>
                                    </div>

                                    <div className="ud-linebreak"></div>

                                    <div className='ud-analytics-box'>
                                        <div className='svgbox'>
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px" version="1.1" id="ud-svgs3" viewBox="0 0 512 512" xml:space="preserve">
                                                <path style={{ fill: '#A5A5A5' }} d="M512,467.478L512,467.478C512,492.066,492.066,512,467.478,512H44.522  C19.933,512,0,492.066,0,467.478l0,0c0-24.588,19.933-44.522,44.522-44.522h422.957C492.066,422.957,512,442.89,512,467.478z" />
                                                <path style={{ fill: '#777777' }} d="M169.739,478.609c0,4.61-3.738,8.348-8.348,8.348H72.348c-4.61,0-8.348-3.738-8.348-8.348  s3.738-8.348,8.348-8.348h89.043C166.002,470.261,169.739,473.998,169.739,478.609z M439.652,470.261H272.696  c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h166.957c4.61,0,8.348-3.738,8.348-8.348S444.262,470.261,439.652,470.261  z M234.852,470.261h-1.113c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h1.113c4.61,0,8.348-3.738,8.348-8.348  S239.462,470.261,234.852,470.261z M200.348,470.261h-1.113c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h1.113  c4.61,0,8.348-3.738,8.348-8.348S204.958,470.261,200.348,470.261z" />
                                                <path style={{ fill: '#CCCAC4' }} d="M478.609,155.826v244.87c0,24.588-19.934,44.522-44.522,44.522H77.913  c-24.588,0-44.522-19.934-44.522-44.522v-244.87c0-24.588,19.933-44.522,44.522-44.522h356.174  C458.675,111.304,478.609,131.238,478.609,155.826z" />
                                                <path style={{ fill: '#F2EFE2' }} d="M434.087,422.957H77.913c-12.295,0-22.261-9.966-22.261-22.261v-244.87  c0-12.295,9.966-22.261,22.261-22.261h356.174c12.295,0,22.261,9.966,22.261,22.261v244.87  C456.348,412.99,446.382,422.957,434.087,422.957z" />
                                                <path style={{ fill: '#BFBBA3' }} d="M406.261,203.13H105.739c-9.22,0-16.696-7.475-16.696-16.696l0,0c0-9.22,7.475-16.696,16.696-16.696  h300.522c9.22,0,16.696,7.475,16.696,16.696l0,0C422.957,195.655,415.481,203.13,406.261,203.13z M244.87,244.87L244.87,244.87  c0-9.22-7.475-16.696-16.696-16.696H105.739c-9.22,0-16.696,7.475-16.696,16.696l0,0c0,9.22,7.475,16.696,16.696,16.696h122.435  C237.395,261.565,244.87,254.09,244.87,244.87z M422.957,244.87L422.957,244.87c0-9.22-7.475-16.696-16.696-16.696H283.826  c-9.22,0-16.696,7.475-16.696,16.696l0,0c0,9.22,7.475,16.696,16.696,16.696h122.435C415.482,261.565,422.957,254.09,422.957,244.87  z" />
                                                <path style={{ fill: '#FFD880' }} d="M406.261,384H105.739c-9.22,0-16.696-7.475-16.696-16.696v-66.783c0-9.22,7.475-16.696,16.696-16.696  h300.522c9.22,0,16.696,7.475,16.696,16.696v66.783C422.957,376.525,415.482,384,406.261,384z" />
                                                <path style={{ fill: '#FC8059' }} d="M139.688,374.23l-2.332,2.332l0.086,0.086l-19.098,19.098c-1.37,1.37-3.229,2.14-5.167,2.14l0,0  c-1.938,0-3.797-0.77-5.167-2.14l-19.098-19.098l0.086-0.086l-2.332-2.332c-6.677-6.677-6.677-17.501,0-24.179l0,0  c6.677-6.677,17.501-6.677,24.179,0l2.332,2.332l2.332-2.332c6.677-6.677,17.501-6.677,24.179,0l0,0  C146.365,356.728,146.365,367.553,139.688,374.23z" />
                                                <path style={{ fill: '#D6A154' }} d="M376.209,292.36l-22.261,29.682c-4.452,5.936-13.357,5.936-17.809,0l-22.261-29.682  c-1.445-1.927-2.226-4.27-2.226-6.678V22.261C311.652,9.966,321.618,0,333.913,0h22.261c12.295,0,22.261,9.966,22.261,22.261  v263.421C378.435,288.089,377.653,290.433,376.209,292.36z" />
                                                <path style={{ fill: '#B26932' }} d="M370.087,300.522l-16.139,21.518c-4.452,5.936-13.357,5.936-17.809,0L320,300.522H370.087z" />
                                                <path style={{ fill: '#FFD880' }} d="M311.652,256V22.261C311.652,9.966,321.618,0,333.913,0h22.261c12.295,0,22.261,9.966,22.261,22.261  V256H311.652z" />
                                                <path style={{ fill: '#FCC159' }} d="M345.043,256V0h11.13c12.295,0,22.261,9.966,22.261,22.261V256H345.043z" />
                                                <path style={{ fill: '#FC8059' }} d="M378.435,22.261v22.261h-66.783V22.261C311.652,9.966,321.618,0,333.913,0h22.261  C368.469,0,378.435,9.966,378.435,22.261z" />
                                            </svg>
                                        </div>
                                        <div className='analytics-databox'>
                                            <p className='databox-title'>Total Blogs</p>
                                            <p className='databox-number'>{numeral(blogData.length).format('0.a').toUpperCase()}</p>
                                            <p className="databox-analytics-value">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="databox-arrow">
                                                    <path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"></path>
                                                </svg>
                                                <p>16%</p>this month
                                            </p>
                                        </div>
                                    </div>

                                    <div className="ud-linebreak"></div>

                                    <div className='ud-analytics-box'>
                                        <div className='svgbox'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24" fill="none">
                                                <path d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z" fill="#1C274C" />
                                                <path opacity="0.4" d="M19.5 7.5C19.5 8.88071 18.3807 10 17 10C15.6193 10 14.5 8.88071 14.5 7.5C14.5 6.11929 15.6193 5 17 5C18.3807 5 19.5 6.11929 19.5 7.5Z" fill="#1C274C" />
                                                <path opacity="0.4" d="M4.5 7.5C4.5 8.88071 5.61929 10 7 10C8.38071 10 9.5 8.88071 9.5 7.5C9.5 6.11929 8.38071 5 7 5C5.61929 5 4.5 6.11929 4.5 7.5Z" fill="#1C274C" />
                                                <path d="M18 16.5C18 18.433 15.3137 20 12 20C8.68629 20 6 18.433 6 16.5C6 14.567 8.68629 13 12 13C15.3137 13 18 14.567 18 16.5Z" fill="#1C274C" />
                                                <path opacity="0.4" d="M22 16.5C22 17.8807 20.2091 19 18 19C15.7909 19 14 17.8807 14 16.5C14 15.1193 15.7909 14 18 14C20.2091 14 22 15.1193 22 16.5Z" fill="#1C274C" />
                                                <path opacity="0.4" d="M2 16.5C2 17.8807 3.79086 19 6 19C8.20914 19 10 17.8807 10 16.5C10 15.1193 8.20914 14 6 14C3.79086 14 2 15.1193 2 16.5Z" fill="#1C274C" />
                                            </svg>

                                        </div>
                                        <div className='analytics-databox'>
                                            <p className='databox-title'>Connections</p>
                                            <p className='databox-number'>{numeral(blogData.reduce((acc, blog) => acc + blog.views, 0)).format('0.a').toUpperCase()}</p>
                                            <div className="databox-analytics-value">
                                                <div>
                                                    <img src="" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ud-blogslist-and-comments">
                                    <div className="ud-blog-container">
                                        <div className="allblogs">All Blogs</div>
                                        <div className='ud-bloglist'>
                                            <div className='blogbox'>
                                                {blogData.length === 0 ? (
                                                    <p style={{ alignSelf: 'center', justifySelf: 'center' }}>No Blog Available</p>
                                                ) : (
                                                    blogData.map((blog) => (
                                                        <div onClick={() => {
                                                            // console.log(blog);

                                                            handleSpecificComments(blog._id)
                                                        }} className='blog-container'>
                                                            <div key={blog._id} className="blogbox-blog">
                                                                <h2 id='ud-blog-title'>{blog.title}</h2>
                                                                <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', fontSize: '.9rem' }}>
                                                                    <p id='ud-blog-date'>{blog.name}</p>
                                                                    <p id='ud-blog-date'>{date(blog.updatedAt)}</p>
                                                                </p>

                                                            </div>
                                                            <div className='blogbox-edit-delete'>
                                                                <div className='blog-edit'>
                                                                    <svg id='ud-svgs-small' xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" ><path d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" /></svg>
                                                                </div>
                                                                {deleteConfirmationPopup && (<div className='deletepopupblackscreen'></div>)}
                                                                {deleteConfirmationPopup && (<div className='deleteConfirmationPopup'>
                                                                    <div className="deleteConfirmationPopup-content"></div>
                                                                    <div className="confirmation-buttons">
                                                                        <button className='d-button d-cancel' onClick={setDeleteConfirmationPopup(false)}>Cancel</button>
                                                                        <button className='d-button d-cancel' onClick={() => handleBlogDelete(blog._id)}>Delete</button>
                                                                    </div>
                                                                </div>)}

                                                                <button onClick={() => setDeleteConfirmationPopup(true)} className='blog-delete'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="ud-svgs">
                                                                        <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="ud-comments">
                                        <h2 className="ud-commentbox-heading">
                                            Blog Comments
                                        </h2>
                                        <div className="comments-box">
                                            {newComment.length === 0 ? (
                                                <p style={{ alignSelf: 'center', justifySelf: 'center', margin: '10px 0px' }}>No Data Found</p>
                                            ) : (

                                                newComment.map((comment) => (
                                                    <div key={comment._id} className="ud-commentbox">
                                                        <div className="senderPicture">
                                                            <img id='senderPicture' src={comment.senderPicture} alt="pic" />
                                                        </div>
                                                        <div className="ud-comment-and-senderdetail">
                                                            <div className="ud-senderDetail">

                                                                <div className="ud-senderName">
                                                                    <strong>{comment.senderName}</strong>
                                                                </div>

                                                                <div className="ud-date-time">
                                                                    {formatDateTime(comment.updatedAt)}
                                                                </div>
                                                            </div>
                                                            <div className="ud-commentMessage">
                                                                {comment.comments}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

        </>
    )
}

export default UserDashBoard;