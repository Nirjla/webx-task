import { Link } from "react-router-dom";
import { useGetCategoriesQuery, useGetSubCategoriesQuery } from "../../api/productApi";
import PrimaryHeadline from "../common/PrimaryHeadline";
import CardWrapper from "../wrapper/CardWrapper";
import ContainerWrapper from "../wrapper/ContainerWrapper";
import GridWrapper from "../wrapper/GridWrapper";
import SectionWrapper from "../wrapper/SectionWrapper";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

export default function Categories() {
      const { data, isLoading, error } = useGetCategoriesQuery()
      console.log("Cat", data)
      if(isLoading){
            return <Loader/>
      }
      if(error){
            return toast.error('Error fetching categories')
      }
      return (<>
            <SectionWrapper>
                  <PrimaryHeadline title={'Categories'} />
                  <GridWrapper>
                        {data.map((item, index) => (
                              <Link to={`/categories/${item._id}`}>
                                    <CardWrapper key={index}>
                                          <div className='p-4'>
                                                {item.name}
                                          </div>
                                    </CardWrapper>
                              </Link>
                        ))}
                  </GridWrapper>
            </SectionWrapper>
      </>)
}