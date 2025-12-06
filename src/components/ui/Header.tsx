import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
];

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent hover:from-primary-500 hover:to-primary-300 transition-all"
          >
            Wardity
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-600"
                      : "text-gray-600 hover:text-primary-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-down">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

