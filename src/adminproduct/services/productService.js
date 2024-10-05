// productService.js
import axios from 'axios';

const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`/api/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error in updateProduct:', error);
        throw error;
    }
};

export default {
    updateProduct,
};
