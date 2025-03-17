"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useFetchProductsByCategory } from "@/hooks/useFetchProductsByCategory";

const CategoryPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = params.slug as string;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  const fetchProducts = useFetchProductsByCategory();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts(slug, page, pageSize)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [slug, page]);

  const nextPage = () => router.push(`/category/${slug}?page=${page + 1}`);
  const prevPage = () => router.push(`/category/${slug}?page=${Math.max(1, page - 1)}`);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{slug.replace("-", " ")}</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}

      {/* Controles de paginación */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default CategoryPage;
