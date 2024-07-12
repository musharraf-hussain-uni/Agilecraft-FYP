import jwt from "jsonwebtoken";

function generateToken(res, id, role) {
  const token = jwt.sign(
    {
      id: id,
      role: role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("access_token", token, {
    expires: new Date(Date.now() + 86400000),
    httpOnly: true,
  });

  return token;
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for missing authorization header
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  // Extract token from header (assuming "Bearer " format)
  const token = authHeader.split(" ")[1];

  // Verify token with robust error handling
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Differentiate between different types of errors
      if (err.name === "JsonWebTokenError") {
        // Handle malformed or invalid token
        return res.status(401).json({ message: "Invalid token." });
      } else if (err.name === "TokenExpiredError") {
        // Handle expired token
        return res
          .status(401)
          .json({ message: "Token expired. Please log in again." });
      } else {
        // Handle other errors
        console.error("Error verifying token:", err);
        return res.status(500).json({ message: "Internal server error." }); // Generic error for security
      }
    }

    // Store decoded user information in request object
    req.user = decoded.id;
    req.role = decoded.role;

    // Continue processing the request
    next();
  });
};
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     console.log("Received token:", token);

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.log("Token verification error:", err);
//         return res.status(401).json({
//           message: err.message,
//         });
//       }
//       console.log("Decoded token:", decoded);

//       req.user = decoded.id;
//       req.role = decoded.role;
//       next();
//     });
//   } else {
//     console.log("Authorization header is missing");
//     return res.status(401).json({
//       message: "Access denied. Token is missing.",
//     });
//   }
// };

export { generateToken, verifyToken };
