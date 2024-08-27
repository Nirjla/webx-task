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
import SecondaryButton from '../common/SecondaryButton';
import ProductCard from '../common/ProductCard';

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
        <PrimaryHeadline title={'Recent Products'} />
        {message && <p className="text-center text-red-500">{message}</p>}
        <GridWrapper>
          <ProductCard products={products} />
        </GridWrapper>
      </SectionWrapper>
    </>
  );
};

export default Products;
