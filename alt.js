function infoModalHut() {
    document.getElementById("InfoModalHut").style.display = "block";
};

function infoModalEmptyPlot() {
    document.getElementById("infoModalEmptyPlot").style.display = "block";
};

function infoModalBarn() {
    document.getElementById("infoModalBarn").style.display = "block";
}

function infoModalGrass() {
    document.getElementById("infoModalGrass").style.display = "block";
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