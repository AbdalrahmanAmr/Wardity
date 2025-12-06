import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import {
  Home,
  Product,
  NotFound,
  Cart,
  Login,
  Register,
  Search,
  Checkout,
  Categories,
  CategoryDetail,
  Occasions,
  OccasionDetail,
  Brands,
  SpecialGifts,
  CollectionDetail,
  BestSellers,
  Wishlist,
  Profile,
  Orders,
  OrderTracking,
  Contact,
  FAQs,
  Delivery,
  TrackOrder,
  About,
  Privacy,
  Terms,
} from "@/pages";
import { productLoader, categoryLoader, occasionLoader } from "./loaders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <Product />,
        loader: productLoader,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:slug",
        element: <CategoryDetail />,
        loader: categoryLoader,
      },
      {
        path: "occasions",
        element: <Occasions />,
      },
      {
        path: "occasions/:slug",
        element: <OccasionDetail />,
        loader: occasionLoader,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "special-gifts",
        element: <SpecialGifts />,
      },
      {
        path: "collections/:slug",
        element: <CollectionDetail />,
      },
      {
        path: "best-sellers",
        element: <BestSellers />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <OrderTracking />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "faqs",
        element: <FAQs />,
      },
      {
        path: "delivery",
        element: <Delivery />,
      },
      {
        path: "track-order",
        element: <TrackOrder />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
