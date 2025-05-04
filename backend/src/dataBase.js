import mongoose from 'mongoose';
 async function connectDB() {
    
    try {
        const MONGOURI=process.env.MONGOURI;
        let dbconnect=await mongoose.connect(MONGOURI)
        console.log('MongoDB connected successfully');
        const db = mongoose.connection.db;
        return db
        /*
        const users = db.collection('users');
        
        
        console.log('below collection')
        const results = await users.find({}).toArray();
        console.log(results)
        */
    }catch(err) {
        console.log('MongoDB connection failed', err);
    }
    
    //console.log(db.getCollection('users'))
    
    //const results = await users.find({}).toArray();
    
    
    
 }

export default connectDB;