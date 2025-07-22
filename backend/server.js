import express from "express"
import morgan from "morgan"
import mongoose from "mongoose";
import dotenv from  "dotenv"
import createEmployee from "./controler/employee.controler.js";

dotenv.config();

const app= express();

const PORT= process.env.PORT;


app.use(morgan("dev"));
app.use(express.json());

app.get( (req, res)=>{
    res
    .status(200)
    .json({message:"wellcome to dharan!"});

})
app.post("/employee/create",createEmployee);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(" ✅Database Connection Done.")
    app.listen(PORT, ()=>{
    console.log("Server is running at port: ", PORT)
})
}).catch((err)=>{
    console.log("❌DateBase connection failed.", err)
})

app.listen(PORT, ()=>{
    console.log("Server is running at port: ", PORT)
})