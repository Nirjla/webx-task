const Cart = require("../models/Cart")
const Product = require("../models/Product")
const addToCart = async (req, res) => {
      try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
    
        // Find the cart for the user
        const existingCart = await Cart.findOne({ user: userId });
    
        if (existingCart) {
          // Ensure products is an array
          if (!Array.isArray(existingCart.products)) {
            existingCart.products = [];
          }
    
          // Find the existing cart item
          const existingCartItem = existingCart.products.find(product => product.product.toString() === productId);
    
          if (existingCartItem) {
            existingCartItem.quantity += quantity || 1;
          } else {
            existingCart.products.push({ product: productId, quantity: quantity || 1 });
          }
    
          // Save the updated cart
          const updatedCart = await existingCart.save();
          return res.status(200).json(updatedCart);
        } else {
          // Create a new cart if one doesn't exist
          const newCart = new Cart({
            user: userId,
            products: [{ product: productId, quantity: quantity || 1 }]
          });
    
          const savedCart = await newCart.save();
          return res.status(200).json(savedCart);
        }
      } catch (err) {
        console.error("Error adding item to cart:", err);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
    
const getCartItems = async (req, res) => {
      try {
            const userId = req.user.id
            const existingCart = await Cart.findOne({ user: userId }).populate('products.product')
            if (!existingCart) {
                  return res.status(404).json({ message: "No Cart Items found" })
            }
            return res.status(200).json(existingCart)
      } catch (err) {
            console.error('Error fetching cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
      }
}

const updateQuantity = async (req, res) => {
      try {
            const userId = req.user.id
            console.log("UserId", userId)
            const { id } = req.params
            const { quantity } = req.body
            const cart = await Cart.findOne({ user: userId })
            if (!cart) {
                  return res.status(404).json({ message: "Cart not found for this user" })
            }
            const existingCartItem = cart.products.find(product => product.product.toString() === id)
            if (!existingCartItem) {
                  return res.status(404).json({
                        message: 'Item not foound in the cart'
                  })
            }
            existingCartItem.quantity = quantity
            const updatedCart = await cart.save()
            return res.json(updatedCart)

      } catch (err) {
            console.error('Error updating quantity:', err)
            res.status(500).json({ message: 'Internal server error' })
      }
}


const deleteFromCart = async (req, res) => {
      try {
            const userId = req.user.id; // Assuming you have user authentication
            const productId = req.params.id; // The product ID to remove

            // Find the cart for the user
            const cart = await Cart.findOne({ user: userId });

            if (!cart) {
                  return res.status(404).json({ message: "Cart not found for this user" });
            }

            // create new array wwith all elements that matched the condition and assigned to cart.products
            cart.products = cart.products.filter(item => item.product.toString() !== productId);

            // Save the updated cart
            const updatedCart = await cart.save();

            return res.status(200).json(updatedCart);
      } catch (err) {
            console.error('Error deleting product from cart:', err);
            res.status(500).json({ message: 'Internal server error' });
      }
};


module.exports = {
      addToCart, getCartItems, updateQuantity, deleteFromCart

}