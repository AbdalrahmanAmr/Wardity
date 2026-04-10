import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-wardity-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute top-1/4 left-10 w-32 h-32 opacity-[0.04] text-primary"
          viewBox="0 0 120 120"
          fill="currentColor"
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
              key={angle}
              d="M60 60 C53 42 53 28 60 18 C67 28 67 42 60 60Z"
              transform={`rotate(${angle}, 60, 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="8" />
        </svg>
        <svg
          className="absolute bottom-1/4 right-10 w-40 h-40 opacity-[0.03] text-gold"
          viewBox="0 0 120 120"
          fill="currentColor"
        >
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <path
              key={angle}
              d="M60 60 C53 42 53 28 60 18 C67 28 67 42 60 60Z"
              transform={`rotate(${angle}, 60, 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="6" />
        </svg>
      </div>

      <div className="relative text-center px-4 max-w-lg mx-auto">
        {/* Animated flower illustration */}
        <div className="mb-6">
          <svg
            className="w-40 h-40 mx-auto text-primary"
            viewBox="0 0 200 200"
            fill="none"
          >
            <line x1="100" y1="200" x2="100" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <path d="M90 170 Q80 150 85 140" stroke="currentColor" strokeWidth="1.5" opacity="0.2" fill="none" />
            <path d="M110 170 Q120 150 115 140" stroke="currentColor" strokeWidth="1.5" opacity="0.2" fill="none" />

            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <path
                key={angle}
                d="M100 100 C90 72 90 50 100 36 C110 50 110 72 100 100Z"
                fill="currentColor"
                opacity="0.1"
                transform={`rotate(${angle}, 100, 100)`}
              />
            ))}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <path
                key={`stroke-${angle}`}
                d="M100 100 C90 72 90 50 100 36 C110 50 110 72 100 100Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.25"
                transform={`rotate(${angle}, 100, 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.15" />
            <circle cx="100" cy="100" r="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />

            <text
              x="100"
              y="108"
              textAnchor="middle"
              fill="currentColor"
              fontSize="18"
              fontWeight="700"
              opacity="0.6"
            >
              ?
            </text>
          </svg>
        </div>

        {/* 404 text */}
        <div className="mb-4">
          <span className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-primary via-rose-400 to-gold bg-clip-text text-transparent">
            404
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          This page has bloomed elsewhere
        </h1>

        <p className="text-gray-500 mb-10 text-sm md:text-base leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Don't worry — our garden has plenty to explore!
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-all shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go Back
          </button>

          <Link
            to="/search"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            Search
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Popular Pages</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Categories", to: "/categories" },
              { label: "Best Sellers", to: "/best-sellers" },
              { label: "Occasions", to: "/occasions" },
              { label: "Contact Us", to: "/contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-gray-500 hover:text-primary hover:underline transition-colors px-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
