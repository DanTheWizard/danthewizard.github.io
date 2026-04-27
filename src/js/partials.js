"use strict";

/**
 * Loads a reusable HTML partial into a page element.
 *
 * @param {string} targetId - The ID of the element receiving the HTML.
 * @param {string} partialPath - The path to the HTML partial file.
 */
async function loadHtmlPartial(targetId, partialPath) {
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
        return;
    }

    try {
        const response = await fetch(partialPath);

        if (!response.ok) {
            throw new Error(`Could not load ${partialPath}. Status: ${response.status}`);
        }

        targetElement.innerHTML = await response.text();
    } catch (error) {
        console.error(error);

        targetElement.innerHTML = `
            <div class="partial-load-error">
                Could not load ${partialPath}.
            </div>
        `;
    }
}

/**
 * Loads the shared header and footer.
 */
async function loadSitePartials() {
    await loadHtmlPartial("site-header", "arch/header.html");
    await loadHtmlPartial("site-footer", "arch/footer.html");

    document.dispatchEvent(new CustomEvent("sitePartialsLoaded"));
}

loadSitePartials();