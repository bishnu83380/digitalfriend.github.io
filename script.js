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
      navLinks.classList.remove("active");
      menuToggle.textContent = "☰";
    }
  });
});

// Parallax Effect
function updateParallax() {
  const scrollPosition = window.scrollY;

  // Hero background
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }

  // Section backgrounds
  document.querySelectorAll(".section-bg").forEach((bg) => {
    const section = bg.closest(".section");
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const offset = (scrollPosition - sectionTop) * 0.3; // Slower parallax for sections
    bg.style.transform = `translateY(${offset}px)`;
  });

  // Footer background
  const footerBg = document.querySelector(".footer-bg");
  if (footerBg) {
    const footerTop =
      footerBg.closest("footer").getBoundingClientRect().top + window.scrollY;
    const footerOffset = (scrollPosition - footerTop) * 0.2;
    footerBg.style.transform = `translateY(${footerOffset}px)`;
  }
}

// Debounce function for performance
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

window.addEventListener("scroll", debounce(updateParallax, 16));

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
    updateParallax(); // Initial parallax update
  }, 1000);
});

// Toggle Financial Services Links
const financialCard = document.getElementById("financial-services");
const financialLinks = document.getElementById("financial-links");

financialCard.addEventListener("click", (e) => {
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
