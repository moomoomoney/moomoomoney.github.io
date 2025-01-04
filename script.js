// Amount of Auto Earn Options owned
let cowsAmount = parseInt(localStorage.getItem('cowsAmount')) || 0;  // Initialize from localStorage or default to 0
let cattleAmount = 0;
let bullAmount = 0;
let upgradedAmount = 0;  

// Earning rules
let cowEarns = 1;
let cattleEarns = 5;
let bullEarns = 100;
let upgradedEarns = 4;

document.addEventListener('DOMContentLoaded', (event) => {
  // Display amounts from localStorage or defaults
  updateDashboard();
});

// Initialize variables with values from localStorage or default if not set
let coins = parseInt(localStorage.getItem('coins')) || 333;
let income = parseInt(localStorage.getItem('income')) || 0;
let losses = parseInt(localStorage.getItem('losses')) || 0;

// Add Auto Earn coins
function calculateDailyEarnings() {
  return (
    cowsAmount * cowEarns +
    cattleAmount * cattleEarns +
    bullAmount * bullEarns +
    upgradedAmount * upgradedEarns
  );
}

// Function to apply auto earnings once per day
function applyAutoEarnings() {
  const lastEarned = localStorage.getItem('lastEarned');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  if (!lastEarned || today > new Date(parseInt(lastEarned)).getTime()) {
    const dailyEarnings = calculateDailyEarnings();
    coins += dailyEarnings;
    localStorage.setItem('coins', coins);
    localStorage.setItem('lastEarned', today.toString());
    updateDashboard();
    console.log(`Auto earnings of ${dailyEarnings} M³ applied.`);
  }
}

// Call applyAutoEarnings on page load
document.addEventListener('DOMContentLoaded', () => {
  applyAutoEarnings();
  updateDashboard();
});

// CHANGE COWS AMOUNT
// Add Password Modal for Cows Change
function changeCows() {
  openModalForCows();
}

// Open Modal for Changing Cows
function openModalForCows() {
  document.getElementById("passwordModalForCows").style.display = "block";
  document.getElementById("errorMessageForCows").style.display = "none"; // Hide error message initially
}

// Close Modal for Changing Cows
function closeModalForCows() {
  document.getElementById("passwordModalForCows").style.display = "none";
  document.getElementById("modalPasswordForCows").value = ""; // Clear the input
  document.getElementById("errorMessageForCows").style.display = "none"; // Hide error message on close
}

// Function to handle password submission for cows change
async function submitPasswordForCows() {
  const password = document.getElementById("modalPasswordForCows").value;
  const hashedPassword = await hashPassword(password);

  if (hashedPassword !== correctPassword) {
    document.getElementById("errorMessageForCows").style.display = "block"; // Show error message
    wrongPassword();  
    return;
  }

  // If password is correct, allow change of cows
  closeModalForCows();
  const changeCowsBy = parseInt(document.getElementsByClassName("addCows")[0].value);
  if (isNaN(changeCowsBy)) {
    alert("Please enter a valid number.");
    return;
  }
  const previousCowsAmount = cowsAmount;
  cowsAmount += changeCowsBy;
  localStorage.setItem('cowsAmount', cowsAmount); // Save updated cowsAmount to localStorage
  alert(`Cows amount has been changed from ${previousCowsAmount} to ${cowsAmount}.`);
  document.getElementsByClassName("addCows")[0].value = "";
  updateDashboard();
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

// Function to update the display on the page
function updateDashboard() {
  // Update the display for cows, cattle, bull, etc.
  const cowDisplayElement = document.getElementsByClassName("cowsAmount")[0];
  if (cowDisplayElement) {
    cowDisplayElement.innerHTML = `You own: ${cowsAmount} cows`;
  }

  const cattleDisplayElement = document.getElementsByClassName("cattleAmount")[0];
  if (cattleDisplayElement) {
    cattleDisplayElement.innerHTML = `You own: ${cattleAmount} M³`;
  }

  const bullDisplayElement = document.getElementsByClassName("bullAmount")[0];
  if (bullDisplayElement) {
    bullDisplayElement.innerHTML = `You own: ${bullAmount} M³`;
  }

  const upgradedDisplayElement = document.getElementsByClassName("upgradedAmount")[0];
  if (upgradedDisplayElement) {
    upgradedDisplayElement.innerHTML = `You own: ${upgradedAmount} M³`;
  }

  const coinsDisplayElement = document.getElementsByClassName("coins")[0];
  if (coinsDisplayElement) {
    coinsDisplayElement.innerHTML = `${coins} M³`;
  }

  const incomeDisplayElement = document.getElementsByClassName("income")[0];
  if (incomeDisplayElement) {
    incomeDisplayElement.innerHTML = `${income} M³`;
  }

  const lossesDisplayElement = document.getElementsByClassName("losses")[0];
  if (lossesDisplayElement) {
    lossesDisplayElement.innerHTML = `${losses} M³`;
  }

  const autoDisplayElement = document.getElementsByClassName("auto")[0];
  if (autoDisplayElement) {
    autoDisplayElement.innerHTML = `${calculateDailyEarnings()} M³`; // Correct the auto earnings
  }

  // Update redeem coupon display
  updateRedeemDisplay();
}

// Store the already hashed password
let correctPassword = "3258ca0784cae2e33e086306589ecaa8e36920e38c10df23d48b16d8924f1256";

// Function to hash entered password
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}


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

// Function to check if the reset is needed and perform it
function checkAndResetDailyValues() {
  const lastReset = localStorage.getItem('lastReset');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  if (!lastReset || today > new Date(parseInt(lastReset)).getTime()) {
    resetDailyValues();
    localStorage.setItem('lastReset', today.toString());
  }
}

checkAndResetDailyValues();

// // Update the redeem display whenever coins or coupons change
// function updateDashboard() {
//   document.getElementsByClassName("coins")[0].innerHTML = coins + " M³";
//   document.getElementsByClassName("income")[0].innerHTML = income + " M³";
//   document.getElementsByClassName("losses")[0].innerHTML = losses + " M³";
//   document.getElementsByClassName("auto")[0].innerHTML = calculateDailyEarnings() + " M³";  // Correcting the auto earnings display
// }

// Show Modal for Coins
function openModal() {
  document.getElementById("passwordModal").style.display = "block";
  document.getElementById("errorMessage").style.display = "none"; // Hide error message initially
}

// Close modal for Coins
function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("modalPassword").value = ""; // Clear the input
  document.getElementById("errorMessage").style.display = "none"; // Hide error message on close
}



// Function to handle password submission for coins
async function submitPassword() {
  const password = document.getElementById("modalPassword").value;
  const hashedPassword = await hashPassword(password);

  if (hashedPassword !== correctPassword) {
    document.getElementById("errorMessage").style.display = "block"; // Show error message
    wrongPassword();
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


// Show Modal for Clearing Coins
function openModalClear() {
  document.getElementById("passwordModalClear").style.display = "block";
  document.getElementById("errorMessageClear").style.display = "none"; // Hide error message initially
}

// Close modal for Clear Coins
function closeModalClear() {
  document.getElementById("passwordModalClear").style.display = "none";
  document.getElementById("modalPasswordClear").value = ""; // Clear the input
  document.getElementById("errorMessageClear").style.display = "none"; // Hide error message on close
}

// Check for password
function clearCoins() {
  openModalClear();
}

// Function to handle password submission for clearing coins
async function submitPasswordClear() {
  const passwordClear = document.getElementById("modalPasswordClear").value;
  const hashedPassword = await hashPassword(passwordClear);

  if (hashedPassword !== correctPassword) {
    document.getElementById("errorMessageClear").style.display = "block"; // Show error message
    wrongPassword();
    return;
  }

  // If password is correct, clear coins
  closeModalClear();

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

// Evil things happen when you enter the wrong password!!!!
 function wrongPassword() {
  let userInput;

  // Keep prompting until valid input or user cancels
  while (true) {
    userInput = prompt("Your password is INCORRECT. You have been reported. Please enter the correct password to close this alert.");

    // If the user cancels, display alert and loop again
    if (userInput === null) {
      alert("Nice try :( You must enter the correct password. There is no way out of it!!!!");
      continue;  // Continue asking for input
    }

    // If input is correct, store the correct password flag and exit loop
    if (userInput.trim() === correctPassword) {
      localStorage.setItem('passwordCorrect', 'true');  // Store flag in localStorage
      alert("Correct password! Access granted.");
      break;  // Exit loop on correct password
    } else {
      alert("PASSWORD INCORRECT! Try again.");
    }
  }
}


// COUPONS COUPONS REDEEM COUPONS !!!

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

 // Function to open the modal for coupons
 function openModal2() {
  document.getElementById("passwordModal2").style.display = "block";
  document.getElementById("errorMessage2").style.display = "none"; // Hide error message initially
}

// Function to close the modal for coupons
function closeModal2() {
  document.getElementById("passwordModal2").style.display = "none";
  document.getElementById("modalPassword2").value = ""; // Clear the input
  document.getElementById("errorMessage2").style.display = "none"; // Hide error message on close
}

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

  openModal2();

}


// Function to handle password submission for coupons
async function submitPasswordCoupons() {
  const passwordCoupons = document.getElementById("modalPassword2").value;
  const hashedPassword = await hashPassword(passwordCoupons);

  // Check if the password is correct
  if (hashedPassword !== correctPassword) {
    document.getElementById("errorMessage2").style.display = "block"; // Show error message
    wrongPassword();
    return;
  }

  // If password is correct, proceed with coupon addition
  const amountInput = document.querySelector('.add-coins-container input[placeholder="Amount"]');
  const reasonInput = document.querySelector('.add-coins-container input[placeholder="Use"]');
  const amountCoupon = parseInt(amountInput.value, 10);
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
    amount: amountCoupon, 
    reason: reason
  };

  // Add the new entry to the array
  couponsData.push(newCoupon);

  // Save the updated data to localStorage
  localStorage.setItem('couponsData', JSON.stringify(couponsData));

  // Clear input fields
  amountInput.value = '';
  reasonInput.value = '';

  // Update the coupon tracker table
  updateCouponTracker();
  closeModal2();
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

// Ensure coupon tracker table updates on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCouponTracker();
});

// Show Modal for Clearing Coupons
function openModalClear2() {
  document.getElementById("passwordModalClear2").style.display = "block";
  document.getElementById("errorMessageClear2").style.display = "none"; // Hide error message initially
}

// Close modal for Clear Coupons
function closeModalClear2() {
  document.getElementById("passwordModalClear2").style.display = "none";
  document.getElementById("modalPasswordClear2").value = ""; // Clear the input
  document.getElementById("errorMessageClear2").style.display = "none"; // Hide error message on close
}

// Function to clear all coupons
function clearCoupons() {
  openModalClear2();
}

// Function to handle password submission for clearing coupons
async function submitPasswordClear2() {
  const passwordClear2 = document.getElementById("modalPasswordClear2").value;
  const hashedPassword = await hashPassword(passwordClear2);

  if (hashedPassword !== correctPassword) {
    document.getElementById("errorMessageClear2").style.display = "block"; // Show error message
    wrongPassword();
    return;
  }

  // If password is correct, clear coupons
  closeModalClear2();

  // Clear coupon data in localStorage
  localStorage.setItem('couponsData', JSON.stringify([]));

  // Clear the tracker table
  updateCouponTracker();
}

// Ensure displays are updated on page load
document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
  updateRedeemDisplay();
});


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