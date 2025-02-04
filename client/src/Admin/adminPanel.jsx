import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './adminPanel.css'
import {useAuth0} from '@auth0/auth0-react'

function AdminPanel() {
    const { isAuthenticated, user} = useAuth0()

    useEffect(()=>{
        if(!isAuthenticated && user){
            saveAdmin()
        }
    },[])

    return (
        <div className="adminPanel">
            <div className='adminsidebar'>
                <p className="slidebutton"><svg id='adminsvg' xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" >
                    <path d="M12 19V5M18 19V5M6 19V5" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                </svg></p>
                <div className='adminprofile'>
                    <h2 className="adminheading">ADMIN</h2>
                    <div className='adminprofilepic'>
                        <img id='adminprofilepic' src="" alt="pic" />
                    </div>
                    <div className='profilename'>
                        Sachin Kushwaha
                    </div>
                </div>
                <div className='adminline'></div>
                <div className="sidebaroption">
                    <div className="optionbox">
                        <p className="admindashboard options"> <svg className='adminoptionsvg' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 26 26">
                            <path d="M 20 2.03125 C 19.449219 2.03125 19 2.480469 19 3.03125 L 19 7.8125 L 13.71875 2.53125 C 13.328125 2.140625 12.671875 2.140625 12.28125 2.53125 L 0.5625 14.28125 C 0.171875 14.671875 0.171875 15.296875 0.5625 15.6875 C 0.953125 16.078125 1.578125 16.078125 1.96875 15.6875 L 13 4.65625 L 24.0625 15.71875 C 24.257813 15.914063 24.523438 16.03125 24.78125 16.03125 C 25.039063 16.03125 25.273438 15.914063 25.46875 15.71875 C 25.859375 15.328125 25.859375 14.703125 25.46875 14.3125 L 22 10.84375 L 22 3.03125 C 22 2.480469 21.550781 2.03125 21 2.03125 Z M 13 6.5 L 2 17.5 L 2 23 C 2 24.65625 3.34375 26 5 26 L 21 26 C 22.65625 26 24 24.65625 24 23 L 24 17.5 Z M 11 16 L 15 16 C 15.550781 16 16 16.449219 16 17 L 16 23 C 16 23.550781 15.550781 24 15 24 L 11 24 C 10.449219 24 10 23.550781 10 23 L 10 17 C 10 16.449219 10.449219 16 11 16 Z"></path>
                        </svg> Dashboard</p>
                        <div className='optionline'></div>
                        <p className="admindashboard options"> <svg className='adminoptionsvg svg2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 53" id="analytics">
                            <path d="M49.5 44.74h-3.12v-27a1 1 0 0 0-1-1h-6.05a1 1 0 0 0-1 1v27H34V23.3a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v21.44h-4.3V30.86a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v13.88h-3.29V11.07a1 1 0 0 0-2 0v34.67a1 1 0 0 0 1 1H49.39a1 1 0 0 0 0-2zm-9.17-26h4.05v26h-4.05zM28 24.3h4v20.44h-4zm-12.35 7.56h4v12.88h-4zM3.5 14.89h1.8a1 1 0 1 0 0-2H3.5a1 1 0 0 0 0 2zm0 5.99h1.8a1 1 0 1 0 0-2H3.5a1 1 0 0 0 0 2zm0 5.98h1.8a1 1 0 1 0 0-2H3.5a1 1 0 0 0 0 2zm0 5.99h1.8a1 1 0 0 0 0-2H3.5a1 1 0 0 0 0 2zm0 5.99h1.8a1 1 0 0 0 0-2H3.5a1 1 0 0 0 0 2zm0 5.99h1.8a1 1 0 0 0 0-2H3.5a1 1 0 0 0 0 2z"></path>
                            <path d="M15.12 21.88a1 1 0 0 0-.79 1.18 1 1 0 0 0 1 .81h.19c.63-.13 14.58-3 24.32-13.52l-.07.93a1 1 0 0 0 .93 1.06h.07a1 1 0 0 0 1-.94L42 7.31a1 1 0 0 0-1.16-1.06l-4 .66a1 1 0 1 0 .32 2l1.44-.23C29.31 19 15.27 21.86 15.12 21.88Z"></path>
                        </svg>
                            Analytics</p>
                        <div className='optionline'></div>
                        <p className="admindashboard options"><svg className='adminoptionsvg' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                            <path d="M 11 6 L 11 58 L 53 58 L 53 24.154297 C 53 22.117297 52.280703 20.144938 50.970703 18.585938 L 42.109375 8.0429688 C 41.021375 6.7479688 39.416609 6 37.724609 6 L 11 6 z M 15 10 L 36.695312 10 C 39.985312 10 41 11.365078 41 12.580078 C 41 14.365078 39 17 39 17 C 48.761 21.62 48.816406 21.618547 48.816406 25.185547 C 48.816406 30.185547 49 54 49 54 L 15 54 L 15 10 z M 22 26 L 22 30 L 42 30 L 42 26 L 22 26 z M 22 34 L 22 38 L 42 38 L 42 34 L 22 34 z M 22 42 L 22 46 L 35 46 L 35 42 L 22 42 z"></path>
                        </svg> Blogs</p>
                        <p className="admindashboard options"><svg className='adminoptionsvg' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1" id="Layer_1" viewBox="0 0 24 24" xml:space="preserve">
                            <path d="M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5  S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9  c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z" />

                        </svg> Users</p>
                        <div className='optionline'></div>
                        <p className="admindashboard options"><svg className='adminoptionsvg svgcurrency' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve">

                            <g>
                                <path class="st0" d="M318.213,66.588h107.818L465.37,0H85.969L46.63,66.588h145.727c32.137,9.476,58.259,28.504,72.702,52.656   H85.969l-39.34,66.588h227.316c-13.482,45.473-65.618,79.365-127.924,79.365H68.313v60.013L288.818,512h96.012v-23.222   L183.333,321.936c84.557-3.351,153.634-61.218,166.283-136.105h76.415l39.339-66.588H345.687   C340.062,100.028,330.637,82.256,318.213,66.588z" />
                            </g>
                        </svg> Billings</p>
                        <p className="admindashboard options"><svg className='adminoptionsvg' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                            <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
                        </svg> Settings</p>
                    </div>
                </div>

            </div>
            <div className='adminbodycontainer'>
                <div className='adminbody'>
                    <div className="adminheader">
                        <nav className='adminnavbar'>
                            <h2 className='heading'>DASHBOARD</h2>
                            <div className="searchbar">
                                search
                            </div>
                            <div className='adminnavbarbuttons'>
                                <div className='changetheme'>
                                    
                                </div>
                                <div className='adminlogout'><svg className='adminlogoutsvg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H10C10.5523 20 11 20.4477 11 21C11 21.5523 10.5523 22 10 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H10C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4H6ZM15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929L17.5858 13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H17.5858L15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289Z" fill="currentColor"></path></svg> Logout</div>
                            </div>
                        </nav>
                    </div>

                    <div className='adminanalytics'>
                        <div className='analyticrow1'>
                            <div className="analyticrow1box analyticsbox box1"></div>
                            <div className="analyticrow1box analyticsbox box2"></div>
                            <div className="analyticrow1box analyticsbox box3"></div>
                            <div className="analyticrow1box analyticsbox box4"></div>
                        </div>
                        <div className="analyticrow2">
                            <div className='analyticrow2col1'>
                                <div className="analyticrow2col1box analyticsbox box5"></div>
                                <div className="analyticrow2col1row">
                                    <div className="analyticrow2col1rowbox analyticsbox box6"></div>
                                    <div className="analyticrow2col1rowbox analyticsbox box7"></div>
                                </div>
                            </div>
                            <div className="analyticrow2col2">
                                <div className="analyticsbox box8"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminPanel