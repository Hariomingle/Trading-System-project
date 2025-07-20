# TradePro - Advanced Trading System

A modern, full-stack trading platform built with Spring Boot and vanilla JavaScript that provides a real trading experience.

## 🚀 Features

### Backend Features
- **RESTful API** with Spring Boot
- **H2 In-Memory Database** for development
- **JPA/Hibernate** for data persistence
- **Input Validation** with Bean Validation
- **Exception Handling** with global exception handlers
- **CORS Support** for frontend integration

### Frontend Features
- **Modern UI/UX** with responsive design
- **Real-time Stock Prices** (simulated)
- **Interactive Trading Dashboard**
- **Portfolio Management**
- **Trade History & Analytics**
- **Market Overview** with live stats
- **Mobile-Friendly** responsive design

## 🛠️ Tech Stack

- **Backend**: Spring Boot 3.x, Java 17+, H2 Database, JPA/Hibernate
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Font Awesome, Google Fonts
- **Build Tool**: Maven
- **Server**: Embedded Tomcat

## 📦 Installation & Setup

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Any modern web browser

### Steps to Run

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Trading-System-project/Trading-System
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**
   - **Frontend Dashboard**: http://localhost:8081
   - **H2 Database Console**: http://localhost:8081/h2-console
     - JDBC URL: `jdbc:h2:mem:testdb`
     - Username: `sa`
     - Password: `password`

## 🎯 Usage

### Trading Dashboard
1. **Market Overview**: View live market statistics for NIFTY 50, SENSEX, and trading volume
2. **Stock Search**: Search for stocks by symbol (RELIANCE, TCS, INFY, etc.)
3. **Place Orders**: Fill out the comprehensive trading form with customer and trade details
4. **Portfolio Management**: View active trades and their real-time P&L
5. **Trade History**: View all trades in a searchable table with edit/delete options

### Key Features in Action
- **Real-time Updates**: Stock prices update every 5 seconds
- **Interactive Forms**: Auto-populate stock prices when selecting from search
- **CRUD Operations**: Create, Read, Update, Delete trades
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/trading/all` | Get all trades |
| GET | `/trading/show` | Get all trades (alternative) |
| GET | `/trading/{id}` | Get trade by ID |
| POST | `/trading/addtradings` | Create new trade |
| PUT | `/trading/update/{id}` | Update existing trade |
| DELETE | `/trading/delete/{id}` | Delete trade |

## 📊 Sample Data

The application comes with pre-loaded demo data including:
- 3 sample trades from different customers
- Popular Indian stocks (RELIANCE, TCS, INFY, HDFC, etc.)
- Realistic customer addresses and trading information

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with gradients and shadows
- **Color-coded Elements**: Green for gains, red for losses
- **Loading States**: Smooth loading animations during API calls
- **Success/Error Messages**: Toast notifications for user feedback
- **Responsive Layout**: Optimized for all screen sizes

## 🔐 Security Features

- **Input Validation**: Server-side validation for all form fields
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Handling**: Graceful error handling with user-friendly messages

## 📱 Mobile Experience

The application is fully responsive and provides an excellent mobile trading experience with:
- Touch-friendly buttons and forms
- Optimized layouts for small screens
- Fast loading and smooth animations

## 🚀 Future Enhancements

- Real stock market API integration
- User authentication and authorization
- Advanced charting and technical analysis
- Push notifications for price alerts
- Multi-language support
- Dark/Light theme toggle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Trading! 📈💰** 