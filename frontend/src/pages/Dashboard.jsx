import React from 'react'
import { useState , useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProductTable from '../components/ProductTable'

const Dashboard = () => {
const [products, setProducts] = useState([]);


const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
};

useEffect(() => {
    fetchProducts();
}, []);

const addProduct = async (product) => {
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        setProducts([...products, data]);
    }
    catch (error) {
        console.error('Error adding product:', error);
    }
};

const handleEdit = async (productId, updatedProduct) => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        const data = await response.json();
        setProducts(products.map(product => product.id === productId ? data : product));
    }
    catch (error) {
        console.error('Error updating product:', error);
    }

};

const handleDelete = async (productId) => {
    try {
        await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });
        setProducts(products.filter(product => product.id !== productId));
    }
    catch (error) {
        console.error('Error deleting product:', error);
    }
};

  return (
    <div>
        <Navbar />
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Product Dashboard</h1>
            <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />            
        </div>


    </div>
  )
}

export default Dashboard
