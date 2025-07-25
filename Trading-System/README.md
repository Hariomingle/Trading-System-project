# 🚀 **TradePro - Advanced Trading System**

> **Live Demo**: [View Application](https://your-app-name.up.railway.app) *(Will be updated after deployment)*

A modern, full-stack trading platform built with **Spring Boot** and **vanilla JavaScript** that provides a realistic trading experience with real-time market simulation.

![Trading System Demo](https://via.placeholder.com/800x400/1f2937/ffffff?text=TradePro+Trading+Dashboard)

## ✨ **Features**

### 🎯 **Core Trading Features**
- 📊 **Real-time Market Data** - Live price updates every 5 seconds
- 💼 **Portfolio Management** - Track your investments and P&L
- 📈 **Interactive Trading Dashboard** - Modern, responsive UI
- 🔄 **Complete CRUD Operations** - Create, view, edit, delete trades
- 📱 **Mobile-Friendly** - Works perfectly on all devices

### 🛠️ **Technical Features**
- ⚡ **Spring Boot 3.x** backend with REST APIs
- 🗄️ **H2 In-Memory Database** for quick setup
- 🎨 **Modern UI/UX** with responsive design
- 🔒 **Input Validation** and error handling
- 🌐 **CORS Support** for cross-origin requests

## 🎮 **Live Demo**

**Try it now**: [https://your-app-name.up.railway.app](https://your-app-name.up.railway.app)

- **No signup required** - Start trading immediately
- **Sample data included** - Pre-loaded with demo trades
- **Real-time simulation** - Watch prices change live

## 🚀 **Quick Start (Local Development)**

### Prerequisites
- **Java 17+** 
- **Maven 3.6+**
- Any modern web browser

### 1️⃣ Clone & Run
```bash
git clone https://github.com/Hariomingle/Trading-System-project.git
cd Trading-System-project/Trading-System
./mvnw spring-boot:run
```

### 2️⃣ Access Application
- **Main App**: http://localhost:8081
- **Database**: http://localhost:8081/h2-console
  - URL: `jdbc:h2:mem:testdb`
  - User: `sa` | Password: `password`

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │────│   Spring Boot    │────│   H2 Database   │
│   (HTML/JS/CSS) │    │   (REST APIs)    │    │   (In-Memory)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📊 **API Documentation**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/trading/all` | Get all trades |
| `GET` | `/trading/{id}` | Get trade by ID |
| `POST` | `/trading/addtradings` | Create new trade |
| `PUT` | `/trading/update/{id}` | Update trade |
| `DELETE` | `/trading/delete/{id}` | Delete trade |

## 🖼️ **Screenshots**

### 📈 Dashboard
- Modern trading interface with live market data
- Portfolio overview with real-time P&L calculations

### 📊 Trade Management
- Comprehensive trading forms with validation
- Historical trade data with search and filters

### 📱 Mobile Experience
- Fully responsive design optimized for mobile trading
- Touch-friendly interface with smooth animations

## 🛠️ **Tech Stack**

### Backend
- **Spring Boot 3.x** - Main framework
- **Java 17** - Programming language
- **H2 Database** - In-memory database
- **JPA/Hibernate** - Data persistence
- **Maven** - Build tool

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern features
- **Vanilla JavaScript** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 🚀 **Deployment Options**

### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway link
railway up
```

### Option 2: Render
1. Connect your GitHub repository
2. Set build command: `./mvnw clean install`
3. Set start command: `java -jar target/trading-*.jar`

### Option 3: Local Docker
```bash
docker build -t trading-system .
docker run -p 8081:8081 trading-system
```

## 🎯 **Sample Data**

The application includes:
- **3 Demo Trades** - Sample trading data
- **Popular Indian Stocks** - RELIANCE, TCS, INFY, HDFC
- **Realistic Market Data** - Simulated price movements

## 🤝 **Contributing**

We love contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 🐛 **Found a Bug?**
[Create an issue](https://github.com/Hariomingle/Trading-System-project/issues/new) with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🌟 **Show Your Support**

If you found this project helpful:
- ⭐ **Star** this repository
- 🍴 **Fork** it for your own projects
- 📢 **Share** it with others
- 🐛 **Report** any issues you find

## 📞 **Contact & Support**

- **GitHub Issues**: [Report bugs or request features](https://github.com/Hariomingle/Trading-System-project/issues)
- **Discussions**: [Join community discussions](https://github.com/Hariomingle/Trading-System-project/discussions)

## 🏷️ **Version History**

- **v1.0.0** - Initial release with core trading features
- **v1.1.0** - Added mobile responsiveness and UI improvements
- **v1.2.0** - Enhanced portfolio management and analytics

---

<div align="center">

**⭐ Star this repo if you found it helpful! ⭐**

**Built with ❤️ for the trading community**

[🚀 **Try Live Demo**](https://your-app-name.up.railway.app) | [📚 **Documentation**](https://github.com/Hariomingle/Trading-System-project/wiki) | [🐛 **Report Issues**](https://github.com/Hariomingle/Trading-System-project/issues)

</div> 