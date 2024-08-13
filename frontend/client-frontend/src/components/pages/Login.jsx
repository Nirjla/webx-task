import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../api/authApi';
import { setCredentials } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
      const [login, { isLoading, error }] = useLoginMutation();
      const dispatch = useDispatch();
      const navigate = useNavigate()
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  const result = await login({ email, password }).unwrap();
                  navigate('/')
                  dispatch(setCredentials({ token: result.token, user: result.user }));
            } catch (error) {
                  console.error('Login failed:', error);
            }
      };

      return (
            <div className="container mx-auto px-4 py-6">
                  <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Login</h1>
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                              <label htmlFor="email" className="block text-gray-700">Email</label>
                              <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="password" className="block text-gray-700">Password</label>
                              <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                        </div>
                        <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                              {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        {error && <p className="text-red-500 mt-2">Login failed: {error.message}</p>}
                  </form>
            </div>
      );
};

export default Login;
