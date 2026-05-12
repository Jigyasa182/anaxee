const Product = require('../models/product.model');

const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { sku: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        const products = await Product.find(query)
            .sort({ lastUpdated: -1 })
            .exec();

        res.status(200).json({ products });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }   
        res.status(200).json(product);
    }   
    catch (err) {
        res.status(500).json({ message: err.message });
    }   
};

const createProduct = async (req, res) => {
    const { name, sku, category, price, stockQuantity } = req.body;
    
    try {
        console.log("Creating product with body:", req.body);
        const product = new Product({ 
            name, 
            sku, 
            category, 
            price, 
            stockQuantity
        });   
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }
    catch (err) {
        console.error("Error creating product:", err);
        res.status(400).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, sku, category, price, stockQuantity } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { 
                name, 
                sku, 
                category, 
                price, 
                stockQuantity,
                lastUpdated: Date.now() 
            }, 
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }   
        res.status(200).json(updatedProduct);
    }   
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};