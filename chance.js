import {coins, income, losses, prestige, getCoins, setCoins, wrongPassword, checkWrongPassword, passwordCorrect, submitPasswordWrong, hashPassword, openModal, closeModal, isWrongPassword} from './control.js';
import {correctPassword, cowsAmount, cattleAmount, bullAmount, horseAmount, upgradedAmount, sheepAmount, pigAmount, chickenAmount, salary, cropsAmount} from './script.js';
// Define random events and their effects
const randomEvents = [
    {
      name: "Robbery",
      description: "You were robbed!",
      effect: () => {
        const coins = getCoins();
        const loss = Math.floor(coins * 0.1);
        setCoins(coins - loss);
        alert(`Robbery! You lost ${loss} M³.`);
      },
    },
    {
        name: "Land Destruction",
        description: "Your land was robbed or destroyed by intruders! You need to pay money to repair your property.",
        effect: () => {
          const coins = getCoins();
          const min = 10;
          const max = Math.max(min, Math.floor(coins / 10)); 
          const loss = Math.floor(Math.random() * (max - min + 1)) + min;
          setCoins(coins - loss);
          alert(`Land Destruction! You lost ${loss} M³.`);
        },
      },
    {
        name: "Animal Robbery",
        description: "Your animals were robbed! You lost 25% of your animals.",
        effect: () => {
        const animals = cowsAmount + cattleAmount+ horseAmount + upgradedAmount + bullAmount + sheepAmount + pigAmount + chickenAmount;
          const loss = Math.floor(animals * 0.25);
          setCoins(animals - loss);
          alert(`Robbery! You lost ${loss} animals.`);
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
      description: "You had a great harvest! Your crops earn 25% more.",
      effect: () => {
        const gain = Math.floor(cropsAmount * 0.25);
        cropsAmount += gain;
        localStorage.setItem("cropsAmount", cropsAmount);
        alert(`Harvest! Your crops earned ${gain}M³ more money.`);
      },
    },

    // Money and Working Related Events
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
      description: "You gained prestige!",
      effect: () => {
        const gain = Math.floor(Math.random() * 5); 
        prestige += gain;
        localStorage.setItem("prestige", prestige);
        alert(`Gaining Prestige! Your prestige has increased by ${gain}.`);
      },
    },
  ];

  // Health Related Events
  const healthEvents = [
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
  ];
  
  let randomEventMessage;
  // Trigger a random event with a 1% chance
  function triggerRandomEvent() {
    const chance = Math.random(); // Generates a random number between 0 and 1
    if (chance > 1 ) { // Testing only, change to 0.01 for actual use
      console.log("No event triggered. Chance was greater than 1%.");
      return; // Exit the function if the chance is greater than 1%
    }
    const randomIndex = Math.floor(Math.random() * randomEvents.length);
    const event = randomEvents[randomIndex];
    console.log(`Event Triggered: ${event.name}`);
    displayEventMessage();
    // Alert event in HTML
    randomEventMessage = event.description;
    localStorage.setItem("randomEventMessage", randomEventMessage);
    document.getElementById("randomEventMessage").innerText = randomEventMessage;
  }

function applyEffect() {
    openModal(); // Open the modal for password input

    const interval = setInterval(() => {
        const passwordCorrect = localStorage.getItem('passwordCorrect') === "true";
        const wrongPassword = localStorage.getItem('wrongPassword') === "true";

        if (passwordCorrect) {
            clearInterval(interval); // Stop the interval
            console.log("Password is correct. Applying Effect...");
            document.getElementById("alert").style.display = "none"; // Hide the alert

            // Retrieve the random event and apply its effect
            const randomEventMessage = localStorage.getItem("randomEventMessage");
            const event = randomEvents.find(e => e.description === randomEventMessage);
            if (event && typeof event.effect === "function") {
                event.effect(); // Apply the effect of the event
            } else {
                console.error("No matching event found or effect is not a function.");
            }
        } else if (wrongPassword) {
            clearInterval(interval); // Stop the interval
            console.log("Password is incorrect. Action canceled.");
            document.getElementById("errorMessage").style.display = "block"; // Show error message
        }
    }, 100); // Check every 100ms
}

function displayEventMessage() {
    const message = localStorage.getItem("randomEventMessage");
    if (message) {
    document.getElementById("alert").style.display = "block"; // Show the alert element
    document.getElementById("randomEventMessage").innerText = message;
    }
  }

function cancelEvent() {
    openModal(); // Open the modal for password input
    // Check is password is correct
    const interval = setInterval(() => {
        const passwordCorrect = localStorage.getItem('passwordCorrect') === "true"; 
        if (passwordCorrect) { 
            clearInterval(interval); // Stop the interval
            console.log("Password is correct. Proceeding...");
            document.getElementById("alert").style.display = "none"; // Hide the alert
        } else if (localStorage.getItem('wrongPassword') === "true") { 
            clearInterval(interval); // Stop the interval
            console.log("Password is incorrect. Action canceled.");
        }
    }, 100); // Check every 100ms
}

window.displayEventMessage = displayEventMessage;
window.cancelEvent = cancelEvent;
window.applyEffect = applyEffect;
window.triggerRandomEvent = triggerRandomEvent;
  
export {triggerRandomEvent};