// src/components/Products.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/productApi';
import { useAddToCartMutation, useGetCartItemsQuery } from '../../api/cartApi';

const Products = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const { data, refetch } = useGetCartItemsQuery()
  const [addToCart] = useAddToCartMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      try {
        await addToCart({ productId: product._id, quantity: 1 }).unwrap();
        await refetch()
        alert(`${product.name} added successfully`);
      } catch (error) {
        console.error('Failed to add to cart:', error);
        alert('Failed to add item to cart.');
      }
    } else {
      setMessage('Please log in to add items to your cart.');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching products: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Products List</h1>
      {message && <p className="text-center text-red-500">{message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.image.url} alt={product.name} className="w-full h-40 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <p className="text-gray-900 font-bold mt-2">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
