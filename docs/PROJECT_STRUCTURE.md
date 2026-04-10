# Project Structure -- What Every File and Folder Does

> Imagine the project is a **big house**. Each room has a specific purpose -- the kitchen is for cooking, the bedroom is for sleeping, and the living room is for hanging out. In the same way, each folder in this project has a specific job!

## The House (Top-Level View)

```
Wardity/                         <-- The whole house
|
|-- backend/                     <-- THE KITCHEN (server, hidden from visitors)
|-- src/                         <-- THE DINING ROOM (frontend, what visitors see)
|-- docs/                        <-- THE INSTRUCTION MANUAL (documentation)
|-- public/                      <-- THE FRONT PORCH (static files, favicon, etc.)
|-- node_modules/                <-- THE TOOLBOX (installed packages -- don't touch!)
|
|-- package.json                 <-- Shopping list of frontend tools needed
|-- vite.config.ts               <-- Instructions for the frontend build tool
|-- tailwind.config.js           <-- Design rules (colors, fonts, spacing)
|-- tsconfig.json                <-- TypeScript rules
|-- postcss.config.js            <-- CSS processing rules
|-- eslint.config.js             <-- Code quality rules
|-- vercel.json                  <-- Deployment settings for Vercel
|-- .gitignore                   <-- List of files Git should ignore
|-- README.md                    <-- The main welcome guide
```

## The Kitchen: Backend (`backend/`)

The backend is the **brain** of the website. It does all the thinking, data storage, and security.

```
backend/
|
|-- src/                          <-- All the backend source code
|   |
|   |-- index.ts                 <-- THE MAIN SWITCH: starts everything
|   |                                Turns on Express, loads all routes,
|   |                                connects to the database, starts listening
|   |
|   |-- database/                <-- THE FILING CABINET CONNECTION
|   |   |-- init.ts              <-- Connects to MySQL and creates all 12 tables
|   |                                If tables already exist, it skips them
|   |
|   |-- middleware/              <-- THE SECURITY GUARDS
|   |   |-- auth.ts              <-- Checks login tokens (are you really logged in?)
|   |   |-- errorHandler.ts      <-- Catches errors and sends friendly messages
|   |   |-- notFoundHandler.ts   <-- Says "404 Not Found" for wrong URLs
|   |
|   |-- routes/                  <-- THE MENU (what you can order)
|   |   |-- auth.ts              <-- Login, register, profile, change password
|   |   |-- products.ts          <-- List, search, filter, get product details
|   |   |-- categories.ts        <-- List categories, get products by category
|   |   |-- occasions.ts         <-- List occasions, get products by occasion
|   |   |-- cart.ts              <-- Add/remove/update shopping cart items
|   |   |-- wishlist.ts          <-- Add/remove wishlist items
|   |   |-- orders.ts            <-- Place orders, view history, get receipts
|   |   |-- contact.ts           <-- Handle contact form submissions
|   |   |-- newsletter.ts        <-- Handle newsletter subscriptions
|   |
|   |-- scripts/                 <-- ONE-TIME TOOLS
|   |   |-- seed.ts              <-- Fills database with sample data
|   |                                (categories, products, test user)
|   |
|   |-- utils/                   <-- HELPER TOOLS
|       |-- jwt.ts               <-- Creates and verifies login tokens
|       |-- password.ts          <-- Hashes (scrambles) passwords for storage
|       |-- validation.ts        <-- Checks data format (is this a real email?)
|       |-- id.ts                <-- Generates unique IDs (like ticket numbers)
|       |-- slug.ts              <-- Makes URL-safe names ("Red Rose" -> "red-rose")
|       |-- notifications.ts     <-- Sends emails, creates WhatsApp links
|       |-- shipping.ts          <-- Calculates delivery cost by location
|
|-- .env                          <-- SECRET SETTINGS (passwords, keys) -- NEVER share!
|-- .env.example                  <-- Template showing what secrets are needed
|-- package.json                  <-- List of backend packages
|-- tsconfig.json                 <-- TypeScript settings for the backend
```

### How a Request Flows Through the Backend

```
1. Request arrives at Express (index.ts)
     |
2. Helmet adds security headers
     |
3. Rate limiter checks if you're not spamming
     |
4. CORS checks if the request is from an allowed website
     |
5. JSON parser reads the request body
     |
6. Router sends it to the right route file
     |
7. Middleware checks if login is required (auth.ts)
     |
8. Route handler processes the request
     |
9. Database query gets/saves data (via MySQL)
     |
10. Response is sent back to the frontend
```

## The Dining Room: Frontend (`src/`)

The frontend is the **beautiful part** that visitors see and interact with.

```
src/
|
|-- main.tsx                      <-- THE FRONT DOOR: first file that runs
|                                     Sets up React, loads the router, adds dark mode
|
|-- App.tsx                       <-- THE LOBBY: main app component
|
|-- index.css                     <-- THE PAINT: global CSS (Tailwind imports)
|
|-- components/                   <-- REUSABLE FURNITURE
|   |
|   |-- features/                <-- SPECIAL FURNITURE (business-specific)
|   |   |-- ProductCard.tsx      <-- A card showing one product (image, name, price)
|   |   |-- CategoryCard.tsx     <-- A card for one category
|   |   |-- OccasionCard.tsx     <-- A card for one occasion
|   |   |-- HeroBanner.tsx       <-- The big banner/slider on the home page
|   |   |-- ChatWidget.tsx       <-- Floating WhatsApp chat bubble
|   |   |-- PromoPopup.tsx       <-- Promotional popup on first visit
|   |   |-- index.ts             <-- Exports all feature components
|   |
|   |-- layout/                  <-- THE HOUSE FRAME
|   |   |-- Header.tsx           <-- Top navigation bar (logo, search, cart icon, login)
|   |   |-- Footer.tsx           <-- Bottom section (links, social media, newsletter)
|   |   |-- index.ts             <-- Exports layout components
|   |
|   |-- ui/                      <-- BASIC BUILDING BLOCKS
|       |-- Button.tsx           <-- Reusable button with different styles
|       |-- Card.tsx             <-- Reusable card container
|       |-- Input.tsx            <-- Reusable text input field
|       |-- LoadingSpinner.tsx   <-- Spinning circle while stuff loads
|       |-- ErrorBlock.tsx       <-- Displays error messages nicely
|       |-- ErrorBoundary.tsx    <-- Catches crashes so the whole app doesn't break
|       |-- Pagination.tsx       <-- "Page 1 of 5" buttons
|       |-- ScrollToTop.tsx      <-- Scrolls to top when changing pages
|       |-- SEO.tsx              <-- Sets page title and description for Google
|       |-- Toast.tsx            <-- Little popup notifications ("Added to cart!")
|       |-- SectionHeader.tsx    <-- Styled section title
|       |-- index.ts             <-- Exports all UI components
|
|-- pages/                        <-- THE ROOMS (one page = one room)
|   |-- Home.tsx                 <-- Main page: banners, featured products, categories
|   |-- Product.tsx              <-- Product detail: photos, sizes, add to cart
|   |-- Categories.tsx           <-- Grid of all categories
|   |-- CategoryDetail.tsx       <-- All products in one category
|   |-- Occasions.tsx            <-- Grid of all occasions
|   |-- OccasionDetail.tsx       <-- All products for one occasion
|   |-- Brands.tsx               <-- All brands
|   |-- BrandDetail.tsx          <-- Products from one brand
|   |-- SpecialGifts.tsx         <-- Curated gift collections
|   |-- CollectionDetail.tsx     <-- Products in a collection
|   |-- BestSellers.tsx          <-- Top selling products
|   |-- Search.tsx               <-- Search results
|   |-- Cart.tsx                 <-- Shopping cart (edit quantities, remove items)
|   |-- Checkout.tsx             <-- Address form, payment, place order
|   |-- Login.tsx                <-- Login form
|   |-- Register.tsx             <-- Registration form
|   |-- ForgotPassword.tsx       <-- Password reset form
|   |-- Profile.tsx              <-- View/edit your account
|   |-- Wishlist.tsx             <-- Your saved items
|   |-- Orders.tsx               <-- Your order history
|   |-- OrderTracking.tsx        <-- Track one order
|   |-- Contact.tsx              <-- Contact form
|   |-- FAQs.tsx                 <-- Frequently asked questions
|   |-- Delivery.tsx             <-- Delivery info and areas
|   |-- TrackOrder.tsx           <-- Track by receipt number
|   |-- About.tsx                <-- About the company
|   |-- Privacy.tsx              <-- Privacy policy
|   |-- Terms.tsx                <-- Terms and conditions
|   |-- NotFound.tsx             <-- 404 page (when URL doesn't match anything)
|
|-- contexts/                     <-- SHARED WHITEBOARDS
|   |-- AuthContext.tsx          <-- Who is logged in? (stores user info + token)
|   |-- CartContext.tsx          <-- What's in the cart? (items, quantities)
|   |-- WishlistContext.tsx      <-- What's in the wishlist?
|   |-- LanguageProvider.tsx     <-- Current language setting
|   |-- DeliveryLocationProvider.tsx <-- Selected delivery area
|
|-- services/                     <-- THE PHONE TO THE KITCHEN
|   |-- api.ts                   <-- Main function that sends requests to the backend
|   |                                Adds the auth token automatically
|   |-- queryClient.ts           <-- React Query settings (cache times, retries)
|   |-- queries/                 <-- Pre-built data fetching hooks
|       |-- productQueries.ts    <-- useProducts(), useProduct(id)
|       |-- categoryQueries.ts   <-- useCategories(), useCategory(slug)
|       |-- index.ts             <-- Exports all query hooks
|
|-- hooks/                        <-- CUSTOM SHORTCUTS
|   |-- useDebounce.ts           <-- Waits before acting (for search-as-you-type)
|   |-- useLocalStorage.ts       <-- Read/write browser's local storage
|   |-- useMediaQuery.ts         <-- Is screen mobile/tablet/desktop?
|   |-- index.ts                 <-- Exports all hooks
|
|-- types/                        <-- BLUEPRINTS (TypeScript shapes)
|   |-- product.ts               <-- What does a Product look like?
|   |-- category.ts              <-- What does a Category look like?
|   |-- cart.ts                  <-- What does a Cart Item look like?
|   |-- api.ts                   <-- What do API responses look like?
|   |-- common.ts                <-- Shared types used everywhere
|   |-- index.ts                 <-- Exports all types
|
|-- router/                       <-- THE MAP
|   |-- index.tsx                <-- All routes: which URL shows which page
|   |-- loaders.ts               <-- Pre-loads data before showing a page
|
|-- config/                       <-- SETTINGS
|   |-- env.ts                   <-- Reads environment variables safely
|   |-- index.ts                 <-- Exports config
|
|-- constants/                    <-- FIXED VALUES
|   |-- routes.ts                <-- All URL paths in one place
|   |-- api.ts                   <-- All API endpoint URLs
|   |-- storage.ts               <-- localStorage key names
|   |-- pagination.ts            <-- Default page sizes
|   |-- index.ts                 <-- Exports all constants
|
|-- layouts/                      <-- PAGE WRAPPERS
|   |-- RootLayout.tsx           <-- Wraps every page: Header on top, Footer on bottom,
|                                     page content in the middle
|
|-- utils/                        <-- HELPER FUNCTIONS
|   |-- formatters.ts            <-- Format prices ($299.99), dates, etc.
|   |-- index.ts                 <-- Exports utilities
|
|-- assets/                       <-- STATIC FILES
    |-- images/                  <-- Product images, logos, banners
    |-- fonts/                   <-- Custom fonts (if any)
    |-- icons/                   <-- Custom icon files (if any)
```

## The Documentation (`docs/`)

```
docs/
|-- BACKEND_SETUP.md             <-- How to set up the backend server
|-- FRONTEND_SETUP.md            <-- How to set up the frontend website
|-- DATABASE_GUIDE.md            <-- All database tables explained
|-- API_REFERENCE.md             <-- Every API endpoint with examples
|-- PROJECT_STRUCTURE.md         <-- This file! (what you're reading now)
|-- FREE_DEPLOYMENT_GUIDE.md     <-- How to deploy everything for free
```

## How Everything Connects

Here's the big picture of how all the pieces work together:

```
                          YOUR COMPUTER
    ┌──────────────────────────────────────────────────┐
    |                                                  |
    |   [Browser: localhost:5173]                       |
    |        |                                         |
    |        v                                         |
    |   ┌─────────────────────┐                        |
    |   | FRONTEND (React)    |                        |
    |   | - src/pages/        | Shows pages            |
    |   | - src/components/   | Reusable pieces        |
    |   | - src/contexts/     | Shared state           |
    |   | - src/services/     | API calls ──────┐      |
    |   └─────────────────────┘                 |      |
    |                                           |      |
    |        (Vite proxy: /api -> :3001)        |      |
    |                                           v      |
    |   ┌─────────────────────┐                        |
    |   | BACKEND (Express)   |  localhost:3001        |
    |   | - src/routes/       | Handles requests       |
    |   | - src/middleware/    | Security checks        |
    |   | - src/utils/        | Helper tools           |
    |   └────────┬────────────┘                        |
    |            |                                     |
    |            v                                     |
    |   ┌─────────────────────┐                        |
    |   | MySQL DATABASE      |                        |
    |   | - users             |                        |
    |   | - products          |                        |
    |   | - orders            |                        |
    |   | - cart_items        |                        |
    |   | - ... (12 tables)   |                        |
    |   └─────────────────────┘                        |
    |                                                  |
    └──────────────────────────────────────────────────┘
```

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| **Components** | PascalCase (each word starts with a capital letter) | `ProductCard.tsx`, `LoadingSpinner.tsx` |
| **Pages** | PascalCase | `Home.tsx`, `CategoryDetail.tsx` |
| **Hooks** | camelCase starting with `use` | `useDebounce.ts`, `useLocalStorage.ts` |
| **Utils** | camelCase | `formatters.ts`, `validators.ts` |
| **Types** | PascalCase for interfaces, camelCase for files | `interface Product {}` in `product.ts` |
| **Constants** | UPPER_SNAKE_CASE for values | `API_ENDPOINTS`, `STORAGE_KEYS` |
| **CSS classes** | Tailwind utilities | `className="flex items-center gap-4 p-4"` |
| **API routes** | lowercase with hyphens | `/api/cart/items`, `/api/auth/register` |
| **Database tables** | snake_case | `cart_items`, `wishlist_items`, `order_items` |
| **URL slugs** | lowercase with hyphens | `red-rose-bouquet`, `happy-birthday` |
