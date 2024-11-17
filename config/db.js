const mongoose = require('mongoose')
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL , {
        });
        console.log("mongo db connected")
    } catch (error) {
        console.log("error in connnection",error.message);
    }
}
module.exports = connectDb