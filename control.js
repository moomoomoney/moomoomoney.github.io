import { updateAutoEarnTable, correctPassword, hashPassword, reveal} from './script.js';
window.reveal = reveal;
// Initialize variables with values from localStorage or default if not set
let coins = parseInt(localStorage.getItem('coins')) || 0;
localStorage.setItem('coins', coins);
let prestige = parseInt(localStorage.getItem('prestige')) || 0;
localStorage.setItem('prestige', prestige);
let income = parseInt(localStorage.getItem('income')) || 0;
let losses = parseInt(localStorage.getItem('losses')) || 0;
let autoearn = parseInt(localStorage.getItem('autoearn')) || 0;
let totalEarned = parseInt(localStorage.getItem('totalEarned')) || 0;
window.totalEarned = totalEarned;
let passwordCorrect = false;
// Function to update the display on the page
function updateDashboard() {
    updateAutoEarnTable();  
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
    const currentPage = window.location.pathname;
    if (currentPage.endsWith("control.html") || currentPage.endsWith("job.html")) {
        updatePrestigeDisplay();
    }
    if (currentPage.endsWith("control.html") || currentPage.endsWith("redeem.html")) {
       updateRedeemDisplay();
    }
    if (currentPage.endsWith("control.html")) {
      updateCouponTracker();
   }
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
    console.log("happeend")
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

// Modal-related functions
function openModal(operation) {
    let whatToDo = operation;
    let passwordCorrect = false; 
    localStorage.setItem('passwordCorrect', passwordCorrect);
    // Only validate inputs for specific actions
    if (!["addCoins", "addPrestige", "addCoupon"].includes(whatToDo)) {
        localStorage.setItem('whatToDo', whatToDo);
        document.getElementById("passwordModal").style.display = "block";
        document.getElementById("errorMessage").style.display = "none";
        return;
    }

    // Validate inputs before proceeding
    const addInput = document.getElementsByClassName(operation)[0];

    // Check if the inputs exist in the DOM
    if (!addInput) {
        console.error("Required input fields not found.");
        alert("Amount required");
        return;
    }
    // Validate the addCoins input
    const addValue = parseInt(addInput.value);
    if (isNaN(addValue) || addValue === 0) {
        alert("Please enter a valid number that isn't 0.");
        return;
    }

    // Proceed to open the modal if all inputs are valid
    localStorage.setItem('whatToDo', whatToDo); 
    console.log(whatToDo);
    document.getElementById("passwordModal").style.display = "block";
    document.getElementById("errorMessage").style.display = "none"; 
}

function closeModal() {
    document.getElementById("passwordModal").style.display = "none";
    document.getElementById("modalPassword").value = ""; // Clear the input
    document.getElementById("errorMessage").style.display = "none"; // Hide error message on close
}

window.openModal = openModal;
window.closeModal = closeModal;

// Coins-related functions
function addCoins() {
    const addCoinsBy = parseInt(document.getElementsByClassName("addCoins")[0].value);
    const reason = document.getElementsByClassName("addReason")[0].value;

    coins += addCoinsBy;
    if (addCoinsBy > 0) {
      addIncome(addCoinsBy);
      totalEarned += addCoinsBy;
      localStorage.setItem('totalEarned', totalEarned);
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

function clearCoins() {
    // Clear the coinsData in localStorage
    localStorage.setItem('coinsData', JSON.stringify([]));

    // Update the tracker table to remove all rows
    const trackerTable = document.getElementById('tracker-table-body');
    trackerTable.innerHTML = '';
  
    let totalAutoEarnReset = 0;
    localStorage.setItem('totalAutoEarn', totalAutoEarnReset);
    // Update the dashboard
    updateDashboard();
}

// Redeem Coupons
function addCoupon() {
    const amountInput = document.querySelector('.add-coins-container input[placeholder="Amount"]');
    const reasonInput = document.querySelector('.add-coins-container input[placeholder="Use"]');
    const amountCoupon = parseInt(amountInput.value, 10); 
    const reason = reasonInput.value.trim();
  
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

function updateCouponTracker() {
    const trackerTableCoupon = document.getElementById('coupon-tracker-table-body');
    if (!trackerTableCoupon) {
        console.error("Element with id 'trackerTableCoupon' not found in the DOM.");
        return; // Exit the function if the element does not exist
    }
    const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];
    console.log("Coupons Data Loaded from localStorage:", couponsData);
    // Clear existing table rows
    trackerTableCoupon.innerHTML = '';
  
    // Populate the table with updated data
    couponsData.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.amount} Redeem Coupon</td> 
        <td>${entry.reason}</td>
      `;
      trackerTableCoupon.appendChild(row);
    });
    console.log("2 Coupons Data Loaded from localStorage:", couponsData);
}

function clearCoupons() {
    // Clear coupon data in localStorage
    localStorage.setItem('couponsData', JSON.stringify([]));
  
    // Clear the tracker table
    updateCouponTracker();
}

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

// Prestige-related functions
function addPrestige() {
    const addPrestigeBy = parseInt(document.getElementsByClassName("addPrestige")[0].value);
    prestige += addPrestigeBy;
    localStorage.setItem('prestige', prestige);
    updatePrestigeDisplay();
    updateDashboard();
    document.getElementsByClassName("addPrestige")[0].value = "";
    document.getElementsByClassName("addReason")[2].value = "";
}

function clearPrestige() {
    prestige = 0;
    localStorage.setItem('prestige', prestige);
    updateDashboard();
    updatePrestigeDisplay()
}

function updatePrestigeDisplay() {
        prestigeBox.innerHTML = `
          You have:
          <b>${prestige} Prestige</b>
        `;
}

// Ensure displays are updated on page load
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
});

// Password-related functions
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
    else {
      let passwordCorrect = true; 
      localStorage.setItem('passwordCorrect', passwordCorrect);
    }
    closeModal();
}
window.submitPassword = submitPassword;

let isWrongPassword = false;
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
      localStorage.setItem('wrongPassword', false); // Set   to false
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
window.submitPasswordWrong = submitPasswordWrong;

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
export function getCoins() {
    return coins;
}

export function setCoins(value) {
    coins = value;
    localStorage.setItem('coins', coins); // Update localStorage
}
export {updateDashboard, wrongPassword, checkWrongPassword, submitPasswordWrong, hashPassword, coins, openModal, closeModal, isWrongPassword, income, prestige, losses, totalEarned, passwordCorrect};