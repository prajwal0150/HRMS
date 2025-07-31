import {model, Schema} from "mongoose"



const employeeSchema =new Schema({
    
    email: String,
    destignation: String,
    department: String,
    userType:String,
    salary:Number,
    password: String,


},
{timestamp:true}
);
const employeeModel= model("Employee", employeeSchema);

export default employeeModel;