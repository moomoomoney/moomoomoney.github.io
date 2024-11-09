// Initialize variables with values from localStorage, or default if not set
let coins = parseInt(localStorage.getItem('coins')) || 230;  // Default to 230 if no value is stored
let income = 12;  // Today's Income (this value isn't stored in localStorage)
let losses = 0;   // Today's Losses (this value isn't stored in localStorage)
let auto = 0;     // Auto Earnings (this value isn't stored in localStorage)

// Function to update the display on the page
function updateDashboard() {
  document.getElementsByClassName("coins")[0].innerHTML = coins + " M³";
  document.getElementsByClassName("income")[0].innerHTML = income + " M³";
  document.getElementsByClassName("losses")[0].innerHTML = losses + " M³";
  document.getElementsByClassName("auto")[0].innerHTML = auto + " M³";
}

// Function to add coins
function addCoins() {
  // Get the value entered by the user from the input field
  const addCoinsBy = parseInt(document.getElementsByClassName("addCoins")[0].value);

  // Add the entered amount to the current coins
  coins += addCoinsBy;

  // Save the updated coins value in localStorage
  localStorage.setItem('coins', coins);

  // Update the coins display on the page
  updateDashboard();

  // Clear the input field after adding coins
  document.getElementsByClassName("addCoins")[0].value = "";
}

// Call the updateDashboard function to set the correct values on page load
updateDashboard();

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
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the input fields
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check credentials
  if (username === "Zhongjie" && password === "IsSmart") {
    // Redirect to home.html
    window.location.href = "home.html";
  } else {
    alert("Password or username incorrect.");
  }
}
