import React, { useState } from 'react';
import { useRegisterMutation } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
      const navigate = useNavigate()
      const [register, { isLoading, isError, error, isSuccess }] = useRegisterMutation();
      const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
      });
      const [formError, setFormError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setFormError('');
            setSuccessMessage('');

            // Simple client-side validation
            if (formData.password !== formData.confirmPassword) {
                  setFormError('Passwords do not match.');
                  return;
            }

            try {
                  await register(formData).unwrap();
                  setSuccessMessage('Registration successful! You can now log in.');
                  navigate('/login')
                  setFormData({ username: '', email: '', password: '', confirmPassword: '' }); // Reset form fields
            } catch (err) {
                  setFormError(err.data?.message || 'Registration failed. Please try again.');
            }
      };

      return (
            <div className="container mx-auto px-4 py-6">
                  <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
                  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                        <div className="mb-4">
                              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                              <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                        </div>

                        <div className="mb-4">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                              <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                        </div>

                        <div className="mb-4">
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                              <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                        </div>

                        <div className="mb-4">
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                              <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                        </div>

                        {formError && <p className="text-red-500 mb-4">{formError}</p>}
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                        {isError && <p className="text-red-500 mb-4">{error?.message}</p>}

                        <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                              {isLoading ? 'Registering...' : 'Register'}
                        </button>
                  </form>
            </div>
      );
};

export default Register;
