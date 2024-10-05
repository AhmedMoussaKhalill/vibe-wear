const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// File path for products.json
const filePath = path.join(__dirname, 'data', 'products.json');

// Check if products.json exists and is valid
console.log('Checking if products.json exists:', fs.existsSync(filePath));
if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    console.log('products.json contents:', fileContents);
    try {
        JSON.parse(fileContents);
        console.log('products.json contains valid JSON');
    } catch (error) {
        console.error('products.json contains invalid JSON:', error);
    }
} else {
    console.error('products.json does not exist');
}

// Function to read products from file
const readProductsFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error(`Failed to read products file: ${err.message}`));
            } else {
                try {
                    const products = JSON.parse(data);
                    resolve(products);
                } catch (parseError) {
                    reject(new Error(`Failed to parse products JSON: ${parseError.message}`));
                }
            }
        });
    });
};

// Function to write products to file
const writeProductsToFile = (products) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8', (err) => {
            if (err) {
                reject(new Error(`Failed to write to products file: ${err.message}`));
            } else {
                resolve();
            }
        });
    });
};

// Function to get the next ID
const getNextId = async () => {
    const products = await readProductsFromFile();
    const ids = products.map(p => p.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
};

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await readProductsFromFile();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const products = await readProductsFromFile();
        const product = products.find(p => p.id === parseInt(id));
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
