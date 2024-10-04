const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'data'))); // Serve static files from 'data' directory

const filePath = path.join(__dirname, 'data', 'products.json');

// Middleware to read the products from JSON file
const readProductsFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return reject(new Error('Error reading products'));
            }
            resolve(JSON.parse(data));
        });
    });
};

// Function to get the next ID for a new product
const getNextId = async () => {
    const products = await readProductsFromFile();
    if (products.length === 0) return 1; // Start with 1 if there are no products
    const lastId = Math.max(...products.map(product => product.id)); // Get the highest existing ID
    return lastId + 1; // Return the next ID
};

// Middleware to write products to JSON file
const writeProductsToFile = (products) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return reject(new Error('Error writing products'));
            }
            resolve();
        });
    });
};

// GET endpoint to fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await readProductsFromFile();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET endpoint to fetch a single product by ID
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const products = await readProductsFromFile();
        const product = products.find((p) => p.id === parseInt(id)); // Ensure ID is parsed to an integer
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// POST endpoint to add a new product
app.post('/api/products', async (req, res) => {
    const newProduct = req.body;

    // Basic validation
    if (!newProduct.name || typeof newProduct.price !== 'number' || !newProduct.description) {
        return res.status(400).json({ error: 'Invalid product data. Please ensure all fields are provided.' });
    }

    try {
        const id = await getNextId(); // Get the next ID
        const productToAdd = { id, ...newProduct }; // Create product with assigned ID
        const products = await readProductsFromFile();
        products.push(productToAdd);
        await writeProductsToFile(products);
        res.status(201).json(productToAdd); // Respond with the new product
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// PUT endpoint to update a product
app.put('/api/products/:id', async (req, res) => {
    const updatedProduct = req.body;
    const { id } = req.params;

    // Basic validation
    if (!updatedProduct.name || typeof updatedProduct.price !== 'number' || !updatedProduct.description) {
        return res.status(400).json({ error: 'Invalid product data. Please ensure all fields are provided.' });
    }

    try {
        const products = await readProductsFromFile();
        const index = products.findIndex(p => p.id === parseInt(id));

        if (index !== -1) {
            products[index] = { id: parseInt(id), ...updatedProduct }; // Update the product
            await writeProductsToFile(products); // Write back to the file
            return res.status(200).json(products[index]); // Send the updated product back
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE endpoint to delete a product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const products = await readProductsFromFile();
        const index = products.findIndex(p => p.id === parseInt(id));

        if (index !== -1) {
            products.splice(index, 1); // Remove the product
            await writeProductsToFile(products); // Write back to the file
            return res.status(204).send(); // No content to send back
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
