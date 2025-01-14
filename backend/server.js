require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/dissolvedOxygen');

const app = express();

//middleware
app.use(express.json());
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/data', dataRoutes)

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