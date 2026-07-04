const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const sections = document.querySelectorAll("section[id]");
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");
const themeButton = document.getElementById("theme-button");
const contactForm = document.getElementById("contact-form");

const showMenu = () => {
    navMenu.classList.add("show-menu");
    body.classList.add("menu-open");
};
const hideMenu = () => {
    navMenu.classList.remove("show-menu");
    body.classList.remove("menu-open");
};

if (navToggle) {
    navToggle.addEventListener("click", showMenu);
}

if (navClose) {
    navClose.addEventListener("click", hideMenu);
}

navLinks.forEach((link) => {
    link.addEventListener("click", hideMenu);
});

const getScrollY = () => window.pageYOffset || document.documentElement.scrollTop;

const updateHeader = () => {
    if (!header || !scrollUp) {
        return;
    }

    header.classList.toggle("scrolled", getScrollY() >= 50);
    scrollUp.classList.toggle("show-scroll", getScrollY() >= 350);
};

const activateSection = () => {
    const scrollY = getScrollY();

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add("active-link");
        } else {
            navLink?.classList.remove("active-link");
        }
    });
};

const themeKey = "nidhi-portfolio-theme";
const body = document.body;

const applyTheme = (mode) => {
    if (mode === "dark") {
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
    }
};

const savedTheme = localStorage.getItem(themeKey);
applyTheme(savedTheme || "light");

if (themeButton) {
    themeButton.addEventListener("click", () => {
        const nextTheme = body.classList.contains("dark-theme") ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem(themeKey, nextTheme);
    });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px",
        }
    );

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const mailto = new URL("mailto:nidhi@example.com");
        mailto.searchParams.set("subject", subject || "Portfolio enquiry");
        mailto.searchParams.set(
            "body",
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

        window.location.href = mailto.toString();
    });
}

window.addEventListener("scroll", () => {
    updateHeader();
    activateSection();
});

window.addEventListener("load", () => {
    updateHeader();
    activateSection();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        hideMenu();
    }
});
