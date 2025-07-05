import mongoose from 'mongoose';

const mongourl = "mongodb+srv://samradhi4320:samradhi%40123@cluster0.gmqubin.mongodb.net/";

if(!mongourl){
    console.log("no mongourl");
}

let isconnection = false;

export async function dbconnection() {
    if(isconnection){
        return;
    }
    try {
        const db = await mongoose.connect(mongourl);
        isconnection = true;
        console.log("mongodb connected");
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
