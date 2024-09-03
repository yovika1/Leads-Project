import Jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../schema/UserDetails.js";
import bcrypt from "bcrypt"
import { checks } from "../constant/pswdAuthData.js";


export const RegisterUser = async (req, res) => {
  try {
    const { UserName, Name, Password, isAdmin } = req.body;
    console.log(UserName);
    // Password validation checks
       const errors = checks
      .filter(check => !check.regex.test(Password))
      .map(check => check.message);

    if (errors.length > 0) {
      throw new ApiError(400, `Password must contain ${errors.join(', ')}.`);
    }

    console.log("username: " + UserName);

    const existingUser = await User.findOne({ UserName: UserName });
    console.log(existingUser);
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    } else {
      const userDetails = await User.create({
        UserName,
        Name,
        Password,
        isAdmin
      });

      // Generate the token
      const token = Jwt.sign({ id: userDetails._id }, process.env.ACCESS_TOKEN);
      res.status(200).json({
        message: "User created successfully",
        userDetails,
        token,
      });
      // console.log("User created successfully", userDetails, token)
    }

  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
      success: false,
      errors: error.errors || [],
    });
    console.error("Server Error", error);
  }
};


//for login user
export const LoginUser = async (req, res) => {
  const { UserName, password } = req.body;
console.log(UserName)
  try {
    const existingUser = await User.findOne({UserName : UserName});
    if (existingUser) {
      //compare the password
      console.log(existingUser)
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.Password
        
      );
      if (passwordMatch) {
        const token = Jwt.sign(
          { id: existingUser._id },
          process.env.ACCESS_TOKEN,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
        );
        res.status(200).json({
          message: "User logged in successfully",
          existingUser,
          token,
        });
  
      } else {
        throw new ApiError(400, "Invalid credentials");
      }
    } else {
      throw new ApiError(400, "User doesn't exist");
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
      success: false,
      errors: error.errors || [],
    });
    console.error("Something went wrong", error);
  }
};


