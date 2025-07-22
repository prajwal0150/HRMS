import employeeModel from "../models/employeemodels.js";

async function createEmployee(req, res) {
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

    // 4. store the data in database
    const newEmployee =await employeeModel.create({
      name,
      email,
      designation,
      department,
      salary,
      password,
      userType
    });

   

    // 5. Send successful message
    res.status(200).json({ message: "Employee created successfully", data: newEmployee });

  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export default createEmployee;
