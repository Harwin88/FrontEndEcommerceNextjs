import { useState, useEffect } from "react";
import { useQuery } from "urql";
import { GetCategoriesAllDocument } from "@/graphql/generated/graphql";
import client from "@/graphql/client";

/**
 * Tipo que representa la categoría tal como se obtiene desde el backend.
 */
export type Category = {
  Name: string;
  slug: string;
  documentId: string;
  UrlImagen: string | null;
  // Si la categoría es raíz, 'parent' es null.
  parent: {
    documentId: string;
    Name: string;
    slug: string;
    UrlImagen: string | null;
  } | null;
};

/**
 * Tipo para el menú/arbol que se va a construir.
 */
export type Menu = {
  id: string;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

/**
 * Función que construye el árbol de categorías.
 * 
 * - Los nodos raíz son aquellos donde `parent === null`.
 * - Cada categoría con padre se inserta en el submenú de su padre.
 */
export function buildCategoryTree(categories: Category[]): Menu[] {
  // Primero, se crea un mapa para acceder rápidamente a cada categoría por su slug.
  const categoryMap = new Map<string, Menu>();
  categories.forEach(category => {
    categoryMap.set(category.slug, {
      id: category.documentId,
      title: category.Name,
      path: `category/${category.slug}`,
      newTab: false,
      submenu: [] // Se llenará si tiene hijos.
    });
  });

  // Se construye el árbol recorriendo cada categoría.
  const tree: Menu[] = [];
  categories.forEach(category => {
    const menuItem = categoryMap.get(category.slug);
    if (!menuItem) return;

    // Si la categoría es raíz, se agrega directamente.
    if (!category.parent) {
      tree.push(menuItem);
    } else if (category.parent.slug) {
      // Si tiene padre, se agrega al submenú del padre.
      const parentItem = categoryMap.get(category.parent.slug);
      if (parentItem) {
        parentItem.submenu = parentItem.submenu || [];
        parentItem.submenu.push(menuItem);
      } else {
        // Si no se encuentra el padre (por algún motivo), se agrega como raíz.
        tree.push(menuItem);
      }
    }
  });

  return tree;
}

/**
 * Hook para obtener todas las categorías en forma paginada y construir el árbol.
 *
 * La consulta recibe un parámetro `page` y trae 100 elementos por cada página.
 * La función acumula las categorías obtenidas y construye el árbol dinámicamente.
 */
const useCategoriesTree = () => {
  const [page, setPage] = useState(1);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  // Bandera para saber si se han obtenido todas las categorías.
  const [hasMore, setHasMore] = useState(true);

  // Se usa 'network-only' para forzar que la consulta se realice a la red
  const [{ data, fetching, error }] = useQuery({
    query: GetCategoriesAllDocument,
    variables: { "page": page },
    client,
    requestPolicy: "network-only"
  });

  useEffect(() => {
    if (data?.categories) {
      const fetched: Category[] = data.categories;
      // Si la cantidad de categorías retornadas es menor a 100, no hay más páginas.
      if (fetched.length < 100) {
        setHasMore(false);
      }
      setAllCategories(prev => {
        // Filtrar duplicados en base al 'slug'
        const newCats = fetched.filter(
          cat => !prev.some(prevCat => prevCat.slug === cat.slug)
        );
        return [...prev, ...newCats];
      });
    }
  }, [data]);

  // Construir el árbol usando la función creada previamente.
  const menuTree = buildCategoryTree(allCategories);

  const loadMore = () => {
    if (hasMore && !fetching) {
      setPage(prev => prev + 1);
    }
  };

  return {
    menu: menuTree,
    loading: fetching,
    error,
    loadMore,
    hasMore
  };
};

export default useCategoriesTree;


