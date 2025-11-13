// Typing Animation
const typingText = document.querySelector(".typing-text")
const phrases = ["Web Designer", "UI/UX Designer", "Frontend Developer", "Creative Developer"]
let phraseIndex = 0
let charIndex = 0
let isDeleting = false

function type() {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1)
    charIndex++
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true
    setTimeout(type, 2000)
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    setTimeout(type, 500)
  } else {
    setTimeout(type, isDeleting ? 50 : 100)
  }
}

// Start typing animation
setTimeout(type, 1000)

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Animate sections on scroll
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(50px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Animate skill bars
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector(".skill-progress")
        const progress = progressBar.dataset.progress
        progressBar.style.width = progress + "%"
        skillObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".skill-card").forEach((card) => {
  skillObserver.observe(card)
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 23, 42, 0.95)"
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)"
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.8)"
    navbar.style.boxShadow = "none"
  }
})

// Contact Form Submission
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // Here you would typically send the form data to a server
  // For now, we'll just show an alert
  alert(`Obrigado por entrar em contato, ${name}! Responderei em breve.`)

  // Clear form
  contactForm.reset()
})

// Add hover effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

// Parallax effect for floating elements
window.addEventListener("mousemove", (e) => {
  const floatingElements = document.querySelectorAll(".floating-element")
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  floatingElements.forEach((element, index) => {
    const speed = (index + 1) * 20
    const x = mouseX * speed - speed / 2
    const y = mouseY * speed - speed / 2
    element.style.transform = `translate(${x}px, ${y}px)`
  })
})
