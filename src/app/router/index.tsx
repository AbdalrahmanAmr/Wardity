import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/app/layouts/RootLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFound } from "@/pages";
import { productLoader, categoryLoader, occasionLoader } from "./loaders";

// Auth
const Login = lazy(() => import("@/features/auth/pages/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("@/features/auth/pages/Register").then((m) => ({ default: m.Register })));
const ForgotPassword = lazy(() => import("@/features/auth/pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })));

// Products
const Product = lazy(() => import("@/features/products/pages/Product").then((m) => ({ default: m.Product })));
const Search = lazy(() => import("@/features/products/pages/Search").then((m) => ({ default: m.Search })));
const BestSellers = lazy(() => import("@/features/products/pages/BestSellers").then((m) => ({ default: m.BestSellers })));
const SpecialGifts = lazy(() => import("@/features/products/pages/SpecialGifts").then((m) => ({ default: m.SpecialGifts })));

// Catalog
const Categories = lazy(() => import("@/features/catalog/pages/Categories").then((m) => ({ default: m.Categories })));
const CategoryDetail = lazy(() => import("@/features/catalog/pages/CategoryDetail").then((m) => ({ default: m.CategoryDetail })));
const Occasions = lazy(() => import("@/features/catalog/pages/Occasions").then((m) => ({ default: m.Occasions })));
const OccasionDetail = lazy(() => import("@/features/catalog/pages/OccasionDetail").then((m) => ({ default: m.OccasionDetail })));
const Brands = lazy(() => import("@/features/catalog/pages/Brands").then((m) => ({ default: m.Brands })));
const BrandDetail = lazy(() => import("@/features/catalog/pages/BrandDetail").then((m) => ({ default: m.BrandDetail })));
const CollectionDetail = lazy(() => import("@/features/catalog/pages/CollectionDetail").then((m) => ({ default: m.CollectionDetail })));

// Cart
const Cart = lazy(() => import("@/features/cart/pages/Cart").then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import("@/features/cart/pages/Checkout").then((m) => ({ default: m.Checkout })));

// Orders
const Orders = lazy(() => import("@/features/orders/pages/Orders").then((m) => ({ default: m.Orders })));
const OrderTracking = lazy(() => import("@/features/orders/pages/OrderTracking").then((m) => ({ default: m.OrderTracking })));
const TrackOrder = lazy(() => import("@/features/orders/pages/TrackOrder").then((m) => ({ default: m.TrackOrder })));

// Wishlist
const Wishlist = lazy(() => import("@/features/wishlist/pages/Wishlist").then((m) => ({ default: m.Wishlist })));

// User
const Profile = lazy(() => import("@/features/user/pages/Profile").then((m) => ({ default: m.Profile })));

// Marketing / Static
const Home = lazy(() => import("@/features/marketing/pages/Home").then((m) => ({ default: m.Home })));
const Contact = lazy(() => import("@/features/marketing/pages/Contact").then((m) => ({ default: m.Contact })));
const FAQs = lazy(() => import("@/features/marketing/pages/FAQs").then((m) => ({ default: m.FAQs })));
const Delivery = lazy(() => import("@/features/marketing/pages/Delivery").then((m) => ({ default: m.Delivery })));
const About = lazy(() => import("@/features/marketing/pages/About").then((m) => ({ default: m.About })));
const Privacy = lazy(() => import("@/features/marketing/pages/Privacy").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("@/features/marketing/pages/Terms").then((m) => ({ default: m.Terms })));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <Product />, loader: productLoader },
      { path: "categories", element: <Categories /> },
      { path: "categories/:slug", element: <CategoryDetail />, loader: categoryLoader },
      { path: "occasions", element: <Occasions /> },
      { path: "occasions/:slug", element: <OccasionDetail />, loader: occasionLoader },
      { path: "brands", element: <Brands /> },
      { path: "brands/:slug", element: <BrandDetail /> },
      { path: "special-gifts", element: <SpecialGifts /> },
      { path: "collections/:slug", element: <CollectionDetail /> },
      { path: "best-sellers", element: <BestSellers /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "search", element: <Search /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "orders/:id", element: <ProtectedRoute><OrderTracking /></ProtectedRoute> },
      { path: "contact", element: <Contact /> },
      { path: "faqs", element: <FAQs /> },
      { path: "delivery", element: <Delivery /> },
      { path: "track-order", element: <TrackOrder /> },
      { path: "about", element: <About /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
