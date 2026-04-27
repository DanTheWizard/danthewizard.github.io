"use strict";

console.log("---------------------------------------------");
console.log("██╗    ██╗██╗███████╗ █████╗ ██████╗ ██████╗ ");
console.log("██║    ██║██║╚══███╔╝██╔══██╗██╔══██╗██╔══██╗");
console.log("██║ █╗ ██║██║  ███╔╝ ███████║██████╔╝██║  ██║");
console.log("██║███╗██║██║ ███╔╝  ██╔══██║██╔══██╗██║  ██║");
console.log("╚███╔███╔╝██║███████╗██║  ██║██║  ██║██████╔╝");
console.log(" ╚══╝╚══╝ ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ");
console.log("---------------------------------------------");
console.log("");

/**
 * Dynamically loads another JavaScript file.
 *
 * This allows main.js to act as the only JavaScript entry point.
 *
 * @param {string} scriptPath - Path to the JavaScript file being loaded.
 * @returns {Promise<void>}
 */
function loadScript(scriptPath) {
    return new Promise((resolve, reject) => {
        const scriptElement = document.createElement("script");

        scriptElement.src = scriptPath;
        scriptElement.defer = true;

        scriptElement.onload = () => resolve();
        scriptElement.onerror = () => reject(new Error(`Failed to load script: ${scriptPath}`));

        document.body.appendChild(scriptElement);
    });
}

/**
 * Loads all JavaScript files needed for the portfolio.
 */
async function loadPortfolioScripts() {
    const scripts = [
        "src/js/partials.js",
        "src/js/active-nav.js"
    ];

    for (const script of scripts) {
        try {
            await loadScript(script);
        } catch (error) {
            console.error(error);
        }
    }
}

/**
 * Starts the portfolio site.
 */
async function initializePortfolio() {
    await loadPortfolioScripts();

    console.log("✅ main.js v1.0.0 has been loaded");
}

document.addEventListener("DOMContentLoaded", initializePortfolio);