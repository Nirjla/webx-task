import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Products from "./components/features/Products"
import Login from "./components/pages/Login"
import Cart from "./components/pages/Cart"
import Checkout from "./components/pages/Checkout"
import Register from "./components/pages/Register"
import SingleProduct from "./components/pages/SingleProduct"
import Home from "./components/pages/Home"
import SingleCategory from "./components/pages/SingleCategory"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<SingleProduct/>}/>
        <Route path='/categories/:id' element={<SingleCategory/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/cart"element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </>
  )
}

export default App
