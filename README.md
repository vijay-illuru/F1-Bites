# F1 Snacks - E-Commerce Platform

A full-stack e-commerce application for F1 merchandise with user authentication, shopping cart, order management, and admin dashboard.

## 🌐 Live Demo

> **Note**: Replace the placeholder URLs below with your actual Render deployment URLs

- **Frontend**: [Deployed on Render](https://f1-snacks-frontend.onrender.com) *(Update with your actual frontend URL)*
- **Backend API**: [Deployed on Render](https://f1-snacks-backend.onrender.com) *(Update with your actual backend URL)*
- **API Health Check**: [Test Products Endpoint](https://f1-snacks-backend.onrender.com/api/products)

## 📚 Documentation


- **[GitHub Repository](https://github.com/vijay-illuru/F1-Bites.git)** - Source code repository

## Features

- User authentication (signup, login)
- Admin authentication with admin key
- Product browsing with search and filtering
- Shopping cart management
- Order placement and tracking
- Admin dashboard for product and order management
- User profile management
- Image upload for products
- Secure API with JWT authentication

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing

### Frontend
- React 19
- React Router DOM
- Vite
- Tailwind CSS
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/vijay-illuru/F1-Bites.git
cd f1-snacks
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_min_32_characters
ADMIN_KEY=your_admin_key_min_8_characters
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_URL=http://localhost:3001/api
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

Server runs on `http://localhost:3001`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## Project Structure

```
f1-snacks/
├── backend/
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authmiddleware.js
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── user.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── ProductRoutes.js
│   │   └── profileRoutes.js
│   ├── scripts/
│   │   ├── checkUsers.js
│   │   ├── makeAdmin.js
│   │   ├── seedProducts.js
│   │   ├── testConnection.js
│   │   └── updateOrderStatus.js
│   ├── utils/
│   │   ├── envValidation.js
│   │   ├── logger.js
│   │   └── validators.js
│   ├── uploads/
│   │   └── products/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/signup` - Admin registration
- `POST /api/auth/admin/login` - Admin login

### Products

- `GET /api/products` - Get all products (with search & filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PATCH /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PATCH /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders

- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status (Admin only)

### Profile

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Admin

- `GET /api/admin/products` - Get all products (Admin)
- `POST /api/admin/products` - Create product with image (Admin)
- `PATCH /api/admin/products/:id` - Update product (Admin)
- `DELETE /api/admin/products/:id` - Delete product (Admin)

## Usage

### User Registration

1. Navigate to `/signup`
2. Fill in username, email, and password
3. Password must be at least 8 characters with at least one letter and one number

### Admin Access

1. Navigate to `/admin/login` or `/admin/signup`
2. Use admin key during registration/login
3. Admin key is set in backend `.env` as `ADMIN_KEY`

### Product Management (Admin)

1. Login as admin
2. Navigate to admin dashboard
3. Add, edit, or delete products
4. Upload product images (max 5MB)

### Shopping

1. Browse products on home page
2. Search and filter products
3. Add items to cart
4. Proceed to checkout
5. Place order with delivery details

## Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | JWT token secret (min 32 chars) | Yes |
| ADMIN_KEY | Admin authentication key (min 8 chars) | Yes |
| PORT | Server port | No (default: 3001) |
| FRONTEND_URL | Frontend URL for CORS | No (default: http://localhost:5173) |
| NODE_ENV | Environment mode | No (default: development) |

### Frontend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_API_URL | Backend API URL | No (default: http://localhost:3001/api) |

## Scripts

### Backend

- `npm start` - Start server with nodemon
- `npm run dev` - Start server with nodemon
- `npm run seed` - Seed products database
- `npm run make-admin` - Make user admin by email

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Admin-only routes protection
- Input validation and sanitization
- Email format validation
- Password strength requirements
- File upload validation
- Environment variable validation
- MongoDB transactions for order processing

## Database Models

### User
- username, email, password
- isAdmin flag
- Profile fields (phone, city, location, pincode)
- Google OAuth support (optional)

### Product
- name, price, category, description
- image URL
- stock quantity
- availability status

### Order
- User reference
- Order items with product details
- Customer delivery information
- Payment method
- Order status (pending, confirmed, preparing, out_for_delivery, delivered, cancelled)
- Total amount
- Estimated delivery time

### Cart
- User reference
- Cart items with quantities

## Error Handling

- Global error handler middleware
- Consistent error response format
- Handles validation, authentication, and server errors
- 404 handler for unknown routes

## Performance Optimizations

- Database indexes on frequently queried fields
- Text search indexes for product search
- Transaction handling for critical operations
- Efficient query population

## Development

### Adding New Products

Use the seed script or admin dashboard:

```bash
cd backend
npm run seed
```

### Making Users Admin

```bash
cd backend
node scripts/makeAdmin.js <email>
```

## Troubleshooting

### MongoDB Connection Issues

- Verify MONGO_URI is correct
- Check MongoDB is running
- Test connection: `node scripts/testConnection.js`

### Authentication Issues

- Verify JWT_SECRET is set
- Check token expiration (7 days)
- Clear localStorage and login again

### Image Upload Issues

- Check uploads directory exists
- Verify file size (max 5MB)
- Check file type (images only)

### Environment Variables

- Server validates env vars on startup
- Missing required vars will prevent server start
- Weak secrets show warnings in production

## 🚀 Deployment

This application is deployed on **Render**:

- **Backend**: Web Service on Render
- **Frontend**: Static Site on Render
- **Database**: MongoDB Atlas

### Deployment Resources

- **[Render Dashboard](https://dashboard.render.com)** - Manage your deployments
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Cloud database
- **[Render Documentation](https://render.com/docs)** - Render deployment guides

### Deployment Guide

See **[RENDER_CONFIGURATION.md](./RENDER_CONFIGURATION.md)** for complete deployment instructions including:
- MongoDB Atlas setup
- Backend deployment configuration
- Frontend static site setup
- Environment variables configuration
- React Router SPA routing setup
- Troubleshooting common issues

## 🔗 Quick Links

### Application Links
- **Frontend Application**: [Live Demo](https://f1-snacks-frontend.onrender.com)
- **Backend API**: [API Base URL](https://f1-snacks-backend.onrender.com/api)
- **API Health Check**: [Products Endpoint](https://f1-snacks-backend.onrender.com/api/products)

### Development Resources
- **GitHub Repository**: [F1-Bites](https://github.com/vijay-illuru/F1-Bites.git)
- **Render Dashboard**: [Dashboard](https://dashboard.render.com)
- **MongoDB Atlas**: [Atlas Dashboard](https://cloud.mongodb.com)

### Documentation
- **Deployment Guide**: [RENDER_CONFIGURATION.md](./RENDER_CONFIGURATION.md)
- **Render Docs**: [Static Sites](https://render.com/docs/static-sites)
- **MongoDB Atlas Docs**: [Atlas Documentation](https://docs.atlas.mongodb.com)

### Testing Links
- **Frontend Routes**:
  - [Home](https://f1-snacks-frontend.onrender.com/)
  - [Login](https://f1-snacks-frontend.onrender.com/login)
  - [Signup](https://f1-snacks-frontend.onrender.com/signup)
  - [Cart](https://f1-snacks-frontend.onrender.com/cart)
  - [Profile](https://f1-snacks-frontend.onrender.com/profile)
  - [Admin Dashboard](https://f1-snacks-frontend.onrender.com/admin)

## License

ISC

## Author

F1 Snacks Development Team

