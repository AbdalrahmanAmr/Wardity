import { FC } from "react";
import { Link } from "react-router-dom";
import { useOccasions } from "@/services/queries/categoryQueries";
import { OccasionCard } from "@/components/features";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorBlock } from "@/components/ui/ErrorBlock";

export const Occasions: FC = () => {
  const { data: occasions, isLoading, isError, error } = useOccasions();

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
          <ErrorBlock message={error?.message || "Failed to load occasions"} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wardity-bg py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">All Occasions</h1>
          <p className="text-gray-600">Find the perfect gift for every occasion</p>
        </div>

        {occasions && occasions.length > 0 ? (
          <div className="flex overflow-x-auto gap-2 md:gap-4 pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-7">
            {occasions.map((occasion) => (
              <Link
                key={occasion.name}
                to={`/occasions/${occasion.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex-shrink-0 w-24 md:w-auto"
              >
                <OccasionCard occasion={occasion} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No occasions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

