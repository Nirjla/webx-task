// src/components/ProductList.js
import React from 'react';
import { useGetProductsQuery } from '../../api/productsApi';
import MainLayout from '../../layout/MainLayout';
import { Link } from 'react-router-dom';
import PrimaryHeadline from '../common/PrimaryHeadline';
import TableWrapper from '../common/TableWrapper';
import TableHead from '../common/TableHead';
import TableHeadWrapper from '../common/TableHeadWrapper';
import TableDataWrapper from '../common/TableDataWrapper';
import TableRowWrapper from '../common/TableRowWrapper';
import TableData from '../common/TableData';
import Loader from '../common/Loader';

const Products = () => {
      const { data: products, error, isLoading } = useGetProductsQuery();
      console.log("Productsdata", products)
      if (isLoading) return <Loader/>;
      if (error) return <p>Error fetching products: {error.message}</p>;

      return (
            <MainLayout>
                  <div className='flex justify-between flex-wrap items-center '>
                        <PrimaryHeadline title={'Products'} />
                        <Link to={'/create-product'} className='hover:underline'>Add New Product</Link>
                  </div>
                  <div className="overflow-x-auto">
                        <TableWrapper>
                              <TableHeadWrapper>
                                    <TableHead title={'Image'} />
                                    <TableHead title={'Product Name'} />
                                    <TableHead title={'Category'} />
                                    <TableHead title={'Sub Category'} />
                                    <TableHead title={'Description'} />
                                    <TableHead title={'Price'} />
                              </TableHeadWrapper>
                              <TableDataWrapper>
                                    {products.map((product) => (
                                          <TableRowWrapper>
                                                <TableData>
                                                      <img src={product.image.url} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                                                </TableData>
                                                <TableData>
                                                      {product.name}
                                                </TableData>
                                                <TableData>
                                                      {product.category?.name}
                                                </TableData>
                                                <TableData>
                                                      {product.subcategories && product.subcategories.map((sub) => (
                                                            <p> {sub.name}</p>

                                                      ))}</TableData>
                                                <TableData>
                                                      {product.description}</TableData>
                                                <TableData>
                                                      Rs{product.price.toFixed(2)}
                                                </TableData>
                                          </TableRowWrapper>
                                    ))}
                              </TableDataWrapper>
                        </TableWrapper>
                  </div>
            </MainLayout >
      );
};

export default Products;
