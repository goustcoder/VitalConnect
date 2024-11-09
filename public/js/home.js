document.addEventListener("DOMContentLoaded", function () {
    const adminLink = document.getElementById("adminLink");
    const resFrom = document.getElementById("res-from");
    const closeFormBtn = document.getElementById("closeFormBtn");
    const clearFormBtn = document.getElementById("clearFormBtn");
    const loginForm = document.getElementById("loginForm");

    // Show the admin login form
    if (adminLink) {
        adminLink.addEventListener("click", function (event) {
            event.preventDefault();
            if (resFrom) resFrom.style.display = "block";
        });
    }

    // Close the admin login form
    if (closeFormBtn) {
        closeFormBtn.addEventListener("click", function () {
            if (resFrom) resFrom.style.display = "none";
        });
    }

    // Clear the form fields
    if (clearFormBtn && loginForm) {
        clearFormBtn.addEventListener("click", function () {
            loginForm.reset();
        });
    }
});


function showUnderDevelopmentAlert() {
    document.getElementById("alertBox").style.display = "block";
  }

  function closeAlert() {
    document.getElementById("alertBox").style.display = "none";
  }

