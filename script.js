import {updateDashboard, wrongPassword, coins, income, losses, openModal, closeModal, getCoins, setCoins, isWrongPassword} from './control.js';

document.addEventListener('DOMContentLoaded', (event) => {
  // Display amounts from localStorage or defaults
  updateAutoEarnDashboard();
});

// Total Auto Earn Variable
let totalAutoEarn = parseInt(localStorage.getItem('totalAutoEarn')) || 0;
localStorage.setItem('totalAutoEarn', totalAutoEarn);  

// Amount of Auto Earn Options owned
let cowsAmount = parseInt(localStorage.getItem('cowsAmount'));  
localStorage.setItem('cowsAmount', cowsAmount); 
let cattleAmount = parseInt(localStorage.getItem('cattleAmount'));
localStorage.setItem('cattleAmount', cattleAmount); 
let bullAmount = parseInt(localStorage.getItem('bullAmount')) ;
localStorage.setItem('bullAmount', bullAmount); 
let upgradedAmount = parseInt(localStorage.getItem('upgradedAmount'));
localStorage.setItem('upgradedAmount', upgradedAmount); 
let salary = parseInt(localStorage.getItem('salary')) ;
localStorage.setItem('salary', salary); 
let cropsAmount = parseInt(localStorage.getItem('cropsAmount')) ;
localStorage.setItem('cropsAmount', cropsAmount); 
let insuranceAmount = parseInt(localStorage.getItem('insuranceAmount'));
localStorage.setItem('insuranceAmount', insuranceAmount); 
let expenseAmount = parseInt(localStorage.getItem('expenseAmount'));
localStorage.setItem('expenseAmount', expenseAmount);  
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
    salary + cropsAmount - insuranceAmount - expenseAmount
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
  // Retrieve the current price from localStorage
  let currentPrice = parseInt(localStorage.getItem(itemKey));

  if (isNaN(currentPrice)) {
    // If the item doesn't exist in localStorage, generate an initial price
    const initialPrice = Math.random() < 0.25 ? basePrice : Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    localStorage.setItem(itemKey, initialPrice); // Save the initial price to localStorage
    return initialPrice;
  } else {
    // 25% chance the price stays the same
    if (Math.random() < 0.25) {
      return currentPrice; 
    }
    // Adjust the price daily by ±100, ensuring it stays within bounds
    const adjustment = Math.floor(Math.random() * 201) - 100; 
    const newPrice = currentPrice + adjustment;
    const boundedPrice = Math.max(minPrice, Math.min(maxPrice, newPrice)); // Ensure it stays within bounds
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
  generatePrice('horsePrice', 400, 1000, 2000);
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

function loadPricesFromLocalStorage() {
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
    const price = parseInt(localStorage.getItem(key)) || 0; // Default to 0 if not found
    const element = document.getElementById(key);
    if (element) {
      element.innerHTML = `(${price} M³)`;
    }
  });
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
window.reveal = reveal;

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
  let daysMissed = Math.floor((today - lastEarnedDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate the number of missed days

  if (daysMissed > 0) {
    console.log(`Applying earnings for ${daysMissed} missed days.`);
    console.log("Initial coins:", getCoins());
    const dailyEarnings = calculateDailyEarnings();
    setCoins(getCoins() + dailyEarnings * daysMissed);
    console.log("Updated coins:", getCoins());
    localStorage.setItem('coins', coins); // Update coins in localStorage
    localStorage.setItem('lastEarned', today.toString()); // Update lastEarned to today
    console.log(`Auto earnings of ${dailyEarnings * daysMissed} M³ applied.`);

    // Update other relevant data
    totalAutoEarn = parseInt(localStorage.getItem('totalAutoEarn')) || 0;
    totalAutoEarn += autoearn * daysMissed; // Add auto earnings for missed days
    localStorage.setItem("totalAutoEarn", totalAutoEarn);
    if (autoearn > 0) {
    income += autoearn;
    localStorage.setItem("income", income);
    }
    if (autoearn < 0) {
      losses += autoearn; 
      localStorage.setItem("losses", losses)
    }

    // Update the UI
    updateAutoEarnTable();
    updateTracker();
    console.log("Calling updatePrices...");
    if (window.location.pathname.endsWith("market.html")) {
      updatePrices();
  }
    updateDashboard();
    console.log(`Prices updated, or at least UpdatePrices called`);
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
  console.log(`tracker table updated`);
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
  if (window.location.pathname.endsWith("market.html")) {
    loadPricesFromLocalStorage();
  }
  applyAutoEarnings();
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
window.changeAutoEarn = changeAutoEarn;

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
window.submitPasswordForCows = submitPasswordForCows;

// Function to update the display on the page
function updateAutoEarnDashboard() {
  updateDashboard();
  updateAutoEarnTable();// Mapping of class names to their corresponding values
  const displayMapping = {
    cattleAmount: `You own: ${cattleAmount} M³`,
    bullAmount: `You own: ${bullAmount} M³`,
    upgradedAmount: `You own: ${upgradedAmount} M³`,
    cowsAmount: `You own: ${cowsAmount} M³`,
    salary: salary,
    cropsAmount: cropsAmount,
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
let correctPassword = "3258ca0784cae2e33e086306589ecaa8e36920e38c10df23d48b16d8924f1256";

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

// Define random events and their effects
const randomEvents = [
  {
    name: "Robbery",
    description: "You were robbed! Lost 10% of your coins.",
    effect: () => {
      const coins = getCoins();
      const loss = Math.floor(coins * 0.1);
      setCoins(coins - loss);
      alert(`Robbery! You lost ${loss} M³.`);
    },
  },
  {
    name: "Famine",
    description: "A famine occurred! Lost 20% of your crops.",
    effect: () => {
      const loss = Math.floor(cropsAmount * 0.2);
      cropsAmount -= loss;
      localStorage.setItem("cropsAmount", cropsAmount);
      alert(`Famine! You lost ${loss} crops.`);
    },
  },
  {
    name: "Sickness",
    description: "Sickness struck your animals! Lost 10% of your cattle.",
    effect: () => {
      const loss = Math.floor(cattleAmount * 0.1);
      cattleAmount -= loss;
      localStorage.setItem("cattleAmount", cattleAmount);
      alert(`Sickness! You lost ${loss} cattle.`);
    },
  },
  {
    name: "Injury",
    description: "You got injured! Lost 5% of your salary.",
    effect: () => {
      const loss = Math.floor(salary * 0.05);
      salary -= loss;
      localStorage.setItem("salary", salary);
      alert(`Injury! You lost ${loss} M³ from your salary.`);
    },
  },
  {
    name: "Animal Sickness",
    description: "Your animals got sick! Lost 15% of your bulls.",
    effect: () => {
      const loss = Math.floor(bullAmount * 0.15);
      bullAmount -= loss;
      localStorage.setItem("bullAmount", bullAmount);
      alert(`Animal Sickness! You lost ${loss} bulls.`);
    },
  },
  {
    name: "Market Price Increase",
    description: "Market prices increased! Your assets are worth more.",
    effect: () => {
      generateAllPrices(); // Regenerate prices
      alert("Market prices increased! Check the market for new prices.");
    },
  },
  {
    name: "Market Price Decrease",
    description: "Market prices decreased! Your assets are worth less.",
    effect: () => {
      generateAllPrices(); // Regenerate prices
      alert("Market prices decreased! Check the market for new prices.");
    },
  },
  {
    name: "Harvest",
    description: "You had a great harvest! Gained 20% more crops.",
    effect: () => {
      const gain = Math.floor(cropsAmount * 0.2);
      cropsAmount += gain;
      localStorage.setItem("cropsAmount", cropsAmount);
      alert(`Harvest! You gained ${gain} crops.`);
    },
  },
  {
    name: "Finding Money",
    description: "You found some money! Gained 100 M³.",
    effect: () => {
      const gain = 100;
      setCoins(getCoins() + gain);
      alert(`You found money! Gained ${gain} M³.`);
    },
  },
  {
    name: "Finding Redeem Coupon",
    description: "You found a redeem coupon! Gained 50 M³.",
    effect: () => {
      const gain = 50;
      setCoins(getCoins() + gain);
      alert(`You found a redeem coupon! Gained ${gain} M³.`);
    },
  },
  {
    name: "Gaining Prestige",
    description: "You gained prestige! Your salary increased by 10%.",
    effect: () => {
      const gain = Math.floor(salary * 0.1);
      salary += gain;
      localStorage.setItem("salary", salary);
      alert(`Gaining Prestige! Your salary increased by ${gain} M³.`);
    },
  },
];

// Trigger a random event with a 1% chance
function triggerRandomEvent() {
  const chance = Math.random(); // Generates a random number between 0 and 1
  if (chance > 0.01) {
    console.log("No event triggered. Chance was greater than 1%.");
    return; // Exit the function if the chance is greater than 1%
  }

  const randomIndex = Math.floor(Math.random() * randomEvents.length);
  const event = randomEvents[randomIndex];
  console.log(`Event Triggered: ${event.name}`);
  alert(event.description);
  event.effect();
}

// Example: Trigger a random event once per day
document.addEventListener("DOMContentLoaded", () => {
  const lastEventDate = localStorage.getItem("lastEventDate");
  const today = new Date().toDateString();

  if (lastEventDate !== today) {
    triggerRandomEvent();
    localStorage.setItem("lastEventDate", today);
  }
});

window.triggerRandomEvent = triggerRandomEvent;

// Load the header dynamically
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

// Call the function to load the header
loadHeader();
window.loadHeader = loadHeader;
export {updateAutoEarnTable, calculateDailyEarnings, correctPassword, hashPassword, reveal, loadHeader};