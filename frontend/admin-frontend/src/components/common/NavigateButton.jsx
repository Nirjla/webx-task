import { Link } from "react-router-dom";

export default function NavigateButton({ link, title, icon: Icon, onClick }) {
      return (<>
            <Link to={link} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={onClick && onClick}>
                  {Icon &&
                        <Icon className="flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  }
                  <span className="ms-3">{title}</span>
            </Link>
      </>)
}