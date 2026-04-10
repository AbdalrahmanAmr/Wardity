import { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/features/products/queries/productQueries";
import { ProductCard } from "@/features/products";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { ErrorBlock } from "@/shared/components/ErrorBlock";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export const BrandDetail: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: allProducts, isLoading, isError, error } = useProducts({ pageSize: 100 });

  const brandName = slug
    ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "";

  const products = allProducts?.filter(
    (p) => p.brandLogo?.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4 flex justify-center py-16">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4">
          <ErrorBlock message={error?.message || "Failed to load brand"} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wardity-bg py-12">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRightIcon className="w-4 h-4" />
          <Link to="/brands" className="hover:text-primary">Brands</Link>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-gray-900">{brandName}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{brandName}</h1>
          <p className="text-gray-600">
            {products && products.length > 0
              ? `${products.length} products from ${brandName}`
              : `Browse products from ${brandName}`}
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No products found for this brand</p>
            <Link to="/brands" className="text-primary hover:underline font-medium">
              View all brands
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
