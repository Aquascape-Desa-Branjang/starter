require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const {mongo} = require("mongoose");

const app = express();

//middleware
app.use(express.json());
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

//routes


//connect to db
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to DB & Server started on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.error(err);
})