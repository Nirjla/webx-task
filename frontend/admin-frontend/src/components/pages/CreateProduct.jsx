import React, { useState, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import { useCreateProductMutation, useGetCategoriesQuery, useGetSubCategoriesQuery } from '../../api/productsApi';
import InputField from '../common/InputField';
import TextField from '../common/TextField';
import PrimaryHeadline from '../common/PrimaryHeadline';
import PrimaryButton from '../common/PrimaryButton';
import FormWrapper from '../common/FormWrapper';
import SelectField from '../common/SelectField';
import CheckboxField from '../common/CheckboxField';
import Loader from '../common/Loader';
import toast from 'react-hot-toast';

export default function CreateProduct() {
  const [createProduct, {isLoading:isSubmitting}] = useCreateProductMutation();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: subcategories, error: subcategoriesError, isLoading: subcategoriesLoading } = useGetSubCategoriesQuery();
  const [categoryId, setCategoryId] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    image: null,
    description: '',
    price: '',
    categoryId: '',
    subcategoryIds: []
  });


  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === 'file') {
      setProduct({ ...product, [name]: files[0] });
    } else if (type === 'checkbox') {
      setProduct((prev) => ({
        ...prev,
        subcategoryIds: checked
          ? [...prev.subcategoryIds, value]
          : prev.subcategoryIds.filter(id => id !== value)
      }));
    } else {
      setProduct((prev) => {
        const updatedProduct = { ...prev, [name]: value };
        if (name === 'categoryId') {
          setCategoryId(value); // Update categoryId state
        }
        return updatedProduct;
      });
    }
  };
  useEffect(() => {
    console.log("Selected Category ID:", categoryId);
    console.log("Subcategories Data:", subcategories);

    if (categoryId && subcategories) {
      const filtered = subcategories.filter((sub) => sub.category._id === categoryId);
      console.log("Filtered Subcategories:", filtered);
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [categoryId, subcategories]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('image', product.image);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('categoryId', product.categoryId);
    product.subcategoryIds.forEach((id, index) => formData.append(`subcategoryIds[${index}]`, id));

    try {
      await createProduct(formData).unwrap();
      toast.success('Product created successfully!');
      setProduct({
        name: '',
        image: null,
        description: '',
        price: '',
        categoryId: '',
        subcategoryIds: []
      });
      setCategoryId('');
    } catch (err) {
      console.error("Failed to create product:", err);
      toast.error('Failed to create product. Please try again.');
    }
  };

  if (categoriesLoading || subcategoriesLoading) return <Loader/>;
  if (categoriesError) return <p>Error fetching categories: {categoriesError.message}</p>;
  if (subcategoriesError) return <p>Error fetching sub-categories: {subcategoriesError.message}</p>;

  return (
    <MainLayout>
      <PrimaryHeadline title={'Create A Product'} />
      <FormWrapper onSubmit={handleSubmit}>
        <InputField
          name="name"
          type="text"
          title="Product Name"
          value={product.name}
          onChange={handleChange}
        />
        <SelectField
          name="categoryId"
          title="Select a Category"
          value={product.categoryId}
          onChange={handleChange}
          data={categories}
        />
        <CheckboxField
          name="subcategoryIds"
          title="Select Subcategories"
          data={filteredSubcategories}
          value={product.subcategoryIds}
          onChange={handleChange}
        />
        <InputField
          name="image"
          type="file"
          // value={product.image}
          title="Product Image"
          onChange={handleChange}
        />
        <InputField
          name="price"
          type="number"
          title="Product Price"
          value={product.price}
          onChange={handleChange}
        />
        <TextField
          name="description"
          title="Product Description"
          value={product.description}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {
          isSubmitting ? <Loader /> : <PrimaryButton title="Submit" />
        }

      </FormWrapper>
    </MainLayout>
  );
}
