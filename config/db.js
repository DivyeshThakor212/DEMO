const mongoose = require('mongoose')

const db = async () => {
    //console.log(process.env.Mongo_URL)
    try {
        // mongoose.set("strictQyery", false)
        await mongoose.connect(process.env.Mongo_URL)
        console.log("database connected")
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { db }
