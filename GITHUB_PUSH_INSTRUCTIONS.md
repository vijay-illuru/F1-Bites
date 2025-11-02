# Instructions to Push Project to GitHub

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: `f1-snacks` (or your preferred name)
   - **Description**: Optional description
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Initialize Git (if not already done)

Open terminal in the project root directory and run:

```bash
cd /Users/vijayilluru/f1-snacks

# Check if git is already initialized
ls -la .git

# If .git folder doesn't exist, initialize git:
git init
```

## Step 3: Add All Files

```bash
# Add all files to staging
git add .

# Check what will be committed
git status
```

## Step 4: Create Initial Commit

```bash
git commit -m "Initial commit: F1 Snacks e-commerce platform"
```

## Step 5: Add GitHub Remote

Copy your repository URL from GitHub (it will look like: `https://github.com/yourusername/f1-snacks.git`)

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/f1-snacks.git

# Verify remote was added
git remote -v
```

## Step 6: Push to GitHub

```bash
# Push to main branch (or master if that's your default)
git branch -M main
git push -u origin main
```

If you're asked for credentials:
- Use your GitHub username
- Use a Personal Access Token (not password)
  - Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
  - Generate new token with `repo` scope

## Step 7: Verify on GitHub

1. Go to your repository on GitHub
2. Verify all files are there
3. Check that `.env` files are NOT visible (they're in .gitignore)

## Important Notes

### Before Pushing

**IMPORTANT**: The `.gitignore` file will exclude:
- ✅ `node_modules/` folders
- ✅ `.env` files (sensitive data)
- ✅ `backend/uploads/` folder
- ✅ Build outputs

**Make sure**:
- ✅ Your `.env` files are NOT committed
- ✅ No sensitive data (JWT_SECRET, ADMIN_KEY, MONGO_URI) is in the code
- ✅ Uploaded product images are in `.gitignore`

### Create .env.example Files (Recommended)

Create example env files for documentation:

```bash
# Backend
cd backend
cp .env .env.example
# Then edit .env.example and replace actual values with placeholders:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_here
# ADMIN_KEY=your_admin_key_here

# Frontend (if you have one)
cd ../frontend
# Create .env.example if needed
```

Then add `.env.example` files:

```bash
git add backend/.env.example
git commit -m "Add environment variable examples"
git push
```

## Troubleshooting

### If you get "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/f1-snacks.git
```

### If push is rejected

```bash
# Pull first (if repository was initialized with files)
git pull origin main --allow-unrelated-histories

# Then push again
git push -u origin main
```

### If you need to force push (careful!)

```bash
git push -u origin main --force
```

⚠️ **Only use force push if you're sure - it overwrites remote history**

### Check what files are tracked

```bash
git ls-files
```

### Remove files from git but keep locally

```bash
git rm --cached filename
```

## Next Steps for Render Deployment

After pushing to GitHub:

1. Go to [Render.com](https://render.com)
2. Sign up/Login
3. Create new Web Service
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - Add environment variables in Render dashboard
6. Deploy!

