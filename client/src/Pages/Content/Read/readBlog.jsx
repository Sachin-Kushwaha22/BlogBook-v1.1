import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './readBlog.css'
import Header from '../../Home/Header'
import Footer from '../../Home/Footer'

function readBlog() {
    const { id } = useParams(); // getting the ID from the URL
    const [blogPost, setBlogPost] = useState(null);
    const [error, setError] = useState(null);

    const fetchBlogPost = async () => {
        try {
            const response = await axios.get(`http://localhost:9010/post/viewblog/${id}`);
            setBlogPost(response.data);
        } catch (err) {
            setError(err);
            console.error(err);
        }
    };

    const dateFunction = (date) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString('en-US',{
            month: 'long',
            day:'2-digit',
            year: 'numeric',
        })

        return formattedDate
    }

    useEffect(() => {
        fetchBlogPost();
    }, [id]);

    if (error) return <p>Error loading post.</p>;
    if (!blogPost) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <div className='readblog'>
                <div>
                    <div>
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
                                <p id='blogcontent'dangerouslySetInnerHTML={{ __html: blogPost.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default readBlog;