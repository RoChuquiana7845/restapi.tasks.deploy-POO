import mongoose from "mongoose";
import config from "./config.js"

const connectDB = async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
        console.log(`Database is connect to: ${db.connection.name}`)
    } catch (error) {
        console.error(error);
    }
}

export default connectDB;