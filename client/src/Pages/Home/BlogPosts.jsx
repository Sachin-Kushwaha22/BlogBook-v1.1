import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './BlogPosts.css';

function BlogPosts() {
    const [blogData, setBlogData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:9010/post/viewblog");

            setBlogData(response.data);
            // console.log('heyy',response.data);

        } catch (err) {
            setError(err);
            console.error(err);
        }
    };

    function date(datedata) {
        const date = new Date(datedata);
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        });

        return formattedDate
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="blog-posts">
            <div className='blog-post'>


                {blogData.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    blogData.map((post) => (
                        <div key={post._id} className="blog-post2">
                            <div className="bp-img">

                            </div>
                            <div className="bp-textpart">
                                <Link id='blog-title' to={`/readBlog/${post._id}`} ><h2 id='blog-title'>{post.title}</h2></Link>
                                <p className='blog-posts-authordetail' >
                                    <p id='blogposts-userPicture'><img src={post.userPicture} alt="" /></p>
                                    <p id='blog-date'>{post.name}</p>
                                    <p id='blog-date'>{date(post.updatedAt)}</p>
                                </p>
                                <div className='description-div bp-description'>
                                <p id='blog-description' className='bp-description-p' dangerouslySetInnerHTML={{ __html: post.introduction }}></p>
                            </div>
                                <Link id='blog-readmore' to={`/readBlog/${post._id}`}>Read more</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default BlogPosts;