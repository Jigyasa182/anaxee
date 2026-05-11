const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(201).json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductById = async (req, res) => {
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

exports.createProduct = async (req, res) => {
    const { name, price } = req.body;
    const product = new Product({ name, price });   
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }   
        res.status(200).json(updatedProduct);
    }   
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
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