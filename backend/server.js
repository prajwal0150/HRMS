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
import { authorizeToken, CheckRole } from "./milddleware/auth.middleware.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(morgan("dev"));
app.use(express.json());
app.use(cors());



app.get("/", authorizeToken, (req, res) => {
    res.status(200).json({ message: "Token verified successfully!" });
});


app.post("/employee/create", authorizeToken, CheckRole, createEmployee);
app.get("/employee/getAllEmployee", authorizeToken, CheckRole, getAllEmployes);
app.get("/employee/getEmployee/:id", getEmployeeById);
app.put("/employee/update/:id", updateEmployee);
app.delete("/employee/delete/:id", deleteEmployee);
app.post("/auth/login", loginuser);




mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("✅Database Connection Done.")
        app.listen(PORT, () => {
            console.log("Server is running at port: ", PORT)
        })
    }).catch((err) => {
        console.log("❌DateBase connection failed.", err)
    })

