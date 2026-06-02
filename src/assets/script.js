const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const faqList = document.querySelector(".faq__list");
const sections = [...document.querySelectorAll("main section[id]")];

const setMenuState = (isOpen) => {
    body.classList.toggle("nav-open", isOpen);
    navToggle?.setAttribute("aria-expanded", String(isOpen));
    navToggle?.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
};

const closeMenu = () => setMenuState(false);

const toggleFaqAnswer = (question) => {
    const answerId = question.getAttribute("aria-controls");
    const answer = answerId ? document.getElementById(answerId) : null;
    const isExpanded = question.getAttribute("aria-expanded") === "true";

    question.setAttribute("aria-expanded", String(!isExpanded));

    if (answer) {
        answer.hidden = isExpanded;
    }
};

const activateNavLink = (sectionId) => {
    navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
    });
};

navToggle?.addEventListener("click", () => {
    setMenuState(!body.classList.contains("nav-open"));
});

siteNav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        closeMenu();
    }
});

faqList?.addEventListener("click", (event) => {
    const question = event.target.closest(".faq__question");

    if (question) {
        toggleFaqAnswer(question);
    }
});

if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            activateNavLink(entry.target.id);
        });
    }, {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
}
