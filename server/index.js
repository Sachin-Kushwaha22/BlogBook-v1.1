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

const http = require("http"); // Import HTTP for WebSocket support
const setupSocket = require("./socket"); // Import Socket.IO setup


const app = express()
const server = http.createServer(app); // Create HTTP server
//mongodb+srv://sachin8n:sachin2219@nodetesting01.n48lb.mongodb.net/
//mongodb+srv://sachin8n:<db_password>@nodetesting01.n48lb.mongodb.net/?retryWrites=true&w=majority&appName=NodeTesting01
connectToDatabase("mongodb+srv://sachin8n:sachin2219@nodetesting01.n48lb.mongodb.net/authentication-practise-database")
    .then(() => { console.log("Connected to database !!") })
    .catch((err) => { console.log("Error connecting to database !!", err) })

app.use(
    cors({
        origin: "http://localhost:5173",
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
app.use('/feedback', checkauth, feedbackRoute)

// setup socket.io
setupSocket(server); // Pass the HTTP server to the Socket.IO setup

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})