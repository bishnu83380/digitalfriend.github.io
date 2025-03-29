// Loading Overlay Functions
function showLoading() {
  console.log("Showing loader");
  const overlay = document.getElementById("loadingOverlay");
  overlay.classList.remove("hidden");
}

function hideLoading() {
  console.log("Hiding loader");
  const overlay = document.getElementById("loadingOverlay");
  overlay.classList.add("hidden");
}

// Cursor
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// Mobile Navbar Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Smooth Scroll with Navbar Close
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active"); // Close menu on link click
      menuToggle.textContent = "☰";
    }
  });
});

// Parallax Effect on Hero
const hero = document.querySelector(".hero-bg");
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Intersection Observer for Animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.2 },
);

document.querySelectorAll(".section, .footer-section").forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// Contact Form Submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  showLoading();
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Message sent successfully!");
    contactForm.reset();
  } catch (error) {
    alert("Error sending message. Please try again.");
  } finally {
    hideLoading();
  }
});

// Newsletter Form Submission
const newsletterForm = document.getElementById("newsletterForm");
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector("input").value;
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }
  console.log("Subscribed with email:", email);
  alert("Thank you for subscribing!");
  newsletterForm.reset();
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Services Section
document
  .getElementById("requestServiceBtn")
  .addEventListener("click", async () => {
    showLoading();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    hideLoading();
    alert(
      "Service request submitted! Please contact me to discuss your needs.",
    );
  });

// CTA Button Behaviors
document.querySelectorAll(".hero .cta-btn")[0].addEventListener("click", () => {
  document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".hero .cta-btn")[1].addEventListener("click", () => {
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
});

// Page Load Animation
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  showLoading();
  setTimeout(() => {
    hideLoading();
  }, 1000);
});

// Add this to your existing JS file

// Toggle Financial Services Links
const financialCard = document.getElementById("financial-services");
const financialLinks = document.getElementById("financial-links");

financialCard.addEventListener("click", (e) => {
  // Prevent triggering if clicking the links themselves
  if (e.target.classList.contains("service-link-btn")) return;

  financialLinks.classList.toggle("active");
});

// Close links when clicking outside
document.addEventListener("click", (e) => {
  if (
    !financialCard.contains(e.target) &&
    financialLinks.classList.contains("active")
  ) {
    financialLinks.classList.remove("active");
  }
});
