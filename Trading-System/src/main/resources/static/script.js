// API Base URL
const API_BASE_URL = 'http://localhost:8081/trading';

// Global variables
let allTrades = [];
let currentEditingTrade = null;

// Sample stock data for demo
const sampleStocks = [
    { symbol: 'RELIANCE', price: 2485.30, change: 12.45, changePercent: 0.50 },
    { symbol: 'TCS', price: 3642.80, change: -25.10, changePercent: -0.68 },
    { symbol: 'INFY', price: 1398.75, change: 8.25, changePercent: 0.59 },
    { symbol: 'HDFC', price: 2756.90, change: 15.30, changePercent: 0.56 },
    { symbol: 'ICICIBANK', price: 963.45, change: -5.20, changePercent: -0.54 },
    { symbol: 'SBIN', price: 598.75, change: 3.85, changePercent: 0.65 },
    { symbol: 'WIPRO', price: 432.10, change: -2.15, changePercent: -0.49 },
    { symbol: 'MARUTI', price: 10245.60, change: 85.40, changePercent: 0.84 }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadAllTrades();
    startRealTimeUpdates();
    setupEventListeners();
});

// Initialize application
function initializeApp() {
    updateStockPrices();
    updateMarketStats();
    populateStockSearch();
}

// Setup event listeners
function setupEventListeners() {
    // Trading form submission
    document.getElementById('tradingForm').addEventListener('submit', handleTradeSubmission);
    
    // Stock search
    document.getElementById('stockSearch').addEventListener('input', handleStockSearch);
    document.getElementById('stockSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            selectStockFromSearch();
        }
    });
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
}

// Handle navigation
function handleNavigation(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    e.target.classList.add('active');
    
    const section = e.target.getAttribute('href').substring(1);
    scrollToSection(section);
}

// Scroll to section
function scrollToSection(sectionId) {
    const element = document.querySelector(`.${sectionId}-section`) || document.querySelector(`.${sectionId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle trade form submission
async function handleTradeSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const tradeData = {
        customer_name: formData.get('customerName'),
        stock_name: formData.get('stockName').toUpperCase(),
        stock_quantity: parseInt(formData.get('quantity')),
        stock_price: parseInt(parseFloat(formData.get('price'))),
        stop_loss_price: parseInt(parseFloat(formData.get('stopLoss'))),
        bank_account_number: parseInt(formData.get('bankAccount')),
        trading_account_number: parseInt(formData.get('tradingAccount')),
        pan: parseInt(formData.get('pan')),
        aadhar: parseInt(formData.get('aadhar')),
        phone_number: parseInt(formData.get('phone')),
        notes: formData.get('notes'),
        ca: {
            house_no: formData.get('houseNo'),
            street: formData.get('street'),
            landmark: formData.get('landmark'),
            city: formData.get('city'),
            state: formData.get('state'),
            pin: formData.get('pin')
        }
    };
    
    try {
        showLoading(true);
        
        let response;
        if (currentEditingTrade) {
            response = await fetch(`${API_BASE_URL}/update/${currentEditingTrade}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tradeData)
            });
        } else {
            response = await fetch(`${API_BASE_URL}/addtradings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tradeData)
            });
        }
        
        if (response.ok) {
            const result = await response.json();
            showMessage(
                currentEditingTrade ? 'Trade updated successfully!' : 'Trade placed successfully!',
                'success'
            );
            resetForm();
            loadAllTrades();
            currentEditingTrade = null;
        } else {
            throw new Error('Failed to process trade');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error processing trade. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Load all trades
async function loadAllTrades() {
    try {
        const response = await fetch(`${API_BASE_URL}/all`);
        if (response.ok) {
            allTrades = await response.json();
            displayTrades();
            updatePortfolioStats();
        }
    } catch (error) {
        console.error('Error loading trades:', error);
        showMessage('Error loading trades', 'error');
    }
}

// Display trades in table
function displayTrades() {
    const tbody = document.getElementById('tradesTableBody');
    tbody.innerHTML = '';
    
    allTrades.forEach(trade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trade.tid}</td>
            <td>${trade.customer_name}</td>
            <td>${trade.stock_name}</td>
            <td>${trade.stock_quantity}</td>
            <td>₹${trade.stock_price}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editTrade(${trade.tid})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn delete-btn" onclick="deleteTrade(${trade.tid})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Edit trade
async function editTrade(tid) {
    try {
        const response = await fetch(`${API_BASE_URL}/${tid}`);
        if (response.ok) {
            const trade = await response.json();
            populateFormWithTrade(trade);
            currentEditingTrade = tid;
            
            // Scroll to form
            document.querySelector('.trade-form').scrollIntoView({ behavior: 'smooth' });
            showMessage('Trade loaded for editing', 'success');
        }
    } catch (error) {
        console.error('Error loading trade:', error);
        showMessage('Error loading trade for editing', 'error');
    }
}

// Populate form with trade data
function populateFormWithTrade(trade) {
    document.getElementById('customerName').value = trade.customer_name;
    document.getElementById('stockName').value = trade.stock_name;
    document.getElementById('quantity').value = trade.stock_quantity;
    document.getElementById('price').value = trade.stock_price;
    document.getElementById('stopLoss').value = trade.stop_loss_price;
    document.getElementById('bankAccount').value = trade.bank_account_number;
    document.getElementById('tradingAccount').value = trade.trading_account_number;
    document.getElementById('pan').value = trade.pan;
    document.getElementById('aadhar').value = trade.aadhar;
    document.getElementById('phone').value = trade.phone_number;
    document.getElementById('notes').value = trade.notes;
    
    if (trade.ca) {
        document.getElementById('houseNo').value = trade.ca.house_no;
        document.getElementById('street').value = trade.ca.street;
        document.getElementById('landmark').value = trade.ca.landmark;
        document.getElementById('city').value = trade.ca.city;
        document.getElementById('state').value = trade.ca.state;
        document.getElementById('pin').value = trade.ca.pin;
    }
}

// Delete trade
async function deleteTrade(tid) {
    if (!confirm('Are you sure you want to delete this trade?')) {
        return;
    }
    
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/delete/${tid}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Trade deleted successfully!', 'success');
            loadAllTrades();
        } else {
            throw new Error('Failed to delete trade');
        }
    } catch (error) {
        console.error('Error deleting trade:', error);
        showMessage('Error deleting trade', 'error');
    } finally {
        showLoading(false);
    }
}

// Handle stock search
function handleStockSearch(e) {
    const query = e.target.value.toLowerCase();
    const stockDetails = document.getElementById('stockDetails');
    
    if (query.length < 2) {
        displayDefaultStocks();
        return;
    }
    
    const filteredStocks = sampleStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(query)
    );
    
    displayStocks(filteredStocks);
}

// Select stock from search
function selectStockFromSearch() {
    const searchValue = document.getElementById('stockSearch').value.toUpperCase();
    const stock = sampleStocks.find(s => s.symbol === searchValue);
    
    if (stock) {
        document.getElementById('stockName').value = stock.symbol;
        document.getElementById('price').value = stock.price;
        showMessage(`Selected ${stock.symbol} at ₹${stock.price}`, 'success');
    } else {
        showMessage('Stock not found', 'error');
    }
}

// Display stocks
function displayStocks(stocks) {
    const stockDetails = document.getElementById('stockDetails');
    stockDetails.innerHTML = '';
    
    stocks.forEach(stock => {
        const stockItem = document.createElement('div');
        stockItem.className = 'stock-item';
        stockItem.style.cursor = 'pointer';
        stockItem.innerHTML = `
            <span class="stock-name">${stock.symbol}</span>
            <span class="stock-price">₹${stock.price.toFixed(2)}</span>
            <span class="stock-change ${stock.change >= 0 ? 'positive' : 'negative'}">
                ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)
            </span>
        `;
        
        stockItem.addEventListener('click', () => {
            document.getElementById('stockName').value = stock.symbol;
            document.getElementById('price').value = stock.price;
            document.getElementById('stockSearch').value = stock.symbol;
            showMessage(`Selected ${stock.symbol} at ₹${stock.price}`, 'success');
        });
        
        stockDetails.appendChild(stockItem);
    });
}

// Display default stocks
function displayDefaultStocks() {
    displayStocks(sampleStocks.slice(0, 3));
}

// Populate stock search
function populateStockSearch() {
    displayDefaultStocks();
}

// Update stock prices (simulate real-time)
function updateStockPrices() {
    sampleStocks.forEach(stock => {
        // Simulate price changes
        const changePercent = (Math.random() - 0.5) * 0.02; // ±1% max change
        const priceChange = stock.price * changePercent;
        stock.price += priceChange;
        stock.change += priceChange;
        stock.changePercent = (stock.change / (stock.price - stock.change)) * 100;
    });
    
    displayDefaultStocks();
}

// Update market stats
function updateMarketStats() {
    // Simulate market data updates
    const niftyElement = document.querySelector('.stat-card:first-child .stat-value');
    const sensexElement = document.querySelector('.stat-card:nth-child(2) .stat-value');
    
    if (niftyElement && sensexElement) {
        const niftyChange = (Math.random() - 0.5) * 100;
        const sensexChange = (Math.random() - 0.5) * 500;
        
        const currentNifty = parseFloat(niftyElement.textContent.replace(',', ''));
        const currentSensex = parseFloat(sensexElement.textContent.replace(',', ''));
        
        niftyElement.textContent = (currentNifty + niftyChange).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        sensexElement.textContent = (currentSensex + sensexChange).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

// Update portfolio stats
function updatePortfolioStats() {
    // Calculate total portfolio value
    const totalValue = allTrades.reduce((sum, trade) => {
        return sum + (trade.stock_price * trade.stock_quantity);
    }, 0);
    
    // Update balance display
    const balanceElement = document.getElementById('totalBalance');
    if (balanceElement) {
        balanceElement.textContent = `₹${totalValue.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }
    
    // Update active trades display
    updateActiveTrades();
}

// Update active trades
function updateActiveTrades() {
    const activeTradesList = document.getElementById('activeTradesList');
    activeTradesList.innerHTML = '';
    
    // Show recent trades as "active"
    const recentTrades = allTrades.slice(-5);
    
    recentTrades.forEach(trade => {
        const currentStock = sampleStocks.find(s => s.symbol === trade.stock_name);
        const currentPrice = currentStock ? currentStock.price : trade.stock_price;
        const pnl = (currentPrice - trade.stock_price) * trade.stock_quantity;
        
        const tradeItem = document.createElement('div');
        tradeItem.className = 'trade-item';
        tradeItem.innerHTML = `
            <div class="trade-info">
                <span class="trade-stock">${trade.stock_name}</span>
                <span class="trade-quantity">${trade.stock_quantity} shares</span>
            </div>
            <div class="trade-price">
                <span class="current-price">₹${currentPrice.toFixed(2)}</span>
                <span class="pnl ${pnl >= 0 ? 'positive' : 'negative'}">
                    ${pnl >= 0 ? '+' : ''}₹${Math.abs(pnl).toFixed(2)}
                </span>
            </div>
        `;
        activeTradesList.appendChild(tradeItem);
    });
}

// Start real-time updates
function startRealTimeUpdates() {
    // Update stock prices every 5 seconds
    setInterval(updateStockPrices, 5000);
    
    // Update market stats every 10 seconds
    setInterval(updateMarketStats, 10000);
    
    // Update portfolio every 30 seconds
    setInterval(updatePortfolioStats, 30000);
}

// Reset form
function resetForm() {
    document.getElementById('tradingForm').reset();
    currentEditingTrade = null;
}

// Show loading overlay
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
}

// Show message
function showMessage(text, type = 'success') {
    const container = document.getElementById('messageContainer');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    message.innerHTML = `
        <i class="${icon}"></i>
        <span>${text}</span>
    `;
    
    container.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 5000);
}

// Utility functions
window.editTrade = editTrade;
window.deleteTrade = deleteTrade;
window.resetForm = resetForm; 