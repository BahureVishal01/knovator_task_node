const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Config = require("../utils/config");
const jwt = require("jsonwebtoken");


 /**
 * Controller for signin
 */
const signup = async(req, res)=>{
    // How the user sign up will happen   

    const userObjToBeStoredInDB = {
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }
    /**
     * Insert this new user to the db
     */
    try{
        // $and: [{ userName: userObjToBeStoredInDB.userName }, { email: userObjToBeStoredInDB.email }]
        const user = await User.findOne({email:userObjToBeStoredInDB.email});

          if(user){
            return res.status(409).json({
                 success: false,
                 message: 'This email is already exists, Please signin.' 
                });
          }
        const userCreated = await User.create(userObjToBeStoredInDB);
       
         /** Successfull signup */
    // we need to generate access token now

    const token = jwt.sign({id: userCreated._id}, Config.SECRET,{
        expiresIn: "1d"
    });
        const userCreationResponse = {
            userId: userCreated._id,
            name : userCreated.name,
            userName : userCreated.userName,
            email : userCreated.email,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt,
            accessToken: token,

        }
       res.status(201).json({
        success : true,
        message : "Thanks for Registered.",
        data :userCreationResponse
    });
    }catch(err){
        console.error('Error while creating new user', err.message);
        res.status(500).send({
            success : false,
            message: "some internal error while inserting new user"
        })
    }
};

/**
 * Controller for signin
 */

const signin = async(req, res)=>{
    // Search the user if it exists
    try{
        const user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(400).send({
                success : false,
                message: 'Failded ! User id does not exist'
            })
        }
         // User is existing , so now we will do the password matching
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({
            success : false,
            message: "Invalid Password"
        })
    }
    /** Successfull login */
    // we need to generate access token now
    const token = jwt.sign({id: user._id}, Config.SECRET,{
        expiresIn: "1d"
    });

    //Send the response back
   return  res.status(200).json({
      success : true,
      message : "You have logged in successfully.",
      data : {
        name: user.name,
        userId: user._id,
        email: user.email,
        accessToken: token
    }
   })

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            success : false,
            message: "some internal error while login"
        })
    }
 
};
module.exports = {signup, signin}