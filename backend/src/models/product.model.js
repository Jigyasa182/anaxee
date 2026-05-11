const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    sku: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }, 
    price: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,     
    }, 
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', ProductSchema);