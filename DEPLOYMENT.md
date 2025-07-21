# 🚀 Trading System - Live Deployment Guide

## Option 1: Railway (Recommended - FREE & Easy)

### Steps:
1. **Visit**: https://railway.app
2. **Sign up** with your GitHub account
3. **Click "Deploy from GitHub repo"**
4. **Select your repository**: `Hariomingle/Trading-System-project`
5. **Set root directory**: `Trading-System`
6. **Deploy automatically!**

### ✅ Benefits:
- ✅ **FREE** up to 500 hours/month
- ✅ **Automatic HTTPS**
- ✅ **Custom domain support**
- ✅ **Auto-deploys on git push**
- ✅ **Built-in monitoring**

---

## Option 2: Heroku (Easy but Paid)

### Steps:
1. **Visit**: https://heroku.com
2. **Create new app**
3. **Connect to GitHub**
4. **Select repository and branch**
5. **Deploy**

### Cost: ~$7/month

---

## Option 3: Render (FREE Tier Available)

### Steps:
1. **Visit**: https://render.com
2. **Sign up with GitHub**
3. **Create Web Service**
4. **Connect repository**
5. **Set build command**: `cd Trading-System && mvn clean package -DskipTests`
6. **Set start command**: `cd Trading-System && java -jar target/trading-0.0.1-SNAPSHOT.jar`

---

## Option 4: AWS/DigitalOcean (Advanced)

For production-grade deployment with custom server setup.

---

## 🔧 Pre-Deployment Checklist

✅ **Files Added:**
- `railway.json` - Railway configuration
- `Procfile` - Process definition
- `DEPLOYMENT.md` - This guide
- Updated `application.properties` for dynamic port

✅ **Ready to Deploy!**

---

## 📱 After Deployment

Your app will be live at:
- Railway: `https://your-app-name.railway.app`
- Heroku: `https://your-app-name.herokuapp.com`
- Render: `https://your-app-name.onrender.com`

### Test URLs:
- **Main App**: `https://your-domain.com`
- **API Test**: `https://your-domain.com/trading/all`
- **H2 Console**: `https://your-domain.com/h2-console`

---

## 🎯 Recommended: Railway

**Railway is the easiest and most cost-effective option for your Spring Boot app!**

1. Free tier with generous limits
2. Automatic deployments
3. Built-in HTTPS
4. Easy custom domains
5. Great for learning and production

---

## 🆘 Need Help?

If you encounter any issues during deployment, the common solutions are:
1. Ensure Java 17+ is specified in deployment settings
2. Check that the build command completes successfully
3. Verify the start command points to the correct JAR file
4. Make sure environment variables are set correctly 