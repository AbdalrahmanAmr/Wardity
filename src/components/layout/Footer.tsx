import { FC } from "react";
import { Link } from "react-router-dom";

const footerLinks = {
  shop: [
    { label: "Hand Bouquets", path: "/categories/bouquets" },
    { label: "Flower Boxes", path: "/categories/boxes" },
    { label: "Vases", path: "/categories/vases" },
    { label: "Plants", path: "/categories/plants" },
  ],
  support: [
    { label: "Contact Us", path: "/contact" },
    { label: "FAQs", path: "/faqs" },
    { label: "Delivery Info", path: "/delivery" },
    { label: "Track Order", path: "/track-order" },
  ],
  company: [
    { label: "About Us", path: "/about" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
];

export const Footer: FC = () => {
  return (
    <footer className="bg-charcoal border-t border-gold/20">
      {/* Main footer body */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column — SVG wordmark */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              {/* Decorative rose SVG — mirrors the header mark */}
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" />
                <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.85" transform="rotate(72,12,12)" />
                <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.75" transform="rotate(144,12,12)" />
                <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.8" transform="rotate(216,12,12)" />
                <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.9" transform="rotate(288,12,12)" />
                <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(36,12,12)" />
                <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(108,12,12)" />
                <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(180,12,12)" />
                <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(252,12,12)" />
                <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(324,12,12)" />
                <circle cx="12" cy="12" r="2" fill="#8A1029" />
                <circle cx="12" cy="12" r="0.75" fill="#FAF7F2" opacity="0.6" />
              </svg>

              <div className="flex flex-col leading-none">
                <span className="font-heading italic text-[1.45rem] text-cream tracking-wide leading-none">
                  Wardity
                </span>
                <span className="text-[8px] tracking-[0.22em] text-cream/40 uppercase font-sans mt-1">
                  A Blooming Connection
                </span>
              </div>
            </Link>

            <p className="text-sm text-cream/55 font-light leading-relaxed tracking-wide mb-7">
              Delivering love and joy through beautiful flowers and gifts across
              Cairo and Giza.
            </p>

            {/* Social icons — minimal outline circles */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:border-gold hover:text-gold transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[10px] tracking-[0.15em] uppercase text-gold font-sans font-medium mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/55 hover:text-cream tracking-wide transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] tracking-[0.15em] uppercase text-gold font-sans font-medium mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/55 hover:text-cream tracking-wide transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] tracking-[0.15em] uppercase text-gold font-sans font-medium mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/55 hover:text-cream tracking-wide transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-cream/35 tracking-wide">
              © {new Date().getFullYear()} Wardity. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://placehold.co/40x25/2a2a2c/F5ECD7?text=Visa"
                alt="Visa"
                className="h-6 opacity-50"
              />
              <img
                src="https://placehold.co/40x25/2a2a2c/F5ECD7?text=Pay"
                alt="InstaPay"
                className="h-6 opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
