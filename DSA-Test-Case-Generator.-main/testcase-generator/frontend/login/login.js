document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById('login-button');
  const signupButton = document.getElementById('signup-button');
  const formsContainer = document.getElementById('user_options-forms');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  signupButton.addEventListener('click', () => {
    formsContainer.classList.remove('bounceRight');
    formsContainer.classList.add('bounceLeft');
    formsContainer.style.display = 'block';
  });

  loginButton.addEventListener('click', () => {
    formsContainer.classList.remove('bounceLeft');
    formsContainer.classList.add('bounceRight');
    formsContainer.style.display = 'block';
  });

  // LOGIN FORM
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[name="email"]').value.trim();
    const password = loginForm.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        window.location.href = '/dashboard'; // ✅ Redirect on successful login
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });

  // SIGNUP FORM
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('input[name="name"]').value.trim();
    const email = signupForm.querySelector('input[name="email"]').value.trim();
    const password = signupForm.querySelector('input[name="password"]').value.trim();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) loginButton.click(); // Show login form after successful signup
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  });
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.previousElementSibling;
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
});

// Handle ?form=signup or default to login
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const formType = params.get("form");

  if (formType === "signup") {
    document.getElementById("signup-button").click();
  } else {
    document.getElementById("login-button").click(); // Default to login
  }
});
