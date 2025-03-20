document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const navToggle = document.createElement("button")
  navToggle.className = "nav-toggle"
  navToggle.innerHTML = "<span></span><span></span><span></span>"

  const nav = document.querySelector("nav")
  if (nav && window.innerWidth < 768) {
    nav.parentNode.insertBefore(navToggle, nav)

    navToggle.addEventListener("click", function () {
      nav.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
      }
    })
  })
})

