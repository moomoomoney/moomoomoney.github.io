import {updateDashboard, wrongPassword, coins, income, losses, addIncome, addLosses, openModal, closeModal, getCoins, setCoins, isWrongPassword, totalEarned} from './control.js';
import {triggerRandomEvent, displayEventMessage, checkForNewMonth, getCurrentMonthKey} from './chance.js';

document.addEventListener('DOMContentLoaded', (event) => {
  updateAutoEarnDashboard();
  displayEventMessage();
});

checkForNewMonth();
// Total Auto Earn Variable
let totalAutoEarn = parseInt(localStorage.getItem('totalAutoEarn')) || 0;
localStorage.setItem('totalAutoEarn', totalAutoEarn);  

// Amount of Auto Earn Options owned
let cowsAmount = parseInt(localStorage.getItem('cowsAmount')) || 0;  
localStorage.setItem('cowsAmount', cowsAmount); 
let cattleAmount = parseInt(localStorage.getItem('cattleAmount')) || 0;
localStorage.setItem('cattleAmount', cattleAmount); 
let bullAmount = parseInt(localStorage.getItem('bullAmount'))|| 0 ;
localStorage.setItem('bullAmount', bullAmount); 
let upgradedAmount = parseInt(localStorage.getItem('upgradedAmount')) || 0;
localStorage.setItem('upgradedAmount', upgradedAmount); 
let chickenAmount = parseInt(localStorage.getItem('chickenAmount')) || 0;
localStorage.setItem('chickenAmount', chickenAmount); 
let pigAmount = parseInt(localStorage.getItem('pigAmount')) || 0;
localStorage.setItem('pigAmount', pigAmount); 
let salary = parseInt(localStorage.getItem('salary')) || 0;
localStorage.setItem('salary', salary); 
let cropsAmount = parseInt(localStorage.getItem('cropsAmount')) || 0;
localStorage.setItem('cropsAmount', cropsAmount); 
let insuranceAmount = parseInt(localStorage.getItem('insuranceAmount'))|| 0;
localStorage.setItem('insuranceAmount', insuranceAmount); 
let expenseAmount = parseInt(localStorage.getItem('expenseAmount'))|| 0;
localStorage.setItem('expenseAmount', expenseAmount);  
let horseAmount = parseInt(localStorage.getItem('horseAmount')) || 0;
localStorage.setItem('horseAmount', horseAmount); 
let sheepAmount = parseInt(localStorage.getItem('sheepAmount')) || 0;
localStorage.setItem('sheepAmount', sheepAmount); 
let priceChangeMultiplier = parseFloat(localStorage.getItem('priceChangeMultiplier')) || 1.0;  
localStorage.setItem('priceChangeMultiplier', priceChangeMultiplier); 
let cropsEarnMultiplier = parseFloat(localStorage.getItem('cropsEarnMultiplier')) || 1.0;  
localStorage.setItem('cropsEarnMultiplier', cropsEarnMultiplier); 
let whatAutoEarn = getAutoEarningsDescription();
localStorage.setItem('whatAutoEarn', whatAutoEarn);
window.cowsAmount = cowsAmount;
window.cattleAmount = cattleAmount;
window.bullAmount = bullAmount;
window.upgradedAmount = upgradedAmount;
window.salary = salary;
window.cropsAmount = cropsAmount;
window.expenseAmount = expenseAmount;
window.insuranceAmount = insuranceAmount;
window.changeAutoEarn = changeAutoEarn;
window.openModalForCows = openModalForCows;
window.closeModalForCows = closeModalForCows;
window.priceChangeMultiplier = priceChangeMultiplier;
window.cropsEarnMultiplier = cropsEarnMultiplier;

// Cow Earning rules
let cowEarns = 1;
let cattleEarns = 5;
let bullEarns = 100;
let upgradedEarns = 4;

// Add Auto Earn coins
function calculateDailyEarnings() {
  return (
    cowsAmount * cowEarns +
    cattleAmount * cattleEarns +
    bullAmount * bullEarns +
    upgradedAmount * upgradedEarns +
    salary + Math.floor(cropsAmount * cropsEarnMultiplier) - insuranceAmount - expenseAmount
  );
}
// Initialize autoearn variable
let autoearn = calculateDailyEarnings();
localStorage.setItem('autoearn', autoearn);

function infoModal(name) {
  console.log(`infoModal called with name: ${name}`);
  const modal = document.getElementById(name);
  if (!modal) {
    console.error(`Element with id "${name}" not found in the DOM.`);
    return;
  }
  modal.style.display = "block";
}
window.infoModal = infoModal;

// Parent function to generate or adjust prices
function generatePrice(itemKey, basePrice, minPrice, maxPrice) {
  let currentPrice = parseInt(localStorage.getItem(itemKey));

  if (isNaN(currentPrice)) {
    const initialPrice = Math.random() < 0.25 ? basePrice : Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    localStorage.setItem(itemKey, initialPrice); 
    return initialPrice;
  } else {
    const rand = Math.random();
    if (rand < 0.25) {
      // 25% chance the price stays the same
      return currentPrice;
    } else if (rand < 0.5) {
      // 25% chance the price is regenerated randomly
      const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
      localStorage.setItem(itemKey, randomPrice);
      return randomPrice;
    }
    // 50% chance to adjust the price daily by ±100, ensuring it stays within bounds
    const adjustment = Math.floor(Math.random() * 201) - 100;
    const newPrice = currentPrice + adjustment;
    const boundedPrice = Math.max(minPrice, Math.min(maxPrice, newPrice)); 
    localStorage.setItem(itemKey, boundedPrice);
    return boundedPrice;
  }
}

// Generate PRICES
function generateAllPrices() {
  generatePrice('cowPrice', 100, 90, 150);
  generatePrice('cattlePrice', 400, 350, 450);
  generatePrice('bullPrice', 750, 600, 850);
  generatePrice('arenaPrice', 2000, 1800, 2250);
  generatePrice('sheepPrice', 150, 125, 250);
  generatePrice('horsePrice', 500, 350, 1000);
  generatePrice('chickenPrice', 150, 80, 200);
  generatePrice('pigPrice', 150, 125, 250);
  generatePrice('smallTreePrice', 200, 180, 300);
  generatePrice('mediumTreePrice', 400, 370, 600);
  generatePrice('largeTreePrice', 750, 600, 1100);
}

if (!localStorage.getItem('cowPrice') || !localStorage.getItem('cattlePrice') || !localStorage.getItem('bullPrice') || !localStorage.getItem('sheepPrice') ||!localStorage.getItem('horsePrice') || !localStorage.getItem('chickenPrice') || !localStorage.getItem('pigPrice') || !localStorage.getItem('smallTreePrice')  || !localStorage.getItem('largeTreePrice') || !localStorage.getItem('mediumTreePrice') || !localStorage.getItem('arenaPrice')) {
  updatePrices();
}

// Function to update prices and save to localStorage
export function updatePrices() {
  generateAllPrices();
  loadPricesFromLocalStorage();
}
window.updatePrices = updatePrices; 

export function loadPricesFromLocalStorage() {
  const priceMapping = {
    cowPrice: "cowPrice",
    cattlePrice: "cattlePrice",
    bullPrice: "bullPrice",
    arenaPrice: "arenaPrice",
    sheepPrice: "sheepPrice",
    horsePrice: "horsePrice",
    chickenPrice: "chickenPrice",
    pigPrice: "pigPrice",
    smallTreePrice: "smallTreePrice",
    mediumTreePrice: "mediumTreePrice",
    largeTreePrice: "largeTreePrice",
  };

  Object.keys(priceMapping).forEach((key) => {
    const price = parseInt(localStorage.getItem(key)) || 0;
    const element = document.getElementById(key);
    if (element) {
      element.innerHTML = `(${parseInt(price * priceChangeMultiplier)} M³)`;
    }
  });
}

// Dropdowns
function reveal(id) {
  const dropdowns = document.querySelectorAll('.dropdownText'); 
  const dropdownTitle = document.querySelectorAll('.dropdownTitle'); 
  // Close all dropdowns except the clicked one
  dropdowns.forEach(dropdown => {
    // Only hide dropdowns that aren't the one clicked
    if (dropdown.id !== id) {
      dropdown.style.display = 'none';
    }
  });

  const element = document.getElementById(id);
  if (element) {
    const currentDisplay = window.getComputedStyle(element).display;
    // Toggle the display of the clicked dropdown
    if (currentDisplay === 'none') {
      element.style.display = 'block'; 
    } else {
      element.style.display = 'none'; 
    }
  }
}
window.reveal = reveal;

// Refresh 
function refresh() {
window.location.reload();
}

// Function to apply auto earnings once per day and update the tracker table
function applyAutoEarnings() {
  const lastEarned = localStorage.getItem('lastEarned'); // Get the last earned date from localStorage
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); // Get today's date (start of the day)

  if (!lastEarned) {
    console.log("First-time setup for auto earnings.");
    localStorage.setItem('lastEarned', today.toString());
    return;
  }

  const lastEarnedDate = new Date(parseInt(lastEarned));
  let daysMissed = Math.floor((today - lastEarnedDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate the number of missed days

  if (daysMissed > 0) {
    console.log(`Applying earnings for ${daysMissed} missed days.`);
    console.log("Initial coins:", getCoins());
    const dailyEarnings = calculateDailyEarnings();
    setCoins(getCoins() + dailyEarnings * daysMissed);
    console.log("Updated coins:", getCoins());
    localStorage.setItem('coins', coins); 
    localStorage.setItem('lastEarned', today.toString()); 
    console.log(`Auto earnings of ${dailyEarnings * daysMissed} M³ applied.`);
    // Update other relevant data
    totalAutoEarn = parseInt(localStorage.getItem('totalAutoEarn')) || 0;
    totalAutoEarn += autoearn * daysMissed; 
    localStorage.setItem("totalAutoEarn", totalAutoEarn);
    if (autoearn > 0) {
      addIncome(autoearn);
    }
    if (autoearn < 0) {
      addLosses(autoearn);
    }
    // Update the UI
    updateAutoEarnTable();
    updatePrices();
    updateDashboard();
    console.log(`Prices updated, or at least UpdatePrices called`);
    // Trigger Random Events
    for (let repeat = 0; repeat < daysMissed; repeat++) {
      triggerRandomEvent();
    } 
  } else {
    console.log("Earnings already applied for today.");
  }
}

function updateAutoEarnTable() {
  const AutoEarnTableElement = document.getElementById("totalAutoEarn");
  if (AutoEarnTableElement) {
    AutoEarnTableElement.innerHTML = totalAutoEarn;
  }
  const AutoEarnTableDescription = document.getElementById("whatAutoEarn");
  if (AutoEarnTableDescription) {
    AutoEarnTableDescription.innerHTML = whatAutoEarn;
  }
  const totalEarnedAmount = document.getElementById("totalAmountEarned");
  if (totalEarnedAmount) {
    totalEarnedAmount.innerHTML = totalEarned + totalAutoEarn;
  }
  console.log(`tracker table updated`);
}

// Generate description for whatAutoEarn
function getAutoEarningsDescription() {
  let description = '';
  if (cowsAmount > 0) description += `Cows earn: ${cowsAmount} M³/day; `;
  if (cropsAmount > 0) description += `Crops earn: ${Math.floor(cropsAmount * cropsEarnMultiplier)} M³/day; `;
  if (cattleAmount > 0) description += `Cattle earn: ${cattleAmount} M³/day; `;
  if (bullAmount > 0) description += `Bulls earn: ${bullAmount} M³/day; `;
  if (upgradedAmount > 0) description += `Upgraded animals earn: ${upgradedAmount} M³/day; `;
  if (salary > 0) description += `Salary earn: ${salary} M³/day; `;
  if (insuranceAmount > 0) description += `Insurance earn: ${insuranceAmount} M³/day; `;
  if (expenseAmount > 0) description += `Expenses: ${expenseAmount} M³/day; `;
  if (description === '') {
    description = 'No Auto Earnings';
  }
  return description;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("market.html")) {
    loadPricesFromLocalStorage();
  }
  applyAutoEarnings();
});

let changeWhat; // Variable amount to be changed (ie. what is in cowsAmount)
let changeWhatBy; // Amount to be changed by (ie. 5)
let changeName; // Name of the variable to be changed (ie. "cowsAmount")

// Change Auto Earn amounts
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
window.changeAutoEarn = changeAutoEarn;

// Auto Earn Modal Functions
function openModalForCows() {
  document.getElementById("passwordModalForCows").style.display = "block";
}
function closeModalForCows() {
  document.getElementById("passwordModalForCows").style.display = "none";
  document.getElementById("modalPasswordForCows").value = "";
}

// Password to change Auto Earn
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
window.submitPasswordForCows = submitPasswordForCows;

// Update Auto Earn Dashboard
function updateAutoEarnDashboard() {
  updateDashboard();
  updateAutoEarnTable();
  const displayMapping = {
    cattleAmount: `You own: ${cattleAmount}`,
    bullAmount: `You own: ${bullAmount}`,
    upgradedAmount: `You own: ${upgradedAmount}`,
    cowsAmount: `You own: ${cowsAmount}`,
    salary: salary,
    cropsAmount: Math.floor(cropsAmount * cropsEarnMultiplier),
    insuranceAmount: insuranceAmount,
    expenseAmount: expenseAmount,
  };
  
  // Iterate through the mapping and update the elements
  Object.entries(displayMapping).forEach(([className, content]) => {
    const element = document.getElementsByClassName(className)[0];
    if (element) {
      element.innerHTML = content;
    }
  });
}

// Store the already hashed password
let correctPassword = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

// Function to hash entered password
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

window.openModal = openModal;
window.closeModal = closeModal;

// Load header
function loadHeader() {
  fetch('./header.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load header');
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch((error) => {
      console.error('Error loading header:', error);
    });
}
loadHeader();
window.loadHeader = loadHeader; 

// Change Dashboard Titles for Mobile View
function adaptTitles() {
  const gridTitles = document.querySelectorAll('.grid-title');
  const mobileReplacements = ["Coins", "Income", "Losses", "Auto Earn"];
  
  if (window.innerWidth <= 767) { // Mobile view - Use abbreviations
    gridTitles.forEach((title, index) => {
      if (index < 4) { 
        if (!title.dataset.original) {
          title.dataset.original = title.innerHTML;
        }
        const helpIcon = title.querySelector('img');
        const newContent = document.createElement('span');
        newContent.textContent = mobileReplacements[index];
        title.innerHTML = '';
        title.appendChild(newContent);
        if (helpIcon) {
          title.appendChild(helpIcon);
          helpIcon.style.marginLeft = '5px';
          helpIcon.style.verticalAlign = 'middle';
          const iconLink = document.createElement('a');
          iconLink.href = 'autoearn.html';
          iconLink.appendChild(helpIcon.cloneNode(true));
          title.appendChild(iconLink);
          helpIcon.remove()
        }
      }
    });
  } else { // Desktop view - Use full text
    gridTitles.forEach(title => {
      if (title.dataset.original) {
        title.innerHTML = title.dataset.original;
      }
    });
  }
}


// Login functions
const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 10 * 60 * 1000;
if (localStorage.getItem('loginState') === null) {
  localStorage.setItem('loginState', "false");
}
let loginState = localStorage.getItem('loginState');
const wrongPasswordAlertMessage = "It is regrettable that the credentials you have entered into the login form do not correspond with the information we have on records. Please kindly verify that both your username and password are entered accurately, paying close attention to capitalization and spelling, ensuring that Caps Lock is not turned on. If you continue to encounter difficulties, we recommend reviewing your login details or contacting our support services for further assistance. We appreciate your diligence and patience as you attempt to access your account.";

async function login(event) {
  event.preventDefault();
  // Check for lockout
  const failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
  const lockoutUntil = parseInt(localStorage.getItem("lockoutUntil")) || 0;
  const now = Date.now();

  if (lockoutUntil && now < lockoutUntil) {
    const minutesLeft = Math.ceil((lockoutUntil - now) / 60000);
    alert(`Too many failed attempts. Try again in ${minutesLeft} minute(s).`);
    return;
  }

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "Zhongjie" && password === "IsSmart") {
    loginState = "true";
    localStorage.setItem("loginState", loginState);
    localStorage.setItem("loginTimestamp", Date.now());
    localStorage.removeItem("adminState");
    localStorage.removeItem("failedAttempts");
    localStorage.removeItem("lockoutUntil");
    window.location.href = "home.html";
  } else if (username === "Admin") {
    const hashed = await hashPassword(password);
    if (hashed === correctPassword) {
      loginState = "true";
      localStorage.setItem("loginState", loginState);
      localStorage.setItem("loginTimestamp", Date.now());
      localStorage.setItem("adminState", "true");
      localStorage.setItem("controlAccess", "true");
      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("lockoutUntil");
      window.location.href = "control.html";
    } else {
      // Increment failed attempts
      const newAttempts = failedAttempts + 1;
      localStorage.setItem("failedAttempts", newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        localStorage.setItem("lockoutUntil", now + LOCKOUT_TIME);
        alert(wrongPasswordAlertMessage);
        alert("Too many failed attempts. You are locked out for 10 minutes.");
        wrongPassword();
      } else {
        alert(wrongPasswordAlertMessage);
        wrongPassword();
      }
    }
  } else {
    alert("Incorrect password. Please try again.");
  }
}
window.login = login;

window.onload = function() {
  if (window.location.hostname === '127.0.0.1') {
      loginState = "true";
      localStorage.setItem("loginState", loginState);
      localStorage.setItem("loginTimestamp", Date.now());
      localStorage.setItem("adminState", "true");
      localStorage.setItem("controlAccess", "true");
      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("lockoutUntil");
      return; // Skip login check if on localhost
  }
  const loginState = localStorage.getItem("loginState");
  const loginTimestamp = parseInt(localStorage.getItem("loginTimestamp"), 10);
  const adminState = localStorage.getItem("adminState");
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days
  const thirtyMinutes = 30 * 60 * 1000; // 30 minutes

  // Always redirect to login when accessing control.html
  if (window.location.pathname.indexOf("control.html") !== -1) {
    const controlAccess = localStorage.getItem("controlAccess");
    // Only redirect if not admin or session expired
    if (
      controlAccess !== "true" ||
      !loginTimestamp ||
      now - loginTimestamp > thirtyMinutes
    ) {
      localStorage.setItem("loginState", "false");
      localStorage.setItem("controlAccess", "false");
      localStorage.removeItem("loginTimestamp");
      localStorage.removeItem("adminState");
      let pageToAccess = "control";
      localStorage.setItem("pageToAccess", pageToAccess);
      window.location.href = "index.html";
      return;
    }
  }

  // If not on login page, check login expiration
  if (
    window.location.pathname.indexOf("index.html") === -1 &&
    (loginState !== "true" || !loginTimestamp || now - loginTimestamp > sevenDays)
  ) {
    localStorage.setItem("loginState", "false");
    localStorage.removeItem("loginTimestamp");
    localStorage.removeItem("adminState");
    window.location.href = "index.html";
    return;
  }
};

if (window.location.pathname.indexOf("control.html") !== -1) {
  window.addEventListener("beforeunload", function () {
    // Only log out admin if on control.html
    localStorage.setItem("loginState", "false");
    localStorage.setItem("controlAccess", "false");
    localStorage.removeItem("loginTimestamp");
    localStorage.removeItem("adminState");
  });
}

// Logout
function logout() {
  loginState = "false";
  localStorage.setItem("loginState", loginState);
  localStorage.removeItem("loginTimestamp");
  localStorage.removeItem("adminState");
  window.location.href = "index.html";
}
window.logout = logout;

window.addEventListener('load', adaptTitles);
window.addEventListener('resize', adaptTitles);
export {updateAutoEarnTable, calculateDailyEarnings, correctPassword, generateAllPrices, hashPassword, reveal, loadHeader, cowsAmount, cattleAmount, bullAmount, horseAmount, upgradedAmount, sheepAmount, pigAmount, chickenAmount, salary, cropsAmount};