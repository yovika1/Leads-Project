import dotenv from "dotenv";
import express from "express";
import adminUserRoute from "./routes/AdminRoutes.js";
import connectDB from "./dbconnection/Connection.js";
import cors from "cors";
import forgotUserRoute from "./routes/forgotRoutes.js";
import LeadsRoutes from "./routes/LeadRoutes.js";

const app = express();
dotenv.config();

app.use (express.json());
app.use(cors())


app.use(adminUserRoute);
app.use(forgotUserRoute);
app.use('/leads',LeadsRoutes);
app.use('/product',LeadsRoutes);
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running at::${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!", err);
  });
  