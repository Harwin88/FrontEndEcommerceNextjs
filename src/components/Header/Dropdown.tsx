import { useState } from "react";
import Link from "next/link";

const Dropdown = ({ menuItem }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);

  return (
    <li className="relative group">
      {/* Botón principal */}
      <button
        onClick={() => setDropdownToggler(!dropdownToggler)}
        className="hover:text-blue text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize"
      >
        {menuItem.title}
        {menuItem.submenu && menuItem.submenu.length > 0 && (
          <svg
            className="fill-current cursor-pointer"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.95363 5.67461C3.13334 5.46495 3.44899 5.44067 3.65866 5.62038L7.99993 9.34147L12.3412 5.62038C12.5509 5.44067 12.8665 5.46495 13.0462 5.67461C13.2259 5.88428 13.2017 6.19993 12.992 6.37964L8.32532 10.3796C8.13808 10.5401 7.86178 10.5401 7.67453 10.3796L3.00787 6.37964C2.7982 6.19993 2.77392 5.88428 2.95363 5.67461Z"
            />
          </svg>
        )}
      </button>

      {/* Submenú recursivo */}
      {menuItem.submenu && menuItem.submenu.length > 0 && (
        <ul className={`absolute left-0 mt-2 bg-white shadow-lg transition-all duration-300 ${dropdownToggler ? "block" : "hidden"}`}>
          {menuItem.submenu.map((subItem, i) => (
            <li key={i} className="relative group">
              <Link href={subItem.path} className="block px-4 py-2 hover:bg-gray-100">
                {subItem.title}
              </Link>

              {/* Renderizado recursivo para subcategorías */}
              {subItem.submenu && subItem.submenu.length > 0 && (
                <ul className="absolute left-full top-0 mt-0 bg-white shadow-lg hidden group-hover:block">
                  {subItem.submenu.map((childItem, j) => (
                    <Dropdown key={j} menuItem={childItem} />
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
