import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PreLoader from "@/components/Common/PreLoader";
interface Category {
  documentId: string;
  Name: string;
  slug: string;
  UrlImagen: string;
  parent?: Category | null;
}

interface DropdownProps {
  categories: Category[];
  stickyMenu?: boolean;
}

const DropdownCategories = ({ categories, stickyMenu }: DropdownProps) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();
   console.log("dropdowcategoria", categories);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-container")) {
        setDropdownToggler(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Filtrar categorías raíz
  const rootCategories = categories?.filter((cat) => !cat.parent) || [];

  // Función para obtener subcategorías
  const getSubcategories = (parentId: string) =>
    categories?.filter((cat) => cat.parent?.documentId === parentId) || [];

  return (
    <li
      className={`dropdown-container group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full ${
        pathUrl.includes("categorias") && "before:!w-full"
      }`}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setDropdownToggler(!dropdownToggler);
        }}
        className={`hover:text-blue text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize ${
          stickyMenu ? "xl:py-4" : "xl:py-6"
        } ${pathUrl.includes("categorias") && "!text-blue"}`}
      >
        Categorías
        <svg
          className="fill-current cursor-pointer"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.95363 5.67461C3.13334 5.46495 3.44899 5.44067 3.65866 5.62038L7.99993 9.34147L12.3412 5.62038C12.5509 5.44067 12.8665 5.46495 13.0462 5.67461C13.2259 5.88428 13.2017 6.19993 12.992 6.37964L8.32532 10.3796C8.13808 10.5401 7.86178 10.5401 7.67453 10.3796L3.00787 6.37964C2.7982 6.19993 2.77392 5.88428 2.95363 5.67461Z"
            fill=""
          />
        </svg>
      </a>

      {/* Dropdown Mejorado */}
      {dropdownToggler && (
        <div
          className="absolute left-0 top-full bg-white shadow-lg border border-gray-200 rounded-lg mt-2 p-6 w-[800px] grid grid-cols-4 gap-8"
        >
          {rootCategories.length > 0 ? (
            rootCategories.map((rootCat) => (
              <div key={rootCat.documentId}>
                <h3 className="font-semibold text-gray-800 border-b pb-2 mb-2 text-lg">
                  {rootCat.Name}
                </h3>
                <ul>
                  {getSubcategories(rootCat.documentId).map((subCat) => (
                    <li key={subCat.documentId}>
                      <Link
                        href={`/category/${subCat.slug}`}
                        className="block text-sm text-gray-600 hover:text-blue-600 py-2"
                      >
                        {subCat.Name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-200"><div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div></p>
          )}
        </div>
      )}
    </li>
  );
};

export default DropdownCategories;
