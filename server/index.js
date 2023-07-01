
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './Routes/post.js';
import userRoutes from './Routes/user.js'
import dotenv from 'dotenv';



const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
// app.get('/',(req,res)=>{
//   res.send('API Runnnug')
// })

app.get('/',(req,res)=>{
  res.send('App Is Running')
})

//DAGghhKeoRolMen6


const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);