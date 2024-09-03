// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    Name: { 
        type: String,
         required: true
        
     },
    // Add other fields as necessary
});

export const Product = mongoose.model('Product', ProductSchema);


