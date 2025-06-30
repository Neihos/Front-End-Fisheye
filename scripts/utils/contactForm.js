const modal = document.getElementById("contact_modal");
const modalContainer = modal.querySelector(".modal");
const main = document.querySelector(".main-content");

/**
 * Affiche la modale de contact
 * Ajoute les attributs ARIA et gère le focus pour l'accessibilité
 * @function displayModal
 * @returns {void}
 */

function displayModal() {
  modal.style.display = "flex";
  modalContainer.setAttribute("aria-hidden", "false");
  main.setAttribute("inert", ""); // bloque le focus et les interactions sur le reste
  document.body.classList.add("no-scroll");

  const closeBtn = modal.querySelector('img[alt="Fermer la modale"]');
  if (closeBtn && !closeBtn.hasAttribute("data-keydown-added")) {
    closeBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeModal();
      }
    });
    closeBtn.setAttribute("data-keydown-added", "true");
  }

  document.addEventListener("keydown", onEscapeKey); // écoute la touche "escape"
}

/**
 * Gère la fermeture de la modale avec la touche "Escape"
 * @param {KeyboardEvent} e - L'événement de la touche
 * @returns {void}
 */
function onEscapeKey(e) {
  if (e.key === "Escape") {
    closeModal();
    document.removeEventListener("keydown", onEscapeKey); // nettoyage
  }
}

/** * Ferme la modale de contact
 * Retire le focus actif et rétablit les interactions sur le reste de la page
 * @function closeModal
 * @returns {void}
 */
function closeModal() {
  if (document.activeElement && modal.contains(document.activeElement)) {
    document.activeElement.blur(); // retire le focus actif
  }

  modal.style.display = "none";
  modalContainer.setAttribute("aria-hidden", "true");
  main.removeAttribute("inert"); // rétabli le focus et les interactions sur le reste
  document.body.classList.remove("no-scroll");
}

/**
 * Crée la modale de contact
 * @param {Object} data - Données du photographe
 * @returns {void}
 */
function makeModal(data) {
  const { name } = data;
  const modalHeader = document.querySelector(".modal header");
  const photographerName = document.createElement("span");
  photographerName.className = "nameInModal";
  photographerName.textContent = `${name}`;
  modalHeader.appendChild(photographerName);
}

document
  .querySelector("#contact_form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const values = {};
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }

    console.log("Contenu du formulaire :", values);
    closeModal();
  });
