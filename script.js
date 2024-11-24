// Initialize variables with values from localStorage or default if not set
let coins = parseInt(localStorage.getItem('coins')) || 333;  // Default to 230 if no value is stored
let income = parseInt(localStorage.getItem('income')) || 0;  // Default to 0 if no value is stored
let losses = parseInt(localStorage.getItem('losses')) || 0;  // Default to 0 if no value is stored
let auto = 0;     // Auto Earnings (this value isn't stored in localStorage)


// Function to update the display on the page
function updateDashboard() {
  document.getElementsByClassName("coins")[0].innerHTML = coins + " M³";
  document.getElementsByClassName("income")[0].innerHTML = income + " M³";
  document.getElementsByClassName("losses")[0].innerHTML = losses + " M³";
  document.getElementsByClassName("auto")[0].innerHTML = auto + " M³";
}

let correctPassword = "Woodchuck20101211";

updateDashboard();

// Function to add income
function addIncome(amount) {
  income += amount;
  localStorage.setItem('income', income);
  updateDashboard();
}

// Function to add losses
function addLosses(amount) {
  losses += amount;
  localStorage.setItem('losses', losses);
  updateDashboard();
}

// Function to reset income and losses
function resetDailyValues() {
  income = 0;
  losses = 0;
  localStorage.setItem('income', income);
  localStorage.setItem('losses', losses);
  updateDashboard();
}

// Schedule the reset to occur daily at 00:00:00 AM
function scheduleDailyReset() {
  const now = new Date();
  const nextReset = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // Set to the next day
    0, 0, 0, 0 // At midnight
  );

  const timeUntilReset = nextReset - now;

  // Set a timeout for the first reset
  setTimeout(() => {
    resetDailyValues();

    // After the first reset, schedule it every 24 hours
    setInterval(resetDailyValues, 24 * 60 * 60 * 1000);
  }, timeUntilReset);
}

// Start the daily reset scheduler
scheduleDailyReset();

// Show Modal
function openModal() {
  document.getElementById("passwordModal").style.display = "block";
  document.getElementById("errorMessage").style.display = "none"; // Hide error message initially
}

// Close modal
function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("modalPassword").value = ""; // Clear the input
  document.getElementById("errorMessage").style.display = "none"; // Hide error message on close
}

// Function to handle password submission
function submitPassword() {
  const password = document.getElementById("modalPassword").value;

  if (password !== correctPassword) {
    document.getElementById("errorMessage").style.display = "block"; // Show error message
    return;
  }

  // If password is correct, add coins
  closeModal();
  const addCoinsBy = parseInt(document.getElementsByClassName("addCoins")[0].value);
  const reason = document.getElementsByClassName("addReason")[0].value;

  if (isNaN(addCoinsBy)) {
    alert("Please enter a valid number.");
    return;
  }

  // Handle the reason
  if (!reason.trim()) {
    alert("Please provide a reason for the change.");
    return;
  }

  coins += addCoinsBy;

  if (addCoinsBy > 0) {
    addIncome(addCoinsBy);
  } else {
    let lostCoinsBy = addCoinsBy * -1;
    addLosses(lostCoinsBy);
  }

  // Update coinsData in localStorage for tracking
  let coinsData = JSON.parse(localStorage.getItem('coinsData')) || [];
  const date = new Date();
  coinsData.push({
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    amount: addCoinsBy,
    reason: reason
  });
  localStorage.setItem('coinsData', JSON.stringify(coinsData));

  // Save coins to localStorage
  localStorage.setItem('coins', coins);
  updateDashboard();
  document.getElementsByClassName("addCoins")[0].value = "";
  document.getElementsByClassName("addReason")[0].value = ""; // Clear the reason input

  // Update tracker table
  updateTracker();
}

// ADD COINS
function addCoins() {
  openModal();
}

// Function to toggle visibility of an element
function reveal(id) {
  const element = document.getElementById(id);
  element.style.display = element.style.display === "none" ? "" : "none";
}

// Refresh function to reload the page
function refresh() {
  window.location.reload();
}

// Login function to validate username and password
function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "Zhongjie" && password === "IsSmart") {
    window.location.href = "home.html";
  } else {
    alert("Password or username incorrect.");
  }
}
// COUPONS COUPONS REDEEM COUPONS !!!

// Function to clear the tracker table and reset coinsData in localStorage
function clearCoins() {
  // Clear the coinsData in localStorage
  localStorage.setItem('coinsData', JSON.stringify([]));

  // Update the tracker table to remove all rows
  const trackerTable = document.getElementById('tracker-table-body');
  trackerTable.innerHTML = '';

  // Update the dashboard
  updateDashboard();
}

// Attach clearCoins function to the "Clear" button
document.querySelector(".controlButton[onclick='clearCoins()']").addEventListener("click", clearCoins);

// Function to add a coupon entry
function addCoupon() {
  const amountInput = document.querySelector('.add-coins-container input[placeholder="Amount"]');
  const reasonInput = document.querySelector('.add-coins-container input[placeholder="Use"]');
  const amountCoupon = parseInt(amountInput.value, 10); // Renamed variable
  const reason = reasonInput.value.trim();

  // Validate inputs
  if (!amountCoupon || !reason) {
    alert('Please enter a valid amount and reason.');
    return;
  }

  // Retrieve existing coupons from localStorage
  const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];

  // Create a new coupon entry
  const newCoupon = {
    date: new Date().toLocaleDateString(),
    amount: amountCoupon, // Updated variable
    reason: reason
  };

  // Add the new entry to the array
  couponsData.push(newCoupon);

  // Save the updated data to localStorage
  localStorage.setItem('couponsData', JSON.stringify(couponsData));

  // Clear input fields
  amountInput.value = '';
  reasonInput.value = '';

  // Update the table dynamically
  updateCouponTracker();
}

// Function to update the coupon tracker table
function updateCouponTracker() {
  const trackerTable = document.getElementById('coupon-tracker-table-body');
  const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];

  // Clear existing table rows
  trackerTable.innerHTML = '';

  // Populate the table with updated data
  couponsData.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.amount} Redeem Coupon</td> 
      <td>${entry.reason}</td>
    `;
    trackerTable.appendChild(row);
  });
}

// Function to clear all coupons
function clearCoupons() {
  // Clear coupon data in localStorage
  localStorage.setItem('couponsData', JSON.stringify([]));

  // Clear the tracker table
  updateCouponTracker();
}

// Ensure coupon tracker table updates on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCouponTracker();
});


// Function to update the redeem coupon display
function updateRedeemDisplay() {
  const redeemBox = document.querySelector('.box');
  const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];
  const totalRedeemed = couponsData.reduce((sum, coupon) => sum + coupon.amount, 0);

  // Update the redeem box content
  redeemBox.innerHTML = `
    You have:
    <b>${totalRedeemed} Redeem Coupon!</b>
  `;
}

// Function to redeem a coupon
function redeemCoupon(amount, reason) {
  if (amount > coins) {
    alert("Not enough coins to redeem this coupon.");
    return;
  }

  // Deduct the coins for redemption
  coins -= amount;
  localStorage.setItem('coins', coins);

  // Add the coupon to localStorage
  const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];
  const newCoupon = {
    date: new Date().toLocaleDateString(),
    amount: amount,
    reason: reason,
  };
  couponsData.push(newCoupon);
  localStorage.setItem('couponsData', JSON.stringify(couponsData));

  // Update the dashboard and redeem display
  refresh();
  updateRedeemDisplay();
}

// Ensure displays are updated on page load
document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
  updateRedeemDisplay();
});

// Update the redeem display whenever coins or coupons change
function updateDashboard() {
  document.getElementsByClassName("coins")[0].innerHTML = coins + " M³";
  document.getElementsByClassName("income")[0].innerHTML = income + " M³";
  document.getElementsByClassName("losses")[0].innerHTML = losses + " M³";
  document.getElementsByClassName("auto")[0].innerHTML = auto + " M³";

  // Update redeem coupon display
  updateRedeemDisplay();
}
