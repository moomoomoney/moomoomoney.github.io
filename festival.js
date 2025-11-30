import { getCoins, setCoins, addIncome, increasePrestige, updateDashboard, updateCouponTracker, updatePrestigeDisplay } from './control.js';
// Save in local storage
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.spinInput').forEach(input => {
        if (!input.id) return;
        const key = `spin:${input.id}`;
        const saved = localStorage.getItem(key);
        if (saved !== null) input.value = saved;
        input.addEventListener('input', () => {
            localStorage.setItem(key, input.value);
        });
    });
});

const confettiAudio = document.getElementById('confettiAudio');
// Track festival winnings
let festivalM3 = parseInt(localStorage.getItem('festivalM3'), 10);
if (isNaN(festivalM3)) {
    festivalM3 = 0;
    localStorage.setItem('festivalM3', String(festivalM3));
}

let festivalRC = parseInt(localStorage.getItem('festivalRC'), 10);
if (isNaN(festivalRC)) {
    festivalRC = 0;
    localStorage.setItem('festivalRC', String(festivalRC));
}

let festivalP = parseInt(localStorage.getItem('festivalP'), 10);
if (isNaN(festivalP)) {
    festivalP = 0;
    localStorage.setItem('festivalP', String(festivalP));
}

// Display festival winnings
function displayFestivalWinnings() {
    const M3display = document.getElementById('festivalM3Earned');
    const RCdisplay = document.getElementById('festivalRCEarned');
    const Pdisplay = document.getElementById('festivalPEarned');

    M3display.innerHTML = `${festivalM3}`;
    RCdisplay.innerHTML = `${festivalRC}`;
    Pdisplay.innerHTML = `${festivalP}`;
}
window.displayFestivalWinnings = displayFestivalWinnings;
displayFestivalWinnings();

// Apply Earnings
function applyFestivalEarnings() {
    if (festivalM3 > 0) {
        var myCoins = getCoins();
        myCoins += festivalM3;
        setCoins(myCoins);
        addIncome(festivalM3);
        totalEarned += festivalM3;
        localStorage.setItem('totalEarned', totalEarned);

        let coinsData = JSON.parse(localStorage.getItem('coinsData')) || [];
        const date = new Date();
        coinsData.push({
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            amount: festivalM3,
            reason: "Moo Moo Festival Winnings"
        });
        localStorage.setItem('coinsData', JSON.stringify(coinsData));
        localStorage.setItem('coins', coins);

        festivalM3 = 0;
        localStorage.setItem('festivalM3', festivalM3);
        displayFestivalWinnings();
    }
    if (festivalRC > 0) {
        const couponsData = JSON.parse(localStorage.getItem('couponsData')) || [];

        const newCoupon = {
            date: new Date().toLocaleDateString(),
            amount: festivalRC,
            reason: "Moo Moo Festival Winnings"
        };
        couponsData.push(newCoupon);
        localStorage.setItem('couponsData', JSON.stringify(couponsData));

        festivalRC = 0;
        localStorage.setItem('festivalRC', festivalRC);
        displayFestivalWinnings();
    }
    if (festivalP > 0) {
        let prest = parseInt(localStorage.getItem('prestige') || '0');
        prest += festivalP;
        localStorage.setItem('prestige', prest);

        festivalP = 0;
        localStorage.setItem('festivalP', festivalP);
        displayFestivalWinnings();
    }
    launchConfetti();
    confettiAudio.play();
    alert("Festival earnings applied!");
}
window.applyFestivalEarnings = applyFestivalEarnings;

// Clear Earnings
function clearFestivalEarnings() {
    if (confirm("Confirm clearing all festival earnings?") == true) {
        festivalM3 = 0;
        festivalRC = 0;
        festivalP = 0;
        localStorage.setItem('festivalM3', festivalM3);
        localStorage.setItem('festivalRC', festivalRC);
        localStorage.setItem('festivalP', festivalP);
        displayFestivalWinnings();
    } else {
        return;
    }
}
window.clearFestivalEarnings = clearFestivalEarnings;

// Spin function
function spin(inputA, inputB, spinTimes, prizes) {
    const inputAElement = document.getElementById(inputA);
    const inputBElement = document.getElementById(inputB);

    if (!inputAElement || !inputBElement) {
        alert('Input elements not found!');
        return;
    }

    const inputAValue = inputAElement.value;
    const inputBValue = inputBElement.value;
    if (inputAValue.trim() === '' || inputBValue.trim() === '') {
        alert('Please enter values in both fields.');
        return;
    }

    localStorage.setItem(`spin:${inputAElement.id}`, inputAValue);
    localStorage.setItem(`spin:${inputBElement.id}`, inputBValue);

    const numA = parseFloat(inputAValue);
    const numB = parseFloat(inputBValue);

    if (isNaN(numA) || isNaN(numB)) {
        alert('Please enter valid numbers in both fields.');
        return;
    }
    if (numB === 0) {
        alert('Second value cannot be zero.');
        return;
    }

    let chance = numA / numB;
    if (chance < 0 || chance > 1) {
        alert('Please enter a fraction between 0 and 1.');
        return;
    }

    let spins = parseInt(spinTimes, 10);
    if (isNaN(spins) || spins < 1) spins = 1;
    spins = Math.min(spins, 1000);

    let won = false;
    let place;

    for (let i = 0; i < spins; i++) {
        const currentChance = numA / (numB - i);
        const effectiveChance = Math.max(0, Math.min(1, currentChance));

        if (Math.random() < effectiveChance) {
            launchConfetti();
            confettiAudio.play();
            const pos = i + 1;
            if (pos % 10 === 1) {
                place = "st";
            } else if (pos % 10 === 2) {
                place = "nd";
            } else if (pos % 10 === 3) {
                place = "rd";
            } else {
                place = "th";
            }
            alert(`Congratulations! You came in ${pos}${place} and won ${prizes[i]}!`);
            won = true;
            // Add prize to count
            const prizeStr = (Array.isArray(prizes) && prizes.length) ? String(prizes[i % prizes.length]) : String(prizes || '');
            const m = prizeStr.trim().match(/^(\d+)\s*(M|RC|P)$/i);
            const amount = parseInt(m[1], 10);
            const type = m[2].toUpperCase();

            if (type === 'M') {
                festivalM3 += amount;
                localStorage.setItem('festivalM3', festivalM3);
            } else if (type === 'RC') {
                festivalRC += amount;
                localStorage.setItem('festivalRC', festivalRC);
            } else if (type === 'P') {
                festivalP += amount;
                localStorage.setItem('festivalP', festivalP);
            }
            displayFestivalWinnings();
            break;
        }
    }
    if (!won) {
        alert("You didn't win. Try again next time!");
    }
}

window.spin = spin;

// Confetti animation
function launchConfetti() {
  const count = 120;
  const palette = ['#ef4444','#f97316','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899'];

  let container = document.getElementById('confetti-container');
  const docW = document.documentElement.clientWidth;
  const docH = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    Object.assign(el.style, {
      position: 'fixed',
      width: (6 + Math.random() * 10) + 'px',
      height: (10 + Math.random() * 14) + 'px',
      left: (Math.random() * docW) + 'px',
      top: (-20 - Math.random() * 120) + 'px',
      background: palette[Math.floor(Math.random() * palette.length)],
      opacity: '1',
      pointerEvents: 'none',
      transform: `rotate(${Math.random() * 360}deg)`,
      zIndex: '99999',
      borderRadius: '2px',
      willChange: 'transform, opacity'
    });
    container.appendChild(el);

    const duration = 2500 + Math.random() * 2500;
    const dx = (Math.random() - 0.5) * (docW * 0.6);
    const dy = docH + 200 + Math.random() * 300;
    const rot = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720);

    requestAnimationFrame(() => {
      el.style.transition = `transform ${duration}ms cubic-bezier(.2,.7,.3,1), opacity ${duration}ms linear`;
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, duration + 600);
  }
}
window.launchConfetti = launchConfetti;