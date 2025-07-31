import express from "express"
import morgan from "morgan"
import mongoose from "mongoose";
import dotenv from "dotenv"
import {
    createEmployee,
    deleteEmployee,
    getAllEmployes,
    getEmployeeById,
    updateEmployee,

} from "./controler/employee.controler.js";
import { loginuser } from "./controler/auth.controller.js";
import { authorizeToken } from "./milddleware/auth.middleware.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT;


app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials if needed
}));



app.get((req, res) => {
    res
        .status(200)
        .json({ message: "wellcome to dharan!" });

});
app.post("/employee/create", createEmployee);
app.post("/auth/login", loginuser);
app.get("/employee/getAllEmployee", authorizeToken, getAllEmployes);
app.get("/employee/getEmployee/:id", getEmployeeById);
app.put("/employee/update/:id", updateEmployee);
app.delete("/employee/delete/:id", deleteEmployee);
app.post("/auth", loginuser);

app.get("/", authorizeToken,()=>{
    res.status(200).json({message:" Token verified successfully!"})
});


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("✅Database Connection Done.")
        app.listen(PORT, () => {
            console.log("Server is running at port: ", PORT)
        })
    }).catch((err) => {
        console.log("❌DateBase connection failed.", err)
    })

