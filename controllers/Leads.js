import {Lead} from '../schema/LeadDetail.js'
import Products from '../constant/productData.js';
// Create Lead
export const createLead = async (req, res) => {
    try {
        const lead = new Lead(req.body);
        console.log(lead);
        await lead.save();
        res.status(201).json(lead);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Get All products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json(products);
        console.log(products)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};


// Update Lead
export const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(lead);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Delete Lead
export const deleteLead = async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ status: 'success', message: 'Lead deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Search and Sort Leads
export const searchLeads = async (req, res) => {
    try {
        const { name, email, productId, sortBy, order, search } = req.query;

        // Build the query object based on search parameters
        let query = {};
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query = {
                $or: [
                    { name: searchRegex },
                    { email: searchRegex },
                    { phone: searchRegex }, // Add more fields as needed
                ]
            };
        } else {
            if (name) query.name = new RegExp(name, 'i');
            if (email) query.email = new RegExp(email, 'i');
            if (productId) query.productId = productId;
        }

        // Build sorting options
        const sortOptions = {};
        if (sortBy) sortOptions[sortBy] = order === 'desc' ? -1 : 1;

        // Fetch leads from the database
        const leads = await Lead.find(query).populate('productId').sort(sortOptions);
        const productMap = new Map(Products.map(product => [product._id, product]));
        const leadsWithProducts = leads.map(lead => {
            return {
              ...lead.toObject(), // Convert Mongoose document to plain object
              product: productMap.get(lead.productId) // Attach the product details
            };
          });
        console.log("leadsWithProducts",leadsWithProducts);
        
        res.json(leadsWithProducts);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

