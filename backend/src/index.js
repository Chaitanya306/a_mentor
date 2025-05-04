import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './dataBase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT=process.env.PORT || 5000;
let users=null;
const secret = 'my-secret-key';

/*
app.get('/',(req,res)=>{
    res.send('Hello World!');
});
*/

app.post('/signup',async (req,res)=>{
    const {email,password}=req.body;
    
    bcrypt.hash(password, 10, async function(err, hash) {
        // Store hash in your password DB.
        try {
            const ans=await users.insertOne({username:email, password:hash});
            
         } catch (e) {
            console.log(e);
         };
    });
})

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user=await users.findOne({username:email});
        if(!user){
            
            return res.status(401).json({message:'User not found'});
        }
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(result){
                const payload = { email:email };
            
                const options = { expiresIn: '90d' };
                const token = jwt.sign(payload, secret, options);
                
                return res.status(200).json({token:token,message:'Login successful'});
            }else{
                return res.status(401).json({message:'Invalid credentials'});
            }
        });
    }catch(e){ console.log(e);}
    
    
})

app.listen(PORT,async ()=>{
    console.log( `Server is running on port ${PORT}`);
    
    const db=await connectDB()
    users = db.collection('users');
    
    
});
