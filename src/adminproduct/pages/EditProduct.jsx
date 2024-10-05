import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import productService from '../services/productService';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        imageUrl: '',
        rate: '',
        ratingCount: '',
    });
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    console.log('Product ID:', id);

// Fetch product data on mount
useEffect(() => {
    const fetchProduct = async () => {
        console.log('Fetching product with ID:', id);        try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const productData = await response.json();
            setProduct(productData); 
        } catch (error) {
            setError('Error fetching product');
        } finally {
            setLoading(false);
        }
    };

    fetchProduct();
}, [id]);


    // Handle product update
    const handleUpdate = async (e) => {
        e.preventDefault(); 
        try {
            await productService.updateProduct(id, product);
            Swal.fire({
                title: "Product Updated",
                text: "Your product has been successfully updated!",
                icon: "success",
                confirmButtonText: "Okay"
            });
            navigate('/admin-product'); 
        } catch (error) {
            console.error('Error updating product:', error);
            const errorMessage = error.response?.data?.message || "An error occurred while updating the product.";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
                confirmButtonText: "Try Again"
            });
            setError(errorMessage); 
        }
    };

    // Show a loading message while fetching product data
    if (loading) {
        return <div className="text-center">Loading product details...</div>;
    }

    return (
        <div className="container mx-auto mt-8 border bg-gray-200 border-gray-400 p-4">
            <div className="flex items-center mb-6">
                <Link to="/admin-product" className="flex items-center text-blue-600 hover:underline mr-4">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-black text-2xl" />
                </Link>
                <h2 className="text-3xl font-bold">Edit Product</h2>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleUpdate} className="space-y-4">
                <div className="flex space-x-4">
                    <TextField
                        id="product-name"
                        label="Product Title"
                        variant="outlined"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        id="product-price"
                        label="Product Price"
                        variant="outlined"
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                        fullWidth
                    />
                    <TextField
                        id="product-category"
                        label="Product Category"
                        variant="outlined"
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        fullWidth
                    />
                </div>
                <TextField
                    id="product-description"
                    label="Product Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    fullWidth
                />
                <TextField
                    id="product-image-url"
                    label="Product Image URL"
                    variant="outlined"
                    type="text"
                    value={product.imageUrl}
                    onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                    fullWidth
                    helperText="Must start with https://"
                />
                <div className="flex space-x-4">
                    <TextField
                        id="product-rate"
                        label="Product Rate"
                        variant="outlined"
                        type="number"
                        value={product.rate}
                        onChange={(e) => setProduct({ ...product, rate: parseFloat(e.target.value) })}
                        fullWidth
                    />
                    <TextField
                        id="rating-count"
                        label="Rating Count"
                        variant="outlined"
                        type="number"
                        value={product.ratingCount}
                        onChange={(e) => setProduct({ ...product, ratingCount: parseInt(e.target.value) })}
                        fullWidth
                    />
                </div>
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg">
                    Edit Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
