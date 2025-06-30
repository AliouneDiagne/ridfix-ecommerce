# 🚀 RIDFIX – Scooter & Moped Parts E-commerce

**Frontend React** application to explore and purchase scooter and moped spare parts, designed with a modern **dark mode** theme.

---

## 📋 Table of Contents

- [Description](#description)
- [Setup](#setup)
- [Stack Technologies](#stack-technologies)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Features](#features)
- [Future Developments](#future-developments)
- [License](#license)

---

## 📖 Description

RIDFIX is a comprehensive React application for an e-commerce platform specializing in scooter and moped spare parts. It emphasizes a modern, modular, and scalable architecture, showcasing advanced frontend development practices.

**Key Features & Design Principles:**

-   **Dark/Orange Theme**: A visually striking dark theme with vibrant orange accents, switchable with robust persistence.
-   **Wishlist**: Users can add products to a wishlist, visually indicated by heart icons.
-   **Multi-step Checkout**: A guided 4-step checkout process for a smooth purchasing experience.
-   **Admin Dashboard with CRUD**: A protected administrative area allowing full Create, Read, Update, and Delete operations for products, orders, and users (simulated backend).
-   **Advanced UI/UX**: Includes skeleton loaders for fetching data, toast notifications for user feedback, and subtle micro-animations for a fluid and engaging experience.
-   **Enhanced Accessibility**: Implemented with Skip Navigation links, proper ARIA attributes, and clear focus outlines for improved usability.
-   **Responsive Design**: Built with a mobile-first approach, ensuring optimal viewing and interaction across various screen sizes (breakpoints at 768px and 1024px).
-   **Comprehensive Testing**: Features basic unit and integration tests to ensure code reliability and functionality.

---

## 🚀 Setup

Follow these steps to get the Ridfix project up and running on your local machine.

1.  **Clone the Repository**:
    ```bash
    git clone <https://github.com/AliouneDiagne/ridfix-ecommerce.git>
    cd ridfix-ecommerce
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the project root and add the API URL.

    ```env
    VITE_API_URL=http://localhost:3001
    ```

4.  **Prepare Images**:
    Create a `public/images/` directory in the project root and place all product images and brand logos there. Ensure image filenames match those specified in `data/db.json` (e.g., `product-1.jpg`, `brand-logo-1.png`).

5.  **Start the API Server (JSON-Server)**:
    Open a **new terminal** in the project root and run:
    ```bash
    npm run serve:api
    ```
    This will start the mock backend server. Keep this terminal open while developing.

6.  **Start the Frontend Development Server**:
    Open another **new terminal** in the project root and run:
    ```bash
    npm run dev
    ```
    (or `npm start`)
    The application will be available at `http://localhost:5173/` (or the port specified by Vite).

---

## 🛠 Stack Technologies

The Ridfix project leverages a modern and robust set of technologies:

*   **React 18** (Functional Components, Hooks, Context API, Suspense, Lazy Loading)
*   **Redux Toolkit** + **Redux Thunk** (Global State Management, Async Operations)
*   **React Router v6** (Client-side Routing, Dynamic Routes, Protected Routes)
*   **Axios** (HTTP Client with Interceptors)
*   **React Hook Form** + **Yup** (Form Management and Validation)
*   **Styled-components** (Component-based Styling, Theming)
*   **React-Toastify** (Toast Notifications)
*   **Framer Motion** (Animations and Micro-interactions)
*   **React-Calendar** (Calendar functionality for Contact Page)
*   **Font Awesome** (Iconography)
*   **Jest** + **React Testing Library** (Unit & Integration Testing)
*   **ESLint** + **Prettier** (Code Quality and Formatting)
*   **Vite** (Fast Build Tool and Development Server)
*   **JSON-Server** (Mock Backend)
*   **LocalStorage** (Client-side Data Persistence)

---

## 🔧 Environment Variables

A `.env` file should be created in the project's root directory:

```env
VITE_API_URL=http://localhost:3001

--------------------------------------------------------------------------------
📂 Project Structure
The project follows a clear and modular file structure for scalability and maintainability:
ridfix-ecommerce/
├── public/                 # Static assets (images, index.html)
│   ├── images/             # Product images, brand logos
│   └── index.html          # Main HTML file
├── src/                    # Source code
│   ├── api/                # Axios instance and API service calls
│   │   └── api.js
│   ├── assets/             # Global assets (e.g., global styles, fonts)
│   │   ├── styles/
│   │   │   └── GlobalStyle.js
│   │   │   └── theme.js
│   │   └── fonts/          # (Optional) Custom font files
│   ├── components/         # Reusable UI components
│   │   ├── admin/          # Admin-specific components (forms, lists)
│   │   ├── auth/           # Authentication-related components (forms)
│   │   ├── cart/           # Cart-specific components (item, summary)
│   │   ├── checkout/       # Checkout-specific components (forms, stepper)
│   │   ├── layout/         # Layout components (Navbar, Footer, SkipNav)
│   │   ├── products/       # Product-related components (card, carousel, filters)
│   │   └── ui/             # Generic UI components (Button, Input, Skeleton, Spinner)
│   ├── data/               # Local JSON data for mock backend
│   │   └── db.json         # Simulated database
│   ├── hooks/              # Custom React Hooks
│   │   ├── useAuth.js
│   │   └── useLocalStorage.js
│   ├── pages/              # Main application pages (routes)
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── checkout/
│   │   ├── Home.jsx
│   │   ├── CatalogPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── routes/             # Route protection components
│   │   ├── AdminRoute.jsx
│   │   └── PrivateRoute.jsx
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux Slices (auth, cart, products, etc.)
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── productsSlice.js
│   │   │   ├── wishlistSlice.js
│   │   │   ├── ordersSlice.js
│   │   │   └── usersSlice.js
│   │   └── store.js        # Redux store main file
│   ├── utils/              # Utility functions (formatters, helpers)
│   │   ├── debounce.js
│   │   └── formatPrice.js
│   ├── App.jsx             # Main application component (router setup)
│   └── main.jsx            # Entry point for React application
├── .eslintrc.js            # ESLint configuration
├── .eslintignore           # Files/folders to ignore for ESLint
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Files/folders to ignore for Prettier
├── LICENSE                 # Project license
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation

--------------------------------------------------------------------------------
✨ Features
The Ridfix application implements the following core and advanced features:
•
Home & Catalog: Features a hero banner, promotional sections, and featured products. The catalog includes a responsive grid of 25 products, a live full-text search with debounce, comprehensive filters (category, brand, price range, availability), and sorting options (price, name, popularity).
•
Product Detail: A dynamic page displaying product images (carousel), extended descriptions, technical specifications (tabbed view), simulated customer reviews with a submission form, and a wishlist toggle (💖). It also suggests related products.
•
Cart & Checkout: Users can add/remove products, modify quantities, and view dynamic subtotals. The cart content persists using LocalStorage. The checkout process is a guided 4-step flow covering shipping, billing, and payment (simulated) forms.
•
Authentication: Includes dedicated Login and Registration forms with basic validation. It supports simulated user and admin roles, with authentication state persisted via LocalStorage.
•
User Profile: A dashboard for logged-in users to modify personal data, view their order history, and manage addresses.
•
Admin Dashboard: A protected administrative area (/admin) offering full CRUD (Create, Read, Update, Delete) operations for products, orders, and users, all managed via the simulated API.
•
UI/UX Enhancements: Integrated skeleton loaders for data fetching, lazy loading for images and components to improve initial load times, toast notifications for immediate user feedback, and subtle micro-animations (Framer Motion) for a fluid user experience.
•
Accessibility: Implemented with Skip Navigation links, proper ARIA landmarks, clear focus outlines for keyboard navigation, and aria-live regions for screen reader compatibility.
•
Responsive Design: Built with a mobile-first approach, ensuring adaptability across various screen sizes (breakpoints at 768px and 1024px).
•
Testing: Includes basic unit tests for atomic components and Redux slices, as well as integration tests for key user flows.

--------------------------------------------------------------------------------
🔮 Future Developments
Potential enhancements for future iterations of the Ridfix project:
•
TypeScript Integration: Migrate the codebase to TypeScript for enhanced type safety and developer experience.
•
Performance Optimizations: Further optimizations such as image compression, advanced memoization, and virtualization for large lists.
•
End-to-End Testing: Implement E2E tests using Cypress or Playwright for full user flow validation.
•
PWA & Offline Support: Transform the application into a Progressive Web App (PWA) with offline capabilities.
•
Internationalization (i18n): Add multi-language support.
•
Deployment Automation (CI/CD): Set up CI/CD pipelines (e.g., GitHub Actions) for automated testing and deployment.

--------------------------------------------------------------------------------
📜 License
Distributed under the MIT License.
