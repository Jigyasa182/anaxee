const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');

const { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct 
} = require('../controllers/product.controller');

router.use(protect);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;