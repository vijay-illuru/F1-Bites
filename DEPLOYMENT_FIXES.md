# Deployment Fixes for Render

## Issues Fixed

### 1. CSS Not Loading
**Problem**: Assets not loading correctly  
**Fix**: Updated `vite.config.js` with proper base path

### 2. Login Failed
**Problem**: CORS or API connection issues  
**Fix**: 
- Updated CORS configuration in `backend/server.js`
- Made CORS more permissive for deployment

### 3. Refresh Error (404 on refresh)
**Problem**: React Router doesn't work on static hosting without redirects  
**Fix**: Created `_redirects` file in `frontend/public/`

## Steps to Fix on Render

### Step 1: Push Changes to GitHub

```bash
git add .
git commit -m "Fix deployment issues: CORS, routing, and asset paths"
git push origin main
```

### Step 2: Update Backend on Render

1. Go to your backend service on Render
2. Environment Variables → Update:
   ```
   FRONTEND_URL = https://your-frontend-url.onrender.com
   ```
   (No trailing slash!)
3. Save → Auto-deploy will trigger

### Step 3: Update Frontend on Render

**If using Static Site:**
1. Go to your frontend static site on Render
2. **Build Command**: 
   ```
   cd frontend && npm install && npm run build
   ```
3. **Publish Directory**: 
   ```
   frontend/dist
   ```
4. **Environment Variables**:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   ```
5. **Important**: Add custom headers (Settings → Custom Headers):
   ```
   /*    /index.html   200
   ```
   Or use the `_redirects` file that's now in `public/`

### Step 4: Verify

1. **Check Backend Logs**:
   - Go to backend service → Logs
   - Should see: "Connected to MongoDB database"
   - Should see: "Server running on..."

2. **Check Frontend**:
   - Open frontend URL in browser
   - Open DevTools (F12) → Console tab
   - Check for errors
   - Check Network tab for API calls

3. **Test Login**:
   - Try logging in
   - Check browser console for CORS errors
   - Check Network tab for failed requests

## Alternative: Use render.yaml (Recommended)

If the above doesn't work, use the `render.yaml` file:

1. Go to Render Dashboard
2. Go to your project
3. Click "Blueprint" or "Generate Blueprint"
4. Connect your GitHub repo
5. Render will auto-detect `render.yaml` and configure services

## Manual Configuration

### Backend Service:
```
Name: f1-bites-backend
Environment: Node
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: node server.js
Instance: Free
```

Environment Variables:
```
MONGO_URI = mongodb+srv://...
JWT_SECRET = your_secret
ADMIN_KEY = your_key
FRONTEND_URL = https://your-frontend.onrender.com
NODE_ENV = production
```

### Frontend Service (Static Site):
```
Name: f1-bites-frontend
Environment: Static Site
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
Instance: Free
```

Environment Variables:
```
VITE_API_URL = https://your-backend.onrender.com/api
```

**Critical**: Add redirect rule:
- Go to Settings → Redirects/Rewrites
- Add: `/*` → `/index.html` with status `200`

## Troubleshooting

### CSS Still Not Loading:
1. Check browser console for 404 errors on CSS files
2. Verify build completed successfully
3. Check if assets are in `dist/assets/` folder
4. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Login Still Fails:
1. Check backend logs for errors
2. Verify `FRONTEND_URL` in backend matches frontend URL exactly
3. Check browser console for CORS errors
4. Verify `VITE_API_URL` in frontend matches backend URL + `/api`
5. Test API directly: `https://your-backend.onrender.com/api/products`

### Refresh Still Gives 404:
1. Verify `_redirects` file exists in `frontend/public/`
2. Check if Render has redirect rule configured
3. For Static Site, redirects might need to be in Settings → Redirects

### API Calls Failing:
1. Check browser Network tab → see request URL
2. Verify `VITE_API_URL` is set correctly
3. Check backend is running (check logs)
4. Test: `curl https://your-backend.onrender.com/api/products`

## Quick Check Commands

After deployment, test these URLs in browser:

1. **Backend Health** (should return products):
   ```
   https://your-backend.onrender.com/api/products
   ```

2. **Frontend** (should load):
   ```
   https://your-frontend.onrender.com
   ```

3. **Login** (check Network tab for API call):
   ```
   https://your-frontend.onrender.com/login
   ```

## Important Notes

- **No trailing slashes** in URLs
- **Backend URL** = `https://xxx.onrender.com`
- **API URL** = `https://xxx.onrender.com/api`
- **Frontend URL** = `https://yyy.onrender.com` (no `/api`)

