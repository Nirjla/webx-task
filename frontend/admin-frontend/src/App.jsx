import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Login from "./components/features/Login"
import { Dashboard } from "./components/pages/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoutes"
import Products from "./components/pages/Products"
import CreateProduct from "./components/pages/CreateProduct"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path='/products' element={<ProtectedRoute element={<Products />} />}/>
        <Route path="/create-product" element={<ProtectedRoute element={<CreateProduct/>}/>}/>
      </Routes>
    </>
  )
}

export default App
