const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        const isOpen = body.classList.toggle("nav-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.setAttribute("aria-label", "Abrir menu");
    });
});

const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
}
