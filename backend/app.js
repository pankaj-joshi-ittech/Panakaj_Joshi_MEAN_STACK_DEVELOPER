require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const cors = require("cors");
const studentRoutes = require('./Routes/Student/student');
const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;



// MONGO DB CREATION
mongoose.connect(db_url,
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})
.then(()=>{
    console.log('Database Connected');
},err =>{
    console.log(err);
});

app.use(bodyParser.json()); 
app.use(cors());
app.use("/api/student",studentRoutes);

// PORT CREATION
app.listen(port,()=>{
    console.log('Server is running',port);
});

