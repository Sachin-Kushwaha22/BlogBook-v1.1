import Header from './Pages/Home/Header'
import BlogPosts from './Pages/Home/BlogPosts'
import LandingPage from './Pages/Home/LandingPage'
import Footer from './Pages/Home/Footer'

function home() {
    return (
        <div>
            
            <Header />
            <LandingPage />
            <BlogPosts />
            <Footer />
            
        </div>
    )
}

export default home