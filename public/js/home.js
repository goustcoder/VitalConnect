document.getElementById("adminLink").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("adminForm").style.display = "block";
});

document.getElementById("closeFormBtn").addEventListener("click", function() {
    document.getElementById("adminForm").style.display = "none";
});

document.getElementById("clearFormBtn").addEventListener("click", function() {
    document.getElementById("loginForm").reset();
});

function showUnderDevelopmentAlert() {
    document.getElementById("alertBox").style.display = "block";
  }

  function closeAlert() {
    document.getElementById("alertBox").style.display = "none";
  }

