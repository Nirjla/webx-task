import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useGetCartItemsQuery } from "../../api/cartApi";

export default function Header() {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
      const { data: cartData = {}, isLoading,refetch } = useGetCartItemsQuery()
      const cartItems = cartData.products || []
      const cartItemsCount = cartItems.length
      console.log("Count", cartItemsCount)
      return (
            <header className="bg-white border-b">
                  <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                              <div className="header-logo">
                                    <Link to="/">
                                          <h1 className="font-semibold text-lg md:text-xl lg:text-2xl text-nowrap space-x-2 text-secondary">
                                                WebX
                                                <span className="text-primary">Store</span>
                                          </h1>
                                    </Link>
                              </div>
                              <div className="hidden md:flex md:items-center md:space-x-6">
                                    <ul className="flex items-center space-x-6 text-secondary">
                                          <li>
                                                <Link
                                                      to="/"
                                                      className="leading-[60px] capitalize font-medium"
                                                      aria-label="Home"
                                                >
                                                      Home
                                                </Link>
                                          </li>
                                          <li>
                                                <Link
                                                      to="/products"
                                                      className="leading-[60px] capitalize font-medium"
                                                      aria-label="Products"
                                                >
                                                      Products
                                                </Link>
                                          </li>
                                          {!isAuthenticated ? (
                                                <>
                                                      <li>
                                                            <Link
                                                                  to="/login"
                                                                  className="leading-[60px] capitalize font-medium"
                                                                  aria-label="Login"
                                                            >
                                                                  Login
                                                            </Link>
                                                      </li>
                                                      <li>
                                                            <Link
                                                                  to="/signup"
                                                                  className="leading-[60px] capitalize font-medium"
                                                                  aria-label="Signup"
                                                            >
                                                                  Signup
                                                            </Link>
                                                      </li>
                                                </>
                                          ) : (
                                                <>
                                                      <li>
                                                            <Link
                                                                  to="/cart"
                                                                  className="leading-[60px] capitalize font-medium"
                                                                  aria-label="Signup"
                                                            >
                                                                  Cart {isLoading ? (
                                                                        <span className="ml-2 text-gray-500">Loading...</span>
                                                                  ) : (
                                                                        <span className="text-black rounded-full  py-1 text-xs">
                                                                              {cartItemsCount}
                                                                        </span>)}
                                                            </Link>
                                                      </li>

                                                      <li>
                                                            <button
                                                                  onClick={() => {
                                                                        // Handle logout logic
                                                                        dispatch(logout());
                                                                        navigate("/"); // Redirect to login after logout
                                                                  }}
                                                                  className="leading-[60px] capitalize font-medium "
                                                            >
                                                                  Logout
                                                            </button>
                                                      </li>
                                                </>
                                          )}
                                    </ul>
                              </div>

                        </div>
                  </nav>
            </header>
      );
}
