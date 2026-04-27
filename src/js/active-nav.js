"use strict";

/**
 * Adds an active class to the current page navigation link.
 */
function setActiveNavigationLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".site-nav a");

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");

        if (!linkHref) {
            return;
        }

        const linkPage = linkHref.split("#")[0] || "index.html";

        if (linkPage === currentPage) {
            link.classList.add("is-active");
        }
    });
}

document.addEventListener("sitePartialsLoaded", setActiveNavigationLink);