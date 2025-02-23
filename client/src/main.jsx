import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Auth0Provider } from '@auth0/auth0-react';
import HomePage from './Home'
import Signin from './Pages/Auth/Signin'
import Signup from './Pages/Auth/Signup'
import Readblog from './Pages/Content/Read/readBlog'
import Writeblog from './Pages/Content/Write/writeBlog'
import Dashboard from './Pages/Dashboard/dashboard'
// import UserDashboard2 from './Pages/DashBoard/User DashBoard HTML/design.jsx'
import UserDashboard from './Pages/DashBoard/User DashBoard HTML/UserDashBoard.jsx'
import Profile from './Pages/Profile/profile'
import Admin from './Admin/adminPanel'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-wjqmejczh66n5576.us.auth0.com"
        clientId="uoAnMJMTGEe2xWAHnlO0NeEWuBt7UwMc"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce} />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} /> */}
          <Route path="/readBlog/:id" element={<Readblog />} />
          <Route path="/writeBlog" element={<Writeblog />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/dashboard/test2" element={<Dashboard />} />
          {/* <Route path="/user/dashboard/test" element={<UserDashboard />} /> */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>,
)
