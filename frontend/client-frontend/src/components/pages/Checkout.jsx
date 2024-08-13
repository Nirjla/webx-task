import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCartItemsQuery } from '../../api/cartApi';
import { useCheckoutMutation } from '../../api/checkoutApi';

const Checkout = () => {
      const [checkout, { isLoading: isCheckingOut, error: checkoutError }] = useCheckoutMutation();
      const [shippingAddress, setShippingAddress] = useState({
            city: '',
            state: '',
            postalCode: '',
            country: '',
      });
      const [message, setMessage] = useState('');
      const navigate = useNavigate();

      // Fetch cart items
      console.log("ShippingAddress", shippingAddress)
      const handleCheckout = async () => {
            try {
                  const response = await checkout({ shippingAddress }).unwrap();
                  console.log("OrderResposne", response)
                  setMessage('Order placed successfully!');
                  // navigate('/order-success'); // Redirect to an order success page
            } catch (err) {
                  const errorMessage = err?.message || 'An unknown error occurred';
                  setMessage(`Failed to place order: ${errorMessage}`);
            }
      };

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setShippingAddress({ ...shippingAddress, [name]: value });
      };



      return (
            <div className="container mx-auto px-4 py-6">
                  <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Checkout</h1>

                  <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
                              <div className="space-y-4">
                                    <div>
                                          <label className="block text-gray-700">City</label>
                                          <input
                                                type="text"
                                                name="city"
                                                value={shippingAddress.city}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-2 rounded-md"
                                                required
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-gray-700">State</label>
                                          <input
                                                type="text"
                                                name="state"
                                                value={shippingAddress.state}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-2 rounded-md"
                                                required
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-gray-700">Postal Code</label>
                                          <input
                                                type="text"
                                                name="postalCode"
                                                value={shippingAddress.postalCode}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-2 rounded-md"
                                                required
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-gray-700">Country</label>
                                          <input
                                                type="text"
                                                name="country"
                                                value={shippingAddress.country}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 p-2 rounded-md"
                                                required
                                          />
                                    </div>
                                    <button
                                          type="submit"
                                          disabled={isCheckingOut}
                                          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                          {isCheckingOut ? 'Processing...' : 'Place Order'}
                                    </button>
                              </div>
                        </form>
                        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                  </div>
            </div>
      );
};

export default Checkout;
