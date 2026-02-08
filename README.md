
# LUMIERE - Premium E-Commerce Platform

LUMIERE is a modern, high-end e-commerce platform designed for a premium shopping experience. It features a responsive storefront, a comprehensive admin dashboard, a robust backend API, and a mobile application.

## 🚀 Tech Stack

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
-   **Authentication**: JWT & Clerk Integration

### Admin Panel
-   **Framework**: React
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Features**: Product Management, Order Tracking, Analytics

### Mobile App
-   **Framework**: [React Native](https://reactnative.dev/) (likely Expo)
-   **Language**: TypeScript/JavaScript

## 📂 Project Structure

```
LUMIERE/
├── src/                # Frontend Request (Storefront) Source Code
│   ├── components/     # Reusable UI components (Header, Hero, ProductCard, etc.)
│   ├── pages/          # Application pages (Home, Shop, ProductDetail, Profile, etc.)
│   ├── context/        # Global state (Auth, Cart, Wishlist)
│   ├── services/       # API integration services
│   └── lib/            # Utilities and helper functions
├── server/             # Backend API Source Code
│   ├── controllers/    # Route logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   └── middleware/     # Auth and error handling middleware
├── admin/              # Admin Dashboard Source Code
├── mobile/             # Mobile Application Source Code
└── public/             # Static assets (images, icons)
```

## ✨ Key Features

-   **User Authentication**: Secure sign-up/sign-in using Clerk.
-   **Product Discovery**: diverse categories, search functionality, and detailed product pages.
-   **Shopping Experience**: Full-featured cart, wishlist, and checkout process.
-   **Order Management**: User profile with order history and detailed order usage.
-   **Admin Dashboard**: comprehensive tools for managing products, orders, and viewing sales analytics.
-   **Mobile Experience**: Dedicated mobile app for on-the-go shopping.
-   **Responsive Design**: Fully responsive UI ensuring a seamless experience across all devices.

## 🛠️ Getting Started

### Prerequisites
-   Node.js (v16+)
-   npm or yarn
-   MongoDB instance

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
    -   Create `.env` files in `root`, `server`, and `admin` directories with necessary API keys (Clerk, MongoDB URI, etc.).

4.  **Run the Application**
    -   **Frontend**: `npm run dev`
    -   **Backend**: `cd server && npm start` (or `npm run dev`)
    -   **Admin**: `cd admin && npm run dev`

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
