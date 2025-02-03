const mongoose = require("mongoose");

function connectToDatabase(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = {
    connectToDatabase,
}