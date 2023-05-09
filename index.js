const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./connect");
const AuthController = require("./controllers/auth");
const ProductController = require("./controllers/products");

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(express.json())
app.use(cors(corsOptions));

app.get("/", (req,res) => {
    res.send("Hello world!")
});

try {
    async function start(){
        const { Models } = await connectDB();
        AuthController(app, Models);
        ProductController(app, Models);
        app.listen(3000, console.log("Server listening on port: 3000"));
    }
    start();
} catch (error) {
    console.log("Sorry! cannot start the server", error);
}