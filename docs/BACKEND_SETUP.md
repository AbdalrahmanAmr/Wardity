# Backend Setup Guide

> Think of the backend like the **kitchen in a restaurant**. You (the customer) never see it, but it's where all the magic happens -- cooking the food, storing ingredients, and making sure your order is correct.

## What Does the Backend Do?

The backend is a **server** (a program that runs on a computer and waits for requests). When you open the Wardity website and click on "Products," here's what happens behind the scenes:

1. Your browser says: "Hey server, give me the list of products!"
2. The backend server receives that message
3. It goes to the MySQL database and asks: "What products do we have?"
4. MySQL gives back the list
5. The backend sends it to your browser
6. You see beautiful product cards on the screen!

The backend also handles:
- **Signing up and logging in** (checking passwords, creating accounts)
- **Shopping cart** (remembering what you added)
- **Placing orders** (saving your order, sending confirmation emails)
- **Sending emails** (order notifications to you and the shop owner)

## What You Need Before Starting

| Tool | Why You Need It | Where to Get It |
|------|----------------|-----------------|
| **Node.js 18+** | Runs the server code (like an engine that powers a car) | https://nodejs.org (click the big green LTS button) |
| **MySQL** | The database that stores everything | Download XAMPP: https://www.apachefriends.org |
| **A terminal** | To type commands | Built into Cursor (press Ctrl+\`) or VS Code |

## Step 1: Start MySQL

MySQL is the database -- think of it like a **giant filing cabinet** where all your data lives in organized drawers.

1. Open **XAMPP Control Panel**
2. Click the **Start** button next to **MySQL**
3. Wait until the light turns **green** -- that means the filing cabinet is open and ready!

> Don't have XAMPP? You can also install MySQL directly from https://dev.mysql.com/downloads/mysql/ but XAMPP is much easier for beginners.

## Step 2: Create the Database

The database is like an **empty notebook**. We need to create it before we can write anything in it.

Open a terminal and type:

```bash
mysql -u root -p
```

It will ask for your MySQL password. Type it and press Enter. (If you never set one, just press Enter.)

Now type this command:

```sql
CREATE DATABASE wardity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then type:

```sql
EXIT;
```

**What does that long command mean?**
- `CREATE DATABASE wardity` -- Makes a new empty database called "wardity"
- `CHARACTER SET utf8mb4` -- Lets it store any language (Arabic, English, emoji, etc.)
- `COLLATE utf8mb4_unicode_ci` -- Makes searches case-insensitive ("Rose" and "rose" are treated the same)

## Step 3: Install Backend Packages

Packages are like **tools in a toolbox** -- each one does something specific. Express is the hammer, MySQL2 is the screwdriver, etc.

In the terminal, go to the backend folder and install everything:

```bash
cd backend
npm install
```

This reads the list from `package.json` and downloads everything the backend needs. It might take a minute or two.

## Step 4: Create the `.env` File

The `.env` file holds your **secret settings** -- like passwords and keys. It's like a diary with a lock -- NEVER share it with anyone or upload it to GitHub!

Copy the example file:

```bash
copy .env.example .env
```

(On Mac/Linux, use `cp .env.example .env` instead)

Now open `backend/.env` in your code editor and fill in your real values:

```env
# Server Settings
# PORT = which door the server listens on (3001 is fine)
PORT=3001
# NODE_ENV = are we building or showing to real people?
NODE_ENV=development

# MySQL Database Connection
# These tell the server how to find and log into the database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password-here
DB_NAME=wardity

# JWT (Login Tokens)
# This is a secret key used to create login "wristbands" (tokens)
# Pick ANY random long text -- the longer and weirder, the safer!
JWT_SECRET=pick-any-random-long-text-here-like-mySecretKey123XYZ
# How long before the login expires (7d = 7 days)
JWT_EXPIRES_IN=7d

# CORS (Who Can Talk to the Server)
# This tells the server "only allow requests from this website"
CORS_ORIGIN=http://localhost:5173

# Email Sending (Gmail)
# Used to send order confirmation emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=your-gmail@gmail.com

# Notifications
# The shop owner's email (gets notified about new orders)
OWNER_EMAIL=your-email@gmail.com
# WhatsApp number with country code (no + sign, no spaces)
WHATSAPP_PHONE=201115239553
```

### How to Get a Gmail App Password

Your regular Gmail password won't work for sending emails from code. You need a special "App Password." Think of it like a **spare key** that only works for one thing.

1. Open https://myaccount.google.com/security
2. Make sure **2-Step Verification** is turned ON (this is required)
3. Go to https://myaccount.google.com/apppasswords
4. Click **Select app** and choose **Mail**
5. Click **Select device** and choose **Other**, type "Wardity"
6. Click **Generate**
7. Google shows you a 16-character password like: `abcd efgh ijkl mnop`
8. Copy it **WITHOUT spaces**: `abcdefghijklmnop`
9. Paste it as `SMTP_PASS` in your `.env` file

## Step 5: Seed the Database (Fill It with Sample Data)

Right now your database is empty -- no products, no users, nothing. The "seed" script fills it up with sample data so you have something to see on the website.

```bash
npm run seed
```

You should see something like:

```
Seeding database...
Clearing existing data...
Inserting categories...
Inserting occasions...
Inserting products...
Inserting test user...
Database seeded successfully!
```

### What Does the Seed Create?

| What | Examples |
|------|---------|
| **1 test user** | Email: test@example.com / Password: password123 |
| **Categories** | Flowers, Cakes, Chocolates, Plants, Balloons, Gift Baskets |
| **Occasions** | Happy Birthday, I Love You, Congratulations, Wedding, New Born, and more |
| **Products** | Red Rose Bouquet, Chocolate Cake, Mixed Flower Arrangement, and more |

## Step 6: Start the Backend Server

```bash
npm run dev
```

You should see:

```
Server running on http://localhost:3001
Database connected successfully
```

The server is now running and **waiting for requests** from the frontend!

**Important:** Keep this terminal open! If you close it, the kitchen closes and nobody can order food.

## Step 7: Verify It Works

Open your browser and go to:

```
http://localhost:3001/health
```

You should see something like:

```json
{ "status": "ok", "timestamp": "2026-04-10T15:00:00.000Z" }
```

If you see that, everything is working!

You can also test getting products:

```
http://localhost:3001/api/products
```

You should see a JSON response with product data.

## Understanding the Backend Files

```
backend/
|-- src/
|   |-- database/
|   |   |-- init.ts         <-- Connects to MySQL and creates all tables automatically
|   |
|   |-- middleware/
|   |   |-- auth.ts         <-- The bouncer: checks if you have a valid login token
|   |   |-- errorHandler.ts <-- Catches errors and sends friendly error messages
|   |   |-- notFoundHandler.ts <-- Says "404 Not Found" when someone visits a wrong URL
|   |
|   |-- routes/
|   |   |-- auth.ts         <-- Sign up, log in, view/edit profile, change password
|   |   |-- products.ts     <-- List, search, filter products
|   |   |-- categories.ts   <-- List all categories, get one category
|   |   |-- occasions.ts    <-- List all occasions, get one occasion
|   |   |-- cart.ts         <-- Add/remove/update cart items
|   |   |-- wishlist.ts     <-- Add/remove wishlist items
|   |   |-- orders.ts       <-- Place orders, view order history, get receipts
|   |   |-- contact.ts      <-- Handle contact form messages
|   |   |-- newsletter.ts   <-- Handle newsletter email subscriptions
|   |
|   |-- scripts/
|   |   |-- seed.ts         <-- Fills database with sample data
|   |
|   |-- utils/
|   |   |-- jwt.ts          <-- Creates and verifies login tokens (wristbands)
|   |   |-- password.ts     <-- Hashes passwords (scrambles them for safety)
|   |   |-- validation.ts   <-- Checks that data is correct (email format, required fields)
|   |   |-- id.ts           <-- Generates unique IDs for new database records
|   |   |-- slug.ts         <-- Converts names to URL-friendly text ("Red Rose" -> "red-rose")
|   |   |-- notifications.ts <-- Sends emails and creates WhatsApp links
|   |   |-- shipping.ts     <-- Calculates delivery cost based on your location
|   |
|   |-- index.ts            <-- The main file: starts Express, loads all routes, starts listening
|
|-- .env                    <-- Your secret settings (NEVER share this!)
|-- .env.example            <-- Template showing what settings you need
|-- package.json            <-- Lists all required packages
|-- tsconfig.json           <-- TypeScript settings
```

## Backend Commands

| Command | What It Does | When to Use It |
|---------|-------------|----------------|
| `npm run dev` | Starts the server in development mode (auto-restarts on changes) | Every time you work on the project |
| `npm run seed` | Resets and refills the database with sample data | After first setup, or when you want to start fresh |
| `npm run build` | Compiles TypeScript to JavaScript | Before deploying to production |
| `npm start` | Starts the compiled production server | On the live server only |
| `npm run typecheck` | Checks for TypeScript errors without running | To verify your code is correct |

## Security Features the Backend Has

| Feature | What It Does (Simple Version) |
|---------|-------------------------------|
| **Helmet** | Adds security headers to every response (like wearing a helmet to protect your head) |
| **Rate Limiting** | Limits how many requests someone can make per minute (stops spammers) |
| **CORS** | Only allows your frontend website to talk to the server (blocks strangers) |
| **JWT Auth** | Makes sure only logged-in users can access their cart, orders, etc. |
| **Password Hashing** | Scrambles passwords so they can never be read, even by the database admin |
| **Input Validation** | Checks every piece of data before using it (prevents hackers from sending bad data) |

## Troubleshooting

### "Access denied for user 'root'@'localhost'"
Your MySQL password is wrong. Open `backend/.env` and fix `DB_PASSWORD`.

### "Unknown database 'wardity'"
You forgot to create the database. Go back to Step 2 and run the `CREATE DATABASE` command.

### "Cannot find module 'mysql2'"
You forgot to install packages. Run `npm install` in the `backend/` folder.

### "Port 3001 is already in use"
Another program is using that port. Find and stop it:
```bash
netstat -ano | findstr :3001
taskkill /F /PID <the-number-from-above>
```

### Emails not being sent
1. Check `SMTP_USER` and `SMTP_PASS` in `.env`
2. Make sure you're using a Gmail **App Password**, not your regular password
3. After changing `.env`, **restart the backend** (press Ctrl+C, then `npm run dev` again)
4. Check the terminal for `[Email] Failed...` error messages

### "Incorrect arguments to mysqld_stmt_execute"
This is a MySQL driver quirk. Make sure you're using `pool.query()` (not `pool.execute()`) for queries with `LIMIT` and `OFFSET`.
