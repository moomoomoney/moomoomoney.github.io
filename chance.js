import { coins, income, losses, prestige, getCoins, setCoins, wrongPassword, checkWrongPassword, passwordCorrect, submitPasswordWrong, hashPassword, openModal, closeModal, isWrongPassword } from './control.js';
import { correctPassword, cowsAmount, cattleAmount, bullAmount, horseAmount, upgradedAmount, sheepAmount, pigAmount, chickenAmount, salary, cropsAmount, generateAllPrices, loadPricesFromLocalStorage } from './script.js';

// Track month
function getCurrentMonthKey() {
  return new Date().getMonth();
}
window.getCurrentMonthKey = getCurrentMonthKey

function checkForNewMonth() {
  const currentMonth = getCurrentMonthKey();
  const lastMonth = Number(localStorage.getItem('lastActiveMonth'));

  if (lastMonth !== currentMonth) {
    localStorage.setItem('priceChangeMultiplier', 1.0);
    localStorage.setItem('cropsEarnMultiplier', 1.0);
    localStorage.setItem('lastActiveMonth', currentMonth);
  }
}
window.checkForNewMonth = checkForNewMonth;

// Random Events
const randomEvents = [
  {
    name: "Robbery",
    description: "You were robbed! You lost 10% of your coins.",
    effect: () => {
      const coins = getCoins();
      const loss = Math.floor(coins * 0.1);
      setCoins(coins - loss);
      localStorage.setItem("loss", loss);

      // Update Tracker Table
      let coinsData = JSON.parse(localStorage.getItem('coinsData')) || [];
      const date = new Date();
      coinsData.push({
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        amount: -loss,
        reason: "Random Event: Robbery"
      });
      localStorage.setItem('coinsData', JSON.stringify(coinsData));
    },
    alert: () => {
      const loss = localStorage.getItem("loss") || 0;
      localStorage.setItem("loss", 0);
      return `You were robbed! You lost ${loss}M³.`;
    }
  },
  {
    name: "Land Destruction",
    description: "Your land was destroyed by intruders or natural disasters! A portion of your land value was lost, and you need to pay for repairs.",
    effect: () => {
      const coins = getCoins();
      // Calculate random percentage between 10% and 20%
      const percentage = (Math.random() * (20 - 10) + 10).toFixed(2);
      // Calculate loss and round to 2 decimals
      const loss = parseInt((coins * (percentage / 100)).toFixed(2));
      setCoins(coins - loss);
      localStorage.setItem("loss", loss);
      localStorage.setItem("loss_percentage", percentage);

      // Update Tracker Table
      let coinsData = JSON.parse(localStorage.getItem('coinsData')) || [];
      const date = new Date();
      coinsData.push({
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        amount: -loss,
        reason: "Random Event: Land Destruction"
      });
      localStorage.setItem('coinsData', JSON.stringify(coinsData));
    },
    alert: () => {
      const loss = localStorage.getItem("loss") || 0;
      const percentage = localStorage.getItem("loss_percentage") || 0;
      localStorage.removeItem("loss");
      localStorage.removeItem("loss_percentage");
      return `Your land was destroyed! You lost ${percentage}% of your land value and paid (${loss} M³) to repair your property.`;
    }
  },
  {
    name: "Animal Robbery",
    description: "Your animals were robbed! You lost 25% of your animals.",
    effect: () => {
      const animals = cowsAmount + cattleAmount + horseAmount + upgradedAmount + bullAmount + sheepAmount + pigAmount + chickenAmount;
      const loss = Math.floor(animals * 0.25);
      localStorage.setItem("loss", loss);
    },
    alert: () => {
      const loss = localStorage.getItem("loss") || 0;
      localStorage.setItem("loss", 0);
      return `Your animals were robbed! You lost ${loss} animal(s).`;
    }
  },
  {
    name: "Random Item",
    description: "A friend gifted you with an item! What do you do with the item?",
    effect: () => {
      alert("Redirecting to Control System to apply effect...")
      window.location.href = "control.html";
    },
    alert: () => {
      return `A friend gifted you with an item! You can start using it now!`;
    }
  },
    {
    name: "Broken Item",
    description: "Oh no! One of your items broke! You need to buy it again.",
    effect: () => {
      alert("Redirecting to Control System to apply effect...")
      window.location.href = "control.html";
    },
    alert: () => {
      return `Oh no! One of your items broke! You bought it again.`;
    }
  },
  {
    name: "Famine",
    description: "A famine occurred! You're crops earn 20% less for the remainder of the year.",
    effect: () => {
      let cropsEarn = localStorage.getItem("cropsAmount") || 0;
      const loss = Math.floor(cropsEarn * 0.2);
      cropsEarn -= loss;
      localStorage.setItem("cropsAmount", cropsEarn);
    },
    alert: () => {
      let cropsEarn = localStorage.getItem("cropsAmount") || 0;
      return `A famine occurred! Your crops now earn ${cropsEarn} M³.`;
    }
  },
  {
    name: "Market Price Increase",
    description: "Market prices increased! Your assets are worth more until the end of the year.",
    effect: () => {
      checkForNewMonth();
      let priceChangeMultiplier = localStorage.getItem("priceChangeMultiplier") || 1.0;
      priceChangeMultiplier *= Math.round((1.1 + Math.random() * 0.4) * 100) / 100;
      localStorage.setItem("priceChangeMultiplier", priceChangeMultiplier);
      localStorage.setItem('lastActiveMonth', getCurrentMonthKey());
      loadPricesFromLocalStorage();
      let cropsEarnMultiplier = Number(localStorage.getItem("cropsEarnMultiplier")) || 1;
      cropsEarnMultiplier *= priceChangeMultiplier;
      localStorage.setItem("cropsEarnMultiplier", cropsEarnMultiplier);
    },
    alert: () => {
      let cropsEarn = localStorage.getItem("cropsAmount") || 0;
      const multiplier = localStorage.getItem("priceChangeMultiplier") || 1;
      let cropsEarnMultiplier = Number(localStorage.getItem("cropsEarnMultiplier")) || 1;
      return `Market prices increased by ${((multiplier - 1) * 100).toFixed(0)}%! Check the market for new prices. Your crops now sell for ${Math.floor(cropsEarn * cropsEarnMultiplier)} M³.`;
    }
  },
  {
    name: "Market Price Decrease",
    description: "Market prices decreased! Your assets are worth less until the end of the year.",
    effect: () => {
      checkForNewMonth();
      let priceChangeMultiplier = localStorage.getItem("priceChangeMultiplier") || 1.0;
      priceChangeMultiplier *= Math.round((0.6 + Math.random() * 0.3) * 100) / 100;
      localStorage.setItem("priceChangeMultiplier", priceChangeMultiplier);
      localStorage.setItem('lastActiveMonth', getCurrentMonthKey());
      loadPricesFromLocalStorage();
      let cropsEarnMultiplier = Number(localStorage.getItem("cropsEarnMultiplier")) || 1;
      cropsEarnMultiplier *= priceChangeMultiplier;
      localStorage.setItem("cropsEarnMultiplier", cropsEarnMultiplier);
    },
    alert: () => {
      let cropsEarn = localStorage.getItem("cropsAmount") || 0;
      let cropsEarnMultiplier = Number(localStorage.getItem("cropsEarnMultiplier")) || 1;
      const multiplier = localStorage.getItem("priceChangeMultiplier") || 1;
      localStorage.setItem("loss", 0);
      return `Market prices decreased by ${((1 - multiplier) * 100).toFixed(0)}%! Check the market for new prices. Your crops now sell for ${Math.floor(cropsEarn * cropsEarnMultiplier)} M³.`;
    }
  },
  {
    name: "Harvest",
    description: "You had a great harvest! Your crops earn 25% more until the end of the year.",
    effect: () => {
      checkForNewMonth();
      let cropsEarnMultiplier = Number(localStorage.getItem("cropsEarnMultiplier")) || 1;
      localStorage.setItem('lastActiveMonth', getCurrentMonthKey());
      cropsEarnMultiplier *= 1.25;
      localStorage.setItem("cropsEarnMultiplier", cropsEarnMultiplier);
    },
    alert: () => {
      let cropsEarn = localStorage.getItem("cropsAmount") || 0;
      let cropsEarnMultiplier = Number(localStorage.getItem("cropsEarnMultiplier")) || 1;
      return `You had a great harvest! Your crops now earn ${Math.floor(cropsEarn * cropsEarnMultiplier)} M³.`;
    }
  },

  // Money and Working Related Events
  {
    name: "Finding Money",
    description: "You found some money on the ground!",
    effect: () => {
      const gain = parseInt(Math.random() < 0.5 ? 5 : 50);
      setCoins(getCoins() + gain);
      localStorage.setItem("gain", gain);

      // Update Tracker Table
      let coinsData = JSON.parse(localStorage.getItem('coinsData')) || [];
      const date = new Date();
      coinsData.push({
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        amount: gain,
        reason: "Random Event: Finding Money"
      });
      localStorage.setItem('coinsData', JSON.stringify(coinsData));
    },
    alert: () => {
      const gain = localStorage.getItem("gain") || 0;
      localStorage.setItem("gain", 0);
      return `You found some money! You gained ${gain} M³.`;
    }
  },
  {
    name: "Finding Redeem Coupon",
    description: "You recieved a redeem coupon at the market!",
    effect: () => {
      const gain = parseInt(Math.random() < 0.5 ? 15 : 100);
      localStorage.setItem("gain", gain);

      // Update Tracker Table
      const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];
      const newCoupon = {
        date: new Date().toLocaleDateString(),
        amount: gain,
        reason: "Random Event: Finding Redeem Coupon"
      };
      couponsData.push(newCoupon);
      localStorage.setItem('couponsData', JSON.stringify(couponsData));
    },
    alert: () => {
      const gain = localStorage.getItem("gain") || 0;
      localStorage.setItem("gain", 0);
      return `You found a redeem coupon! You gained ${gain} redeem coupons.`;
    }
  },
  {
    name: "Gaining Prestige",
    description: "You did great at work and gained prestige!",
    effect: () => {
      let prestige = parseInt(localStorage.getItem("prestige")) || 0;
      const gain = Math.floor(Math.random() * 5);
      prestige += gain;
      localStorage.setItem("prestige", prestige);
      localStorage.setItem("gain", gain);

    },
    alert: () => {
      let prestige = parseInt(localStorage.getItem("prestige")) || 0;
      const gain = localStorage.getItem("gain") || 0;
      localStorage.setItem("gain", 0);
      return `You gained ${gain} prestige! You now have ${prestige} prestige.`;
    }
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

function triggerRandomEvent() {
  const chance = Math.random();
  if (chance > 0.05) { 
    console.log("No event triggered. Chance was greater than 1%.");
    return;
  }
  const randomIndex = Math.floor(Math.random() * randomEvents.length);
  const event = randomEvents[randomIndex];
  console.log(`Event Triggered: ${event.name}`);
  // Show the event description
  localStorage.setItem("randomEventMessage", event.description);
  localStorage.removeItem("randomEventMessageTimestamp");
  localStorage.setItem("eventState", "pending");
  document.getElementById("randomEventMessage").innerText = event.description;
  document.getElementById("alert").style.display = "block";
  const actions = document.getElementsByClassName("alert-actions")[0];
  if (actions) actions.style.display = "inline-block";
}

function applyEffect() {
  openModal();
  const interval = setInterval(() => {
    const passwordCorrect = localStorage.getItem('passwordCorrect') === "true";
    const wrongPassword = localStorage.getItem('wrongPassword') === "true";
    if (passwordCorrect) {
      clearInterval(interval);
      console.log("Password is correct. Applying Effect...");
      const originalMessage = localStorage.getItem("randomEventMessage");
      const event = randomEvents.find(e => e.description === originalMessage);
      if (event && typeof event.effect === "function") {
        event.effect();
        let alertMsg = event.alert;
        if (typeof alertMsg === "function") {
          alertMsg = alertMsg();
        }
        // Store the alert message and timestamp
        localStorage.setItem("randomEventMessage", alertMsg);
        localStorage.setItem("randomEventMessageTimestamp", Date.now().toString());
        localStorage.setItem("eventState", "applied");
        document.getElementById("randomEventMessage").innerText = alertMsg;
        const actions = document.getElementsByClassName("alert-actions")[0];
        if (actions) actions.style.display = "none";
      } else {
        console.error("No matching event found or effect is not a function.");
      }
    } else if (wrongPassword) {
      clearInterval(interval);
      console.log("Password is incorrect. Action canceled.");
      document.getElementById("errorMessage").style.display = "block";
    }
  }, 100);
}

function cancelEvent() {
  openModal();
  const interval = setInterval(() => {
    const passwordCorrect = localStorage.getItem('passwordCorrect') === "true";
    if (passwordCorrect) {
      clearInterval(interval);
      console.log("Password is correct. Cancelling event...");
      document.getElementById("alert").style.display = "none";
      // Remove all event-related storage 
      localStorage.removeItem("randomEventMessage");
      localStorage.removeItem("randomEventMessageTimestamp");
      localStorage.setItem("eventState", "cancelled");
    } else if (localStorage.getItem('wrongPassword') === "true") {
      clearInterval(interval);
      console.log("Password is incorrect. Action canceled.");
    }
  }, 100);
}

function closeAlert() {
  const timestamp = parseInt(localStorage.getItem("randomEventMessageTimestamp"), 10);
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  if (timestamp && (now - timestamp >= oneDay)) {
    document.getElementById("alert").style.display = "none";
    localStorage.removeItem("randomEventMessage");
    localStorage.removeItem("randomEventMessageTimestamp");
    localStorage.setItem("eventState", "cancelled");
  } else {
    alert("You can only close this alert after one day has passed.");
  }
}

function displayEventMessage() {
  const message = localStorage.getItem("randomEventMessage");
  const eventState = localStorage.getItem("eventState");

  if (eventState === "applied" && message) {
    document.getElementById("alert").style.display = "block";
    document.getElementById("randomEventMessage").innerText = message;
    const actions = document.getElementsByClassName("alert-actions")[0];
    if (actions) actions.style.display = "none";
  } else if (eventState === "pending" && message) {
    document.getElementById("alert").style.display = "block";
    document.getElementById("randomEventMessage").innerText = message;
  } else {
    document.getElementById("alert").style.display = "none";
    localStorage.removeItem("randomEventMessage");
    localStorage.removeItem("randomEventMessageTimestamp");
    localStorage.removeItem("eventState");
  }
}

window.displayEventMessage = displayEventMessage;
window.applyEffect = applyEffect;
window.cancelEvent = cancelEvent;
window.closeAlert = closeAlert;
window.triggerRandomEvent = triggerRandomEvent;

document.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(displayEventMessage, 500);
});

export { triggerRandomEvent, displayEventMessage, checkForNewMonth, getCurrentMonthKey };