import express from "express";
import { createLead, deleteLead , getProducts,  searchLeads, updateLead } from "../controllers/Leads.js";
import Product from "../constant/productData.js";

const LeadsRoutes = express.Router();

LeadsRoutes.post('/create',createLead);
// LeadsRoutes.get('/getting',getProducts); 
LeadsRoutes.put('/update/:id',updateLead);
LeadsRoutes.delete('/delete/:id',deleteLead);
LeadsRoutes.get('/search',searchLeads);
LeadsRoutes.get('/getProduct',(req,res) => res.json (Product));

export default LeadsRoutes;