// Update Homescreen
var coins = "206 M³"  // Available Coins
var income = "74 M³"; // Today's Income
var losses = "0 M³"; //Today's losses
var auto = "0 M³";   //Auto Earnings

// Get the elements by class name
const coinsElement = document.getElementsByClassName("coins")[0];
const incomeElement = document.getElementsByClassName("income")[0];
const lossesElement = document.getElementsByClassName("losses")[0];
const autoElement = document.getElementsByClassName("auto")[0];

// Update the inner HTML of each element
coinsElement.innerHTML = coins;
incomeElement.innerHTML = income;
lossesElement.innerHTML = losses;
autoElement.innerHTML = auto;

function reveal(id) {
    const element = document.getElementById(id);
    element.style.display = element.style.display === "none" ? "" : "none";
  }

// Refresh
function refresh() {
  window.location.reload();
}
