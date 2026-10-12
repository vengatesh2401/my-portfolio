
/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

/* =========================
   TYPING ANIMATION
========================= */

const typedRole = document.getElementById("typed-role");

const roles = [
    "Java Developer",
    "Software Developer",
    "Basic Python Developer",
    "Technology Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typedRole.textContent = currentRole.substring(0, characterIndex);

    let delay = deleting ? 45 : 95;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1400;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reducedMotion) {
    typedRole.textContent = roles[0];
} else {
    typeEffect();
}

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                                `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

/* =========================
   AUTOMATIC COPYRIGHT YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();

/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !subject || !message) {
        formNote.textContent = "Please complete every field.";
        return;
    }

    // Replace this with your actual email address.
    const recipient = "your.email@example.com";

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    formNote.textContent =
        "Opening your email application. Review the message and send it there.";

    window.location.href =
        `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
});
