const Cart = require("../models/Cart")
const Order = require("../models/Order")

const checkout = async (req, res) => {
      try {
            const userId = req.user.id
            const { shippingAddress } = req.body
            const cart = await Cart.findOne({ user: userId }).populate('products.product')
            if (!cart) {
                  return res.status(404).json({ message: 'Cart not found' })
            }
            console.log("Cart", cart)
            if (cart.products.length === 0) {
                  return res.status(400).json({ message: "Cart Not Found" })
            }
            const totalAmount = cart.products.reduce((total, item) => {
                  const productPrice = item.product.price
                  return total + (productPrice * item.quantity)
            }, 0)
            const newOrder = new Order({
                  user: userId,
                  products: cart.products,
                  totalAmount,
                  shippingAddress
            })
            const savedOrder = await newOrder.save()
            await Cart.findOneAndDelete({ user: userId })
            return res.status(201).json({ message: 'Order placed successfully', order: savedOrder })
      } catch (err) {
            console.error('Error during checkout:', err);
            return res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = { checkout }