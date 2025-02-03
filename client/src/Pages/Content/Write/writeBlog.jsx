import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './writeBlog.css'; // Your custom styles for the editor
import axios from 'axios'
import { LocalStorageCache } from '@auth0/auth0-react';
import { useAuth0 } from "@auth0/auth0-react";
import { toast, } from 'react-toastify'

// Image upload function
const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://localhost:9010/post/uploadblog', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    const imageUrl = `http://localhost:9010/post${data.imageUrl}`;
    return imageUrl;
};

// Quill custom image handler
const customModules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        handlers: {
            image: function () {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = async () => {
                    const file = input.files[0];
                    const imageUrl = await uploadImage(file);
                    const quill = this.quill;
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', imageUrl);
                };
            },
        },
    },
};

const BlogEditor = () => {
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [display, setDisplay] = useState(false)
    const quillRef = useRef(null)

    useEffect(() => {
        localStorage.getItem('personalDetail') ? setDisplay(false) : setDisplay(true)
        const data = localStorage.getItem('personalDetail')
        const dataa = JSON.parse(data)
        // console.log(dataa);

    }, [])


    const handlePersonalDetail = (e) => {
        e.preventDefault();
        setDisplay(false)

        const formData = new FormData(e.target)
        const data = {
            fullname: formData.get("fullname"),
            purpose: formData.get("purpose")
        };

        // saving data to lacal storage
        localStorage.setItem('personalDetail', JSON.stringify(data))

        // console.log(personalDetail);
    }

    const handlePublish = async () => {
        if (isAuthenticated && user) {
            const personalDetail = JSON.parse(localStorage.getItem('personalDetail'))
            localStorage.removeItem('personalDetail')
            const blogData = {
                userid:user.sub,
                personalDetail,
                title,
                content
            };
            try {
                const response = await axios.post('http://localhost:9010/post/blog', blogData, {
                    withCredentials: true,
                })
                console.log(response.data)
                // console.log('Blog published:', blogData);
                toast.success('Your blog has been published!',{
                    autoClose:3000
                });
                setTimeout(() => {
                    window.location.href = '/'
                }, 3000);
            } catch (error) {
                console.error('Error while saving the blog:', error.response ? error.response.data : error.message);
            }
        }


    };

    return (
        <>
            <div style={{ display: display ? 'block' : 'none' }} className='personaldetailbox'>
                <form className='personaldetail' onSubmit={handlePersonalDetail}>
                    <h1>GIVE THE FOLLOWING DETAILS</h1>
                    <div className='note'>
                        Note: Please provide accurate details! Your full name and purpose of writing the blog will be displayed with your post.
                    </div>
                    <div className="namepurpose">
                        {/* <label htmlFor="name">Name</label> */}
                        <input id='name' type="text" name='fullname' required placeholder='FULL NAME' />

                        <label htmlFor="purpose">DESCRIPTION OF YOUR BLOG</label>
                        <textarea id='purpose' type="text" name='purpose' required />
                    </div>
                    <div className='buttons'>
                        <button id='backbutton' onClick={() => navigate(-1)}>
                            <svg id='backarrow' data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" /></svg>
                            Back</button>
                        <button id='enterbutton' type='submit'>  Next
                            <svg id='enterarrow' data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" /></svg>
                        </button>
                    </div>
                </form>
            </div>
            <div className="writeblogcontainer">
                <div className="writeblogleftside">
                    <h2>Create Your Blog</h2>
                    <input
                        id="writeblogtitle"
                        type="text"
                        placeholder="Enter your Blog title here..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Quill Editor */}
                    <ReactQuill
                        id='quillc'
                        ref={quillRef}
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={customModules}
                    />


                </div>
                <div className='writeblogrightside'>

                    <button
                        onClick={handlePublish}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        Publish Blog
                    </button>
                </div>
            </div>
        </>

    );
};

export default BlogEditor;
