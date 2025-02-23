import axios from 'axios'
import './dashboard.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast, } from 'react-toastify'
import { Oval } from 'react-loader-spinner';
import Profile from '../Profile/profile'
import { useAuth0 } from '@auth0/auth0-react'

function dashboard() {
    const { isAuthenticated, user } = useAuth0()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [pic, setPic] = useState(localStorage.getItem('upic') || '')
    // const [pic, setPic] = useState('')
    // const [isAuthenticated, setIsAuthenticated] = useState(false)

    // const checkAuth = async () => {
    //     try {
    //         console.log('checkauth funcn from dashboard');

    //         const checkAuth = await axios.post('http://localhost:9010/user/api/checkAuth', null, {
    //             withCredentials: true,
    //         });

    //         if (checkAuth.data.isValid) {
    //             console.log('user is authenticated from dashboard');
    //             setIsAuthenticated(true)
    //         }

    //     } catch (error) {
    //         console.log('Error details:', error.response || error.message || error);
    //         setTimeout(() => {
    //             navigate('/signin')
    //             toast.warning('Unauthorized Alert')
    //         }, 1000);
    //     }

    // }

    // useEffect(() => {
    //     checkAuth();
    //     handleUserAnalytics()
    // }, [])
    useEffect(() => {
        if (isAuthenticated && user?.picture) {
            localStorage.setItem('upic', user.picture)
            // setPic(user.picture)
        }

    }, [isAuthenticated, user])


    const handlebackbutton = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    const handlelogout = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:9010/user/api/logout', null, {
                withCredentials: true,
            });

            if (response.data.isLogout) {
                setTimeout(() => {
                    toast.info("You are Logged Out")
                    navigate('/')
                    setLoading(false)
                }, 1500);
            }
        } catch (error) {
            // console.log('Error from logout details:', error.response || error.message || error);
            toast.error('Unexpected Error Occur, Try Again')
            setLoading(false)
        }
    }

    const [blogPost, setBlogPost] = useState('')

    const handleUserAnalytics = async () => {

        try {
            const response = await axios.post('http://localhost:9010/user/api/analytics', null, {
                withCredentials: true,
            });
            if (response.data.valid) {
                setBlogPost(response.data.blogPost)
            }
        } catch (error) {
            // console.log('error from handleuseranalytics', error);

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

    const handleBlogPostDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:9010/blog/delete', null, {
                withCredentials: true,
            })
        } catch (error) {
            // console.log("error from delete svg:", error);

        }
    }

    if (!isAuthenticated) {
        return null;
    }

    // console.log('this is pic', pic);

    // handleUserAnalytics()
    return (
        <div className='dashboard'>
            <div className="brightlight"></div>
            <div className='container'>
                <div className='row1'>
                    <div className='profile row1mem'>
                        {pic ? (
                            <img id="profilepic" src={pic} alt="User Profile" />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="views row1mem row1rec">

                    </div>

                    <div className="posts row1mem row1rec">

                    </div>

                    <div className='create row1mem row1rec'>

                    </div>
                </div>
                <div className='row2'>
                    <div className="bloglist row2rec">

                    </div>

                    <div className="socialmedia row2rec">

                    </div>
                </div>
                <div className='row3'>
                    <div className="reviews row3rec">

                    </div>
                </div>

            </div>
        </div>
    )
}

export default dashboard