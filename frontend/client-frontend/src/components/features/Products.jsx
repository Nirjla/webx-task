// src/components/Products.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/productApi';
import { useAddToCartMutation, useGetCartItemsQuery } from '../../api/cartApi';
import Loader from '../common/Loader';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ContainerWrapper from '../wrapper/ContainerWrapper';
import MainLayout from '../../layout/MainLayout';
import SectionWrapper from '../wrapper/SectionWrapper';
import PrimaryHeadline from '../common/PrimaryHeadline';
import GridWrapper from '../wrapper/GridWrapper';
import CardWrapper from '../wrapper/CardWrapper';

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
        toast.success(`${product.name} added successfully`)
      } catch (error) {
        console.error('Failed to add to cart:', error);
        alert('Failed to add item to cart.');
      }
    } else {
      setMessage('Please log in to add items to your cart.');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };
  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error fetching products: {error.message}</p>;

  return (
    <>
    <SectionWrapper>
      <PrimaryHeadline title={'Recent Products'}/>
      {message && <p className="text-center text-red-500">{message}</p>}
      <GridWrapper>
        {products.map((product) => (
          <CardWrapper key={product._id}>
            <Link to={`/products/${product._id}`}>
              <img src={product.image.url} alt={product.name} className="w-full h-40 object-contain" />
            </Link>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
              <p className="text-gray-900 font-bold text-sm mt-2">Rs {product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                Add to Cart
              </button>
            </div>
          </CardWrapper>
        ))}
      </GridWrapper>
      </SectionWrapper>
    </>
  );
};

export default Products;
