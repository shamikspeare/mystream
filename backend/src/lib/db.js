import mongoose from 'mongoose'

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected: ${conn.connection.host}`);
        const client = mongoose.connection;
    } catch(error){
        console.log('error connecting to mongoDB', error);
        process.exit(1); // failure means 1
    }
}