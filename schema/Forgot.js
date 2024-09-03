import mongoose from "mongoose";

const ForgotSchema = new mongoose.Schema({
  UserName: {
    type: String, 
    required: true,
     unique: true },
  Password: { 
    type: String, 
    required: true },
});

export const ForgotPassSchema  = mongoose.model("forgotPassword", ForgotSchema);
