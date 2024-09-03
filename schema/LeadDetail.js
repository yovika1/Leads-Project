import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: { 
            type: String,
            required: true
        },
        productId: {
            type: String,
        }
            
        
    },
    { timestamps: true }
);

export const Lead = mongoose.model('Lead', LeadSchema);
