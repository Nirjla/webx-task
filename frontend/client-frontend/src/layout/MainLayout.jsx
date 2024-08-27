import Header from "../components/features/Header";
import ContainerWrapper from "../components/wrapper/ContainerWrapper";

export default function MainLayout({ children }) {
      return (<>
            <Header />
            <ContainerWrapper>
                  {children && children}
            </ContainerWrapper>
      </>)
}