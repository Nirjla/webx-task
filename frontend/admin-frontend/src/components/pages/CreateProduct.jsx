// src/components/CreateProduct.js
import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { useCreateProductMutation } from '../../api/productsApi'; // Adjust the import based on your API

export default function CreateProduct() {
  const [createProduct] = useCreateProductMutation(); // Mutation hook for creating a product
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: ''
  });
  console.log("CreateProduct", product)
  const [error, setError] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await createProduct(product).unwrap();
      setSuccessMessage('Product created successfully!');
      setProduct({ name: '', image: '', description: '', price: '' }); // Reset form fields
    } catch (err) {
      console.error("Failed to create product:", err);
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Create New Product</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={product.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              id="image"
              name="image"
              type="file"
              value={product.image.url}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Product
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
