import employeeModel from "../model/employee.model.js";
import bcrypt from "bcrypt";

export async function createEmployee(req, res) {
  try {
    // 1. Extract data from request body
    const { name, email, designation, department, salary, password, userType } = req.body;

    // 2. Validate all fields
    if (!name || !email || !designation || !department || !salary || !password || !userType) {
      return res.status(400).json({ message: "All the fields are required." });
    }

    // 3. Check if email already exists
    const isEmailExist = await employeeModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ message: "This email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);// Hash the password


    // 4. store the data in database
    const newEmployee = await employeeModel.create({
      name,
      email,
      designation,
      department,
      salary,
      password: hashedPassword,
      userType
    });



    // 5. Send successful message
    res.status(200).json({ message: "Employee created successfully", data: newEmployee });

  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//function to get employee data 

export async function getAllEmployes(req, res) {
  try {
    const allEmployee = await employeeModel.find();

    if (allEmployee.length === 0) {
      return res.status(404).json({ message: "No employee records found." });
    }

    res.status(200).json({ message: "Data found", data: allEmployee });
  } catch (error) {
    console.error("Error while getting employee data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getEmployeeById(req, res) {
  try {
    const id = req.params.id;
    const employee = await employeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." })

    } res.status(200).json({ message: "Employee data found.", data: employee });

  } catch (error) {
    console.log("Error while getiing employee by id.", error)
    res.status(500).json({ message: "Internel server error" })
  }
}
// Function to Update Employee data
export async function updateEmployee(req, res) {
  try {
    // 1. Kun employee ko data update garni ho ?
    const id = req.params.id;

    // 2. K K data update garno ho
    const { name, email, designation, department, userType, salary, password } =
      req.body;
    // 3. La data update garum hai
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        designation,
        department,
        userType,
        salary,
        password,
      },
      { new: true }
    );

    // 4. La message pathaidim
    res
      .status(200)
      .json({ message: "Employee Data updated.", data: updatedEmployee });
  } catch (error) {
    console.log("Error while updating employee :", error);

    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteEmployee(req, res) {
  try {
    // 1. Kun employee ko delete garni id chaiyooo
    const id = req.params.id;

    // delete the employee
    const deletedEmployee = await employeeModel.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ message: "Employee to be deleted not found" });
    }

    res
      .status(200)
      .json({ message: "Employee data deleted.", data: deletedEmployee });
  } catch (error) {
    console.log("Error while deleting Employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
