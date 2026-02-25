# LUMIERE - Premium E-Commerce Platform

LUMIERE is a modern, high-end e-commerce platform designed for a premium shopping experience. It features a responsive storefront, a comprehensive admin dashboard, a robust backend API, and a mobile application.

## Live Links

-   **Admin Panel**: [https://lumiere-admin.vercel.app/login](https://lumiere-admin.vercel.app/login)

## Tech Stack

### Frontend (Storefront)
-   **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **State Management**: React Context API
-   **Authentication**: [Clerk](https://clerk.com/)
-   **Routing**: React Router DOM

### Backend (API)
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
-   **Caching**: [Redis](https://redis.io/)
-   **Authentication**: JWT & Clerk Integration

### Admin Panel
-   **Framework**: React
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Features**: Product Management, Order Tracking, Analytics

### Mobile App
-   **Framework**: [React Native](https://reactnative.dev/) (likely Expo)
-   **Language**: TypeScript/JavaScript

## Project Structure

```
LUMIERE/
├── src/                    # Frontend (Storefront) Source Code
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages (Home, Shop, ProductDetail, etc.)
│   ├── context/            # Global state management
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API integration services
│   ├── lib/                # Utilities and helper functions
│   ├── data/               # Static data
│   └── assets/             # Images and static assets
├── server/                 # Backend API Source Code
│   ├── config/             # Configuration files (DB, Redis, env)
│   ├── controllers/        # Route logic
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth, Caching, and Error handling middleware
│   └── utils/              # Backend utilities
├── admin/                  # Admin Dashboard Source Code
│   ├── src/
│   │   ├── pages/          # Admin pages (Dashboard, Products, Orders)
│   │   ├── components/     # Admin-specific components
│   │   └── services/       # Admin API services
├── mobile/                 # Mobile Application Source Code
└── public/                 # Static assets (images, icons)
```

## Functionality Details

### User Authentication
Authentication is fully handled by Clerk, providing robust and secure sign-up, sign-in, and session management capabilities. Clerk is integrated into the Express.js backend for protected route validation. By default, guests can browse products and add items to the cart, but a valid authenticated session is strictly enforced upon attempting checkout to guarantee the security and referential integrity of orders.

### High-Performance Redis Caching
Due to the demanding nature of a premium e-commerce platform that heavily relies on high-resolution product imagery and rich metadata, the backend leverages Redis for API response caching. 
- Primary product catalog endpoints (e.g. `/api/products`, `/api/products/featured`, `/api/products/new`) are automatically cached for up to an hour. 
- The Redis integration circumvents round-trips to MongoDB, delivering massive latency reductions (e.g., from ~400ms down to ~90ms), guaranteeing instantaneous loading times for standard store browsers. 
- The cache employs automatic invalidation strategies whenever administrators create, update, or delete products to immediately enforce catalog consistency without serving stale merchandise data.

### Shopping Experience
The storefront presents diverse categories, full search capabilities, and highly detailed product pages. The client state employs React Context for managing Cart and Wishlist items without necessitating a backend save until checkout or profile synchronization is requested. 

### Order Management
Users are given dedicated profiles upon successful authentication where they can monitor active purchases and review comprehensive histories. 

### Administrative Dashboard
In addition to the main application, a fully fledged React-based Admin Dashboard provides privileged users the ability to perform comprehensive CRUD operations on store merchandise, manage active customer orders, and extract aggregated sales analytics to drive business decisions.

### Responsive UI Design
Built entirely leveraging Tailwind CSS, shadcn/ui primitives, and Framer Motion micro-interactions. The storefront delivers a stunning, flawless, layout completely agnostic to standard screen form-factors ranging from minimal mobile displays to ultrawide desktops.

## Getting Started

### Prerequisites
-   Node.js (v16+)
-   npm or yarn (or bun)
-   MongoDB instance
-   Redis instance (local or remote)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/garvbahl37-gif/LUMIERE.git
    cd LUMIERE
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # Install server dependencies
    cd server && npm install
    # Install admin dependencies
    cd ../admin && npm install
    ```

3.  **Environment Setup**
    -   Create `.env` files in `root`, `server`, and `admin` directories with necessary API keys (Clerk Publishable Key, MongoDB URI, Redis URI, Stripe keys, etc.).

4.  **Run the Application**
    -   **Frontend**: `npm run dev`
    -   **Backend**: `cd server && npm start` (or `npm run dev`)
    -   **Admin**: `cd admin && npm run dev`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
