// src/components/ProductList.js
import React from 'react';
import { useGetProductsQuery } from '../../api/productsApi';
import MainLayout from '../../layout/MainLayout';
import { Link } from 'react-router-dom';

const Products = () => {
      const { data: products, error, isLoading } = useGetProductsQuery();

      if (isLoading) return <p>Loading...</p>;
      if (error) return <p>Error fetching products: {error.message}</p>;

      return (
            <MainLayout>
                  <div className="container mx-auto px-4 py-6">
                        <div className='flex justify-between flex-wrap '>
                              <h1 className="text-3xl font-bold mb-4">Product List</h1>
                              <Link to={'/create-product'} className='hover:underline'>Add New Product</Link>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                    <thead>
                                          <tr className="bg-gray-100 border-b border-gray-200">
                                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Image</th>
                                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Product Name</th>
                                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Description</th>
                                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Price</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {products.map((product) => (
                                                <tr key={product._id} className="border-b border-gray-200">
                                                      <td className="py-3 px-4">
                                                            <img src={product.image.url} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                                                      </td>
                                                      <td className="py-3 px-4 text-gray-700">{product.name}</td>
                                                      <td className="py-3 px-4 text-gray-600">{product.description}</td>
                                                      <td className="py-3 px-4 text-gray-900">Rs{product.price.toFixed(2)}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </MainLayout>
      );
};

export default Products;
