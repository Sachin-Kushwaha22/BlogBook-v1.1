const mongoose = require("mongoose");

function connectToDatabase(url) {
    return mongoose.connect(url, {
        serverSelectionTimeoutMS: 20000, 
    })
}

module.exports = {
    connectToDatabase,
}