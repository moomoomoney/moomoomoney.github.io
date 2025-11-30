import { updateAutoEarnTable, correctPassword, hashPassword, reveal } from './script.js';
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
  // For coins, income, auto
  const coinsElem = document.querySelector('.coins');
  if (parseFloat(coinsElem.textContent) < 0) coinsElem.classList.add('negative');

  // For losses
  const lossesElem = document.querySelector('.losses');
  if (parseFloat(lossesElem.textContent) > 1) lossesElem.classList.add('high-loss');
  else lossesElem.classList.remove('high-loss');

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
export function addIncome(amount) {
  income += amount;
  localStorage.setItem('income', income);
  console.log(`Income after addition: ${income}`);
  updateDashboard();
}

// Function to add losses
export function addLosses(amount) {
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

  const addInput = document.getElementsByClassName(operation)[0];
  if (!addInput) {
    console.error("Required input fields not found.");
    alert("Amount required");
    return;
  }
  const addValue = parseInt(addInput.value);
  if (isNaN(addValue) || addValue === 0) {
    alert("Please enter a valid number that isn't 0.");
    return;
  }

  localStorage.setItem('whatToDo', whatToDo);
  console.log(whatToDo);
  document.getElementById("passwordModal").style.display = "block";
  document.getElementById("errorMessage").style.display = "none";
}

function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("modalPassword").value = ""; 
  document.getElementById("errorMessage").style.display = "none"; 
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

  let coinsData = JSON.parse(localStorage.getItem('coinsData')) || [];
  const date = new Date();
  coinsData.push({
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    amount: addCoinsBy,
    reason: reason
  });
  localStorage.setItem('coinsData', JSON.stringify(coinsData));

  localStorage.setItem('coins', coins);
  updateDashboard();
  document.getElementsByClassName("addCoins")[0].value = "";
  document.getElementsByClassName("addReason")[0].value = ""; 

  updateTracker();
}

function clearCoins() {
  localStorage.setItem('coinsData', JSON.stringify([]));
  const trackerTable = document.getElementById('tracker-table-body');
  trackerTable.innerHTML = '';
  let totalAutoEarnReset = 0;
  localStorage.setItem('totalAutoEarn', totalAutoEarnReset);
  updateDashboard();
}

// Redeem Coupons
function addCoupon() {
  const amountInput = document.querySelector('.add-coins-container input[placeholder="Amount"]');
  const reasonInput = document.querySelector('.add-coins-container input[placeholder="Use"]');
  const amountCoupon = parseInt(amountInput.value, 10);
  const reason = reasonInput.value.trim();
  const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];

  const newCoupon = {
    date: new Date().toLocaleDateString(),
    amount: amountCoupon,
    reason: reason
  };

  couponsData.push(newCoupon);
  localStorage.setItem('couponsData', JSON.stringify(couponsData));

  amountInput.value = '';
  reasonInput.value = '';
  updateCouponTracker();
}

function updateCouponTracker() {
  const trackerTableCoupon = document.getElementById('coupon-tracker-table-body');
  if (!trackerTableCoupon) {
    console.error("Element with id 'trackerTableCoupon' not found in the DOM.");
    return; 
  }
  const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];
  console.log("Coupons Data Loaded from localStorage:", couponsData);
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
  localStorage.setItem('couponsData', JSON.stringify([]));
  updateCouponTracker();
}

function updateRedeemDisplay() {
  const redeemBox = document.querySelector('.box');
  const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];
  const totalRedeemed = couponsData.reduce((sum, coupon) => sum + coupon.amount, 0);
  if (totalRedeemed < 1) {
    redeemBox.style.display = "none"; 
    return;
  }
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

export function increasePrestige(amount) {
  const n = parseInt(amount, 10) || 0;
  if (n === 0) return;
  prestige += n;
  localStorage.setItem('prestige', prestige);
  updatePrestigeDisplay();
  updateDashboard();
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

document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
});

// Password-related functions
async function submitPassword() {
  const password = document.getElementById("modalPassword").value;
  const hashedPassword = await hashPassword(password);

  if (hashedPassword !== correctPassword) {
    document.getElementById("errorMessage").style.display = "block"; 
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
  isWrongPassword = true; 
  localStorage.setItem('wrongPassword', isWrongPassword);
  document.getElementById("passwordModal2").style.display = "block";
}

async function submitPasswordWrong() {
  const passwordInput = document.getElementById("modalPasswordWrong").value; 
  const hashedPassword = await hashPassword(passwordInput); 
  if (hashedPassword === correctPassword) {
    // Password is correct
    console.log("Password is correct!");
    document.getElementById("modalPasswordWrong").value = "";
    localStorage.setItem('wrongPassword', false); e
    const BigBadBox = document.getElementById("BigBadBox");
    const passwordModal = document.getElementById("passwordModal2");

    if (BigBadBox) {
      BigBadBox.style.display = "none"; 
    }
    if (passwordModal) {
      passwordModal.style.display = "none"; 
    }
  } else {
    // Password is incorrect
    console.log("Password is incorrect. Try again.");
    alert("Incorrect password. Please try again."); 
    document.getElementById("modalPasswordWrong").value = ""; 
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
  localStorage.setItem('coins', coins); 
}

export { updateDashboard, wrongPassword, checkWrongPassword, submitPasswordWrong, hashPassword, coins, openModal, closeModal, isWrongPassword, income, prestige, losses, totalEarned, passwordCorrect, updateCouponTracker, updatePrestigeDisplay, addPrestige };