import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AccordionSkeleton from "./loader/menu_spoin"

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

interface CategoryAccordionProps {
  category: Category;
  categories: Category[];
  activePath: string;
  onCategoryClick: () => void;
  activeAncestors: string[];
}

const CategoryAccordion = ({
  category,
  categories,
  activePath,
  onCategoryClick,
  activeAncestors,
}: CategoryAccordionProps) => {
  // Si la categoría actual es parte de la ruta activa, se expande por defecto.
  const [expanded, setExpanded] = useState(activeAncestors.includes(category.documentId));
  const children = categories.filter(
    (cat) => cat.parent?.documentId === category.documentId
  );
  const categoryUrl = `/category/${category.slug}`;
  const isActive = activePath === categoryUrl;

  return (
    <li className="mb-1">
      <div className="flex items-center justify-between">
        <Link
          href={categoryUrl}
          onClick={() => {
            onCategoryClick();
          }}
          className={`block text-sm py-2 ${
            isActive
              ? "text-blue-600 font-bold"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {category.Name}
        </Link>
        {children.length > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-1 focus:outline-none"
          >
            <svg
              className={`w-4 h-4 transform transition-transform ${
                expanded ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
      {expanded && children.length > 0 && (
        <ul className="pl-4 border-l border-gray-200">
          {children.map((child) => (
            <CategoryAccordion
              key={child.documentId}
              category={child}
              categories={categories}
              activePath={activePath}
              onCategoryClick={onCategoryClick}
              activeAncestors={activeAncestors}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const DropdownCategories = ({ categories, stickyMenu }: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const activePath = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Filtramos las categorías raíz (sin padre)
  const rootCategories = categories?.filter((cat) => !cat.parent) || [];

  // Determinar la categoría activa según la ruta actual.
  const activeCategory = categories.find(
    (cat) => `/category/${cat.slug}` === activePath
  );

  // Recopilamos los id de los ancestros de la categoría activa.
  let activeAncestors: string[] = [];
  if (activeCategory) {
    let current = activeCategory;
    while (current.parent) {
      activeAncestors.push(current.parent.documentId);
      current = current.parent;
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCategoryClick = () => {
    setDropdownOpen(false);
  };

  return (
    <li ref={dropdownRef} className="dropdown-container group relative">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setDropdownOpen((prev) => !prev);
        }}
        className={`hover:text-blue text-custom-sm font-medium flex items-center gap-1.5 capitalize ${
          stickyMenu ? "xl:py-4" : "xl:py-6"
        } ${activePath.includes("categorias") && "!text-blue"}`}
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

      {dropdownOpen && (
        <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg mt-2 w-[800px]">
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {rootCategories.length > 0 ? (
              <ul>
                {rootCategories.map((rootCat) => (
                  <CategoryAccordion
                    key={rootCat.documentId}
                    category={rootCat}
                    categories={categories}
                    activePath={activePath}
                    onCategoryClick={handleCategoryClick}
                    activeAncestors={activeAncestors}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-gray-200">
                <AccordionSkeleton />
              </p>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default DropdownCategories;
