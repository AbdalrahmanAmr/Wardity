import { FC, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TruckIcon,
  GiftIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { HeroBanner } from "@/features/marketing/components/HeroBanner";
import { ProductCard } from "@/features/products";
import { OccasionCard, CategoryCard } from "@/features/catalog";
import { SectionHeader, LoadingSpinner } from "@/shared/components";
import { env } from "@/shared/config/env";
import { useCategories, useOccasions } from "@/features/catalog/queries/categoryQueries";
import { useProducts } from "@/features/products/queries/productQueries";
import luxeBouquetImg from "@/assets/luxe-bouquet.png";

/** Returns thumb width + translateX (px) for a scroll progress indicator. */
function calcThumb(el: HTMLDivElement): { w: number; x: number } {
  const { scrollLeft, scrollWidth, clientWidth } = el;
  if (scrollWidth <= clientWidth) return { w: clientWidth, x: 0 };
  const w = (clientWidth / scrollWidth) * clientWidth;
  const x = (scrollLeft / (scrollWidth - clientWidth)) * (clientWidth - w);
  return { w, x };
}

export const Home: FC = () => {
  const occasionsRef = useRef<HTMLDivElement>(null);
  const newYearRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const [occasionsThumb, setOccasionsThumb] = useState({ w: 0, x: 0 });
  const [newYearThumb, setNewYearThumb] = useState({ w: 0, x: 0 });
  const [bestSellersThumb, setBestSellersThumb] = useState({ w: 0, x: 0 });

  const {
    data: occasions,
    isLoading: occasionsLoading,
    isError: occasionsError,
  } = useOccasions();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();
  const { data: newYearProducts, isLoading: newYearLoading } = useProducts({ pageSize: 8 });
  const { data: bestSellers, isLoading: bestSellersLoading } = useProducts({ badge: "Best Seller", pageSize: 6 });

  useEffect(() => {
    if (occasionsRef.current) setOccasionsThumb(calcThumb(occasionsRef.current));
    if (newYearRef.current) setNewYearThumb(calcThumb(newYearRef.current));
    if (bestSellersRef.current)
      setBestSellersThumb(calcThumb(bestSellersRef.current));
  }, [occasions, newYearProducts, bestSellers]);

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Occasions Carousel */}
      <section className="py-12 bg-cream border-t border-gold/15">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader
              label="Shop by Moment"
              title="Elevate Every Occasion"
            />
            <Link
              to="/occasions"
              className="hidden md:inline text-xs tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-charcoal transition-colors"
            >
              View All
            </Link>
          </div>

          {occasionsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="sm" />
            </div>
          ) : occasionsError ? (
            <p className="text-center text-red-600 py-8 text-sm">
              We couldn&apos;t load occasions. Please refresh or try again later.
            </p>
          ) : occasions && occasions.length > 0 ? (
            <>
              <div
                ref={occasionsRef}
                onScroll={(e) => setOccasionsThumb(calcThumb(e.currentTarget))}
                className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
              >
                {occasions.map((occasion) => (
                  <div
                    key={occasion.name}
                    className="flex-shrink-0 snap-start"
                  >
                    <OccasionCard occasion={occasion} />
                  </div>
                ))}
              </div>

              <div className="mt-6 h-[1px] w-full bg-gold/20 relative">
                <div
                  className="absolute top-0 left-0 h-[1px] bg-gold transition-transform duration-150 ease-out"
                  style={{
                    width: `${occasionsThumb.w}px`,
                    transform: `translateX(${occasionsThumb.x}px)`,
                  }}
                />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 py-8 text-sm">
              No occasions yet — add catalog data to see this section.
            </p>
          )}

          <div className="mt-6 text-center md:hidden">
            <Link
              to="/occasions"
              className="text-xs tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-charcoal transition-colors"
            >
              View All Occasions
            </Link>
          </div>
        </div>
      </section>

      {/* New Year Collection */}
      <section className="py-12 bg-wardity-bg dark:bg-wardity-bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader
              label="Featured Collection"
              title="New Year, New Moments"
            />
            <Link
              to="/collections/new-year"
              className="hidden md:inline text-xs tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-charcoal transition-colors"
            >
              View All
            </Link>
          </div>

          {newYearLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="sm" />
            </div>
          ) : newYearProducts && newYearProducts.length > 0 ? (
            <>
              <div
                ref={newYearRef}
                onScroll={(e) => setNewYearThumb(calcThumb(e.currentTarget))}
                className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              >
                {newYearProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-[260px] md:w-[300px] snap-start"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Gold scroll progress track */}
              <div className="mt-6 h-[1px] w-full bg-gold/20 relative">
                <div
                  className="absolute top-0 left-0 h-[1px] bg-gold transition-transform duration-150 ease-out"
                  style={{
                    width: `${newYearThumb.w}px`,
                    transform: `translateX(${newYearThumb.x}px)`,
                  }}
                />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 py-8">No products found</p>
          )}

          <div className="mt-6 text-center md:hidden">
            <Link
              to="/collections/new-year"
              className="text-xs tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-charcoal transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader label="Most Loved" title="Best Sellers" />
            <Link
              to="/best-sellers"
              className="text-xs tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-charcoal transition-colors"
            >
              View More
            </Link>
          </div>

          {bestSellersLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="sm" />
            </div>
          ) : bestSellers && bestSellers.length > 0 ? (
            <>
              <div
                ref={bestSellersRef}
                onScroll={(e) => setBestSellersThumb(calcThumb(e.currentTarget))}
                className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              >
                {bestSellers.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-[260px] md:w-[300px] snap-start"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Gold scroll progress track */}
              <div className="mt-6 h-[1px] w-full bg-gold/20 relative">
                <div
                  className="absolute top-0 left-0 h-[1px] bg-gold transition-transform duration-150 ease-out"
                  style={{
                    width: `${bestSellersThumb.w}px`,
                    transform: `translateX(${bestSellersThumb.x}px)`,
                  }}
                />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 py-8">No best sellers found</p>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-wardity-bg border-t border-gold/15">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Explore our Range"
            title="The Collection"
            className="mb-8"
          />

          {categoriesLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="sm" />
            </div>
          ) : categoriesError ? (
            <p className="text-center text-red-600 py-8 text-sm">
              We couldn&apos;t load categories. Please refresh or try again later.
            </p>
          ) : categories && categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {categories.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8 text-sm">
              No categories yet — add catalog data to see this section.
            </p>
          )}
        </div>
      </section>

      {/* Collections */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Curated For You"
            title="Shop by Collection"
            className="mb-8"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Hand Bouquets", slug: "hand-bouquets", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400", color: "from-pink-50 to-rose-100" },
              { name: "Flower Boxes", slug: "flower-boxes", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400", color: "from-purple-50 to-violet-100" },
              { name: "Vases", slug: "vases", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400", color: "from-blue-50 to-indigo-100" },
              { name: "Plants", slug: "plants", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400", color: "from-green-50 to-emerald-100" },
            ].map((col) => (
              <Link
                key={col.slug}
                to={`/categories/${col.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] flex items-end"
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = `https://placehold.co/400x500/FAF7F2/D02046?text=${encodeURIComponent(col.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="relative p-4 md:p-6 w-full">
                  <h3 className="text-white font-bold text-lg md:text-xl tracking-wide drop-shadow-lg">
                    {col.name}
                  </h3>
                  <p className="text-white/70 text-xs mt-1 group-hover:text-white transition-colors">
                    Shop Now &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Our Promise"
            title="Why Wardity"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden shadow-lg aspect-[4/3]">
                <img
                  src={luxeBouquetImg}
                  alt="Wardity luxury flower arrangement"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 border border-gold/30 bg-champagne/50 flex items-center justify-center flex-shrink-0">
                  <TruckIcon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-heading font-light text-xl tracking-wide text-charcoal">
                  Same-Day Delivery
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed tracking-wide text-sm">
                Experience same-day flower delivery to Cairo and Giza. Swift
                shipping, ensuring your sentiments are delivered promptly and
                your gifts arrive fresh.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-white border border-gold/20">
                  <GiftIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-[0.12em] uppercase text-charcoal/50 font-sans mb-0.5">Complimentary</p>
                    <p className="text-sm text-charcoal tracking-wide">Gift Wrapping</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gold/20">
                  <ShieldCheckIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-[0.12em] uppercase text-charcoal/50 font-sans mb-0.5">Guaranteed</p>
                    <p className="text-sm text-charcoal tracking-wide">100% Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative py-20 bg-charcoal overflow-hidden">
        {/* Floral SVG background overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.06]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={`stem-${angle}`}
                x1="200"
                y1="200"
                x2="200"
                y2="18"
                stroke="white"
                strokeWidth="0.75"
                transform={`rotate(${angle}, 200, 200)`}
              />
            ))}

            {[0, 90, 180, 270].map((angle) => (
              <ellipse
                key={`bud-${angle}`}
                cx="200"
                cy="13"
                rx="4"
                ry="7"
                fill="white"
                opacity="0.55"
                transform={`rotate(${angle}, 200, 200)`}
              />
            ))}

            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <path
                key={`outer-${angle}`}
                d="M200 200 C187 166 187 138 200 122 C213 138 213 166 200 200Z"
                fill="white"
                transform={`rotate(${angle}, 200, 200)`}
              />
            ))}

            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
              (angle) => (
                <path
                  key={`inner-${angle}`}
                  d="M200 200 C193 176 193 156 200 144 C207 156 207 176 200 200Z"
                  fill="white"
                  opacity="0.55"
                  transform={`rotate(${angle}, 200, 200)`}
                />
              ),
            )}

            <circle cx="200" cy="200" r="17" fill="white" />
            <circle cx="200" cy="200" r="7" fill="white" opacity="0.35" />
          </svg>

          <svg
            className="absolute -top-10 -left-10 w-48 h-48 opacity-[0.04]"
            viewBox="0 0 200 200"
            fill="none"
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <path
                key={angle}
                d="M100 100 C93 82 93 65 100 55 C107 65 107 82 100 100Z"
                fill="white"
                transform={`rotate(${angle}, 100, 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="10" fill="white" />
          </svg>

          <svg
            className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.04]"
            viewBox="0 0 200 200"
            fill="none"
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <path
                key={angle}
                d="M100 100 C93 82 93 65 100 55 C107 65 107 82 100 100Z"
                fill="white"
                transform={`rotate(${angle}, 100, 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="10" fill="white" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center">
          <SectionHeader
            label="Stay in the Loop"
            title="Stay Connected with Wardity"
            subtitle="Subscribe for exclusive offers, new arrivals, and flower care tips."
            align="center"
            inverted
            className="mb-10 max-w-sm mx-auto"
          />

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const fd = new FormData(form);
              const email = fd.get("email") as string;
              try {
                const res = await fetch(`${env.apiUrl}/newsletter/subscribe`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                const data = await res.json();
                alert(data.message || "Subscribed!");
                form.reset();
              } catch {
                alert("Something went wrong. Please try again.");
              }
            }}
            className="flex flex-col items-center gap-6 max-w-xs mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className="w-full bg-transparent border-0 border-b border-white/30 text-white placeholder-white/35 pb-3 text-sm tracking-wide text-center focus:outline-none focus:border-white/65 transition-colors duration-200"
            />

            <button
              type="submit"
              className="border border-white/70 text-white text-xs tracking-[0.18em] uppercase px-10 py-3 hover:bg-white hover:text-charcoal transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
