const jwt = require("jsonwebtoken");

const config = require("../utils/config")
const verifyAuth = async (req, res, next) => {
  try {
   
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access...!",
      });
    };
console.log("Sssssss", config.SECRET)
    const decodedData = jwt.verify(authorization,config.SECRET);

    console.log("decodedData",decodedData);

    if(decodedData){
        next()
    }else{
        return res.status(401).json({
            success: false,
            message: "Unauthorized access...!",
          });
    }
  
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization token",
      });
    }
    next(error);
  }
};

module.exports = verifyAuth;