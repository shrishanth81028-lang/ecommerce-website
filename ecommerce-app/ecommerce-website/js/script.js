// ===== CURRENCY CONFIGURATION =====
const CURRENCY = {
    symbol: "₹",
    name: "INR",
    decimals: 2
};

// Sample product data
const products = [
    { id: 1, name: "Wireless Headphones", price: 100.00, image: "images/wireless-headphone.jpg", description: "High-quality sound" },
    { id: 2, name: "Smart Watch", price: 199.99, image: "images/smartwatch.jpg", description: "Track your fitness" },
    { id: 3, name: "Laptop", price: 999.99, image: "images/laptop.jpg", description: "Powerful performance" },
    { id: 4, name: "Camera", price: 549.99, image: "images/camera.jpg", description: "Capture memories" },
    { id: 5, name: "Smartphone", price: 699.99, image: "images/smartphone.jpg", description: "Latest technology" },
    { id: 6, name: "Tablet", price: 399.99, image: "images/tablet.jpg", description: "Portable computing" },
    { id: 7, name: "Gaming Console", price: 499.99, image: "images/gaming-console.jpg", description: "Ultimate gaming" },
    { id: 8, name: "Bluetooth Speaker", price: 89.99, image: "images/bluetooth-speaker.jpg", description: "Portable audio" }
];

let cart = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupEventListeners();
});

    // Display products
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto;">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${CURRENCY.symbol}${product.price.toFixed(CURRENCY.decimals)}</div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}


// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showNotification('Item added to cart!');
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show cart modal
function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ${CURRENCY.symbol}${item.price.toFixed(CURRENCY.decimals)} x ${item.quantity}
                </div>
                <div>
                    <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `).join('');
    }
    
    updateCartTotal();
    modal.style.display = 'block';
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = total.toFixed(CURRENCY.decimals);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart();
}

// ===== PAYMENT GATEWAY INTEGRATION =====

// Checkout with Payment Options
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Hide cart modal
    document.getElementById('cartModal').style.display = 'none';
    
    // Show payment options modal
    showPaymentOptions();
}

// Show Payment Options Modal
function showPaymentOptions() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const paymentModal = document.createElement('div');
    paymentModal.id = 'paymentModal';
    paymentModal.className = 'modal';
    paymentModal.style.display = 'block';
    
    paymentModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closePaymentModal()">&times;</span>
            <h2>Select Payment Method</h2>
            <div style="margin: 2rem 0;">
                <h3>Total Amount: ${CURRENCY.symbol}${total.toFixed(CURRENCY.decimals)}</h3>
            </div>
            <div class="payment-options">
                <button class="payment-btn" onclick="payWithUPI()">
                    <span style="font-size: 2rem;">📱</span><br>
                    Pay with UPI
                </button>
                <button class="payment-btn" onclick="payWithCard()">
                    <span style="font-size: 2rem;">💳</span><br>
                    Pay with Card
                </button>
                <button class="payment-btn" onclick="payWithCOD()">
                    <span style="font-size: 2rem;">💵</span><br>
                    Cash on Delivery
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(paymentModal);
}

// Close Payment Modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.remove();
    }
}

// Pay with UPI
function payWithUPI() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // For demo purposes - In production, integrate with Razorpay/Cashfree
    const upiId = prompt('Enter your UPI ID (e.g., yourname@paytm):');
    
    if (upiId && upiId.includes('@')) {
        alert(`Payment request sent to ${upiId}\nAmount: ${CURRENCY.symbol}${total.toFixed(CURRENCY.decimals)}\n\nIn production, this would integrate with a real payment gateway.`);
        completeOrder('UPI');
    } else {
        alert('Invalid UPI ID. Please try again.');
    }
}

// Pay with Card
function payWithCard() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // For demo purposes - In production, integrate with Razorpay/Cashfree
    alert(`Redirecting to secure card payment gateway...\nAmount: ${CURRENCY.symbol}${total.toFixed(CURRENCY.decimals)}\n\nIn production, this would open the payment gateway.`);
    
    // Simulate payment success
    setTimeout(() => {
        completeOrder('Card');
    }, 1000);
}

// Pay with Cash on Delivery
function payWithCOD() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const confirm = window.confirm(`Confirm Cash on Delivery?\nAmount to pay: ${CURRENCY.symbol}${total.toFixed(CURRENCY.decimals)}`);
    
    if (confirm) {
        completeOrder('Cash on Delivery');
    }
}

// Complete Order
function completeOrder(paymentMethod) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    alert(`✅ Order Placed Successfully!\n\nPayment Method: ${paymentMethod}\nTotal: ${CURRENCY.symbol}${total.toFixed(CURRENCY.decimals)}\n\nThank you for shopping with us!`);
    
    // Clear cart
    cart = [];
    updateCartCount();
    closePaymentModal();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Setup event listeners
function setupEventListeners() {
    document.querySelector('.cart-icon').addEventListener('click', showCart);
    
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('cartModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .payment-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .payment-btn {
        background: white;
        border: 2px solid #3498db;
        padding: 2rem 1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 1rem;
        font-weight: bold;
        color: #2c3e50;
    }
    
    .payment-btn:hover {
        background: #3498db;
        color: white;
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
    }
`;
document.head.appendChild(style);
// Store address in memory
let userAddress = null;

// Show Address Modal
function showAddressModal() {
    const modal = document.getElementById('addressModal');
    modal.style.display = 'block';
}

// Close Address Modal
function closeAddressModal() {
    const modal = document.getElementById('addressModal');
    modal.style.display = 'none';
}

// Submit Address
function submitAddress() {
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    const phone = document.getElementById('phone').value;

    userAddress = {
        fullName,
        address,
        city,
        state,
        pincode,
        phone
    };

    alert('Address saved successfully!');
    closeAddressModal();
    showNotification('Address saved successfully!');
}

// Show address in cart modal (optional)
function showAddressInCart() {
    if (!userAddress) {
        alert('Please enter your address first.');
        return;
    }

    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');

    const addressSection = document.createElement('div');
    addressSection.innerHTML = `
        <h3>Shipping Address</h3>
        <p><strong>${userAddress.fullName}</strong></p>
        <p>${userAddress.address}, ${userAddress.city}, ${userAddress.state} - ${userAddress.pincode}</p>
        <p>📞 ${userAddress.phone}</p>
    `;

    cartItems.prepend(addressSection);
}
// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Hide cart modal
    document.getElementById('cartModal').style.display = 'none';

    // Show payment options modal
    showPaymentOptions();

    // Show address in cart modal
    showAddressInCart();
    // Display products
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto;">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${CURRENCY.symbol}${product.price.toFixed(CURRENCY.decimals)}</div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}
}
// ===== USER AUTHENTICATION SYSTEM =====

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
    displayProducts();
    setupEventListeners();
});

// Check User Login Status
function checkUserLogin() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        displayLoggedInUser(user);
    }
}

// Display Logged In User
function displayLoggedInUser(user) {
    const userSection = document.getElementById('userSection');
    userSection.innerHTML = `
        <div class="dropdown user-profile">
            <span>👤 ${user.name}</span>
            <div class="dropdown-content">
                <a href="#" onclick="viewProfile()">My Profile</a>
                <a href="#" onclick="viewOrders()">My Orders</a>
                <a href="#" onclick="logout()">Logout</a>
            </div>
        </div>
    `;
}

// Show Auth Modal
function showAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'block';
    showLogin();
}

// Close Auth Modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
}

// Show Login Form
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.classList.add('active');
    tabs [1].classList.remove('active');
}

// Show Signup Form
function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.classList.remove('active');
    tabs [1].classList.add('active');
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Display logged in user
        displayLoggedInUser(user);
        
        // Close modal
        closeAuthModal();
        
        // Show success message
        showNotification('Login successful! Welcome back, ' + user.name);
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const phone = document.getElementById('signupPhone').value;
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('Email already registered. Please login instead.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        phone,
        createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Display logged in user
    displayLoggedInUser(newUser);
    
    // Close modal
    closeAuthModal();
    
    // Show success message
    showNotification('Account created successfully! Welcome, ' + name);
    
    // Reset form
    document.getElementById('signupForm').reset();
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    
    const userSection = document.getElementById('userSection');
    userSection.innerHTML = '<button class="btn-login" onclick="showAuthModal()">Login</button>';
    
    showNotification('Logged out successfully!');
}

// View Profile
function viewProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        alert(`Profile Information:\n\nName: ${currentUser.name}\nEmail: ${currentUser.email}\nPhone: ${currentUser.phone}`);
    }
}

// View Orders
function viewOrders() {
    alert('Order history feature coming soon!');
}

// Forgot Password
function forgotPassword() {
    const email = prompt('Enter your registered email:');
    
    if (email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);
        
        if (user) {
            alert(`Password reset link sent to ${email}\n\n(Demo: Your password is "${user.password}")`);
        } else {
            alert('Email not found. Please sign up first.');
        }
    }
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    const authModal = document.getElementById('authModal');
    if (e.target === authModal) {
        closeAuthModal();
    }
});