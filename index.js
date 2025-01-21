import  express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/connection.js';
import userRouter from './src/modules/user/userRouter.js';
import workoutRouter from './src/modules/workout/workoutRouter.js';
import exerciseRouter from './src/modules/exercise/exerciseRouter.js';
const app = express()
dotenv.config();

await connectDB();

app.use(express.json())

app.use('/user',userRouter);
app.use('/workout',workoutRouter);
app.use('/exercise',exerciseRouter);

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