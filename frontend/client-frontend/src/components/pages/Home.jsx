import MainLayout from "../../layout/MainLayout";
import Categories from "../features/Categories";
import Products from "../features/Products";

export default function Home() {
      return (<>
            <MainLayout>
                  <Categories/>
                  <Products />
            </MainLayout>
      </>)
}