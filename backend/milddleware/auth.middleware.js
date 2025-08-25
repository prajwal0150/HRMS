import jwt from "jsonwebtoken";

// Middleware to authorize token
export function authorizeToken(req, res, next) {

    // 1. Extract token from middleware
    const authHeader = req.headers.authorization;

    // 2. check if token is available
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(400).json({ message: "No token provided" });
    }
    // 3. Split the token
    const token = authHeader.split(" ")[1];
    // 4. verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error verify token:", error);
        return res.status(400).json({ message: "Invalid token" });
    }
}
export function CheckRole(req, res, next) {
    const user = req.user;
    const { userType } = user;
    if (userType.toLowerCase() == "employee") {
        return res.status(400).json({ message: "Access Denied" })
    }
    next();
}
