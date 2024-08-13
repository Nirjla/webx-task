import { Link } from "react-router-dom"
import MaxWidthWrapper from "../wrapper/MaxWidthWrapper"

export const Header = () => {
      return (<>
            <nav className="bg-white  border-gray-300 border-b-[1px]">
                  <MaxWidthWrapper className="flex flex-wrap items-center justify-between mx-auto p-2">
                        <div className="header-logo">
                              <Link to="/">
                                    <h1 className="font-semibold text-lg md:text-xl  lg:text-2xl text-nowrap space-x-2 text-primary ">
                                          WebX
                                          <span className="text-secondary pl-2">Task</span>
                                    </h1>
                              </Link>
                        </div>
                        <div className="hidden md:flex md:items-center md:space-x-6">
                              <ul className="flex items-center space-x-6 text-black">
                                    <li>
                                          <Link
                                                to="/"
                                                className="leading-[60px] capitalize font-medium"
                                          >
                                                Dashboard
                                          </Link>
                                    </li>
                                    <li>
                                          <Link
                                                to="/products"
                                                className="leading-[60px] capitalize font-medium"
                                          >
                                                Products
                                          </Link>
                                    </li>
                              </ul>
                        </div>

                  </MaxWidthWrapper>
            </nav>

      </>)
}