// productService.js
import axios from 'axios';

const updateProduct = async (product) => {
    try {
        const response = await axios.put(`/api/products/${product.id}`, {
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            imageUrl: product.imageUrl,
            rate: product.rate,
            ratingCount: product.ratingCount,
        });
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export default {
    updateProduct,
};
