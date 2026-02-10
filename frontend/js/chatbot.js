// Chatbot functionality
const chatbotButton = document.getElementById('chatbot-button');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

// Toggle chatbot
function toggleChatbot() {
  chatbotWindow.classList.toggle('active');
  if (chatbotWindow.classList.contains('active')) {
    chatbotInput.focus();
  }
}

chatbotButton.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);

// Send message
function sendMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, 'user');
  chatbotInput.value = '';

  // Show typing indicator
  showTyping();

  // Get bot response
  setTimeout(() => {
    hideTyping();
    const response = getBotResponse(message.toLowerCase());
    addMessage(response, 'bot');
  }, 1000);
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chatbot-message ${sender}`;
  messageDiv.textContent = text;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chatbot-typing';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Hide typing indicator
function hideTyping() {
  const typingDiv = document.getElementById('typing-indicator');
  if (typingDiv) {
    typingDiv.remove();
  }
}

// Quick action buttons
function handleQuickAction(action) {
  chatbotInput.value = action;
  sendMessage();
}

// Bot responses
function getBotResponse(message) {
  // Greetings
  if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return "Hello! 👋 Welcome to ShopEase! How can I help you today?";
  }

  // Products
  if (message.includes('product') || message.includes('item') || message.includes('shop')) {
    return "We have 30+ amazing products across 5 categories: Electronics, Fashion, Home & Kitchen, Sports, and Accessories. Browse our home page to see all products!";
  }

  // Categories
  if (message.includes('categor')) {
    return "We have 5 categories:\n• Electronics\n• Fashion\n• Home & Kitchen\n• Sports\n• Accessories\n\nWhat are you looking for?";
  }

  // Cart
  if (message.includes('cart')) {
    return "To add items to your cart, browse products and click 'Add to Cart'. Your cart is saved even after logout! 🛒";
  }

  // Wishlist
  if (message.includes('wishlist') || message.includes('favorite')) {
    return "Click the ❤️ heart button on any product to add it to your wishlist. You can view all your favorites on the Wishlist page!";
  }

  // Orders
  if (message.includes('order') || message.includes('track')) {
    return "You can view all your orders on the Orders page. Track your order status from Pending → Processing → Shipped → Delivered! 📦";
  }

  // Payment
  if (message.includes('payment') || message.includes('pay')) {
    return "We currently accept Cash on Delivery (COD). More payment options coming soon! 💳";
  }

  // Shipping
  if (message.includes('ship') || message.includes('deliver')) {
    return "We deliver across India! Enter your shipping address during checkout. Delivery typically takes 3-7 business days. 🚚";
  }

  // Account
  if (message.includes('account') || message.includes('register') || message.includes('login')) {
    return "Create an account to start shopping! Click 'Login' in the navbar, then 'Create an account'. It's quick and easy! 👤";
  }

  // Admin
  if (message.includes('admin')) {
    return "To register as admin, check 'Register as Admin' during signup and enter code: ADMIN2026. Admins can add/manage products and orders! 👨‍💼";
  }

  // Help
  if (message.includes('help') || message.includes('support')) {
    return "I'm here to help! Ask me about:\n• Products & Categories\n• Cart & Wishlist\n• Orders & Tracking\n• Account & Login\n• Admin Access\n\nWhat would you like to know?";
  }

  // Search
  if (message.includes('search') || message.includes('find')) {
    return "Use the search bar on the home page to find products by name or description. You can also filter by category and sort by price or rating! 🔍";
  }

  // Price
  if (message.includes('price') || message.includes('cost') || message.includes('cheap')) {
    return "Our products range from ₹499 to ₹6999. Use the sort feature to view products by price (low to high or high to low)! 💰";
  }

  // Stock
  if (message.includes('stock') || message.includes('available')) {
    return "Stock availability is shown on each product card. Out of stock items have a disabled 'Add to Cart' button. We restock regularly! 📦";
  }

  // Contact
  if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
    return "For support, email us at support@shopease.com or call +91-1234567890. We're here to help! 📞";
  }

  // Thanks
  if (message.includes('thank') || message.includes('thanks')) {
    return "You're welcome! Happy shopping! 😊 Let me know if you need anything else!";
  }

  // Bye
  if (message.includes('bye') || message.includes('goodbye')) {
    return "Goodbye! Thanks for visiting ShopEase. Come back soon! 👋";
  }

  // Default response
  return "I'm not sure about that. Try asking about products, cart, orders, account, or admin access. Type 'help' to see what I can do! 🤔";
}

// Initialize with welcome message
window.addEventListener('load', () => {
  setTimeout(() => {
    addMessage("Hi! 👋 I'm your ShopEase assistant. How can I help you today?", 'bot');
  }, 500);
});
