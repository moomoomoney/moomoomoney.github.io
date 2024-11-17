// Initialize variables with values from localStorage or default if not set
let coins = parseInt(localStorage.getItem('coins')) || 230;  // Default to 230 if no value is stored
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

// Admin login function
function enter(event) {
  event.preventDefault();

  const Username = document.getElementById("username").value;
  const Password = document.getElementById("password").value;

  if (Username === "Admin" && Password === correctPassword) {
    window.location.href = "zhongjie-is-dumb.html";
  } else {
    alert("ALERT! YOUR HACKING HAS BEEN NOTED. CONSEQUENCES WILL FOLLOW!!!");
  }
}
