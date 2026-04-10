import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface HeroSlide {
  id: string;
  headline: string;
  subHeadline?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "1",
    headline: "Roses meet Fleur — chocolate love takes shape",
    ctaText: "Discover the Collection",
    ctaLink: "/collections/love-collection",
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1200&h=600&fit=crop",
  },
  {
    id: "2",
    headline: "New Year, New Beginnings",
    subHeadline: "Celebrate with our festive collection",
    ctaText: "Explore Now",
    ctaLink: "/collections/new-year",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=600&fit=crop",
  },
  {
    id: "3",
    headline: "Express Your Love",
    subHeadline: "With our premium bouquets",
    ctaText: "Explore Now",
    ctaLink: "/categories/bouquets",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=600&fit=crop",
  },
];

export const HeroBanner: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const nextSlide = (): void =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  const prevSlide = (): void =>
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">

        {/* Slide backgrounds — all rendered, only active is visible */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            {!failedImages.has(slide.id) ? (
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setFailedImages((prev) => new Set(prev).add(slide.id))}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-rose-700 to-rose-500" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
          </div>
        ))}

        {/* Slide content — fades in sync with its background */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 flex items-center transition-opacity duration-700 ease-in-out"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <div className="container mx-auto px-6 md:px-10">
              <div className="max-w-2xl text-white">
                <h1 className="font-heading font-light text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.1] tracking-wide mb-5 text-balance">
                  {slide.headline}
                </h1>
                {slide.subHeadline && (
                  <p className="text-base md:text-lg text-white/75 mb-8 font-light tracking-wide">
                    {slide.subHeadline}
                  </p>
                )}
                <Link
                  to={slide.ctaLink}
                  tabIndex={index !== currentSlide ? -1 : 0}
                  className="inline-flex items-center gap-3 border border-white/70 text-white text-xs tracking-[0.18em] uppercase px-8 py-3.5 hover:bg-white hover:text-charcoal hover:border-white transition-all duration-300"
                >
                  {slide.ctaText}
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows — square, outlined to match CTA aesthetic */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/40 flex items-center justify-center text-white hover:bg-white/15 hover:border-white/70 transition-all duration-200 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/40 flex items-center justify-center text-white hover:bg-white/15 hover:border-white/70 transition-all duration-200 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        {/* Dot indicators — thin dashes to match editorial feel */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[2px] transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/65"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
