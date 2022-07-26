require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.94nqjxa.mongodb.net/?retryWrites=true&w=majority`, 
            // are no longer supported options
            // {
            //     useCreateIndex: true,
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     useFindAndModify: false
            // }
        )
        console.log('mongoDB connected')
    }
    catch(error) {
        console.log(error.message)
        process.exit(1)
    }
}


connectDB()
const app = express()

app.use(express.json())

var corsOption = {
    origin: 'http://localhost:3000'
}


app.use('/api/auth',cors(corsOption), authRouter)
app.use('/api/posts',cors(corsOption), postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))