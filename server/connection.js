const mongoose = require("mongoose");

function connectToDatabase(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000, 
    })
}

module.exports = {
    connectToDatabase,
}