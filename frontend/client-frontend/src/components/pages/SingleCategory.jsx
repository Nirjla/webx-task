import { useParams } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { useGetSubCategoriesbyIdQuery } from "../../api/productApi";

export default function SingleCategory() {
      const { id } = useParams()
      const { data, isLoading, error } = useGetSubCategoriesbyIdQuery(id)
      console.log('subb:', data)
      return (<>
            <MainLayout>

            </MainLayout>
      </>)
}