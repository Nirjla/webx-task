import { useParams } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetSubCategoriesQuery } from "../../api/productApi";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import GridWrapper from "../wrapper/GridWrapper";
import ProductCard from "../common/ProductCard";
import SectionWrapper from "../wrapper/SectionWrapper";
import SidebarWrapper from "../wrapper/SidebarWrapper";
import SecondaryHeadline from "../common/SecondaryHeadline";
import CheckboxField from "../common/CheckboxField";

export default function SingleCategory() {
      const { id } = useParams()
      const { data: products, isLoading: isProducts, error: isProductError } = useGetProductsByCategoryQuery(id)
      // const { data: products, isLoading: isProducts, error: isError } = useGetProductsQuery()
      console.log("Pro", products)
      const { data: subcategories, isLoading: isSubCategories, error: isSubCatError } = useGetSubCategoriesQuery()

      if (isProducts || isSubCategories) {
            return <Loader />
      }
      if (isProductError || isSubCatError) {
            return toast.error("Error fetching category")
      }
      return (<>
            <MainLayout>
                  <SectionWrapper>
                        <div className='grid grid-cols-12'>
                              <SidebarWrapper>
                                    <SecondaryHeadline title={'Shop By SubCategory'} />
                                    <CheckboxField name={'subcategory'} data={subcategories}/>

                              </SidebarWrapper>
                              <div className='lg:col-span-10 md:col-span-8'>
                                    <GridWrapper>
                                          <ProductCard products={products} />
                                    </GridWrapper>
                              </div>
                        </div>
                  </SectionWrapper>
            </MainLayout >
      </>)
}