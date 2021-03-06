const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
// DB Config 
const db = require('./config/keys').mongoURI;


app.use(express.json());
app.use(cors());
app.use(express.json({ type: 'application/*+json' }))

// Connect to mongodb

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connect to mongodb")
    }).catch(err => console.warn(err))

//routes    
app.use("/users", require("./routes/auth"));
app.use("/users", require("./routes/userRequest"));
app.use("/admin", require("./routes/leavetype"));
app.use("/admin", require("./routes/department"));


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on  ${PORT}`));

module.exports = app;