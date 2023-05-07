const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./connect");
const cors = require("cors");

//middlewares
app.use(express.json())
app.use(cors());

app.get("/", (req,res) => {
    res.send("Hello world!")
});

try {
    async function start(){
        const { Models } = await connectDB();
        app.listen(3000, console.log("Server listening on port: 3000"));
    }
    start();
} catch (error) {
    console.log("Sorry! cannot start the server", error);
}