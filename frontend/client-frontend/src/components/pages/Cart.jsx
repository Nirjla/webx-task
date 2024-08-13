import React from 'react';
import { useGetCartItemsQuery, useDeleteFromCartMutation, useUpdateQuantityMutation } from '../../api/cartApi';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { data, error, isLoading, refetch } = useGetCartItemsQuery();
  const [deleteFromCart] = useDeleteFromCartMutation();
  const [updateQuantity] = useUpdateQuantityMutation();
  const navigate = useNavigate();

  // Access the products array from the data object
  const cartItems = data ? data.products : [];
  console.log("CartItems", cartItems)
  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleDelete = async (itemId) => {
    try {
      await deleteFromCart(itemId).unwrap();
      alert("Item removed successfully");
      refetch();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await updateQuantity({ itemId, quantity }).unwrap();
      refetch();
    } catch (err) {
      alert("Failed to update quantity");
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching cart items: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 flex items-center">

                <img src={item.product.image} alt="Product" className="w-24 h-24 object-cover" />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600 mt-1">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold text-gray-800">Total Amount: Rs{totalAmount.toFixed(2)}</p>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
