import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch('/adminproduct/data/products.json');
      const data = await response.json();
      const productData = data.find((p) => p.id === parseInt(id));
      setProduct(productData);
    };
    fetchProduct();
  }, [id]);

  if (!product) return null;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6">{product.name}</h2>
      <p className="text-gray-600">Price: ${product.price}</p>
      <p className="text-gray-500">{product.description}</p>
    </div>
  );
};

export default ViewProduct;
