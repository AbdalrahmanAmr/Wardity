# API Reference -- Every Backend Endpoint Explained

> An API (Application Programming Interface) is like a **restaurant menu**. It lists everything you can order (request) and what you'll get back (response). The frontend "orders" data from the backend using these API endpoints.

## How It Works

The backend runs at `http://localhost:3001` during development. Every API request starts with `/api`.

### The Basic Idea

When the frontend wants data, it sends an **HTTP request** to the backend. There are different types of requests:

| Method | What It Means | Restaurant Analogy |
|--------|--------------|-------------------|
| **GET** | "Give me this data" | "Can I see the menu?" |
| **POST** | "Create something new" | "I'd like to order this" |
| **PATCH** | "Update something that exists" | "Can you change my order?" |
| **DELETE** | "Remove something" | "Cancel that item from my order" |

### Authentication (Login Token)

Some endpoints need you to be **logged in**. When you log in, the server gives you a **token** (like a VIP wristband at a concert). You include this token in every request so the server knows it's you.

To include the token, add this **header** to your request:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

If you forget the token, you'll get a `401 Unauthorized` error (like being stopped by the bouncer because you don't have a wristband).

---

## Health Check

### Check if the server is alive

```
GET /health
```

**No login needed.**

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-04-10T15:00:00.000Z"
}
```

Use this to quickly check if the backend is running. If you get this response, everything is good!

---

## Authentication (Sign Up, Log In, Profile)

### Register a new account

```
POST /api/auth/register
```

**No login needed.**

**What to send (request body):**
```json
{
  "name": "Ahmed Mohamed",
  "email": "ahmed@email.com",
  "password": "myPassword123"
}
```

**What you get back:**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "abc123",
    "name": "Ahmed Mohamed",
    "email": "ahmed@email.com"
  }
}
```

The `token` is your login wristband. Save it and use it for future requests!

---

### Log in to your account

```
POST /api/auth/login
```

**No login needed.**

**What to send:**
```json
{
  "email": "ahmed@email.com",
  "password": "myPassword123"
}
```

**What you get back:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "abc123",
    "name": "Ahmed Mohamed",
    "email": "ahmed@email.com"
  }
}
```

---

### Get my profile

```
GET /api/auth/me
```

**Login required** (send token in header).

**What you get back:**
```json
{
  "id": "abc123",
  "name": "Ahmed Mohamed",
  "email": "ahmed@email.com",
  "phone": "+201115239553",
  "created_at": "2026-04-10T15:00:00.000Z"
}
```

---

### Update my profile

```
PATCH /api/auth/profile
```

**Login required.**

**What to send (only include fields you want to change):**
```json
{
  "name": "Ahmed M. Ali",
  "phone": "+201112223333"
}
```

**What you get back:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "abc123",
    "name": "Ahmed M. Ali",
    "email": "ahmed@email.com",
    "phone": "+201112223333"
  }
}
```

---

### Change my password

```
PATCH /api/auth/password
```

**Login required.**

**What to send:**
```json
{
  "currentPassword": "myOldPassword123",
  "newPassword": "myNewPassword456"
}
```

**What you get back:**
```json
{
  "message": "Password changed successfully"
}
```

---

## Products

### List all products

```
GET /api/products
```

**No login needed.**

**Optional filters (add to the URL):**

| Parameter | What It Does | Example |
|-----------|-------------|---------|
| `page` | Which page of results | `?page=2` |
| `limit` | How many products per page | `?limit=12` |
| `category` | Filter by category slug | `?category=flowers` |
| `occasion` | Filter by occasion slug | `?occasion=birthday` |
| `sort` | Sort order | `?sort=price_asc` or `?sort=price_desc` |
| `featured` | Only featured products | `?featured=true` |
| `best_seller` | Only best sellers | `?best_seller=true` |

**Example:** Get page 1 of flowers, 12 per page:

```
GET /api/products?category=flowers&page=1&limit=12
```

**What you get back:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Red Rose Bouquet",
      "slug": "red-rose-bouquet",
      "description": "A beautiful bouquet of 12 red roses",
      "price": 299.99,
      "original_price": 349.99,
      "image": "/images/red-roses.jpg",
      "category_name": "Flowers",
      "occasion_name": "I Love You",
      "in_stock": true,
      "featured": true,
      "best_seller": true,
      "rating": 4.8,
      "review_count": 125
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4
  }
}
```

---

### Search for products

```
GET /api/products/search?q=YOUR_SEARCH_TERM
```

**No login needed.**

**Example:** Search for "chocolate":

```
GET /api/products/search?q=chocolate
```

**What you get back:** Same format as listing products, but filtered by the search term.

---

### Get one product by ID

```
GET /api/products/:id
```

**No login needed.**

**Example:** Get product with ID "1":

```
GET /api/products/1
```

**What you get back:**
```json
{
  "id": "1",
  "name": "Red Rose Bouquet",
  "slug": "red-rose-bouquet",
  "description": "A beautiful bouquet of 12 red roses wrapped in premium paper",
  "price": 299.99,
  "original_price": 349.99,
  "image": "/images/red-roses.jpg",
  "category_id": "1",
  "category_name": "Flowers",
  "occasion_id": "2",
  "occasion_name": "I Love You",
  "in_stock": true,
  "featured": true,
  "best_seller": true,
  "rating": 4.8,
  "review_count": 125,
  "gallery": {
    "main_image": "/images/roses-main.jpg",
    "thumbnails": ["/images/roses-1.jpg", "/images/roses-2.jpg"]
  },
  "sizes": [
    { "id": "1", "name": "Small (6 Roses)", "price": 149.99 },
    { "id": "2", "name": "Medium (12 Roses)", "price": 299.99 },
    { "id": "3", "name": "Large (24 Roses)", "price": 499.99 }
  ]
}
```

---

## Categories

### List all categories

```
GET /api/categories
```

**No login needed.**

**What you get back:**
```json
[
  {
    "id": "1",
    "name": "Flowers",
    "slug": "flowers",
    "image_type": "emoji",
    "bg_color": "#FFE4E1",
    "product_count": 15
  },
  {
    "id": "2",
    "name": "Cakes",
    "slug": "cakes",
    "image_type": "emoji",
    "bg_color": "#FFF8DC",
    "product_count": 8
  }
]
```

---

### Get one category with its products

```
GET /api/categories/:slug
```

**No login needed.**

**Example:** Get the "flowers" category:

```
GET /api/categories/flowers
```

**What you get back:**
```json
{
  "category": {
    "id": "1",
    "name": "Flowers",
    "slug": "flowers"
  },
  "products": [
    { "id": "1", "name": "Red Rose Bouquet", "price": 299.99 },
    { "id": "2", "name": "Sunflower Bunch", "price": 199.99 }
  ]
}
```

---

## Occasions

### List all occasions

```
GET /api/occasions
```

**No login needed.**

**What you get back:**
```json
[
  {
    "id": "1",
    "name": "Happy Birthday",
    "slug": "happy-birthday",
    "image_type": "emoji",
    "product_count": 12
  }
]
```

---

### Get one occasion with its products

```
GET /api/occasions/:slug
```

**No login needed.**

Works the same as categories -- shows the occasion info and all its products.

---

## Shopping Cart

All cart endpoints **require login** (send your token in the header).

### Get my cart

```
GET /api/cart
```

**What you get back:**
```json
{
  "items": [
    {
      "id": "1",
      "product_id": "1",
      "product_name": "Red Rose Bouquet",
      "product_image": "/images/red-roses.jpg",
      "product_price": 299.99,
      "quantity": 2,
      "selected_size": "Large (24 Roses)",
      "size_price": 499.99,
      "total": 999.98
    }
  ],
  "total": 999.98,
  "itemCount": 2
}
```

---

### Add item to cart

```
POST /api/cart/items
```

**What to send:**
```json
{
  "productId": "1",
  "quantity": 2,
  "selectedSize": "Large (24 Roses)"
}
```

---

### Update cart item quantity

```
PATCH /api/cart/items/:id
```

**What to send:**
```json
{
  "quantity": 3
}
```

---

### Remove one item from cart

```
DELETE /api/cart/items/:id
```

---

### Clear entire cart (remove everything)

```
DELETE /api/cart
```

---

## Wishlist

All wishlist endpoints **require login**.

### Get my wishlist

```
GET /api/wishlist
```

**What you get back:**
```json
{
  "items": [
    {
      "id": "1",
      "product_id": "3",
      "product_name": "Chocolate Cake",
      "product_image": "/images/choco-cake.jpg",
      "product_price": 349.99,
      "in_stock": true
    }
  ]
}
```

---

### Check if a product is in my wishlist

```
GET /api/wishlist/check/:productId
```

**What you get back:**
```json
{
  "inWishlist": true
}
```

---

### Add product to wishlist

```
POST /api/wishlist/items
```

**What to send:**
```json
{
  "productId": "3"
}
```

---

### Remove product from wishlist

```
DELETE /api/wishlist/items/:productId
```

---

## Orders

All order endpoints **require login**.

### Get all my orders

```
GET /api/orders
```

**What you get back:**
```json
{
  "orders": [
    {
      "id": "1",
      "receipt_number": "WRD-000001",
      "status": "confirmed",
      "total": 649.98,
      "item_count": 2,
      "created_at": "2026-04-10T15:30:00.000Z"
    }
  ]
}
```

---

### Get one order details

```
GET /api/orders/:id
```

**What you get back:**
```json
{
  "id": "1",
  "receipt_number": "WRD-000001",
  "status": "confirmed",
  "subtotal": 599.98,
  "shipping_cost": 50.00,
  "total": 649.98,
  "customer_name": "Ahmed Mohamed",
  "customer_email": "ahmed@email.com",
  "customer_phone": "+201115239553",
  "shipping_address": "123 Nile Street",
  "shipping_city": "Cairo",
  "shipping_area": "Maadi",
  "delivery_date": "2026-04-15",
  "delivery_time": "Morning (9am-12pm)",
  "payment_method": "cash_on_delivery",
  "notes": "Ring the doorbell twice",
  "created_at": "2026-04-10T15:30:00.000Z",
  "items": [
    {
      "product_name": "Red Rose Bouquet",
      "product_image": "/images/red-roses.jpg",
      "quantity": 2,
      "size": "Large (24 Roses)",
      "unit_price": 299.99,
      "total_price": 599.98
    }
  ]
}
```

---

### Get order receipt

```
GET /api/orders/:id/receipt
```

Returns a formatted receipt for the order (can be used for printing or display).

---

### Place a new order

```
POST /api/orders
```

**What to send:**
```json
{
  "customerName": "Ahmed Mohamed",
  "customerEmail": "ahmed@email.com",
  "customerPhone": "+201115239553",
  "shippingAddress": "123 Nile Street",
  "shippingCity": "Cairo",
  "shippingArea": "Maadi",
  "deliveryDate": "2026-04-15",
  "deliveryTime": "Morning (9am-12pm)",
  "paymentMethod": "cash_on_delivery",
  "notes": "Ring the doorbell twice"
}
```

The order is created from whatever items are currently in the user's cart. After the order is placed, the cart is emptied.

**What you get back:**
```json
{
  "message": "Order placed successfully",
  "order": {
    "id": "1",
    "receipt_number": "WRD-000001",
    "total": 649.98,
    "status": "pending"
  },
  "whatsappLink": "https://wa.me/201115239553?text=..."
}
```

The `whatsappLink` is a pre-filled WhatsApp message link that the customer can click to notify the shop.

---

### Cancel an order

```
PATCH /api/orders/:id
```

**What to send:**
```json
{
  "status": "cancelled"
}
```

---

## Contact Form

### Send a contact message

```
POST /api/contact
```

**No login needed.**

**What to send:**
```json
{
  "name": "Sara Ali",
  "email": "sara@email.com",
  "subject": "Question about delivery",
  "message": "Hi! Do you deliver to Alexandria?"
}
```

**What you get back:**
```json
{
  "message": "Message sent successfully"
}
```

---

## Newsletter

### Subscribe to the newsletter

```
POST /api/newsletter/subscribe
```

**No login needed.**

**What to send:**
```json
{
  "email": "fan@email.com"
}
```

**What you get back:**
```json
{
  "message": "Subscribed successfully"
}
```

---

## Error Responses

When something goes wrong, the API always sends back an error in this format:

```json
{
  "error": "A description of what went wrong"
}
```

### Common Error Codes

| Code | What It Means | Example |
|------|--------------|---------|
| `400` | Bad Request -- you sent wrong or missing data | "Email is required" |
| `401` | Unauthorized -- you're not logged in or your token expired | "Authentication required" |
| `403` | Forbidden -- you're logged in but don't have permission | "You can only view your own orders" |
| `404` | Not Found -- the thing you're looking for doesn't exist | "Product not found" |
| `409` | Conflict -- something already exists | "Email already registered" |
| `429` | Too Many Requests -- slow down! | "Rate limit exceeded" |
| `500` | Server Error -- something broke on our end | "Internal server error" |

### Rate Limits

To prevent spam and abuse, the API has speed limits:

| Endpoint | Limit |
|----------|-------|
| Login/Register | 5 requests per 15 minutes (per IP) |
| All other endpoints | 100 requests per 15 minutes (per IP) |

If you hit the limit, wait 15 minutes and try again.
