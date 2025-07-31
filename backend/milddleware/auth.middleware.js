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
        // 5. if verified, check role
        const { userType } = decoded;
        if (userType !== "hr" && userType !== "manager") {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    } catch (error) {
        console.log("Error verify token:", error);
        return res.status(400).json({ message: "Invalid token" });
        // 6. if unverified , send error message 
    }
}