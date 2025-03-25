"use client";


import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import { useFetchProductsByCategory } from "@/hooks/useFetchProductsByCategory";
import { transformProducts } from "./transFormProduct";

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
      .then((data) => {
        const transformed = transformProducts(data);
        setProducts(transformed);
      })
      .finally(() => setLoading(false));
  }, [slug, page]);

  const nextPage = () => router.push(`/category/${slug}?page=${page + 1}`);
  const prevPage = () => router.push(`/category/${slug}?page=${Math.max(1, page - 1)}`);

  return (
    <main>
      <ShopWithoutSidebar shop={products} />
    </main>
  );
};

export default CategoryPage;
