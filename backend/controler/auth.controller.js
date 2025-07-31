import employeeModel from '../model/employee.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export async function loginuser(req,res) {
    try {
        //1. Extract email and password
        const { email, password } = req.body;
        //2. check validate email and password
        if (!email, !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        //3. check if email is present in database
        const user = await employeeModel.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "email not found" });
        }
        //4. compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMatch:", password, user.password, isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid passord" })
        }
        //5. create /sign a jwt token
        const token = jwt.sign({ id: user._id, email: user.email, userType: user.userType }, "prajwal123", { expiresIn: "1d" },

        );
        //6. send token to fronted as a response
        res.status(200).json({
            message: "login succesfull", token: token, user: { _id: user._id, email: user.email, userType: user.userType }
        })


    } catch (error) {
        console.log("Error while login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}