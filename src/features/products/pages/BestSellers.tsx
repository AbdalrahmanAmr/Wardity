import { FC } from "react";
import { useProducts } from "@/features/products/queries/productQueries";
import { ProductCard } from "@/features/products/components/ProductCard";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { ErrorBlock } from "@/shared/components/ErrorBlock";

export const BestSellers: FC = () => {
  const { data: products, isLoading, isError, error } = useProducts({ badge: "Best Seller" });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4">
          <ErrorBlock message={error?.message || "Failed to load best sellers"} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wardity-bg py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Best Sellers</h1>
          <p className="text-gray-600">Our most popular products</p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No best sellers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

