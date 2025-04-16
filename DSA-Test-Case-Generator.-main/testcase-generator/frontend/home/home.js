document.addEventListener("DOMContentLoaded", () => {
    const getStartedBtn = document.getElementById("get-started-btn");
  
    getStartedBtn.addEventListener("click", async () => {
      try {
        const res = await fetch('/check-auth'); // This checks if user is logged in
        const data = await res.json();
  
        if (data.loggedIn) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/login/login.html?form=login";
        }
      } catch (error) {
        alert("Unable to check login status. Please try again.");
        console.error("Auth check error:", error);
      }
    });
  });
  