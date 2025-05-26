const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const phq9Routes = require('./routes/phq9Routes')
const userRoutes = require('./routes/userRoute')



connectDB()

const corsOptions = {
      origin: 'https://mind-matter-app.vercel.app', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



app.use('/api/phq9', phq9Routes);
app.use('/api/user', userRoutes)

app.use((err, req, res, next) => {
      console.error(err.stack); 
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode).json({
        message: err.message,
        
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
      });
    });

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})
