const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "Paytm_Harkirat",
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.log(err);
    }
};

app.get("/", (req, res) => {
    res.json("Server is up and running");
});

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server is running on port", process.env.PORT);
});
