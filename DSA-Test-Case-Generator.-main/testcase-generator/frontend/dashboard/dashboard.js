document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.querySelector("#profile-link");
    const historyBtn = document.querySelector("#history-link");
    const editProfileBtn = document.querySelector("#edit-profile-link");
    const logoutBtn = document.querySelector(".logout");
    const userName = document.querySelector("#user-name")?.value || "User";
    const profileIcon = document.querySelector(".profile-icon");
    // Profile click placeholder
    profileBtn?.addEventListener("click", () => {
      alert("Profile view not implemented yet.");
    });
  
    // History click placeholder
    historyBtn?.addEventListener("click", () => {
      alert("History view not implemented yet.");
    });
  
    // Edit Profile placeholder
    editProfileBtn?.addEventListener("click", () => {
      alert("Edit Profile / Change Password coming soon.");
    });
  
    // Optional: Log out with confirmation
    logoutBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Are you sure you want to log out?")) {
        window.location.href = "/logout";
      }
    });
  
    // Optional: Set profile icon dynamically from a hidden element

    const userInitialElement = document.querySelector("#user-initial");
    if (profileIcon && userName) {
        profileIcon.textContent = userName.trim().charAt(0).toUpperCase();
    }
  });
  