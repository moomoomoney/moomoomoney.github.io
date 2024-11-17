// Initialize variables with values from localStorage or default if not set
let coins = parseInt(localStorage.getItem('coins')) || 230;  // Default to 230 if no value is stored
let income = parseInt(localStorage.getItem('income')) || 0;  // Default to 13 if no value is stored
let losses = parseInt(localStorage.getItem('losses')) || 0;   // Default to 0 if no value is stored
let auto = 0;     // Auto Earnings (this value isn't stored in localStorage)

// Function to update the display on the page
function updateDashboard() {
  document.getElementsByClassName("coins")[0].innerHTML = coins + " M³";
  document.getElementsByClassName("income")[0].innerHTML = income + " M³";
  document.getElementsByClassName("losses")[0].innerHTML = losses + " M³";
  document.getElementsByClassName("auto")[0].innerHTML = auto + " M³";
}

// Fetch coin data from Firebase
function fetchCoinData() {
  coinsRef.once('value').then(snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      coins = data.coins || 230;  // Default to 230 if undefined
      income = data.income || 0;  // Default to 0 if undefined
      losses = data.losses || 0;  // Default to 0 if undefined
      updateDashboard();
    } else {
      // If no data exists in Firebase, initialize with defaults
      coinsRef.set({ coins: 230, income: 0, losses: 0 });
      updateDashboard();
    }
  }).catch(error => {
    console.error("Error fetching coin data: ", error);
  });
}

// Add income to Firebase
function addIncome(amount) {
  income += amount;
  coinsRef.update({ income: income });
  updateDashboard();
}

// Add losses to Firebase
function addLosses(amount) {
  losses += amount;
  coinsRef.update({ losses: losses });
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

// Handle password submission
function submitPassword() {
  const password = document.getElementById("modalPassword").value;
  
  if (password !== correctPassword) {
    document.getElementById("errorMessage").style.display = "block"; // Show error message
    return;
  }

  // If password is correct, add coins
  closeModal();
  const addCoinsBy = parseInt(document.getElementsByClassName("addCoins")[0].value);
  if (isNaN(addCoinsBy)) {
    alert("Please enter a valid number.");
    return;
  }
  coins += addCoinsBy;
  if (addCoinsBy > 0) {
    addIncome(addCoinsBy);
  } else {
    let lostCoinsBy = addCoinsBy * -1;
    addLosses(lostCoinsBy);
  }

  localStorage.setItem('coins', coins);
  updateDashboard();
  document.getElementsByClassName("addCoins")[0].value = "";
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

// Alternative login function for Admin
function enter(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the input fields
  const Username = document.getElementById("username").value;
  const Password = document.getElementById("password").value;

  // Check credentials
  if (Username === "Admin" && Password === correctPassword) {
    // Redirect to home.html
    window.location.href = "zhongjie-is-dumb.html";
  } else {
    alert("ALERT! YOUR HACKING HAS BEEN NOTED. CONSEQUENCES WILL FOLLOW!!!");
  }
}
