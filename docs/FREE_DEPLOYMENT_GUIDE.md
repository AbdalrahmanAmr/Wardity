# Free Deployment Guide -- Put Your Website on the Real Internet!

> Right now, your website only works on YOUR computer (localhost). That means nobody else can see it. This guide shows you how to put it on the **real internet** so anyone in the world can visit it -- and it's all **FREE**!

## The Big Picture

To put a website on the internet, you need **three things**:

| What | Why | Free Option We'll Use |
|------|-----|----------------------|
| **A place for the Frontend** | Someone needs to "serve" your HTML/CSS/JS files to visitors | **Vercel** (or Netlify) |
| **A place for the Backend** | Your Express server needs to run 24/7 somewhere | **Render** |
| **A place for the Database** | MySQL needs to live somewhere that's always online | **Aiven** (free MySQL) or **Neon** (free PostgreSQL) |

Think of it like this:
- **Vercel** = a free store window display (shows the pretty frontend)
- **Render** = a free kitchen (runs the backend server)
- **Aiven** = a free filing cabinet (stores the database)

```
Visitor (Browser)
    |
    v
Vercel (Frontend - React)  -->  Render (Backend - Express)  -->  Aiven (MySQL Database)
```

## Before You Start

Make sure you have:
- [x] A **GitHub account** (free at https://github.com)
- [x] Your project code **pushed to GitHub** (we'll show you how)
- [x] A **Vercel account** (free at https://vercel.com -- sign up with GitHub)
- [x] A **Render account** (free at https://render.com -- sign up with GitHub)
- [x] An **Aiven account** (free at https://aiven.io -- sign up with email)

---

## STEP 1: Push Your Code to GitHub

If your code isn't on GitHub yet, let's fix that!

### 1a. Create a GitHub Repository

1. Go to https://github.com/new
2. Name it `wardity` (or whatever you like)
3. Make it **Private** (so your code isn't public) or **Public** (your choice)
4. Do NOT check "Add a README" (you already have one)
5. Click **Create repository**

### 1b. Push Your Code

Open a terminal in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wardity.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

**IMPORTANT:** Make sure your `backend/.env` file is in `.gitignore` so your secrets don't get uploaded! Check that `backend/.gitignore` contains:

```
.env
node_modules/
dist/
data/
```

---

## STEP 2: Set Up the Free Database (Aiven MySQL)

The database needs to be online 24/7 so the backend can always reach it.

### 2a. Create an Aiven Account

1. Go to https://aiven.io
2. Click **Get Started Free**
3. Sign up with your email or Google account

### 2b. Create a Free MySQL Service

1. After signing in, click **Create service**
2. Choose **MySQL**
3. Choose the **Free plan** (Hobbyist)
4. Pick a cloud provider (any is fine -- Google Cloud or AWS)
5. Pick a region close to you (e.g., `google-europe-west1` for Middle East/Europe)
6. Name it `wardity-db`
7. Click **Create service**

Wait 2-3 minutes for it to be ready (the status will change to "Running").

### 2c. Get Your Connection Details

Once the service is running, you'll see a page with connection details:

| Field | What You'll See | What It Means |
|-------|----------------|---------------|
| **Host** | `wardity-db-yourname.a.aivencloud.com` | The database's address on the internet |
| **Port** | `12345` | The door number (different from local 3306) |
| **User** | `avnadmin` | The username to log in |
| **Password** | `AVNS_xxxxxxxxxx` | The password to log in |
| **Database** | `defaultdb` | The database name (you can rename it later) |

**Copy these values -- you'll need them for the backend!**

### 2d. Create the Wardity Database

In the Aiven console, there's usually a **Query Editor** or you can connect using the terminal:

```bash
mysql -u avnadmin -p -h wardity-db-yourname.a.aivencloud.com -P 12345 --ssl-mode=REQUIRED
```

Then create the database:

```sql
CREATE DATABASE wardity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

> **Note:** Some Aiven plans only allow one database. If so, just use `defaultdb` as your database name and update `DB_NAME` accordingly.

### Alternative: Neon (Free PostgreSQL)

If you prefer PostgreSQL over MySQL (or Aiven's free tier doesn't work for you):

1. Go to https://neon.tech
2. Sign up for free
3. Create a new project called "wardity"
4. Get the connection string

> **Note:** Switching from MySQL to PostgreSQL requires changing some SQL syntax in the backend code. MySQL is recommended since the backend is already built for it.

### Alternative: PlanetScale (Free MySQL)

1. Go to https://planetscale.com
2. Sign up for free
3. Create a database called "wardity"
4. Get the connection details

### Alternative: Railway (Easiest, Has Free Trial)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **New Project** > **Provision MySQL**
4. Get connection variables automatically

---

## STEP 3: Deploy the Backend (Render)

Render will run your Express server for free. It's like renting a free kitchen that's open 24/7.

### 3a. Prepare the Backend for Deployment

Your backend needs a few tweaks. Make sure `backend/package.json` has these scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "seed": "tsx src/scripts/seed.ts"
  }
}
```

The key is that `npm run build` compiles TypeScript and `npm start` runs the compiled JavaScript.

### 3b. Create a Render Account

1. Go to https://render.com
2. Click **Get Started for Free**
3. Sign up with your GitHub account (easiest!)

### 3c. Create a New Web Service

1. Click **New** > **Web Service**
2. Connect your GitHub repository
3. Select your `wardity` repository
4. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `wardity-backend` |
| **Region** | Pick one close to your database (e.g., Frankfurt for Europe) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | **Free** |

### 3d. Add Environment Variables

In the Render dashboard, go to your service > **Environment** > **Add Environment Variable**.

Add each of these:

| Key | Value |
|-----|-------|
| `PORT` | `3001` (Render may override this -- that's fine) |
| `NODE_ENV` | `production` |
| `DB_HOST` | Your Aiven host (e.g., `wardity-db-yourname.a.aivencloud.com`) |
| `DB_PORT` | Your Aiven port (e.g., `12345`) |
| `DB_USER` | Your Aiven username (e.g., `avnadmin`) |
| `DB_PASSWORD` | Your Aiven password |
| `DB_NAME` | `wardity` (or `defaultdb` if using Aiven default) |
| `JWT_SECRET` | A long random string (generate one at https://randomkeygen.com) |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | `https://wardity.vercel.app` (your future frontend URL -- update later!) |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASS` | Your Gmail App Password |
| `SMTP_FROM` | Your Gmail address |
| `OWNER_EMAIL` | Your email for order notifications |
| `WHATSAPP_PHONE` | Your WhatsApp number with country code |

### 3e. Deploy!

Click **Create Web Service**. Render will:

1. Pull your code from GitHub
2. Run `npm install && npm run build`
3. Start the server with `npm start`

Wait 3-5 minutes. Once it says **"Live"**, your backend is on the internet!

Your backend URL will be something like: `https://wardity-backend.onrender.com`

Test it by visiting: `https://wardity-backend.onrender.com/health`

### 3f. Seed the Production Database

You need to fill the database with sample data. In Render, go to your service and open the **Shell** tab, then run:

```bash
npm run seed
```

Or you can seed from your local computer by temporarily changing your local `.env` to point to the Aiven database, running `npm run seed`, then changing it back.

> **Note about Render's free plan:** The server goes to "sleep" after 15 minutes of no traffic. The first request after sleeping takes 30-60 seconds to "wake up." This is normal for free plans!

---

## STEP 4: Deploy the Frontend (Vercel)

Vercel will host your React frontend for free. It's like getting a free store window that's always open.

### 4a. Create a Vercel Account

1. Go to https://vercel.com
2. Click **Sign Up**
3. Sign up with your **GitHub** account

### 4b. Import Your Project

1. Click **Add New...** > **Project**
2. Find and select your `wardity` repository
3. Vercel will detect it's a Vite project automatically

### 4c. Configure the Project

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `.` (leave empty -- the frontend is at the root) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 4d. Add Environment Variables

Click **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://wardity-backend.onrender.com/api` |

Replace the URL with YOUR actual Render backend URL from Step 3.

### 4e. Deploy!

Click **Deploy**. Vercel will:

1. Pull your code
2. Run `npm run build`
3. Host the `dist` folder

Wait 1-2 minutes. Your frontend is now live!

Your frontend URL will be something like: `https://wardity.vercel.app`

### 4f. Update the Backend CORS

Now go back to Render and update the `CORS_ORIGIN` environment variable to your actual Vercel URL:

```
CORS_ORIGIN=https://wardity.vercel.app
```

Render will automatically redeploy with the new setting.

### Vercel Rewrites (Important!)

Since the frontend uses React Router (client-side routing), you need to tell Vercel to redirect all paths to `index.html`. Create a `vercel.json` file in your project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This tells Vercel: "No matter what URL someone visits, always serve the React app and let React Router handle the routing."

---

## STEP 5: Custom Domain (Optional but Awesome)

You can get a free `.vercel.app` domain, but if you want a custom domain like `wardity.com`:

### Free Domain Options

| Provider | What You Get | Link |
|----------|-------------|------|
| **Freenom** | Free `.tk`, `.ml`, `.ga` domains | https://freenom.com |
| **Vercel** | Free `yourname.vercel.app` subdomain | Automatic! |

### Paid Domain Options (Cheap)

| Provider | Price | Link |
|----------|-------|------|
| **Namecheap** | ~$8/year for `.com` | https://namecheap.com |
| **Google Domains** | ~$12/year for `.com` | https://domains.google |
| **Cloudflare** | ~$8/year for `.com` (at cost!) | https://cloudflare.com |

### How to Connect a Custom Domain to Vercel

1. Buy/get your domain
2. In Vercel dashboard, go to your project > **Settings** > **Domains**
3. Add your domain (e.g., `wardity.com`)
4. Vercel will tell you what DNS records to add
5. Go to your domain provider and add those DNS records
6. Wait 5-30 minutes for it to work

Vercel gives you **free HTTPS** (the little lock icon in the browser) automatically!

---

## Summary: The Complete Free Stack

Here's what you end up with:

| Service | What It Does | Free Plan Limits | Link |
|---------|-------------|-----------------|------|
| **GitHub** | Stores your code | Unlimited private repos | https://github.com |
| **Vercel** | Hosts the frontend | 100GB bandwidth/month | https://vercel.com |
| **Render** | Runs the backend | 750 hours/month, sleeps after 15min | https://render.com |
| **Aiven** | Hosts MySQL database | 1 free service, limited storage | https://aiven.io |
| **Gmail** | Sends notification emails | 500 emails/day | You already have this! |

**Total cost: $0/month**

### The Full Architecture

```
Internet User
    |
    | (visits wardity.vercel.app)
    v
[Vercel - Frontend]
    |
    | (API requests go to Render)
    v
[Render - Backend/Express]
    |
    | (database queries)
    v
[Aiven - MySQL Database]
    |
    | (sends emails via)
    v
[Gmail SMTP]
```

---

## Alternative: All-in-One Platforms

If the above seems like too many services, here are simpler alternatives:

### Railway (Easiest, Has Free Trial Credits)

Railway can host EVERYTHING (backend + database) in one place.

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **New Project** > **Deploy from GitHub Repo**
4. Select your repo
5. Railway auto-detects Express
6. Click **New** > **Database** > **Add MySQL**
7. Railway automatically sets environment variables!

**Free tier:** $5 of free credits/month (enough for a small project).

### Fly.io (More Technical but Generous)

1. Go to https://fly.io
2. Install the `flyctl` CLI
3. Run `fly launch` in your backend folder
4. Run `fly postgres create` for the database

**Free tier:** 3 shared VMs, 3GB storage.

### Supabase (If You Switch to PostgreSQL)

Supabase gives you a free PostgreSQL database with a nice dashboard.

1. Go to https://supabase.com
2. Create a project
3. Use the PostgreSQL connection string

**Free tier:** 500MB database, 2GB bandwidth.

---

## Deployment Checklist

Before going live, make sure:

- [ ] Backend `.env` file is NOT in your GitHub repo (check `.gitignore`)
- [ ] `JWT_SECRET` is a long, random string (not "secret123"!)
- [ ] `CORS_ORIGIN` matches your actual frontend URL
- [ ] Database has been seeded with data
- [ ] Frontend `VITE_API_URL` points to the real backend URL
- [ ] `vercel.json` exists with the rewrite rule
- [ ] Test the health endpoint: `https://your-backend.onrender.com/health`
- [ ] Test the frontend: visit your Vercel URL and browse products
- [ ] Test login with the test account
- [ ] Test adding something to the cart
- [ ] Test placing an order
- [ ] Check if emails are being sent

## Common Deployment Problems

### "CORS error" in the browser console
Your `CORS_ORIGIN` on Render doesn't match the frontend URL. Update it to the exact Vercel URL (including `https://`).

### Backend shows "Application error"
Check Render logs (go to your service > **Logs**). Common causes:
- Wrong database credentials
- Missing environment variables
- Build failed (TypeScript errors)

### "502 Bad Gateway" or slow first load
Render's free plan puts the server to sleep. The first request takes 30-60 seconds. This is normal. Tell your users to wait a moment!

### Database connection failed
- Check if Aiven service is running
- Verify `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` are correct
- Some cloud databases require SSL. You might need to add `ssl: { rejectUnauthorized: false }` to your MySQL connection.

### Frontend shows blank page
- Check browser console for errors (press F12)
- Make sure `VITE_API_URL` is set correctly in Vercel
- Make sure `vercel.json` exists with the rewrite rule

### Images not loading
If product images are stored as local paths (like `/images/roses.jpg`), they won't work in production. You'll need to either:
- Use full URLs to images hosted online
- Upload images to a service like Cloudinary (free tier: 25GB)
- Store images as base64 in the database (not recommended for large images)

---

## Congratulations!

If you followed all the steps, your website is now on the real internet! Anyone in the world can visit it by typing your Vercel URL in their browser.

Share the link with your friends and family -- you just deployed a full-stack web application for FREE!
