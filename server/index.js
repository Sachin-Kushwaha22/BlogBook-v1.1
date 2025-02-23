const express = require("express")
const cors = require("cors")
const path = require("path")
const { connectToDatabase } = require("./connection")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
require('dotenv').config();
const PORT = process.env.PORT || 9010
const userRoute = require("./routes/user")
const blogPostRoute = require("./routes/blog")
const userStaticRoute = require("./routes/staticUser")
const blogRoute = require("./routes/deleteBlog")
const adminRoute = require('./routes/adminRoute')
const feedbackRoute = require("./routes/feedback")
const oauthGoogleRoute = require('./routes/oauthGoogle')
const { restrictUserLogin, checkauth } = require("./middlewares/auth")
const followFeature = require('./routes/followFeature')

const http = require("http"); // Import HTTP for WebSocket support
const setupSocket = require("./socket"); // Import Socket.IO setup


const app = express()
const server = http.createServer(app); // Create HTTP server

connectToDatabase(process.env.DATABASE_URL)
    .then(() => { console.log("Connected to database !!") })
    .catch((error) => { console.log("Error connecting to database !!", error) })

app.use(
    cors({
        origin: "https://blogbook-v1.onrender.com",
        credentials: true,
    })
);
app.use(express.json({ limit: '5mb'}))
app.use(express.urlencoded({ extended: true, limit: '5mb' }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join('public')))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use('/google/user', oauthGoogleRoute)
app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use('/', checkauth, userStaticRoute)
app.use('/blog', restrictUserLogin, blogRoute)
app.use('/post', checkauth, blogPostRoute)
app.use('/follow', checkauth, followFeature)
app.use('/feedback', checkauth, feedbackRoute)

// setup socket.io
setupSocket(server); // Pass the HTTP server to the Socket.IO setup

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
