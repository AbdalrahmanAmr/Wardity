import { FC, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TruckIcon,
  GiftIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import {
  HeroBanner,
  ProductCard,
  OccasionCard,
  CategoryCard,
} from "@/components/features";
import { SectionHeader } from "@/components/ui";
import type { Product, Occasion, Category } from "@/types";

// Mock data from JSON
const occasions: Occasion[] = [
  { name: "New Year", imageType: "3D_snowman_tree" },
  { name: "Birthdays", imageType: "3D_cake_candles" },
  { name: "Anniversary", imageType: "3D_balloons" },
  { name: "Wedding", imageType: "3D_rings" },
  { name: "Thank you", imageType: "3D_sign" },
  { name: "Graduation", imageType: "3D_cap" },
  { name: "New Born", imageType: "3D_clouds" },
];

const newYearProducts: Product[] = [
  {
    id: "prod_001",
    name: "Passionelle New Year Mini Bucket",
    price: 2761,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop",
    brandLogo: "Passionelle",
  },
  {
    id: "prod_002",
    name: "Passionelle New Year Wishes Tin",
    price: 3819,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    brandLogo: "Passionelle",
  },
  {
    id: "prod_003",
    name: "Happy New Year Floral & Chocolate Box",
    price: 2590,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop",
  },
  {
    id: "prod_004",
    name: "Happy New Year Festive Ruby Pot",
    price: 1391,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop",
  },
  {
    id: "prod_005",
    name: "Happy New Year Reindeer",
    price: 1196,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=400&fit=crop",
  },
  {
    id: "prod_006",
    name: "Fleur New Year Cookies Box 18 Pieces",
    price: 2497,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop",
    brandLogo: "Fleur",
  },
];

const bestSellers: Product[] = [
  {
    id: "bs_001",
    name: "Happy New Year Floral & Chocolate Box",
    price: 2590,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop",
  },
  {
    id: "bs_002",
    name: "Fleur Belgian Chocolate Box & Festive Arrangement",
    price: 4043,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=400&h=400&fit=crop",
  },
  {
    id: "bs_003",
    name: "BTC Gold Bar 1 Gram with Red Roses",
    price: 10622,
    image:
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop",
    brandLogo: "BTC",
  },
  {
    id: "bs_004",
    name: "BTC Quarter Gold Pound (2g) with Roses",
    price: 17211,
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop",
    brandLogo: "BTC",
  },
];

const categories: Category[] = [
  {
    name: "Hand Bouquets",
    imageType: "illustration_bouquet",
    bgColor: "#FFF5F7",
  },
  { name: "Boxes", imageType: "illustration_box_roses", bgColor: "#FFF5F7" },
  { name: "Vases", imageType: "illustration_vase_flowers", bgColor: "#FFF5F7" },
  {
    name: "Plants",
    imageType: "illustration_potted_plant",
    bgColor: "#FFF5F7",
  },
];

/** Returns thumb width + translateX (px) for a scroll progress indicator. */
function calcThumb(el: HTMLDivElement): { w: number; x: number } {
  const { scrollLeft, scrollWidth, clientWidth } = el;
  if (scrollWidth <= clientWidth) return { w: clientWidth, x: 0 };
  const w = (clientWidth / scrollWidth) * clientWidth;
  const x = (scrollLeft / (scrollWidth - clientWidth)) * (clientWidth - w);
  return { w, x };
}

export const Home: FC = () => {
  const newYearRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const [newYearThumb, setNewYearThumb] = useState({ w: 0, x: 0 });
  const [bestSellersThumb, setBestSellersThumb] = useState({ w: 0, x: 0 });

  useEffect(() => {
    if (newYearRef.current) setNewYearThumb(calcThumb(newYearRef.current));
    if (bestSellersRef.current)
      setBestSellersThumb(calcThumb(bestSellersRef.current));
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Occasions */}
      <section className="py-12 bg-cream border-t border-gold/15">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Shop by Moment"
            title="Elevate Every Occasion"
            className="mb-8"
          />

          <div className="flex overflow-x-auto gap-3 md:gap-6 pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:overflow-x-visible md:justify-between">
            {occasions.map((occasion) => (
              <div
                key={occasion.name}
                className="flex-shrink-0 w-24 md:flex-shrink md:w-auto"
              >
                <OccasionCard occasion={occasion} />
              </div>
            ))}
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

          {/* Horizontal carousel */}
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

          {/* Horizontal carousel */}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
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
                  src="/src/assets/luxe-bouquet.png"
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
            {/* Radiating stems */}
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

            {/* Small leaf buds at stem tips (cardinal only) */}
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

            {/* Outer petals — 8, wide teardrop */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <path
                key={`outer-${angle}`}
                d="M200 200 C187 166 187 138 200 122 C213 138 213 166 200 200Z"
                fill="white"
                transform={`rotate(${angle}, 200, 200)`}
              />
            ))}

            {/* Inner petals — 8, narrower, offset 22.5° */}
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

            {/* Centre disc */}
            <circle cx="200" cy="200" r="17" fill="white" />
            <circle cx="200" cy="200" r="7" fill="white" opacity="0.35" />
          </svg>

          {/* Corner accent blooms — small echoes at top-left and bottom-right */}
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
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              console.log("Newsletter subscription:", email);
              alert("Thank you for subscribing!");
              e.currentTarget.reset();
            }}
            className="flex flex-col items-center gap-6 max-w-xs mx-auto"
          >
            {/* Underline-only input */}
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className="w-full bg-transparent border-0 border-b border-white/30 text-white placeholder-white/35 pb-3 text-sm tracking-wide text-center focus:outline-none focus:border-white/65 transition-colors duration-200"
            />

            {/* Thin outlined CTA */}
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
