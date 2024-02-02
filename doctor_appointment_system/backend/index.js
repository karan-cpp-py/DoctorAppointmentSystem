require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
const routes = require('./routes/routes');

const app = express();
const PORT = 8000;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(routes);
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/hms").then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err);
})

app.listen(PORT, ()=> {
    console.log(`server started at ${PORT}`);
})