import { FC } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon, TruckIcon, GiftIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { HeroBanner, ProductCard, OccasionCard, CategoryCard } from "@/components/features";
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
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop",
    brandLogo: "Passionelle",
  },
  {
    id: "prod_002",
    name: "Passionelle New Year Wishes Tin",
    price: 3819,
    badge: "New",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    brandLogo: "Passionelle",
  },
  {
    id: "prod_003",
    name: "Happy New Year Floral & Chocolate Box",
    price: 2590,
    badge: "New",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop",
  },
  {
    id: "prod_004",
    name: "Happy New Year Festive Ruby Pot",
    price: 1391,
    badge: "New",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop",
  },
  {
    id: "prod_005",
    name: "Happy New Year Reindeer",
    price: 1196,
    badge: "New",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=400&fit=crop",
  },
  {
    id: "prod_006",
    name: "Fleur New Year Cookies Box 18 Pieces",
    price: 2497,
    badge: "New",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop",
    brandLogo: "Fleur",
  },
];

const bestSellers: Product[] = [
  {
    id: "bs_001",
    name: "Happy New Year Floral & Chocolate Box",
    price: 2590,
    badge: "New",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop",
  },
  {
    id: "bs_002",
    name: "Fleur Belgian Chocolate Box & Festive Arrangement",
    price: 4043,
    badge: "New",
    image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=400&h=400&fit=crop",
  },
  {
    id: "bs_003",
    name: "BTC Gold Bar 1 Gram with Red Roses",
    price: 10622,
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop",
    brandLogo: "BTC",
  },
  {
    id: "bs_004",
    name: "BTC Quarter Gold Pound (2g) with Roses",
    price: 17211,
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop",
    brandLogo: "BTC",
  },
];

const categories: Category[] = [
  { name: "Hand Bouquets", imageType: "illustration_bouquet", bgColor: "#FFF5F7" },
  { name: "Boxes", imageType: "illustration_box_roses", bgColor: "#FFF5F7" },
  { name: "Vases", imageType: "illustration_vase_flowers", bgColor: "#FFF5F7" },
  { name: "Plants", imageType: "illustration_potted_plant", bgColor: "#FFF5F7" },
];

export const Home: FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Occasions Carousel */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Occasions</h2>
          </div>

          <div className="flex overflow-x-auto gap-2 md:gap-4 pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-7">
            {occasions.map((occasion) => (
              <div key={occasion.name} className="flex-shrink-0 w-24 md:w-auto">
                <OccasionCard occasion={occasion} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Year Collection */}
      <section className="py-12 bg-wardity-bg dark:bg-wardity-bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                New year New moments
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Celebrate with our festive collection</p>
            </div>
            <Link
              to="/collections/new-year"
              className="hidden md:flex items-center gap-1 text-primary font-medium hover:underline"
            >
              View All
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {newYearProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link
              to="/collections/new-year"
              className="inline-flex items-center gap-1 text-primary font-medium"
            >
              View All Products
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Best Sellers</h2>
            <Link
              to="/best-sellers"
              className="flex items-center gap-1 text-primary font-medium hover:underline"
            >
              View More
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-wardity-bg dark:bg-wardity-bg-dark">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Categories</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Our Benefits
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=400&fit=crop"
                  alt="Wardity Delivery"
                  className="rounded-2xl shadow-lg w-full"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/5 rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <TruckIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Same-Day Delivery</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Experience same-day flower delivery to Cairo and Giza. Swift shipping, ensuring
                your sentiments are delivered promptly and your gifts arrive fresh.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <GiftIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Gift Wrapping</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <ShieldCheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">100% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Connected with Wardity
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and flower care tips.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              // In a real app, you'd call an API here
              console.log("Newsletter subscription:", email);
              alert("Thank you for subscribing!");
              e.currentTarget.reset();
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
