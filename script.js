document.addEventListener("DOMContentLoaded", () => {
  // Page Loader
  const pageLoader = document.createElement("div")
  pageLoader.className = "page-loader"
  pageLoader.innerHTML = '<div class="loader"></div>'
  document.body.appendChild(pageLoader)

  // Hide loader after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      pageLoader.classList.add("fade-out")
      setTimeout(() => {
        pageLoader.remove()
      }, 500)
    }, 500)
  })

  // Theme Toggle
  const themeToggle = document.createElement("div")
  themeToggle.className = "theme-toggle"
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  document.body.appendChild(themeToggle)

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  // Theme toggle functionality
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode")

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
      this.innerHTML = '<i class="fas fa-sun"></i>'
    } else {
      localStorage.setItem("theme", "light")
      this.innerHTML = '<i class="fas fa-moon"></i>'
    }
  })

  // Mobile navigation toggle
  const navToggle = document.createElement("button")
  navToggle.className = "nav-toggle"
  navToggle.innerHTML = "<span></span><span></span><span></span>"
  navToggle.setAttribute("aria-label", "Toggle navigation")

  const nav = document.querySelector("nav")
  if (nav) {
    nav.parentNode.insertBefore(navToggle, nav)

    navToggle.addEventListener("click", function () {
      const navList = nav.querySelector("ul")
      navList.classList.toggle("active")
      this.classList.toggle("active")

      // Toggle aria-expanded attribute for accessibility
      const expanded = this.getAttribute("aria-expanded") === "true" || false
      this.setAttribute("aria-expanded", !expanded)
    })
  }

  // Scroll down button in hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    const scrollDown = document.createElement("div")
    scrollDown.className = "scroll-down"
    scrollDown.innerHTML = '<i class="fas fa-chevron-down"></i><span>Scroll Down</span>'
    hero.appendChild(scrollDown)

    scrollDown.addEventListener("click", () => {
      const nextSection = hero.nextElementSibling
      if (nextSection) {
        window.scrollTo({
          top: nextSection.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") return

      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navList = document.querySelector("nav ul")
        if (navList && navList.classList.contains("active")) {
          navList.classList.remove("active")
          navToggle.classList.remove("active")
        }
      }
    })
  })

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top")

  if (!backToTopButton) {
    const newBackToTopButton = document.createElement("a")
    newBackToTopButton.className = "back-to-top"
    newBackToTopButton.href = "#"
    newBackToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
    newBackToTopButton.setAttribute("aria-label", "Back to top")
    document.body.appendChild(newBackToTopButton)

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        newBackToTopButton.classList.add("visible")
      } else {
        newBackToTopButton.classList.remove("visible")
      }
    })

    newBackToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  } else {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Header scroll effect
  const header = document.querySelector("header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Project filtering
  const filterButtons = document.querySelectorAll(".project-filters .filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        projectCards.forEach((card) => {
          if (filter === "all") {
            card.style.display = "flex"
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 100)
          } else {
            const category = card.getAttribute("data-category")

            if (category === filter) {
              card.style.display = "flex"
              setTimeout(() => {
                card.style.opacity = "1"
                card.style.transform = "translateY(0)"
              }, 100)
            } else {
              card.style.opacity = "0"
              card.style.transform = "translateY(20px)"
              setTimeout(() => {
                card.style.display = "none"
              }, 300)
            }
          }
        })
      })
    })
  }

  // Project detail view functionality
  const projectViewButtons = document.querySelectorAll(".project-card .btn")

  if (projectViewButtons.length > 0) {
    projectViewButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()

        // Get project ID from data attribute
        const projectId = this.closest(".project-card").getAttribute("data-id")

        // Find corresponding project details section
        const projectDetails = document.getElementById(`project-${projectId}-details`)

        if (projectDetails) {
          // Hide all other project details
          document.querySelectorAll(".project-details").forEach((detail) => {
            detail.classList.remove("active")
          })

          // Show this project's details
          projectDetails.classList.add("active")

          // Scroll to project details
          window.scrollTo({
            top: projectDetails.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })

    // Close project details button
    document.querySelectorAll(".close-details").forEach((button) => {
      button.addEventListener("click", function () {
        this.closest(".project-details").classList.remove("active")

        // Scroll back to projects section
        const projectsSection = document.querySelector(".projects-section")
        if (projectsSection) {
          window.scrollTo({
            top: projectsSection.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Blog filtering
  const blogFilterButtons = document.querySelectorAll(".blog-filter .filter-btn")
  const blogPosts = document.querySelectorAll(".blog-post")

  if (blogFilterButtons.length > 0 && blogPosts.length > 0) {
    blogFilterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        blogFilterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        blogPosts.forEach((post) => {
          if (filter === "all") {
            post.style.display = "flex"
            setTimeout(() => {
              post.style.opacity = "1"
              post.style.transform = "translateY(0)"
            }, 100)
          } else {
            const tags = post.getAttribute("data-tags").split(",")

            if (tags.includes(filter)) {
              post.style.display = "flex"
              setTimeout(() => {
                post.style.opacity = "1"
                post.style.transform = "translateY(0)"
              }, 100)
            } else {
              post.style.opacity = "0"
              post.style.transform = "translateY(20px)"
              setTimeout(() => {
                post.style.display = "none"
              }, 300)
            }
          }
        })
      })
    })
  }

  // Contact form validation and submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    // Add error message elements
    const formGroups = contactForm.querySelectorAll(".form-group")
    formGroups.forEach((group) => {
      const input = group.querySelector("input, textarea")
      if (input) {
        const errorMessage = document.createElement("div")
        errorMessage.className = "error-message"
        errorMessage.textContent = `Please enter a valid ${input.getAttribute("name")}`
        group.appendChild(errorMessage)
      }
    })

    // Add success message
    const formSuccess = document.createElement("div")
    formSuccess.className = "form-success"
    formSuccess.textContent = "Thank you for your message! I will get back to you soon."
    contactForm.insertBefore(formSuccess, contactForm.firstChild)

    // Form validation
    const validateInput = (input) => {
      const group = input.closest(".form-group")

      if (input.value.trim() === "") {
        group.classList.add("error")
        return false
      }

      if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        group.classList.add("error")
        return false
      }

      group.classList.remove("error")
      return true
    }

    // Input validation on blur
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("blur", function () {
        validateInput(this)
      })

      input.addEventListener("input", function () {
        if (this.value.trim() !== "") {
          this.closest(".form-group").classList.remove("error")
        }
      })
    })

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Validate all inputs
      let isValid = true
      this.querySelectorAll("input, textarea").forEach((input) => {
        if (!validateInput(input)) {
          isValid = false
        }
      })

      if (!isValid) {
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.disabled = true
      submitButton.textContent = "Sending..."

      // Simulate API call
      setTimeout(() => {
        formSuccess.classList.add("show")
        contactForm.reset()
        submitButton.disabled = false
        submitButton.textContent = originalText

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.remove("show")
        }, 5000)
      }, 1500)
    })
  }

  // Animate skill bars when in viewport
  const skillBars = document.querySelectorAll(".skill-progress")

  if (skillBars.length > 0) {
    const animateSkillBars = () => {
      skillBars.forEach((bar) => {
        const barTop = bar.getBoundingClientRect().top
        const barBottom = bar.getBoundingClientRect().bottom

        if (barTop < window.innerHeight && barBottom > 0) {
          const width = bar.parentElement.previousElementSibling.lastElementChild.textContent
          bar.style.width = width
        }
      })
    }

    // Initial check
    animateSkillBars()

    // Check on scroll
    window.addEventListener("scroll", animateSkillBars)
  }

  // Animate elements when scrolled into view
  const animateElements = document.querySelectorAll(".animate")

  if (animateElements.length > 0) {
    const animateOnScroll = () => {
      animateElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom

        if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
          element.style.animationPlayState = "running"
        }
      })
    }

    // Initial check
    animateOnScroll()

    // Check on scroll
    window.addEventListener("scroll", animateOnScroll)
  }

  // Add floating animation to hero section
  const heroContent = document.querySelector(".hero-content")

  if (heroContent) {
    heroContent.style.animation = "float 6s ease-in-out infinite"
  }

  // Add active class to current navigation item
  const currentLocation = window.location.pathname
  const navLinks = document.querySelectorAll("nav a")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")

    if (currentLocation.includes("blog") && linkPath.includes("blog")) {
      link.classList.add("active")
    } else if (currentLocation === "/" && linkPath === "#") {
      link.classList.add("active")
    }
  })

  // Add accessibility attributes
  document.querySelectorAll(".social-link").forEach((link) => {
    const icon = link.querySelector("i")
    if (icon) {
      const socialName = icon.className.split("fa-")[1]
      link.setAttribute("aria-label", socialName)
    }
  })

  // Add image lazy loading
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy")
    }
  })
})

