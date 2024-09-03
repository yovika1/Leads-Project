import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const LoginUserSchema = new mongoose.Schema(
  {

    isAdmin: {
      type: Boolean,
      default: false,
    },
    Password: {
      type: String,
    },
    Name: {
      type: String,
    },
    UserName:{
      type:String,
      unique:true,
    }
  },
  { timestamps: true }
);

LoginUserSchema.pre('save',async function(next){
  if(!this.isModified('Password')) return next();

  this.Password = await bcrypt.hash(this.Password,10)
  next()
})

export const User = mongoose.model("User", LoginUserSchema);
