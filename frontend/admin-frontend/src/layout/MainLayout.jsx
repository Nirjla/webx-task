import { Header } from "../components/features/Header";
import Sidebar from "../components/features/Sidebar";
import MaxWidthWrapper from "../components/wrapper/MaxWidthWrapper";

export default function MainLayout({ children }) {
      return (<>
            <Sidebar />
            <MaxWidthWrapper>
                  {children && children}
            </MaxWidthWrapper>
      </>)
}