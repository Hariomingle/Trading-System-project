// API Base URL
const API_BASE_URL = 'http://localhost:8081/trading';

// Global variables
let allTrades = [];
let currentEditingTrade = null;
let currentSection = 'dashboard';

// Enhanced stock data with more realistic information
const sampleStocks = [
    { symbol: 'RELIANCE', price: 2485.30, change: 12.45, changePercent: 0.50, volume: '2.1M', marketCap: '16.8L Cr' },
    { symbol: 'TCS', price: 3642.80, change: -25.10, changePercent: -0.68, volume: '1.8M', marketCap: '13.2L Cr' },
    { symbol: 'INFY', price: 1398.75, change: 8.25, changePercent: 0.59, volume: '2.5M', marketCap: '5.8L Cr' },
    { symbol: 'HDFC', price: 2756.90, change: 15.30, changePercent: 0.56, volume: '1.2M', marketCap: '15.1L Cr' },
    { symbol: 'ICICIBANK', price: 963.45, change: -5.20, changePercent: -0.54, volume: '3.1M', marketCap: '6.7L Cr' },
    { symbol: 'SBIN', price: 598.75, change: 3.85, changePercent: 0.65, volume: '4.2M', marketCap: '5.3L Cr' },
    { symbol: 'WIPRO', price: 432.10, change: -2.15, changePercent: -0.49, volume: '1.9M', marketCap: '2.4L Cr' },
    { symbol: 'MARUTI', price: 10245.60, change: 85.40, changePercent: 0.84, volume: '0.8M', marketCap: '3.1L Cr' },
    { symbol: 'HDFCBANK', price: 1654.20, change: 22.10, changePercent: 1.35, volume: '2.8M', marketCap: '9.1L Cr' },
    { symbol: 'BHARTIARTL', price: 892.30, change: -8.75, changePercent: -0.97, volume: '3.5M', marketCap: '4.9L Cr' }
];

// Market indices data
const marketIndices = [
    { name: 'NIFTY 50', value: 19745.25, change: 245.30, changePercent: 1.26 },
    { name: 'SENSEX', value: 66598.91, change: -123.45, changePercent: -0.18 },
    { name: 'NIFTY BANK', value: 44892.15, change: 312.80, changePercent: 0.70 },
    { name: 'VOLUME', value: 2.45, change: 0.37, changePercent: 15.2, unit: 'B' }
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
    updateMarketStats();
    populateStockSearch();
    updateQuickStats();
    showSection('dashboard');
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
            searchStock();
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
}

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelectorAll(`[onclick="showSection('${sectionName}')"]`).forEach(link => {
        link.classList.add('active');
    });
    
    currentSection = sectionName;
    
    // Load section-specific data
    switch(sectionName) {
        case 'portfolio':
            loadPortfolioData();
            break;
        case 'trades':
            loadTradesData();
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        case 'dashboard':
            updateDashboardData();
            break;
    }
    
    // Close mobile menu if open
    closeMobileMenu();
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('show');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('show');
}

// Handle window resize
function handleWindowResize() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

// Update market statistics
function updateMarketStats() {
    const marketStatsContainer = document.getElementById('marketStats');
    marketStatsContainer.innerHTML = '';
    
    marketIndices.forEach(index => {
        const isPositive = index.change >= 0;
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        
        statCard.innerHTML = `
            <div class="stat-icon ${isPositive ? 'green' : 'red'}">
                <i class="fas fa-${isPositive ? 'arrow-up' : 'arrow-down'}"></i>
            </div>
            <div class="stat-info">
                <h3>${index.name}</h3>
                <p class="stat-value">${index.value.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}${index.unit || ''}</p>
                <p class="stat-change ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '+' : ''}${index.change.toFixed(2)} (${isPositive ? '+' : ''}${index.changePercent.toFixed(2)}%)
                </p>
            </div>
        `;
        
        marketStatsContainer.appendChild(statCard);
    });
}

// Update quick stats
function updateQuickStats() {
    const totalInvestment = allTrades.reduce((sum, trade) => {
        return sum + (trade.stock_price * trade.stock_quantity);
    }, 0);
    
    const todaysPnL = calculateTodaysPnL();
    const successRate = calculateSuccessRate();
    
    document.getElementById('totalInvestment').textContent = 
        `₹${totalInvestment.toLocaleString('en-IN')}`;
    document.getElementById('todaysPnL').textContent = 
        `₹${todaysPnL.toLocaleString('en-IN')}`;
    document.getElementById('successRate').textContent = `${successRate}%`;
    
    // Update total balance
    const totalBalance = totalInvestment + todaysPnL;
    document.getElementById('totalBalance').textContent = 
        `₹${totalBalance.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
}

// Calculate today's P&L
function calculateTodaysPnL() {
    let totalPnL = 0;
    allTrades.forEach(trade => {
        const currentStock = sampleStocks.find(s => s.symbol === trade.stock_name);
        if (currentStock) {
            const pnl = (currentStock.price - trade.stock_price) * trade.stock_quantity;
            totalPnL += pnl;
        }
    });
    return totalPnL;
}

// Calculate success rate
function calculateSuccessRate() {
    if (allTrades.length === 0) return 0;
    
    let successfulTrades = 0;
    allTrades.forEach(trade => {
        const currentStock = sampleStocks.find(s => s.symbol === trade.stock_name);
        if (currentStock && currentStock.price > trade.stock_price) {
            successfulTrades++;
        }
    });
    
    return Math.round((successfulTrades / allTrades.length) * 100);
}

// Update dashboard data
function updateDashboardData() {
    updateMarketStats();
    updateQuickStats();
    populateStockSearch();
}

// Stock search functionality
function handleStockSearch(e) {
    const query = e.target.value.toLowerCase();
    displayStocks(query);
}

function searchStock() {
    const searchValue = document.getElementById('stockSearch').value.toUpperCase();
    const stock = sampleStocks.find(s => s.symbol === searchValue);
    
    if (stock) {
        selectStock(stock);
    } else {
        showMessage('Stock not found. Try: RELIANCE, TCS, INFY, HDFC, etc.', 'error');
    }
}

function displayStocks(query = '') {
    const stockDetails = document.getElementById('stockDetails');
    stockDetails.innerHTML = '';
    
    let stocksToShow = sampleStocks;
    if (query && query.length >= 1) {
        stocksToShow = sampleStocks.filter(stock => 
            stock.symbol.toLowerCase().includes(query)
        );
    } else {
        stocksToShow = sampleStocks.slice(0, 5); // Show top 5 by default
    }
    
    stocksToShow.forEach(stock => {
        const isPositive = stock.change >= 0;
        const stockItem = document.createElement('div');
        stockItem.className = 'stock-item';
        stockItem.style.cursor = 'pointer';
        
        stockItem.innerHTML = `
            <div class="stock-info">
                <span class="stock-name">${stock.symbol}</span>
                <span class="stock-volume">Vol: ${stock.volume}</span>
            </div>
            <div class="stock-pricing">
                <span class="stock-price">₹${stock.price.toFixed(2)}</span>
                <span class="stock-change ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '+' : ''}${stock.change.toFixed(2)} (${isPositive ? '+' : ''}${stock.changePercent.toFixed(2)}%)
                </span>
            </div>
        `;
        
        stockItem.addEventListener('click', () => selectStock(stock));
        stockDetails.appendChild(stockItem);
    });
}

function selectStock(stock) {
    document.getElementById('stockName').value = stock.symbol;
    document.getElementById('price').value = stock.price;
    document.getElementById('stockSearch').value = stock.symbol;
    
    // Update the display to show only selected stock
    displaySelectedStock(stock);
    showMessage(`Selected ${stock.symbol} at ₹${stock.price}`, 'success');
}

function displaySelectedStock(stock) {
    const stockDetails = document.getElementById('stockDetails');
    const isPositive = stock.change >= 0;
    
    stockDetails.innerHTML = `
        <div class="stock-item selected">
            <div class="stock-info">
                <span class="stock-name">${stock.symbol}</span>
                <span class="stock-volume">Vol: ${stock.volume} | MCap: ${stock.marketCap}</span>
            </div>
            <div class="stock-pricing">
                <span class="stock-price">₹${stock.price.toFixed(2)}</span>
                <span class="stock-change ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '+' : ''}${stock.change.toFixed(2)} (${isPositive ? '+' : ''}${stock.changePercent.toFixed(2)}%)
                </span>
            </div>
        </div>
    `;
}

// Populate initial stock search
function populateStockSearch() {
    displayStocks();
}

// Quick action functions
function addToWatchlist() {
    const stockName = document.getElementById('stockName').value;
    if (!stockName) {
        showMessage('Please select a stock first', 'error');
        return;
    }
    showMessage(`${stockName} added to watchlist`, 'success');
}

function setPriceAlert() {
    const stockName = document.getElementById('stockName').value;
    if (!stockName) {
        showMessage('Please select a stock first', 'error');
        return;
    }
    const alertPrice = prompt(`Set price alert for ${stockName}:`);
    if (alertPrice) {
        showMessage(`Price alert set for ${stockName} at ₹${alertPrice}`, 'success');
    }
}

// Trading form functionality
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tradeData)
            });
        } else {
            response = await fetch(`${API_BASE_URL}/addtradings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            updateQuickStats();
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
            updateQuickStats();
            if (currentSection === 'trades') {
                displayTrades();
            }
            if (currentSection === 'portfolio') {
                loadPortfolioData();
            }
            if (currentSection === 'analytics') {
                loadAnalyticsData();
            }
        }
    } catch (error) {
        console.error('Error loading trades:', error);
        showMessage('Error loading trades', 'error');
    }
}

// Portfolio section functions
function loadPortfolioData() {
    loadHoldings();
    loadActiveTrades();
}

function loadHoldings() {
    const holdingsList = document.getElementById('holdingsList');
    holdingsList.innerHTML = '';
    
    // Group trades by stock
    const holdings = {};
    allTrades.forEach(trade => {
        if (!holdings[trade.stock_name]) {
            holdings[trade.stock_name] = {
                symbol: trade.stock_name,
                quantity: 0,
                totalCost: 0
            };
        }
        holdings[trade.stock_name].quantity += trade.stock_quantity;
        holdings[trade.stock_name].totalCost += trade.stock_price * trade.stock_quantity;
    });
    
    Object.values(holdings).forEach(holding => {
        const currentStock = sampleStocks.find(s => s.symbol === holding.symbol);
        const currentValue = currentStock ? currentStock.price * holding.quantity : holding.totalCost;
        const pnl = currentValue - holding.totalCost;
        const pnlPercent = ((pnl / holding.totalCost) * 100).toFixed(2);
        
        const holdingItem = document.createElement('div');
        holdingItem.className = 'holding-item';
        
        holdingItem.innerHTML = `
            <div class="holding-info">
                <span class="holding-stock">${holding.symbol}</span>
                <span class="holding-quantity">${holding.quantity} shares</span>
            </div>
            <div class="holding-value">
                <span class="current-value">₹${currentValue.toLocaleString('en-IN')}</span>
                <span class="pnl ${pnl >= 0 ? 'positive' : 'negative'}">
                    ${pnl >= 0 ? '+' : ''}₹${Math.abs(pnl).toLocaleString('en-IN')} (${pnlPercent}%)
                </span>
            </div>
        `;
        
        holdingsList.appendChild(holdingItem);
    });
    
    if (Object.keys(holdings).length === 0) {
        holdingsList.innerHTML = '<p class="no-data">No holdings found. Start trading to see your portfolio.</p>';
    }
}

function loadActiveTrades() {
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
                <span class="trade-quantity">${trade.stock_quantity} shares @ ₹${trade.stock_price}</span>
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
    
    if (recentTrades.length === 0) {
        activeTradesList.innerHTML = '<p class="no-data">No active trades found.</p>';
    }
}

// Trades section functions
function loadTradesData() {
    displayTrades();
}

function displayTrades() {
    const tbody = document.getElementById('tradesTableBody');
    tbody.innerHTML = '';
    
    allTrades.forEach(trade => {
        const currentStock = sampleStocks.find(s => s.symbol === trade.stock_name);
        const status = currentStock && currentStock.price > trade.stock_price ? 'Profitable' : 'Loss';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trade.tid}</td>
            <td>${trade.customer_name}</td>
            <td>${trade.stock_name}</td>
            <td>${trade.stock_quantity}</td>
            <td>₹${trade.stock_price}</td>
            <td><span class="status ${status.toLowerCase()}">${status}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="editTrade(${trade.tid})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteTrade(${trade.tid})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    if (allTrades.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No trades found.</td></tr>';
    }
}

function filterTrades() {
    const filter = document.getElementById('tradeFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    // Filter logic would go here
    displayTrades(); // For now, just redisplay all trades
    showMessage(`Filtered trades by: ${filter}`, 'success');
}

function exportTrades() {
    showMessage('Trades exported successfully!', 'success');
}

// Analytics section functions
function loadAnalyticsData() {
    updatePerformanceMetrics();
    updateTopStocks();
}

function updatePerformanceMetrics() {
    const totalTrades = allTrades.length;
    const winningTrades = allTrades.filter(trade => {
        const currentStock = sampleStocks.find(s => s.symbol === trade.stock_name);
        return currentStock && currentStock.price > trade.stock_price;
    }).length;
    
    const totalProfit = calculateTodaysPnL();
    const avgProfit = totalTrades > 0 ? totalProfit / totalTrades : 0;
    const maxDrawdown = Math.abs(Math.min(0, totalProfit));
    
    document.getElementById('totalTrades').textContent = totalTrades;
    document.getElementById('winningTrades').textContent = winningTrades;
    document.getElementById('avgProfit').textContent = `₹${avgProfit.toFixed(2)}`;
    document.getElementById('maxDrawdown').textContent = `₹${maxDrawdown.toFixed(2)}`;
}

function updateTopStocks() {
    const topStocksContainer = document.getElementById('topStocks');
    topStocksContainer.innerHTML = '';
    
    // Get top performing stocks
    const topStocks = sampleStocks
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 5);
    
    topStocks.forEach((stock, index) => {
        const stockItem = document.createElement('div');
        stockItem.className = 'top-stock-item';
        
        stockItem.innerHTML = `
            <div class="stock-rank">${index + 1}</div>
            <div class="stock-info">
                <span class="stock-name">${stock.symbol}</span>
                <span class="stock-change ${stock.change >= 0 ? 'positive' : 'negative'}">
                    ${stock.change >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%
                </span>
            </div>
            <div class="stock-price">₹${stock.price.toFixed(2)}</div>
        `;
        
        topStocksContainer.appendChild(stockItem);
    });
}

// Trade management functions
async function editTrade(tid) {
    try {
        const response = await fetch(`${API_BASE_URL}/${tid}`);
        if (response.ok) {
            const trade = await response.json();
            populateFormWithTrade(trade);
            currentEditingTrade = tid;
            
            // Switch to dashboard and scroll to form
            showSection('dashboard');
            setTimeout(() => {
                document.querySelector('.trade-form').scrollIntoView({ behavior: 'smooth' });
            }, 300);
            showMessage('Trade loaded for editing', 'success');
        }
    } catch (error) {
        console.error('Error loading trade:', error);
        showMessage('Error loading trade for editing', 'error');
    }
}

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

// Real-time updates
function startRealTimeUpdates() {
    // Update stock prices every 5 seconds
    setInterval(() => {
        updateStockPrices();
        if (currentSection === 'dashboard') {
            updateMarketStats();
            updateQuickStats();
        }
    }, 5000);
    
    // Update portfolio every 30 seconds
    setInterval(() => {
        if (currentSection === 'portfolio') {
            loadPortfolioData();
        }
    }, 30000);
}

function updateStockPrices() {
    sampleStocks.forEach(stock => {
        // Simulate realistic price changes
        const changePercent = (Math.random() - 0.5) * 0.02; // ±1% max change
        const priceChange = stock.price * changePercent;
        stock.price = Math.max(stock.price + priceChange, 1); // Ensure price doesn't go negative
        stock.change += priceChange;
        stock.changePercent = (stock.change / (stock.price - stock.change)) * 100;
    });
    
    // Update market indices
    marketIndices.forEach(index => {
        if (index.name !== 'VOLUME') {
            const changePercent = (Math.random() - 0.5) * 0.01; // ±0.5% max change
            const valueChange = index.value * changePercent;
            index.value = Math.max(index.value + valueChange, 1);
            index.change += valueChange;
            index.changePercent = (index.change / (index.value - index.change)) * 100;
        }
    });
    
    // Update displays if on relevant sections
    if (currentSection === 'dashboard') {
        displayStocks(document.getElementById('stockSearch').value.toLowerCase());
    }
}

// Utility functions
function resetForm() {
    document.getElementById('tradingForm').reset();
    currentEditingTrade = null;
    displayStocks(); // Reset stock display
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
}

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

// Global function exports for HTML onclick handlers
window.showSection = showSection;
window.toggleMobileMenu = toggleMobileMenu;
window.searchStock = searchStock;
window.addToWatchlist = addToWatchlist;
window.setPriceAlert = setPriceAlert;
window.editTrade = editTrade;
window.deleteTrade = deleteTrade;
window.resetForm = resetForm;
window.filterTrades = filterTrades;
window.exportTrades = exportTrades; 