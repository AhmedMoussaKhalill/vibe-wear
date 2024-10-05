import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2'; 

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [rate, setRate] = useState('');
    const [ratingCount, setRatingCount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation for empty fields
        if (!name || !price || !description || !category || !imageUrl || !rate || !ratingCount) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all the fields!",
            });
            return;
        }

        const newProduct = {
            name,
            price: parseFloat(price), // Ensure price is a number
            description,
            category,
            imageUrl,
            rate: parseFloat(rate), // Ensure rate is a number
            ratingCount: parseInt(ratingCount), // Ensure ratingCount is an integer
        };

        try {
            const response = await axios.post('/api/products', newProduct);
            console.log('Product added:', response.data);

            // Show success message only when the request is successful
            Swal.fire({
                title: "Product Added",
                text: "Your product has been successfully added!",
                icon: "success",
            });

            setName('');
            setPrice('');
            setDescription('');
            setCategory('');
            setImageUrl('');
            setRate('');
            setRatingCount('');
        } catch (err) {
            console.error('Error adding product:', err);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to add product. Please try again.",
            });

            setError('Failed to add product');
        }
    };
    return (
        <div className="container mx-auto mt-8 border bg-gray-200 border-gray-400 p-4">
            <div className="flex items-center mb-6">
                <Link to="/admin-product" className="flex items-center text-blue-600 hover:underline mr-4">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-black text-2xl" />
                </Link>

                <h2 className="text-3xl font-bold">Add New Product</h2>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4">
                    <TextField
                        id="product-name"
                        label="Product Title"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        id="product-price"
                        label="Product Price"
                        variant="outlined"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        id="product-category"
                        label="Product Category"
                        variant="outlined"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                    />
                </div>

                <div>
                    <TextField
                        id="product-description"
                        label="Product Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />
                </div>

                <div>
                    <TextField
                        id="product-image-url"
                        label="Product Image URL"
                        variant="outlined"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        fullWidth
                        helperText="Must start with Https://url"
                    />
                </div>

                <div className="flex space-x-4">
                    <TextField
                        id="product-rate"
                        label="Product Rate"
                        variant="outlined"
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        id="rating-count"
                        label="Rating Count"
                        variant="outlined"
                        type="number"
                        value={ratingCount}
                        onChange={(e) => setRatingCount(e.target.value)}
                        fullWidth
                    />
                </div>

                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg">
                    Add New Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;