import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; 


const ViewProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL params
  const [product, setProduct] = useState(null); // State to hold the product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch data from API using the dynamic ID
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        const data = await response.json(); // Parse the JSON response
        setProduct(data); // Set the product data
      } catch (err) {
        setError(err.message); // Handle any errors during the fetch
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };

    fetchProduct();
  }, [id]);

  // Handle the loading state
  if (loading) {
    return <p>Loading product...</p>;
  }

  // Handle any error that occurred during data fetching
  if (error) {
    return <p>Error: {error}</p>;
  }

  // If no product is found, display a message
  if (!product) {
    return <p>Product not found</p>;
  }

  // Render the product details once data is fetched
  return (
    <div className="mt-32 border bg-gray-300 container mx-auto p-6 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
      {/* Display the product image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="rounded-lg shadow-lg mb-4 md:mb-0 w-1/5 h-auto" // Using Tailwind for responsive width and height
      />

      {/* Product details section */}
      <div className="flex-1 pl-11 w-9 pt-16 space-y-4">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-500 mb-4">{product.description}</p>
        {/* Back to products button */}
        <Link to="/admin-product" className="mt-4 block">
          <button className="bg-black text-white py-2 px-8 rounded-lg hover:bg-gray-800 transition duration-200">
            Back to Products
          </button>
        </Link>
      </div>

      {/* Product information */}
      <div className="mb-4 space-y-2 pt-16 pl-14">
        <p className="text-lg font-semibold text-gray-800">${product.price}</p>
        <p className="text-gray-600">{product.category}</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">{product.rate}</p>
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: "#FFD43B" }} // Star color
            className="text-yellow-500"
          />
        </div>
      </div>
    </div>
  );


};

export default ViewProduct;
