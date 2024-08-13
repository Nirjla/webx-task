import { Header } from "../components/features/Header";

export default function MainLayout({ children }) {
      return (<>
            <Header />
            {children && children}
      </>)
}