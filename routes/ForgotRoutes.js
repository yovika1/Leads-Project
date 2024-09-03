import express from "express";
import { ForgotUsername } from "../controllers/forgotUser.js";
const forgotUserRoute = express.Router();

forgotUserRoute.post("/forgotuser",ForgotUsername);
  
export default forgotUserRoute;