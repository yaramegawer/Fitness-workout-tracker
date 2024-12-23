import  express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/connection.js';
import userRouter from './src/user/userRouter.js';

const app = express()
dotenv.config();

await connectDB();

app.use(express.json())

app.use('/user',userRouter);

app.all('*',(req,res,next)=>{
    return next(new Error('page not found!!',{cause:404}))
})

app.use((error,req, res,next) => {
    const statusCode=error.cause||500;
    res.status(statusCode).json({
        success:false,
        message:error.message,
        stack:error.stack
    });
});



app.listen(process.env.PORT, () => console.log(`App listening at ${process.env.PORT}`));