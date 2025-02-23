import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './readBlog.css'
import Header from '../../Home/Header'
import Footer from '../../Home/Footer'
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import config from '../../../config'
import { Oval } from 'react-loader-spinner'

import io from 'socket.io-client';

function ReadBlog() {

    const commentScroll = useRef(null);

    // Setup Socket.IO connection
    const socket = io(config.serverUrl); // Make sure your backend URL matches

    const { loginWithPopup, isAuthenticated, user } = useAuth0()

    const { id } = useParams(); // getting the ID from the URL
    const [blogPost, setBlogPost] = useState(null);
    // const [error, setError] = useState(null);
    const [comments, setComments] = useState('');
    const [fullDetailOfComment, setFullDetailOfComment] = useState();
    const [allComments, setAllComments] = useState([]); // For storing real-time comments
    const [reload, setReload] = useState(0)
    const [blogReload, setBlogReload] = useState(0)
    const [userId, setUserId] = useState('')
    const [follow, setFollow] = useState(false)
    const [following, setFollowing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    const increaseViews = async () => {

        const storageKey = userId ? `viewCount_${id}_${userId}` : `viewCount_${id}_guest`;

        // Retrieve stored views from localStorage
        let viewsData = JSON.parse(localStorage.getItem(storageKey)) || [];

        // Filter out views older than 24 hours
        const now = Date.now();
        viewsData = viewsData.filter(timestamp => now - timestamp < 24 * 60 * 60 * 1000);

        if (viewsData.length >= 5) {
            console.log("View limit reached for this blog in the last 24 hours.");
            return;
        }

        try {
            const response = await axios.get(`${config.serverUrl}/post/viewblog/viewCount/${id}`, {
                withCredentials: true,
            })
            if (response.status == 200) {
                // Store the new view timestamp
                viewsData.push(now);  // Add the current timestamp to the views data
                localStorage.setItem(storageKey, JSON.stringify(viewsData));  // Save updated views data to localStorage
            }

        } catch (error) {
            console.error('error generated from incrementViews func client', error.response?.data?.message || error.message);
        }
    }

    const fetchBlogPost = async () => {


        try {

            const response = await axios.get(`${config.serverUrl}/post/viewblog/${id}`, {
                withCredentials: true,
            })
            console.log('heyy2');
            if (response.status == 200) {
                setBlogPost(response.data);
                setTimeout(() => {

                    FollowerStatus(response.data.userid)
                }, 1000);

            }

            // Fetch existing comments from backend
            const commentsResponse = await axios.get(`${config.serverUrl}/post/viewblog/${id}/comments`, {
                withCredentials: true
            });

            if (commentsResponse.status == 200) {

                setAllComments(commentsResponse.data); // Load comments from database

            }
        } catch (error) {
            console.error('error generated from fetchBlogPost func client', error.response?.data?.message || error.message);
        }
    }


    const dateFunction = (date) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        })

        return formattedDate
    }


    const FollowerStatus = async (authorId) => {
        if (isAuthenticated && user) {
            setIsLoading(true)
            if (authorId === user.sub) {
                setFollow(false)
                setFollowing(false)
                setIsLoading(false)
                return;
            }

            try {
                const isFollowing = await axios.post(`${config.serverUrl}/follow/api/checkFollower`, {
                    authorId: authorId,
                    followerId: user.sub,
                }, {
                    withCredentials: true
                })

                if (isFollowing.status == 200) {

                    setFollow(!isFollowing.data.isFollowing)
                    setFollowing(isFollowing.data.isFollowing)

                }
            } catch (error) {

                console.log('error from followerStatus func client :', error.response?.data?.message || error.message);
                toast.error(error.response?.data?.message || error.message)
            } finally {
                setIsLoading(false)
            }

        } else {
            setFollow(true)
            setFollowing(false)
        }
    }

    useEffect(() => {
        if (isAuthenticated && user) {
            setUserId(user.sub)
        }

        fetchBlogPost();
        increaseViews();
        // FollowerStatus();

        socket.connect(); // Ensure socket is connecting

        const handleNewComment = (newComment) => {
            console.log("New comment received:", newComment);
            setAllComments((prevComments) => [newComment, ...prevComments]);
            setTimeout(() => {
                commentScroll.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);

        };

        // Listen for incoming comments
        socket.on('receiveComment', handleNewComment);


        return () => {
            socket.off('receiveComment', handleNewComment);
            socket.disconnect(); // Clean up on unmount
        };
    }, [id, isAuthenticated, user]);



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
                    senderPicture: user.picture,
                    comments: comments
                }, {
                    withCredentials: true
                })

                if (response.status == 200) {

                    // Emit the new comment to the server via Socket.IO
                    socket.emit('newComment', response.data); // Send the new comment to the server


                    // Optionally reset the comment input field after sending
                    setComments('');

                }

            } catch (error) {
                console.log('error from handlecommmentsave func client :', error.response?.data?.message || error.message);
            }
            finally {
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


    // function to delelte a comment
    const handleCommentDelete = async (commentId) => {
        try {
            const response = await axios.post(`${config.serverUrl}/post/delete/blogcomment/${id}`, { commentId: commentId }, {
                withCredentials: true
            })
            if (response.status === 200) {
                toast.info('Comment Deleted')
                setAllComments(allComments => allComments.filter(comment => comment._id !== commentId))
                setReload(reload => reload + 1)
            }
        } catch (error) {
            console.log('error from handleCommentDelete func client :', error.response?.data?.message || error.message);
        }
    }

    const handleFollowBtn = async (authorId, autherName) => {
        setIsLoading(true);
        if (isAuthenticated && user) {

            try {
                const follow = await axios.post(`${config.serverUrl}/follow/api/follow`, {
                    authorId: authorId,
                    followerId: user.sub,
                }, {
                    withCredentials: true
                })

                if (follow.status == 200) {
                    setTimeout(() => {
                        setFollow(false)
                        setFollowing(true)
                        toast.info(`You'r now following ${autherName}`)
                        setIsLoading(false)
                    }, 1000);
                }
            } catch (error) {
                console.log('error from handlefollowbtn func client :', error.response?.data?.message || error.message);
                toast.error(error.response?.data?.message || error.message)
            }
        } else {
            toast.error('Please login to Continue')
            setTimeout(() => {
                loginWithPopup()
                setIsLoading(false)
            }, 2000);
        }
    }

    const handleFollowingBtn = async (authorId, autherName) => {
        setIsLoading(true);
        if (isAuthenticated && user) {

            try {
                const following = await axios.post(`${config.serverUrl}/follow/api/unfollow`, {
                    authorId: authorId,
                    followerId: user.sub,
                }, {
                    withCredentials: true
                })

                if (following.status == 200) {
                    setTimeout(() => {
                        setFollow(true)
                        setFollowing(false)
                        toast.info(`You unfollow ${autherName}`)
                        setIsLoading(false)
                    }, 1000);
                }
            } catch (error) {
                console.log('error from handlefollowingbtn func client :', error.response?.data?.message || error.message);
                toast.error(error.response?.data?.message || error.message)
            }
        } else {
            toast.error('Please login to Continue')
            setTimeout(() => {
                loginWithPopup()
                setIsLoading(false)
            }, 2000);
        }
    }



    return (
        <>
            <div className='readblogcontainer'>
                <div className="headercontainer">
                    <Header />
                </div>
                <div key={blogReload} className='readblog'>
                    <div>

                        {!blogPost ? (<p>Loading...</p>)
                            :
                            (<div>
                                <div>

                                    <div>

                                        <h1 id='blogtitle'>{blogPost.title}</h1>
                                    </div>
                                </div>
                                <div className='auther-detail-box' >
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <p id='userPicture'><img src={blogPost.userPicture} alt="" /></p>
                                        <p id='blogdate'> {blogPost.name}</p>
                                        <p id='blogdate'>{dateFunction(blogPost.updatedAt)}</p>
                                        {follow && (
                                            isLoading ? (
                                                <div className="loaderSpinner">
                                                    <Oval type="Oval" color="#ffffff" strokeWidth={4}
                                                        secondaryColor="#ffffff95"
                                                        ariaLabel="oval-loading" />
                                                </div>
                                            ) : (

                                                <button onClick={() => handleFollowBtn(blogPost.userid, blogPost.name)} id='authorfollowbtn'>Follow</button>
                                            )
                                        )}
                                        {following && (
                                            isLoading ? (
                                                <div className="loaderSpinner">
                                                    <Oval type="Oval" color="#ffffff" strokeWidth={4}
                                                        secondaryColor="#ffffff95"
                                                        ariaLabel="oval-loading" />
                                                </div>
                                            ) : (

                                                < button onClick={() => handleFollowingBtn(blogPost.userid, blogPost.name)} id='authorfollowingbtn'>Following</button>
                                            )
                                        )}

                                    </div>

                                    <div className="author-socialmedia">
                                        <a style={{ display: blogPost?.instagram === null ? 'none' : 'block' }} href={blogPost.instagram} target="_blank" rel="noopener noreferrer">
                                            <svg id='authorsocialmedialogo' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                                            </svg>
                                        </a>

                                        <a style={{ display: blogPost?.linkedin === null ? 'none' : 'block' }} href={blogPost.linkedin} target="_blank" rel="noopener noreferrer">
                                            <svg id='authorsocialmedialogo' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                                <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M7.738,17L7.738,17 c-0.697,0-1.262-0.565-1.262-1.262v-4.477C6.477,10.565,7.042,10,7.738,10h0C8.435,10,9,10.565,9,11.262v4.477 C9,16.435,8.435,17,7.738,17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2 S8.551,8.717,7.694,8.717z M16.779,17L16.779,17c-0.674,0-1.221-0.547-1.221-1.221v-2.605c0-1.058-0.651-1.174-0.895-1.174 s-1.058,0.035-1.058,1.174v2.605c0,0.674-0.547,1.221-1.221,1.221h-0.081c-0.674,0-1.221-0.547-1.221-1.221v-4.517 c0-0.697,0.565-1.262,1.262-1.262h0c0.697,0,1.262,0.565,1.262,1.262c0,0,0.282-1.262,2.198-1.262C17.023,10,18,10.977,18,13.174 v2.605C18,16.453,17.453,17,16.779,17z"></path>
                                            </svg>
                                        </a>

                                        <a style={{ display: blogPost?.twitter === null ? 'none' : 'block' }} href={blogPost.twitter} target="_blank" rel="noopener noreferrer">
                                            <svg id='authorsocialmedialogo' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                                <path d="M 2.8671875 3 L 9.7363281 12.818359 L 2.734375 21 L 5.3808594 21 L 10.919922 14.509766 L 15.460938 21 L 21.371094 21 L 14.173828 10.697266 L 20.744141 3 L 18.138672 3 L 12.996094 9.0097656 L 8.7988281 3 L 2.8671875 3 z"></path>
                                            </svg>
                                        </a>

                                        <a onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast.info('Link copied to clipboard!');
                                        }}>


                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="authorsocialmedialogo">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path>
                                            </svg>
                                        </a>

                                    </div>
                                </div>
                                <div>
                                    <div>

                                        <p id='blogintroduction' dangerouslySetInnerHTML={{ __html: blogPost.introduction }}></p>
                                        <p id='blogcontent' dangerouslySetInnerHTML={{ __html: blogPost.description }}></p>
                                    </div>
                                </div>

                            </div>)}
                    </div>
                    <div ref={commentScroll}></div>
                    <div className="readbloglinebreak"></div>
                    <div className="rb-comments-others">
                        <h2>Comments</h2>
                        <div key={reload} className="rb-comments">
                            {allComments.length === 0 ? (
                                <p>No comments yet. Be the first to comment!</p>
                            ) : (
                                allComments.map((comment) => {


                                    const isSender = comment.senderId === userId


                                    return (
                                        <div key={comment._id} className="commentbox">
                                            <div className="senderPicture">
                                                <img id='senderPicture' src={comment.senderPicture} alt="pic" />
                                            </div>
                                            <div className="comment-and-senderdetail">
                                                <div className="senderDetail">

                                                    <div className="senderName">
                                                        <strong>{comment.senderName}</strong>
                                                    </div>

                                                    <div className="date-time">
                                                        {formatDateTime(comment.updatedAt)}
                                                    </div>
                                                </div>
                                                <div className="commentMessage">
                                                    {comment.comments}
                                                </div>
                                            </div>


                                            {isSender && (
                                                <svg onClick={() => handleCommentDelete(comment._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="rb-comment-delete">
                                                    <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path>
                                                </svg>
                                            )}

                                        </div>
                                    )

                                })
                            )}
                        </div>

                        <form className='rb-comments-write' onSubmit={handleCommentsSave}>
                            <textarea id='commentinput' type="text" name="comments" placeholder="Comments" required value={comments} onChange={handleInputComments} />
                            <button id='commentsendbutton' type="submit">Send <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="send">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                            </svg></button>
                        </form>
                    </div>
                </div>


                <Footer />

            </div>
        </>

    );
}

export default ReadBlog;