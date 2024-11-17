// Initialize variables with Firebase data or default if not set
let coins = 320;  // Default to 230 if no value is stored
let income = 0;   // Default to 0 if no value is stored
let losses = 0;   // Default to 0 if no value is stored
let auto = 0;     // Auto Earnings 

// Firebase reference to coins
const coinsRef = firebase.database().ref("coins");

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

  // Update coinsData in Firebase for tracking
  let coinsData = JSON.parse(localStorage.getItem('coinsData')) || [];
  const date = new Date();
  coinsData.push({
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    amount: addCoinsBy,
    reason: reason
  });
  localStorage.setItem('coinsData', JSON.stringify(coinsData));

  // Save coins to Firebase
  coinsRef.update({ coins: coins });
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

// Fetch the coin data when the page loads
fetchCoinData();
