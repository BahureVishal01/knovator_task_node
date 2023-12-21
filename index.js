const express = require("express");
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const Config = require("./utils/config");
const { default: mongoose } = require("mongoose");
const routes = require("./routes/index");
const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended: false}));


//Handling uncaught exception

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught Exception');
    process.exit(1);
})

mongoose.connect(Config.DB).then(()=>{
    console.log("Mongodb connected...!!!")
}).catch(()=>{
    console.log("Database disconnected...")
})

app.use("/api", routes)



app.listen(port, ()=>{  console.log('server listening on port '+ Config.PORT); })

