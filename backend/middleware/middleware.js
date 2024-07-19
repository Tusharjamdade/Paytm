const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

let authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Header = " +authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.json({
      msg : "Invalid Input"
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoder = jwt.verify(token, JWT_SECRET);
    if(decoder.userId){
      // console.log(decoder)
      req.userId = decoder.userId;
      next();
    }
  } catch (err) {
    return res.json({
      msg: "Error occured",
    });
  }
};

module.exports = authMiddleware;
