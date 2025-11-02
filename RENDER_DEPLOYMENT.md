# Render Deployment Instructions

## Backend Deployment on Render

### 1. Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository

### 2. Configure Settings

**Name**: `f1-snacks-backend` (or your preferred name)

**Environment**: `Node`

**Region**: Choose closest to your users

**Branch**: `main` (or your default branch)

**Root Directory**: Leave empty (Render will detect automatically)

### 3. Build & Start Commands

**Build Command**:
```bash
cd backend && npm install
```

**Start Command**:
```bash
cd backend && node server.js
```

### 4. Environment Variables

Add these in the **Environment** section:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_min_32_characters
ADMIN_KEY=your_admin_key_min_8_characters
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.onrender.com
PORT=10000
```

**Important Notes**:
- Render automatically sets `PORT` environment variable
- Update `server.js` to use `process.env.PORT` if not already done
- Use MongoDB Atlas connection string (not local)
- Set `FRONTEND_URL` to your frontend Render URL

### 5. Advanced Settings

**Plan**: Free tier is fine for testing

**Auto-Deploy**: Enable if you want auto-deploy on git push

### 6. Deploy

Click **"Create Web Service"** and wait for deployment.

---

## Frontend Deployment on Render

### Option 1: Static Site (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Select repository

**Settings**:
- **Name**: `f1-snacks-frontend`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `frontend/dist`

**Environment Variables**:
```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

### Option 2: Web Service (if you need SSR)

1. Click **"New +"** → **"Web Service"**
2. Connect repository

**Build Command**:
```bash
cd frontend && npm install && npm run build
```

**Start Command**:
```bash
cd frontend && npm run preview
```

**Environment Variables**:
```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

---

## Important Configuration Updates

### Update Backend CORS

Make sure `backend/server.js` has:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
```

### Update Frontend API URL

Make sure `frontend/src/utils/api.js` uses:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

---

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist Render IP: `0.0.0.0/0` (allows all IPs - for production, restrict to Render IPs)
5. Get connection string
6. Replace `<password>` with your database password
7. Add to Render environment variables

---

## Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is accessible
- [ ] Frontend can connect to backend API
- [ ] Environment variables are set correctly
- [ ] CORS is configured for frontend URL
- [ ] MongoDB connection is working
- [ ] Test user registration
- [ ] Test admin login
- [ ] Test product creation (admin)

---

## Troubleshooting

### Build Fails

- Check build logs in Render dashboard
- Verify Node version (Render uses Node 18 by default)
- Check for missing dependencies

### Runtime Errors

- Check application logs in Render
- Verify environment variables are set
- Check MongoDB connection string

### CORS Errors

- Verify `FRONTEND_URL` in backend environment variables
- Make sure frontend URL matches exactly (including https://)

### Port Issues

- Render sets PORT automatically
- Your code should use `process.env.PORT || 3001`

---

## Custom Domain (Optional)

1. In Render dashboard, go to your service
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain
4. Update DNS records as instructed

---

## Costs

**Free Tier**:
- 750 hours/month
- Spins down after 15 min inactivity
- Takes ~30 seconds to wake up

**Paid Tier**:
- Always on
- Better performance
- Starts at $7/month

