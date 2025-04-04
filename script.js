// ORIGINAL JS FILE

// Amount of Auto Earn Options owned
let cowsAmount = parseInt(localStorage.getItem('cowsAmount')) || 0;  
localStorage.setItem('cowsAmount', cowsAmount); 
let cattleAmount = parseInt(localStorage.getItem('cattleAmount')) || 0;
localStorage.setItem('cattleAmount', cattleAmount); 
let bullAmount = parseInt(localStorage.getItem('bullAmount')) || 0;
localStorage.setItem('bullAmount', bullAmount); 
let upgradedAmount = parseInt(localStorage.getItem('upgradedAmount')) || 0;
localStorage.setItem('upgradedAmount', upgradedAmount); 
let salary = parseInt(localStorage.getItem('salary')) || 0;
localStorage.setItem('salary', salary); 
let cropsAmount = parseInt(localStorage.getItem('cropsAmount')) || 0;
localStorage.setItem('cropsAmount', cropsAmount); 
let insuranceAmount = parseInt(localStorage.getItem('insuranceAmount')) || 0;
localStorage.setItem('insuranceAmount', insuranceAmount); 
let expenseAmount = parseInt(localStorage.getItem('expenseAmount')) || 0;
localStorage.setItem('expenseAmount', expenseAmount);  
let whatAutoEarn = "No Auto Earn";

// Cow Earning rules
let cowEarns = 1;
let cattleEarns = 5;
let bullEarns = 100;
let upgradedEarns = 4;

document.addEventListener('DOMContentLoaded', (event) => {
  // Display amounts from localStorage or defaults
  updateDashboard();
});

// Initialize variables with values from localStorage or default if not set
let coins = parseInt(localStorage.getItem('coins')) || 0;
let prestige = parseInt(localStorage.getItem('prestige')) || 0;
localStorage.setItem('prestige', prestige);
let income = parseInt(localStorage.getItem('income'));
let losses = parseInt(localStorage.getItem('losses'));
let autoearn = calculateDailyEarnings();
localStorage.setItem('autoearn', autoearn);
let totalAutoEarn = parseInt(localStorage.getItem('totalAutoEarn')) || 0;
localStorage.setItem('totalAutoEarn', totalAutoEarn);  


// Add Auto Earn coins
function calculateDailyEarnings() {
  return (
    cowsAmount * cowEarns +
    cattleAmount * cattleEarns +
    bullAmount * bullEarns +
    upgradedAmount * upgradedEarns +
    salary + cropsAmount - insuranceAmount - expenseAmount
  );
}

function infoModalHut() {
  document.getElementById("InfoModalHut").style.display = "block";
};

function infoModalEmptyPlot() {
  document.getElementById("infoModalEmptyPlot").style.display = "block";
};

function infoModalBarn() {
  document.getElementById("infoModalBarn").style.display = "block";
}

function infoModalGrass() {
  document.getElementById("infoModalGrass").style.display = "block";
}


// Generate PRICES
function generateCowPrice() {
  return Math.random() < 0.25 ? 100 : Math.floor(Math.random() * (150 - 90 + 1)) + 90;
  }
  function generateCattlePrice() {
  return Math.random() < 0.25 ? 400 : Math.floor(Math.random() * (450 - 350 + 1)) + 350;
  }
  function generateBullPrice() {
  return Math.random() < 0.25 ? 750 : Math.floor(Math.random() * (850 - 600 + 1)) + 600;
  }
  function generateArenaPrice() {
  return Math.random() < 0.25 ? 2000 : Math.floor(Math.random() * (2250 - 1800 + 1)) + 1800;
}
  function generateSheepPrice() {
    return Math.random() < 0.25 ? 150 : Math.floor(Math.random() * (125 - 250 + 1)) + 250;
  }
  function generateHorsePrice() {
    return Math.random() < 0.25 ? 400 : Math.floor(Math.random() * (200 - 1000 + 1)) + 1000;
  }
  function generateChickenPrice() {
    return Math.random() < 0.25 ? 150 : Math.floor(Math.random() * (80 - 200 + 1)) + 200;
  }
  function generatePigPrice() {
    return Math.random() < 0.25 ? 150 : Math.floor(Math.random() * (125 - 250 + 1)) + 250;
  }
  function generateSmallTreePrice() {
    return Math.random() < 0.25 ? 200 : Math.floor(Math.random() * (180 - 300 + 1)) + 300;
  }
  function generateMediumTreePrice() {
    return Math.random() < 0.25 ? 400 : Math.floor(Math.random() * (370 - 600 + 1)) + 600;
  }
  function generateLargeTreePrice() {
    return Math.random() < 0.25 ? 750 : Math.floor(Math.random() * (600 - 1100 + 1)) + 1100;
  }

if (!localStorage.getItem('cowPrice') || !localStorage.getItem('cattlePrice') || !localStorage.getItem('bullPrice') || !localStorage.getItem('sheepPrice') ||!localStorage.getItem('horsePrice') || !localStorage.getItem('chickenPrice') || !localStorage.getItem('pigPrice') || !localStorage.getItem('smallTreePrice')  || !localStorage.getItem('largeTreePrice') || !localStorage.getItem('mediumTreePrice') || !localStorage.getItem('arenaPrice')) {
  updatePrices();
}

// Function to update prices and save to localStorage
function updatePrices() {
// Generate new prices for each category
const cowPrice = generateCowPrice();
const cattlePrice = generateCattlePrice();
const bullPrice = generateBullPrice();
const arenaPrice = generateArenaPrice();
const sheepPrice = generateSheepPrice();
const horsePrice = generateHorsePrice();
const chickenPrice = generateChickenPrice();
const pigPrice = generateChickenPrice();
const smallTreePrice = generateSmallTreePrice();
const mediumTreePrice = generateMediumTreePrice();
const largeTreePrice = generateLargeTreePrice();

// Save to localStorage
localStorage.setItem("cowPrice", cowPrice);
localStorage.setItem("cattlePrice", cattlePrice);
localStorage.setItem("bullPrice", bullPrice);
localStorage.setItem("arenaPrice", arenaPrice);
localStorage.setItem("sheepPrice", sheepPrice);
localStorage.setItem("horsePrice", horsePrice);
localStorage.setItem("chickenPrice", chickenPrice);
localStorage.setItem("pigPrice", pigPrice);
localStorage.setItem("smallTreePrice", smallTreePrice);
localStorage.setItem("mediumTreePrice", mediumTreePrice);
localStorage.setItem("largeTreePrice", largeTreePrice);
loadPricesFromLocalStorage();
}

// Function to load prices from localStorage (defaulting to 0 if not found)
function loadPricesFromLocalStorage() {
  const cowPrice = parseInt(localStorage.getItem("cowPrice")) || 100;
  const cattlePrice = parseInt(localStorage.getItem("cattlePrice")) || 400;
  const bullPrice = parseInt(localStorage.getItem("bullPrice")) || 750;
  const arenaPrice = parseInt(localStorage.getItem("arenaPrice")) || 2000;
  const sheepPrice = parseInt(localStorage.getItem("sheepPrice")) || 150;
  const horsePrice = parseInt(localStorage.getItem("horsePrice")) || 400;
  const chickenPrice = parseInt(localStorage.getItem("chickenPrice")) || 150;
  const pigPrice = parseInt(localStorage.getItem("pigPrice")) || 150;
  const smallTreePrice = parseInt(localStorage.getItem("smallTreePrice")) || 200;
  const mediumTreePrice = parseInt(localStorage.getItem("mediumTreePrice")) || 400;
  const largeTreePrice = parseInt(localStorage.getItem("largeTreePrice")) || 750;

// Update the UI with the loaded prices
document.getElementById("cowPrice").innerHTML = `(${cowPrice} M³)`;
document.getElementById("cattlePrice").innerHTML = `(${cattlePrice} M³)`;
document.getElementById("bullPrice").innerHTML = `(${bullPrice} M³)`;
document.getElementById("arenaPrice").innerHTML = `(${arenaPrice} M³)`;
document.getElementById("sheepPrice").innerHTML = `(${sheepPrice} M³)`;
document.getElementById("horsePrice").innerHTML = `(${horsePrice} M³)`;
document.getElementById("chickenPrice").innerHTML = `(${chickenPrice} M³)`;
document.getElementById("pigPrice").innerHTML = `(${pigPrice} M³)`;
document.getElementById("smallTreePrice").innerHTML = `(${smallTreePrice} M³)`;
document.getElementById("mediumTreePrice").innerHTML = `(${mediumTreePrice} M³)`;
document.getElementById("largeTreePrice").innerHTML = `(${largeTreePrice} M³)`;
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

function reveal(id) {
  const dropdowns = document.querySelectorAll('.dropdownText'); // Using the class 'dropdownText'

  // Close all dropdowns except the clicked one
  dropdowns.forEach(dropdown => {
    // Only hide dropdowns that aren't the one clicked
    if (dropdown.id !== id) {
      dropdown.style.display = 'none';
    }
  });

  const element = document.getElementById(id);
  if (element) {
    // Check the computed display style to handle the element's visibility properly
    const currentDisplay = window.getComputedStyle(element).display;

    // Toggle the display of the clicked dropdown
    if (currentDisplay === 'none') {
      element.style.display = 'block'; // Open the dropdown
    } else {
      element.style.display = 'none'; // Close the dropdown
    }
  }
}



// Refresh function to reload the page
function refresh() {
window.location.reload();
}

// Function to apply auto earnings once per day and update the tracker table
function applyAutoEarnings() {
  const lastEarned = localStorage.getItem('lastEarned'); // Get the last earned date from localStorage
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); // Get today's date (start of the day)

  if (!lastEarned) {
    // If no lastEarned date exists, initialize it for the first time
    console.log("First-time setup for auto earnings.");
    localStorage.setItem('lastEarned', today.toString());
    return;
  }

  const lastEarnedDate = new Date(parseInt(lastEarned));
  const daysMissed = Math.floor((today - lastEarnedDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate the number of missed days

  if (daysMissed > 0) {
    console.log(`Applying earnings for ${daysMissed} missed days.`);
    const dailyEarnings = calculateDailyEarnings();
    coins += dailyEarnings * daysMissed; // Add earnings for all missed days
    localStorage.setItem('coins', coins); // Update coins in localStorage
    localStorage.setItem('lastEarned', today.toString()); // Update lastEarned to today
    console.log(`Auto earnings of ${dailyEarnings * daysMissed} M³ applied.`);

    // Update other relevant data
    totalAutoEarn = parseInt(localStorage.getItem('totalAutoEarn')) || 0;
    totalAutoEarn += autoearn * daysMissed; // Add auto earnings for missed days
    localStorage.setItem("totalAutoEarn", totalAutoEarn);

    whatAutoEarn = getAutoEarningsDescription();
    localStorage.setItem('whatAutoEarn', whatAutoEarn);

    // Update the UI
    updateAutoEarnTable();
    updateTracker();
    console.log("Calling updatePrices...");
    updatePrices();
    updateDashboard();
    console.log(`Prices updated, or at least UpdatePrices called`);
  } else {
    console.log("Earnings already applied for today.");
  }
}

function updateAutoEarnTable() {
  console.log(`tracker table updated`);
  const AutoEarnTableElement = document.getElementById("totalAutoEarn");
  if (AutoEarnTableElement) {
    AutoEarnTableElement.innerHTML = totalAutoEarn;
  }
  const AutoEarnTableDescription = document.getElementById("whatAutoEarn");
  if (AutoEarnTableDescription) {
    AutoEarnTableDescription.innerHTML = whatAutoEarn;
  }
}

// Function to generate a dynamic description for whatAutoEarn
function getAutoEarningsDescription() {
  let description = '';

  // Dynamically add descriptions based on values greater than 0
  if (cowsAmount > 0) description += `Cows earn: ${cowsAmount} M³/day;`;
  if (cropsAmount > 0) description += `Crops earn: ${cropsAmount} M³/day; `;
  if (cattleAmount > 0) description += `Cattle earn: ${cattleAmount} M³/day; `;
  if (bullAmount > 0) description += `Bulls earn: ${bullAmount} M³/day; `;
  if (upgradedAmount > 0) description += `Upgraded animals earn: ${upgradedAmount} M³/day; `;
  if (salary > 0) description += `Salary earn: ${salary} M³/day; <br>`;
  if (insuranceAmount > 0) description += `Insurance earn: ${insuranceAmount} M³/day; `;
  if (expenseAmount > 0) description += `Expenses: ${expenseAmount} M³/day; `;
  if (description === '') {
    description = 'No Auto Earnings';
  }
  // Return the final description
  return description;
}

document.addEventListener("DOMContentLoaded", () => {
  loadPricesFromLocalStorage();
});

window.onload = function() {
  loadPricesFromLocalStorage();
};

// Call applyAutoEarnings on page load
document.addEventListener('DOMContentLoaded', () => {
  applyAutoEarnings();
  updateDashboard();
  loadPricesFromLocalStorage();
});

let changeWhat; // Variable amount to be changed (ie. what is in cowsAmount)
let changeWhatBy; // Amount to be changed by (ie. 5)
let changeName; // Name of the variable to be changed (ie. "cowsAmount")

// CHANGE AUTOEARN AMOUNT
function changeAutoEarn(inputId, variableName, variableRef) {
  openModalForCows(); // Open the modal for password validation
  const inputValue = parseInt(document.getElementById(inputId).value);

  if (isNaN(inputValue)) {
    alert("Please enter a valid number.");
    return;
  }

  changeWhatBy = inputValue; // Amount to change by
  changeWhat = variableRef; // Reference to the variable being changed
  changeName = variableName; // Name of the variable for localStorage

  document.getElementById(inputId).value = ""; // Clear the input field
}

// Open Modal for Changing Auto Earn
function openModalForCows() {
  document.getElementById("passwordModalForCows").style.display = "block";
}

// Close Modal for Changing Auto Earn
function closeModalForCows() {
  document.getElementById("passwordModalForCows").style.display = "none";
  document.getElementById("modalPasswordForCows").value = "";
}

// Function to handle password submission for Changing Auto Earn
async function submitPasswordForCows() {
  const password = document.getElementById("modalPasswordForCows").value;
  const hashedPassword = await hashPassword(password);

  if (hashedPassword !== correctPassword ) {
    document.getElementById("errorMessageForCows").style.display = "block"; // Show error message
    wrongPassword();  
    return;
  }

  closeModalForCows();

  const previousAmount = changeWhat;
  changeWhat += changeWhatBy;
  console.log(`previousAmount ${previousAmount} `);
  console.log(`newAmount ${changeWhat} `);

  localStorage.setItem(changeName, changeWhat); 

  alert(`${changeName} has been changed from ${previousAmount} to ${changeWhat}.`);
  refresh();
}

// Function to update the display on the page
function updateDashboard() {
  updateAutoEarnTable();
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
    autoDisplayElement.innerHTML = `${autoearn} M³`; 
  }
  
  // Update the display for cows, cattle, bull, etc.
  const cowDisplayElement = document.getElementsByClassName("cowsAmount")[0];
  if (cowDisplayElement) {
    cowDisplayElement.innerHTML = `You own: ${cowsAmount} M³`;
  }
  const salaryDisplayElement = document.getElementsByClassName("salary")[0];
  if (salaryDisplayElement) {
    salaryDisplayElement.innerHTML = salary;
  }

  const cropDisplayElement = document.getElementsByClassName("cropsAmount")[0];
  if (cropDisplayElement) {
    cropDisplayElement.innerHTML = cropsAmount;
  }

  const insuranceDisplayElement = document.getElementsByClassName("insuranceAmount")[0];
  if (insuranceDisplayElement) {
    insuranceDisplayElement.innerHTML = insuranceAmount;
  }

  const expenseDisplayElement = document.getElementsByClassName("expenseAmount")[0];
  if (expenseDisplayElement) {
    expenseDisplayElement.innerHTML = expenseAmount;
  }
  updatePrestigeDisplay();

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

// Show Modal for Coins
function openModal(operation) {
  let whatToDo = operation;
  localStorage.setItem('whatToDo', whatToDo); 
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
    document.getElementById("modalPassword").value = "";
    return;
  }
  let whatToDo = localStorage.getItem('whatToDo');
  if (whatToDo === "addCoins") {
    addCoins();
  }
  if (whatToDo === "clearCoins") {
      clearCoins();
  }
  if (whatToDo === "addCoupon") {
      addCoupon();
  }
  if (whatToDo === "clearCoupons") {
      clearCoupons();
  }
  if (whatToDo === "addPrestige") {
      addPrestige();
  }
  if (whatToDo === "clearPrestige") {
      clearPrestige();
  }
  closeModal();
}

// ADD COINS
function addCoins() {
  
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

// Check for password
function clearCoins() {
    // Clear the coinsData in localStorage
    localStorage.setItem('coinsData', JSON.stringify([]));

    // Update the tracker table to remove all rows
    const trackerTable = document.getElementById('tracker-table-body');
    trackerTable.innerHTML = '';
  
    // Update the dashboard
    updateDashboard();
}
// Ensure coupon tracker table updates on page load
window.onload = function() {
  console.log("Window loaded, running updateCouponTracker()");
  updateCouponTracker();
};

if (localStorage.getItem('wrongPassword') === null) {
  localStorage.setItem('wrongPassword', false);
}

function checkWrongPassword() {
  isWrongPassword = localStorage.getItem('wrongPassword');
  if (isWrongPassword === "true") {
    let BigBadBox = document.getElementById("BigBadBox");
    BigBadBox.style.display = "block";
    const passwordModal = document.getElementById("passwordModal2");
    passwordModal.style.display = "block";
  }
}
setInterval(checkWrongPassword, 500);

// Evil things happen when you enter the wrong password!!!!
function wrongPassword() {
  isWrongPassword = true; // Use the renamed variable
  localStorage.setItem('wrongPassword', isWrongPassword);
  document.getElementById("passwordModal2").style.display = "block";
}

async function submitPasswordWrong() {
  const passwordInput = document.getElementById("modalPasswordWrong").value; // Get the entered password
  const hashedPassword = await hashPassword(passwordInput); // Use passwordInput here
  if (hashedPassword === correctPassword) {
    // Password is correct
    console.log("Password is correct!");
    document.getElementById("modalPasswordWrong").value = "";
    localStorage.setItem('wrongPassword', false); // Set isWrongPassword to false
    const BigBadBox = document.getElementById("BigBadBox");
    const passwordModal = document.getElementById("passwordModal2");

    if (BigBadBox) {
      BigBadBox.style.display = "none"; // Hide the BigBadBox
    }
    if (passwordModal) {
      passwordModal.style.display = "none"; // Close the modal
    }
  } else {
    // Password is incorrect
    console.log("Password is incorrect. Try again.");
    alert("Incorrect password. Please try again."); // Alert the user
    document.getElementById("modalPasswordWrong").value = ""; // Clear the input field
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

// Function to add a coupon entry
function addCoupon() {
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

}

// Function to update the coupon tracker table
function updateCouponTracker() {
  const trackerTable = document.getElementById('coupon-tracker-table-body');
  const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];
  console.log("Coupons Data Loaded from localStorage:", couponsData);
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
  console.log("2 Coupons Data Loaded from localStorage:", couponsData);
}

// Function to clear all coupons
function clearCoupons() {
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

// PRESTIGE
function addPrestige() {
  console.log("Adding Prestige");
  const addPrestigeBy = parseInt(document.getElementsByClassName("addPrestige")[0].value);
  prestige += addPrestigeBy;
  localStorage.setItem('prestige', prestige);
  updatePrestigeDisplay();
  updateDashboard();
}

// PRESTIGE
function clearPrestige() {
  prestige = 0;
  localStorage.setItem('prestige', prestige);
  updateDashboard();
  updatePrestigeDisplay()
}

function updatePrestigeDisplay() {
  const prestigeBox = document.querySelector('.prestige');
  // Update the redeem box content
  prestigeBox.innerHTML = `
    You have:
    <b>${prestige} Prestige</b>
  `;
}