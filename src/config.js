import { config } from "dotenv";
config({ path: process.ENV })

export default { 
    mongodbURL: process.env.MONGODB_URI || 'mongodb://localhost/tasksapi'
}