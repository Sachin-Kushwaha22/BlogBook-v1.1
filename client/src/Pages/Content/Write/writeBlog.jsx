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
    const [introduction, setIntroduction] = useState('');
    const [content, setContent] = useState('');
    const [display, setDisplay] = useState(false)
    const [personalDetail, setPersonalDetail] = useState({});
    const [slide, setSlide] = useState(true)
    const quillRef = useRef(null)
    const scrollTop = useRef()

    useEffect(() => {
        localStorage.getItem('personalDetail') ? setDisplay(false) : setDisplay(true)
        const data = localStorage.getItem('personalDetail')
        const dataa = JSON.parse(data)
        // console.log(dataa);

        const storedPersonalDetail = localStorage.getItem('personalDetail');
        if (storedPersonalDetail) {
            setPersonalDetail(JSON.parse(storedPersonalDetail));
        }

        setTimeout(() => {
            scrollTop.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

    }, [])


    const handlePersonalDetail = (e) => {
        e.preventDefault();
        setDisplay(false)

        const formData = new FormData(e.target)
        const data = {
            fullname: formData.get("fullname"),
            instagram: formData.get("instagram") === "" ? null : formData.get("instagram"),
            linkedin: formData.get("linkedin") === "" ? null : formData.get("linkedin"),
            twitter: formData.get("twitter") === "" ? null : formData.get("twitter"),

        };

        // saving data to lacal storage
        localStorage.setItem('personalDetail', JSON.stringify(data))

        window.location.reload()
        // console.log(personalDetail);
    }

    const handlePublish = async () => {
        if (isAuthenticated && user) {
            const personalDetail = JSON.parse(localStorage.getItem('personalDetail'))
            localStorage.removeItem('personalDetail')
            const blogData = {
                userid: user.sub,
                userPicture: user.picture,
                personalDetail,
                title,
                introduction,
                content
            };
            try {
                const response = await axios.post('http://localhost:9010/post/blog', blogData, {
                    withCredentials: true,
                })
                console.log(response.data)
                // console.log('Blog published:', blogData);
                toast.success('Your blog has been published!', {
                    autoClose: 3000
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
                        Note: Please provide accurate details! Your full name will be displayed with your post.
                    </div>
                    <div className="namepurpose">
                        {/* <label htmlFor="name">Name</label> */}
                        <input id='name' type="text" name='fullname' required placeholder='FULL NAME' />
                        <p className="socialmedialinktext">Provide Your Social Media Links ( Optional )</p>
                        <input id='social' type="text" name='instagram' placeholder='instagram ( https://instagram.com/example_123 )' />
                        <input id='social' type="text" name='linkedin' placeholder='linkedin ( https://linkedin.com/in/example-456 )' />
                        <input id='social' type="text" name='twitter' placeholder='twitter ( https://twitter.com/example789 )' />

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

            <div ref={scrollTop} className="writeblogcontainer">
                <div className='wb-backButton' onClick={() => {
                    navigate(-1)
                }}><svg id='wb-backarrow' data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" /></svg>Back</div>
                <div className="writeblogleftside">
                    <h2 className='createblogh2'>CREATE YOUR BLOG</h2>
                    <input
                        id="writeblogtitle"
                        type="text"
                        placeholder="Enter your Blog title here..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} type='text' name="introduction" id="wb-blog-intro" placeholder='Provide Brief introduction of your Blog' />

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

                <button onClick={() => {
                    setSlide(true)
                }} className="wb-menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 16 16" id="wb-menu-svg"><path d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z"></path><path d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z"></path><path d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z"></path></svg>
                </button>
                <div style={{ display: slide ? 'flex' : 'none' }} className='writeblogrightside'>

                    <div className="wb-buttonsdiv">
                        
                        <button
                            onClick={handlePublish}
                            className='wb-previewbutton'
                        >
                            <svg id="previewsvg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 68.18"><defs></defs><title>view</title><path class="cls-1" d="M61.44,13.81a20.31,20.31,0,1,1-14.34,6,20.24,20.24,0,0,1,14.34-6ZM1.05,31.31A106.72,106.72,0,0,1,11.37,20.43C25.74,7.35,42.08.36,59,0s34.09,5.92,50.35,19.32a121.91,121.91,0,0,1,12.54,12,4,4,0,0,1,.25,5,79.88,79.88,0,0,1-15.38,16.41A69.53,69.53,0,0,1,63.43,68.18,76,76,0,0,1,19.17,53.82,89.35,89.35,0,0,1,.86,36.44a3.94,3.94,0,0,1,.19-5.13Zm15.63-5A99.4,99.4,0,0,0,9.09,34,80.86,80.86,0,0,0,23.71,47.37,68.26,68.26,0,0,0,63.4,60.3a61.69,61.69,0,0,0,38.41-13.72,70.84,70.84,0,0,0,12-12.3,110.45,110.45,0,0,0-9.5-8.86C89.56,13.26,74.08,7.58,59.11,7.89S29.63,14.48,16.68,26.27Zm39.69-7.79a7.87,7.87,0,1,1-7.87,7.87,7.86,7.86,0,0,1,7.87-7.87Z" /></svg>Preview
                        </button>
                        <button
                            onClick={handlePublish}
                            className='wb-publishbutton'
                        >
                            Publish<svg version="1.1" id="publishsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 80.98" xml:space="preserve"><g><path class="st0" d="M100.66,40.49L60.58,80.98V60.81C35.23,55.56,15.21,61.35,0,80.63c2.64-39.65,29.73-58.78,60.58-60.05V0 L100.66,40.49L100.66,40.49z M122.88,40.49L82.79,80.98V68.04l27.28-27.55L82.79,12.94V0L122.88,40.49L122.88,40.49z" /></g></svg>
                        </button>

                        <button onClick={() => {
                            setSlide(false)
                        }} className="wb-menu-inside">
                            <svg id='wb-menu-svg' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                            </svg>
                        </button>

                    </div>

                    <div className="wb-basicinfodiv">
                        <p className='note-h'>How to Write & Format Your Blog 📝</p>
                        {/* <p className='note-mini-h'>To ensure a great reading experience, use the formatting tools wisely:</p> */}

                        <p className='note-text'><strong>Title Box</strong> 🏷️ – Enter your blog title here. Keep it catchy and relevant.</p>
                        <p className='note-text'><strong>Text Formatting</strong> ✍️ – Customize your content with:
                            Normal, H1, H2, H3 – Adjust heading sizes for better structure.</p>
                        <p className='note-text'><strong>B (Bold)</strong> – Highlight important words or phrases.</p>
                        <p className='note-text'><strong>I (Italic)</strong> – Emphasize key points or quotes.</p>
                        <p className='note-text'><strong>U (Underline)</strong> – Draw attention to specific text.</p>
                        <p className='note-text'><strong>Bulletin List</strong> 📌 – Organize points clearly for better readability.</p>
                        <p className='note-text'><strong>Image & Video Upload</strong> 📷🎥 – Add media to make your blog engaging.</p>
                        <p className='note-text'><strong>Preview & Publish</strong> 🚀 – Review your blog before publishing it live!</p>
                        <p className='note-mini-h'>Write with clarity, format neatly, and engage your audience! ✨</p>
                    </div>

                    {/* <div className="wb-filldetails">
                        
                        <p>Full Name</p>
                        <input name="fullname" id="authordetail" />
                        <p>Social Media Handle</p>
                        <input name='instagram' placeholder='instagram ( https://instagram.com/example_123 )' id="authordetail" />
                        <input name='linkedin' placeholder='linkedin ( https://linkedin.com/in/example-456 )' id="authordetail" />
                        <input name='twitter' placeholder='twitter ( https://twitter.com/example789 )' id="authordetail" />

                        <button
                            onClick={handlePublish}
                            className='savechangesvg'
                        >
                            Save Changes
                        </button>
                    </div> */}
                    <form className="wb-filldetails" onSubmit={handlePersonalDetail}>
                        <p>Full Name</p>
                        <input
                            name="fullname"
                            required
                            id="authordetail"
                            value={personalDetail.fullname}
                            onChange={(e) => {
                                setPersonalDetail({ ...personalDetail, fullname: e.target.value });
                                localStorage.setItem('personalDetail', JSON.stringify({ ...personalDetail, fullname: e.target.value }));
                            }}
                        />
                        <p>Social Media Handle</p>
                        <input
                            name='instagram'
                            placeholder='instagram ( https://instagram.com/example_123 )'
                            id="authordetail"
                            value={personalDetail.instagram}
                            onChange={(e) => {
                                setPersonalDetail({ ...personalDetail, instagram: e.target.value });
                                localStorage.setItem('personalDetail', JSON.stringify({ ...personalDetail, instagram: e.target.value }));
                            }}
                        />
                        <input
                            name='linkedin'
                            placeholder='linkedin ( https://linkedin.com/in/example-456 )'
                            id="authordetail"
                            value={personalDetail.linkedin}
                            onChange={(e) => {
                                setPersonalDetail({ ...personalDetail, linkedin: e.target.value });
                                localStorage.setItem('personalDetail', JSON.stringify({ ...personalDetail, linkedin: e.target.value }));
                            }}
                        />
                        <input
                            name='twitter'
                            placeholder='twitter ( https://twitter.com/example789 )'
                            id="authordetail"
                            value={personalDetail.twitter}
                            onChange={(e) => {
                                setPersonalDetail({ ...personalDetail, twitter: e.target.value });
                                localStorage.setItem('personalDetail', JSON.stringify({ ...personalDetail, twitter: e.target.value }));
                            }}
                        />
                        <button
                            type='submit'
                            className='savechangesvg'
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </>

    );
};

export default BlogEditor;
