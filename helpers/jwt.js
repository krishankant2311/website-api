
import jwt from "jsonwebtoken";


export const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET || "MY_SECRET_KEY", {
      expiresIn: "3d",
    });

    return token;
  } catch (error) {
    console.error("JWT Generate Error:", error);
    return null;
  }
};

//  Token verify karne ka middleware
export const verifyToken = (req, res, next) => {
  try {
    const incomingToken = req.headers.token; 

    if (!incomingToken) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    const decoded = jwt.verify(
      incomingToken,
      process.env.JWT_SECRET || "MY_SECRET_KEY"
    );

    req.user = decoded; 
    next();
  } catch (error) {
    console.error("JWT Verify Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
