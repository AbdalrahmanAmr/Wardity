# Frontend Setup Guide

> Think of the frontend like the **dining room of a restaurant**. It's the beautiful part that customers see -- the tables, the menus, the decorations. It doesn't cook the food (that's the backend), but it makes everything look nice and takes your order.

## What Does the Frontend Do?

The frontend is what you see when you open the Wardity website in your browser. It's responsible for:

- **Showing pages** -- Home, Products, Cart, Checkout, Profile, etc.
- **Making things pretty** -- Colors, fonts, images, animations
- **Handling clicks** -- When you click "Add to Cart," the frontend sends that info to the backend
- **Remembering stuff** -- Your login status, what's in your cart, your wishlist
- **Loading fast** -- Caching data so you don't wait every time you switch pages

## What You Need Before Starting

| Tool | Why You Need It | Where to Get It |
|------|----------------|-----------------|
| **Node.js 18+** | Runs the build tools and dev server | https://nodejs.org (click the big green LTS button) |
| **A code editor** | To view and edit the code | [Cursor](https://cursor.com) or [VS Code](https://code.visualstudio.com) |
| **The backend running** | The frontend needs the backend to get data | See [Backend Setup Guide](./BACKEND_SETUP.md) |

## Step 1: Install Frontend Packages

Make sure you're in the **project root folder** (not inside `backend/`):

```bash
npm install
```

This downloads all the tools the frontend needs (React, Tailwind, Router, etc.). The list comes from `package.json`.

## Step 2: Start the Development Server

```bash
npm run dev
```

You should see:

```
  VITE v7.1.12  ready in 300ms

  -> Local:    http://localhost:5173/
  -> Network:  http://192.168.x.x:5173/
```

Open http://localhost:5173 in your browser and you'll see the website!

**Important:** The backend must also be running on port 3001 for products, cart, and login to work. The frontend automatically forwards all `/api` requests to the backend (this is called a "proxy" and is set up in `vite.config.ts`).

## How the Frontend Is Organized

Imagine the frontend code as a **house** with different rooms:

```
src/
|
|-- components/                <-- Furniture (reusable pieces used everywhere)
|   |-- features/              <-- Special furniture
|   |   |-- ProductCard.tsx    <-- A card that shows one product
|   |   |-- CategoryCard.tsx   <-- A card that shows one category
|   |   |-- HeroBanner.tsx     <-- The big banner at the top of the home page
|   |   |-- OccasionCard.tsx   <-- A card for occasions (Birthday, Wedding)
|   |   |-- ChatWidget.tsx     <-- The floating chat bubble
|   |   |-- PromoPopup.tsx     <-- Promotional popup
|   |
|   |-- layout/                <-- The house frame (walls, roof)
|   |   |-- Header.tsx         <-- The top navigation bar
|   |   |-- Footer.tsx         <-- The bottom section
|   |
|   |-- ui/                    <-- Basic building blocks (bricks, windows)
|       |-- Button.tsx         <-- A reusable button
|       |-- Card.tsx           <-- A reusable card container
|       |-- Input.tsx          <-- A reusable text input
|       |-- LoadingSpinner.tsx <-- The spinning circle you see while stuff loads
|       |-- ErrorBlock.tsx     <-- Shows a nice error message when something breaks
|       |-- ErrorBoundary.tsx  <-- Catches crashes so the whole app doesn't break
|       |-- Pagination.tsx     <-- "Page 1 of 5" navigation
|       |-- ScrollToTop.tsx    <-- Scrolls to top when you change pages
|       |-- SEO.tsx            <-- Sets the page title and description
|       |-- Toast.tsx          <-- Little popup messages ("Added to cart!")
|       |-- SectionHeader.tsx  <-- Section title with styling
|
|-- pages/                     <-- The rooms of the house (each page is a room)
|   |-- Home.tsx               <-- The living room (main page)
|   |-- Product.tsx            <-- Product detail page
|   |-- Categories.tsx         <-- All categories
|   |-- CategoryDetail.tsx     <-- Products in one category
|   |-- Occasions.tsx          <-- All occasions
|   |-- OccasionDetail.tsx     <-- Products for one occasion
|   |-- Cart.tsx               <-- Shopping cart
|   |-- Checkout.tsx           <-- Fill in address and pay
|   |-- Login.tsx              <-- Log in form
|   |-- Register.tsx           <-- Sign up form
|   |-- Profile.tsx            <-- Your account info
|   |-- Wishlist.tsx           <-- Saved favorites
|   |-- Orders.tsx             <-- Your order history
|   |-- OrderTracking.tsx      <-- Track one specific order
|   |-- Search.tsx             <-- Search results
|   |-- Contact.tsx            <-- Contact form
|   |-- ... and more!
|
|-- contexts/                  <-- Shared memory (everyone can access)
|   |-- AuthContext.tsx        <-- Remembers if you're logged in and who you are
|   |-- CartContext.tsx        <-- Keeps track of your shopping cart
|   |-- WishlistContext.tsx    <-- Keeps track of your saved items
|   |-- LanguageProvider.tsx   <-- Handles language settings
|   |-- DeliveryLocationProvider.tsx <-- Remembers your delivery area
|
|-- services/                  <-- The phone line to the kitchen (backend)
|   |-- api.ts                <-- The main function that sends requests to the backend
|   |-- queryClient.ts        <-- React Query settings (how long to cache data, etc.)
|   |-- queries/              <-- Pre-built queries for specific data
|
|-- hooks/                     <-- Custom shortcuts (tools you built yourself)
|   |-- useDebounce.ts        <-- Waits a bit before doing something (for search typing)
|   |-- useLocalStorage.ts    <-- Saves data in your browser's memory
|   |-- useMediaQuery.ts      <-- Checks if screen is mobile, tablet, or desktop
|
|-- types/                     <-- Blueprints (what does a Product look like? A User?)
|   |-- product.ts            <-- Product blueprint (name, price, image, etc.)
|   |-- category.ts           <-- Category blueprint
|   |-- cart.ts               <-- Cart item blueprint
|   |-- api.ts                <-- API response blueprint
|   |-- common.ts             <-- Shared blueprints
|
|-- router/                    <-- The map (which URL goes to which page)
|   |-- index.tsx             <-- All routes defined here
|   |-- loaders.ts            <-- Pre-loads data before showing a page
|
|-- config/                    <-- Settings
|   |-- env.ts                <-- Reads environment variables safely
|
|-- constants/                 <-- Fixed values that never change
|   |-- routes.ts             <-- All URL paths in one place
|   |-- api.ts                <-- All API endpoint URLs
|   |-- storage.ts            <-- localStorage key names
|   |-- pagination.ts         <-- Default page sizes
|
|-- layouts/                   <-- Page wrappers
|   |-- RootLayout.tsx        <-- Wraps every page with Header + Footer
|
|-- assets/                    <-- Static files (images, fonts)
|-- utils/                     <-- Helper functions (format prices, calculate shipping)
```

## Key Concepts (Explained Simply)

### What Is a "Component"?

A component is a **reusable piece** of the page. Think of LEGO bricks -- you build the `ProductCard` component once, and then you can use it 100 times to show 100 different products. Each one gets different data (name, price, image) but looks the same.

### What Is "Routing"?

When you click a link to go from the Home page to the Cart page, the URL changes from `/` to `/cart`. **React Router** sees this change and swaps out the Home page component for the Cart page component -- without reloading the entire website! It's like changing the channel on TV.

### What Is "Context"?

Context is like a **shared whiteboard** that every component can read. For example, the `AuthContext` whiteboard says "the user is logged in as john@email.com." Any component anywhere on the page can look at that whiteboard to know who's logged in.

### What Is "React Query"?

React Query is a smart assistant that fetches data from the backend and **remembers it**. If you visit the Products page, it fetches the products. If you go to Cart and come back to Products, it doesn't fetch again -- it already remembers! This makes the website feel super fast.

### What Is the "Proxy"?

When the frontend runs on `localhost:5173` and the backend runs on `localhost:3001`, they're on different "doors" (ports). The browser normally doesn't let them talk to each other (it's a security thing). The **proxy** in `vite.config.ts` says "hey, whenever the frontend asks for `/api/anything`, secretly forward that request to `localhost:3001`." Problem solved!

## Frontend Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Starts the website for development (live-reloads when you edit code!) |
| `npm run build` | Creates the final, optimized version of the website for the internet |
| `npm run preview` | Lets you preview the production build locally |
| `npm run lint` | Checks your code for common mistakes and style issues |

## Environment Variables

The frontend has ONE optional environment variable:

| Variable | Default | What It Does |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` (uses proxy) | The URL where the backend lives. You only need to set this in production. |

During development, leave it empty -- the Vite proxy handles everything automatically.

For production, set it to wherever your backend is deployed:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

## Styling with Tailwind CSS

We use **Tailwind CSS** for all styling. Instead of writing CSS files, you add special class names directly to HTML elements:

```html
<!-- This makes a blue button with rounded corners and padding -->
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
  Click Me
</button>
```

Think of Tailwind classes like **stickers** -- each one adds one style. `bg-blue-500` is a "paint it blue" sticker, `text-white` is a "make text white" sticker, `rounded-lg` is a "round the corners" sticker.

We also use **DaisyUI** for pre-built components:

```html
<!-- A ready-made beautiful button -->
<button className="btn btn-primary">Click Me</button>
```

## Troubleshooting

### Page shows "Loading..." forever
The backend is probably not running. Start it with `cd backend && npm run dev`.

### Styles look broken or missing
Run `npm run dev` again. If that doesn't work, delete `node_modules` and run `npm install` again.

### "Module not found" error
You probably forgot to install packages. Run `npm install` in the project root.

### Changes not showing up
Vite has "Hot Module Replacement" (HMR) which auto-updates the browser. If it's not working, try refreshing the page (Ctrl+R) or restarting `npm run dev`.

### Login doesn't work
Make sure the backend is running and the database has been seeded (`cd backend && npm run seed`).
