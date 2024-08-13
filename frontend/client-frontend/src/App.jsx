import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Products from "./components/features/Products"
import Login from "./components/pages/Login"
import Cart from "./components/pages/Cart"
import Checkout from "./components/pages/Checkout"
import Register from "./components/pages/Register"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />} />
        <Route path='/products' element={<Products />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/cart"element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </>
  )
}

export default App
