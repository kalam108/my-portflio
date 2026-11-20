// =========================================
// Kalam Portfolio - JavaScript
// =========================================

// ---------- 1. Mobile menu ----------
let menuBtn = document.getElementById("menuBtn");
let menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {
  menu.classList.toggle("open");
});

// close the menu after clicking a link (on mobile)
let navLinks = document.querySelectorAll(".nav-link");
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    menu.classList.remove("open");
  });
}

// ---------- 2. Dark mode (saved in localStorage) ----------
let themeBtn = document.getElementById("themeBtn");

function setThemeIcon() {
  themeBtn.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
setThemeIcon();

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  let mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);
  setThemeIcon();
});

// ---------- 3. Typing effect ----------
let words = ["Web Developer", "BCA Student", "Flutter Learner", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let typingSpan = document.getElementById("typing");

function typeEffect() {
  let word = words[wordIndex];

  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  typingSpan.innerText = word.substring(0, charIndex);

  let speed = deleting ? 60 : 120;

  if (!deleting && charIndex === word.length) {
    speed = 1500;          // pause when the word is complete
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;   // next word
    speed = 400;
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

// ---------- 4. Project filter ----------
let filterButtons = document.querySelectorAll(".filter-btn");
let projects = document.querySelectorAll(".project");

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    this.classList.add("active");

    let filter = this.getAttribute("data-filter");

    for (let k = 0; k < projects.length; k++) {
      let categories = projects[k].getAttribute("data-category");
      if (filter === "all" || categories.includes(filter)) {
        projects[k].style.display = "block";
      } else {
        projects[k].style.display = "none";
      }
    }
  });
}

// ---------- 5. Skill bars and counters animate when visible ----------
let skillsDone = false;
let countersDone = false;

function isVisible(element) {
  let rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight - 80;
}

function animateSkills() {
  let fills = document.querySelectorAll(".fill");
  for (let i = 0; i < fills.length; i++) {
    fills[i].style.width = fills[i].getAttribute("data-width") + "%";
  }
}

function animateCounters() {
  let counters = document.querySelectorAll(".counter");
  for (let i = 0; i < counters.length; i++) {
    let target = Number(counters[i].getAttribute("data-target"));
    let count = 0;
    let timer = setInterval(function () {
      count++;
      counters[i].innerText = count;
      if (count >= target) {
        counters[i].innerText = target + "+";
        clearInterval(timer);
      }
    }, 60);
  }
}

// ---------- 6. Active menu link while scrolling ----------
let sections = document.querySelectorAll("section");

function highlightMenu() {
  let current = "home";
  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY >= sections[i].offsetTop - 120) {
      current = sections[i].getAttribute("id");
    }
  }
  for (let j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove("active");
    if (navLinks[j].getAttribute("href") === "#" + current) {
      navLinks[j].classList.add("active");
    }
  }
}

// ---------- 7. Back to top button ----------
let topBtn = document.getElementById("topBtn");

topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// one scroll handler for features 5, 6 and 7
function onScroll() {
  if (!skillsDone && isVisible(document.getElementById("skills"))) {
    animateSkills();
    skillsDone = true;
  }
  if (!countersDone && isVisible(document.querySelector(".stats"))) {
    animateCounters();
    countersDone = true;
  }
  highlightMenu();
  topBtn.style.display = (window.scrollY > 400) ? "block" : "none";
}

window.addEventListener("scroll", onScroll);
onScroll();   // run once when the page loads

// ---------- 8. Contact form validation ----------
let contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let ok = true;

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();

  // clear old messages
  let errors = document.querySelectorAll(".error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].innerText = "";
  }
  document.getElementById("successMsg").innerText = "";

  if (name.length < 3) {
    document.getElementById("nameErr").innerText = "Name must be at least 3 letters";
    ok = false;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailErr").innerText = "Please enter a valid email";
    ok = false;
  }

  if (subject === "") {
    document.getElementById("subjectErr").innerText = "Please enter a subject";
    ok = false;
  }

  if (message.length < 10) {
    document.getElementById("messageErr").innerText = "Message must be at least 10 characters";
    ok = false;
  }

  if (ok) {
    document.getElementById("successMsg").innerText =
      "Thank you, " + name + "! Your message has been sent.";
    contactForm.reset();
  }
});

// ---------- 9. Current year in footer ----------
document.getElementById("year").innerText = new Date().getFullYear();
