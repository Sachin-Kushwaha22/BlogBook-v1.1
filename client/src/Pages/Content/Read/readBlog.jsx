import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './readBlog.css'
import Header from '../../Home/Header'
import Footer from '../../Home/Footer'
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import config from '../../../config'

function readBlog() {

    const { loginWithPopup, isAuthenticated, user } = useAuth0()

    const { id } = useParams(); // getting the ID from the URL
    const [blogPost, setBlogPost] = useState(null);
    // const [error, setError] = useState(null);
    const [comments, setComments] = useState('');

    const fetchBlogPost = async () => {
        try {
            const response = await axios.get(`${config.serverUrl}/post/viewblog/${id}`,{
                withCredentials:true
            })
            setBlogPost(response.data);
        } catch (err) {
            setError(err);
            console.error(err);
        }
    };

    const dateFunction = (date) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        })

        return formattedDate
    }

    useEffect(() => {
        fetchBlogPost();
    }, [id]);



    const handleInputComments = (e) => {
        setComments(e.target.value)
    }

    const handleCommentsSave = async (e) => {
        e.preventDefault()
        if (isAuthenticated && user) {

            try {
                const response = await axios.post(`${config.serverUrl}/post/viewblog/${id}/comments`, {
                    senderId: user.sub,
                    senderName: user.name,
                    comments: comments
                }, {
                    withCredentials: true
                })

                if(response.status == 200){

                }

            } catch (error) {
                console.log(error);

            }
             finally{
                setTimeout(() => {
                    setComments('')
                    
                }, 1000);
             }
        } else {
            toast.error('Please Login To Continue')
            setTimeout(() => {
                loginWithPopup()
            }, 1000);
        }

    }

    return (
        <div className='readblogcontainer'>
            <div className="headercontainer">
                <Header />
            </div>
            <div className='readblog'>
                <div>

                    {!blogPost ? (<p>Loading...</p>)
                        :
                        (<div>
                            <div>

                                <div>

                                    <h1 id='blogtitle'>{blogPost.title}</h1>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p id='blogdate'> {blogPost.name} {dateFunction(blogPost.updatedAt)}</p>

                                </div>
                            </div>
                            <div>
                                <div>
                                    <p id='blogcontent' dangerouslySetInnerHTML={{ __html: blogPost.description }}></p>
                                </div>
                            </div>

                        </div>)}
                </div>
                <div className="readbloglinebreak"></div>
                <div className="rb-comments-others">
                    <h2>Comments</h2>
                    <div className="rb-comments">

                    </div>
                    <form onSubmit={handleCommentsSave}>
                        <input type="text" name="comments" placeholder="Comments" required value={comments} onChange={handleInputComments} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>


            <Footer />

        </div>

    );
}

export default readBlog;