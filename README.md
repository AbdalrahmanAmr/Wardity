# Wardity - Online Flower & Gift Shop

## What Is Wardity?

Imagine you want to send your mom a beautiful bouquet of roses for her birthday, but you're too busy to go to a flower shop. Wardity is a **website** where you can pick flowers, cakes, chocolates, and gifts from your phone or computer, and someone will deliver them for you!

It's like an online toy store, but instead of toys, it sells beautiful things for special moments.

## What Can You Do on This Website?

| Feature | What It Means (Simple Version) |
|---------|-------------------------------|
| **Browse Products** | Look at all the flowers, cakes, chocolates, and gifts -- like window shopping! |
| **Search** | Type "roses" and find all the rose bouquets instantly |
| **Filter by Category** | Only want to see cakes? Click "Cakes" and everything else disappears |
| **Filter by Occasion** | Shopping for a birthday? Click "Birthday" and see only birthday-appropriate gifts |
| **Shopping Cart** | Like a real shopping cart -- put things in, take them out, change how many you want |
| **Wishlist** | See something you like but not ready to buy? Save it for later (like bookmarking a page) |
| **Place Orders** | Fill in your name and address, pick how you want to pay, and order! |
| **Receipt Numbers** | Every order gets a special number like `WRD-000001` so you can track it |
| **Email Notifications** | After ordering, both you AND the shop owner get an email with all the details |
| **WhatsApp Link** | One-click button to send your order info to the shop on WhatsApp |
| **User Accounts** | Sign up, log in, see your profile, change your password |
| **Contact Form** | Have a question? Send a message directly to the shop |
| **Newsletter** | Enter your email to get news and deals from the shop |

## How Is This Website Built?

This project has **two big parts** that work together, like a restaurant:

- **The Frontend** = the dining room (what customers see -- the menu, tables, decorations)
- **The Backend** = the kitchen (where the food is actually made -- you don't see it, but it does all the work)

### The Frontend (What You See in Your Browser)

| Tool | What It Does (Simple Version) |
|------|-------------------------------|
| **React 19** | Builds all the pages, buttons, and forms you see and click on |
| **TypeScript** | Like a spell-checker for code -- catches mistakes before they cause problems |
| **Vite** | Makes the website load super fast while we're building it |
| **Tailwind CSS** | Makes everything look pretty -- colors, spacing, fonts, shadows |
| **DaisyUI** | Ready-made beautiful buttons, cards, and other building blocks |
| **React Router 7** | Lets you go to different pages (Home, Cart, Checkout) without the whole page reloading |
| **TanStack Query** | Fetches data from the server and remembers it, so pages load faster next time |
| **Heroicons** | The cute little icons everywhere (shopping cart, heart, search magnifying glass) |

### The Backend (The Brain Behind the Scenes)

| Tool | What It Does (Simple Version) |
|------|-------------------------------|
| **Express.js** | The waiter -- takes your request, goes to the kitchen, and brings back what you asked for |
| **TypeScript** | Same spell-checker for code, on the server side too |
| **MySQL** | The filing cabinet where ALL data is stored (products, users, orders, everything) |
| **JWT (JSON Web Tokens)** | When you log in, the server gives you a special invisible wristband (token) that proves you're you |
| **bcryptjs** | Scrambles your password into unreadable gibberish so even if someone hacks the database, they can't read it |
| **Zod** | A security guard that checks if the data you send makes sense (is that really an email address?) |
| **Nodemailer** | The mailman -- sends emails when orders are placed |
| **Helmet** | A security helmet for the server -- protects against common hacking tricks |
| **express-rate-limit** | Stops people from spamming the server with too many requests at once |

### How They All Talk to Each Other

```
You (Browser)  -->  Frontend (React)  -->  Backend (Express)  -->  MySQL Database
     ^                                                                    |
     |____________________________________________________________________|
                              Data comes back to you!
```

Here's what happens when you open the website:

1. You type the website address in your browser
2. The **Frontend** (React) loads and shows you a beautiful page
3. When you need to see products, the frontend says "Hey Backend, give me the products!"
4. The **Backend** (Express) goes to the **MySQL Database** and says "Give me all the products"
5. MySQL hands over the data
6. The Backend sends it back to the Frontend
7. The Frontend arranges it nicely and shows it to you

It's like ordering food: You (customer) tell the waiter (Frontend), the waiter tells the chef (Backend), the chef gets ingredients from the fridge (Database), cooks the food, and the waiter brings it back to you!

## All the Pages on the Website

| Page | URL | What It Shows |
|------|-----|---------------|
| Home | `/` | The main page with banners, featured products, categories |
| Product Detail | `/product/:id` | Full details about one product (photos, price, sizes, add to cart) |
| Categories | `/categories` | All product categories (Flowers, Cakes, Chocolates, etc.) |
| Category Detail | `/categories/:slug` | All products in one category |
| Occasions | `/occasions` | All occasions (Birthday, Wedding, Anniversary, etc.) |
| Occasion Detail | `/occasions/:slug` | All products for one occasion |
| Brands | `/brands` | All brands |
| Brand Detail | `/brands/:slug` | Products from one brand |
| Special Gifts | `/special-gifts` | Curated special gift collections |
| Collection Detail | `/collections/:slug` | Products in a specific collection |
| Best Sellers | `/best-sellers` | Most popular products |
| Search | `/search` | Search results page |
| Cart | `/cart` | Your shopping cart |
| Checkout | `/checkout` | Fill in address and payment to place order |
| Login | `/login` | Log into your account |
| Register | `/register` | Create a new account |
| Forgot Password | `/forgot-password` | Reset your password |
| Wishlist | `/wishlist` | Your saved favorite items |
| Profile | `/profile` | View and edit your account info |
| Orders | `/orders` | See all your past orders |
| Order Tracking | `/orders/:id` | Track a specific order |
| Contact | `/contact` | Send a message to the shop |
| FAQs | `/faqs` | Frequently asked questions |
| Delivery Info | `/delivery` | Delivery areas and costs |
| Track Order | `/track-order` | Track an order by receipt number |
| About Us | `/about` | About the Wardity team |
| Privacy Policy | `/privacy` | Privacy policy |
| Terms | `/terms` | Terms and conditions |

## Project Files (Where Is Everything?)

```
Wardity/
|
|-- backend/                  <-- The server (the kitchen)
|   |-- src/
|   |   |-- database/        <-- Sets up MySQL connection and creates tables
|   |   |-- middleware/       <-- Security guards (checks login, handles errors)
|   |   |-- routes/           <-- All API endpoints (auth, products, cart, orders, etc.)
|   |   |-- scripts/          <-- The seed script that fills the database with sample data
|   |   |-- utils/            <-- Helper tools (tokens, passwords, emails, shipping)
|   |   |-- index.ts          <-- The main file that starts the server
|   |-- .env                  <-- Your secret settings (NEVER share this!)
|   |-- .env.example          <-- A template showing what settings you need
|   |-- package.json          <-- Lists all backend packages
|
|-- src/                       <-- The frontend (the dining room)
|   |-- components/           <-- Reusable pieces (buttons, cards, header, footer)
|   |   |-- features/        <-- Special components (ProductCard, HeroBanner, ChatWidget)
|   |   |-- layout/          <-- Header and Footer
|   |   |-- ui/              <-- Basic building blocks (Button, Input, LoadingSpinner)
|   |-- pages/                <-- Full pages (Home, Product, Cart, Checkout, etc.)
|   |-- services/             <-- Code that talks to the backend API
|   |-- contexts/             <-- Shared state (who's logged in, what's in the cart)
|   |-- hooks/                <-- Custom tools (debounce, local storage, media queries)
|   |-- types/                <-- TypeScript type definitions
|   |-- utils/                <-- Helper functions (formatting, shipping calculator)
|   |-- router/               <-- Which URL shows which page
|   |-- config/               <-- Environment settings
|   |-- constants/            <-- Fixed values (route paths, API URLs, storage keys)
|   |-- layouts/              <-- Page wrappers (header + content + footer)
|   |-- assets/               <-- Images, fonts, static files
|
|-- docs/                      <-- All documentation lives here
|-- package.json               <-- Frontend packages
|-- vite.config.ts             <-- Frontend build settings + proxy to backend
|-- tailwind.config.js         <-- Tailwind CSS design settings
```

## How to Run This Project on Your Computer

### What You Need First

| Tool | Why You Need It | Where to Get It |
|------|----------------|-----------------|
| **Node.js 18+** | Runs all the code | https://nodejs.org (click the big green button) |
| **MySQL** | Stores all the data | Download XAMPP from https://www.apachefriends.org |
| **A code editor** | To look at and edit the code | We recommend [Cursor](https://cursor.com) or [VS Code](https://code.visualstudio.com) |

### Step-by-Step Setup

#### Step 1: Start MySQL

- Open **XAMPP Control Panel**
- Click **Start** next to **MySQL**
- Wait until the light turns green (that means it's running!)

#### Step 2: Create the Database

Open a terminal and type:

```bash
mysql -u root -p
```

Type your MySQL password (if you never set one, just press Enter). Then type:

```sql
CREATE DATABASE wardity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### Step 3: Install All Packages

```bash
npm install
cd backend
npm install
cd ..
```

#### Step 4: Create the Secret Settings File

```bash
cd backend
copy .env.example .env
```

Now open `backend/.env` and fill in your real values (see the [Backend Setup Guide](./docs/BACKEND_SETUP.md) for details).

#### Step 5: Fill the Database with Sample Data

```bash
cd backend
npm run seed
```

You should see: "Database seeded successfully!"

#### Step 6: Start Both Servers

Open **two terminals** side by side:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
You should see: "Server running on http://localhost:3001"

**Terminal 2 (Frontend):**
```bash
npm run dev
```
You should see: "Local: http://localhost:5173"

#### Step 7: Open the Website!

Go to http://localhost:5173 in your browser. That's your website!

### Test Account

After seeding, you can log in with:
- **Email:** test@example.com
- **Password:** password123

## Useful Commands

### Frontend (run from project root)

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start the website for development |
| `npm run build` | Build the website for production (makes it ready for the real internet) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check code for mistakes |

### Backend (run from `backend/` folder)

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start the server (auto-restarts when you change code) |
| `npm run build` | Compile TypeScript to JavaScript for production |
| `npm start` | Start the production server |
| `npm run seed` | Fill the database with sample data (resets everything!) |
| `npm run typecheck` | Check for TypeScript errors without running anything |

## Documentation

We have detailed guides for everything! Check the `docs/` folder:

| Document | What It Explains |
|----------|-----------------|
| [Backend Setup](./docs/BACKEND_SETUP.md) | How to set up the backend server step by step |
| [Frontend Setup](./docs/FRONTEND_SETUP.md) | How to set up the frontend website step by step |
| [Database Guide](./docs/DATABASE_GUIDE.md) | All the database tables explained simply |
| [API Reference](./docs/API_REFERENCE.md) | Every backend endpoint with examples |
| [Project Structure](./docs/PROJECT_STRUCTURE.md) | What every file and folder does |
| [Free Deployment Guide](./docs/FREE_DEPLOYMENT_GUIDE.md) | How to put this website on the real internet for FREE |

## Troubleshooting (Common Problems)

### "Port already in use"

Something else is using port 3001 or 5173. In the terminal:

```bash
netstat -ano | findstr :3001
taskkill /F /PID <the-number-you-see>
```

### "Access denied" when connecting to MySQL

Your MySQL password in `backend/.env` is wrong. Open it and fix `DB_PASSWORD`.

### Products not showing up

Make sure BOTH servers are running (backend on 3001, frontend on 5173). Check the backend terminal for red error messages.

### Emails not sending

Check the backend terminal for `[Email] Failed...` messages. Usually means the Gmail App Password is wrong. See the [Backend Setup Guide](./docs/BACKEND_SETUP.md) for Gmail setup instructions.

### "Authentication required" on checkout

You need to log in first! Go to `/login` and use the test account or create a new one.

## Contact

- **WhatsApp:** +20 111 523 9553
- **WhatsApp:** +20 112 471 3292
- **Email:** abdalrahmanamr275@gmail.com
- **Email:** mahmoud.eldeep99amr@gmail.com

## License

This project is licensed under the MIT License. That means anyone can use it, change it, and share it for free!
