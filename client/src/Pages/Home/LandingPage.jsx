import './LandingPage.css'
import { toast, } from 'react-toastify'
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function landingPage() {
    const [loading, setLoading] = useState(false);
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
    const navigate = useNavigate()

    const handleSignInGoogle = () => {
        loginWithRedirect()
        LocalStorage.setItem('picture', user.picture)
    }


    const handleCreateYourBlogButton = async (e) => {
        setLoading(true)
        e.preventDefault();

        if (isAuthenticated) {
            navigate('/writeBlog')
        }
        else {
            toast.error('Please login to create a blog', {
                autoClose: 2000,
            });
            setTimeout(() => {
                toast.info('Redirecting to Login Page', {
                    autoClose: 2000,
                });
            }, 1000);
            setTimeout(() => {
                handleSignInGoogle()
            }, 3000);
        }
    }

    return (
        <div className='landing-page'>
            <div className='intro'>
                <div>
                    <div className='intro-heading'>

                    </div>
                    <div className='blogbookintro'>
                        <p id='intro-para'><strong id='blogbook'>BlogBook</strong> is your gateway to a world of ideas, innovation, and inspiration. Whether you're passionate about technology, curious about everyday household tips, or eager to explore a variety of engaging topics, Blogbook has something for everyone. Share your voice, discover fresh perspectives, and be part of a community driven to make a difference. Together, we turn knowledge into action, empowering individuals to create a better, brighter future—one blog at a time.</p>
                    </div>
                </div>
            </div>
            <div className="button-wrapper">
            <button onClick={handleCreateYourBlogButton} id='create-your-blog-button-mobile' disabled={loading}>
                {loading ? (
                    <Oval type="Oval" color="#ffffff" height={30} width={30} strokeWidth={7}
                        secondaryColor="#ffffff95"
                        ariaLabel="oval-loading" />
                ) : (
                    'CREATE YOUR BLOG'
                )}
            </button>
            </div>
        </div>
    )
}

export default landingPage