# 🚀 Deployment Guide

This guide will help you deploy the Meal Calorie Count Generator to various platforms.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Node.js 18+ (for local testing)

## 🌐 Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository**

   ```bash
   # Rename your local folder to match the submission requirements
   mv meal-calorie-count-generator meal-calorie-frontend-{your-name}
   ```

2. **Initialize Git and push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Meal Calorie Count Generator"
   git branch -M main
   git remote add origin https://github.com/{your-username}/meal-calorie-frontend-{your-name}.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Visit [Vercel](https://vercel.com)**

   - Sign up/login with your GitHub account
   - Click "New Project"

2. **Import your repository**

   - Select your `meal-calorie-frontend-{your-name}` repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure environment variables**

   - In the project settings, go to "Environment Variables"
   - Add the following:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://flybackend-misty-feather-6458.fly.dev
     NEXT_PUBLIC_APP_NAME=Meal Calorie Count Generator
     NEXT_PUBLIC_APP_DESCRIPTION=Calculate calories for your meals using USDA data
     ```

4. **Deploy**

   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

5. **Get your deployment URL**
   - Vercel will provide a URL like: `https://meal-calorie-frontend-your-name.vercel.app`
   - Copy this URL for your submission

### Step 3: Update README.md

1. **Add screenshots**

   - Take screenshots of your deployed application
   - Update the README.md with actual screenshot links

2. **Add live demo link**
   - Replace the placeholder in README.md with your Vercel URL

## 🔧 Alternative Deployment Options

### Netlify Deployment

1. **Sign up for [Netlify](https://netlify.com)**
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/.next`
4. **Add environment variables** (same as Vercel)
5. **Deploy**

### Railway Deployment

1. **Sign up for [Railway](https://railway.app)**
2. **Connect your GitHub repository**
3. **Configure the project**:
   - Set root directory to `frontend`
   - Add environment variables
4. **Deploy**

## 📸 Taking Screenshots

### Required Screenshots

1. **Landing Page** - Show the main homepage with features
2. **Login Page** - Show the authentication form
3. **Dashboard** - Show the calorie calculator and meal history
4. **Mobile View** - Show responsive design on mobile

### Screenshot Tips

- Use browser dev tools to capture mobile views
- Ensure good lighting and clear text
- Include the URL bar to show it's live
- Take screenshots at 1920x1080 resolution

## 🔗 Final Submission Checklist

- [ ] GitHub repository created: `meal-calorie-frontend-{your-name}`
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel (or alternative)
- [ ] Environment variables configured
- [ ] Screenshots taken and added to README.md
- [ ] Live demo link added to README.md
- [ ] README.md includes setup instructions
- [ ] README.md includes decisions and trade-offs
- [ ] `.env.example` file with `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`

## 🐛 Troubleshooting

### Common Issues

1. **Build fails on Vercel**

   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes locally
   - Check environment variables are set correctly

2. **API calls fail**

   - Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly
   - Check CORS settings on the external API
   - Test API endpoints manually

3. **Styling issues**
   - Ensure Tailwind CSS is properly configured
   - Check that all CSS imports are correct

### Getting Help

- Check Vercel deployment logs for specific errors
- Test locally with `npm run build` before deploying
- Verify all environment variables are set correctly

## 🎉 Success!

Once deployed, your application will be available at your Vercel URL. Share this URL along with your GitHub repository link for submission.
