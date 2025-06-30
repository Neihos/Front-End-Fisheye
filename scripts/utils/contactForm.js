const modal = document.querySelector("#contact_modal");
const modalContainer = modal.querySelector(".modal");
const main = document.querySelector(".main-content");

/**
 * Affiche la modale de contact
 * Ajoute les attributs ARIA et gère le focus pour l'accessibilité
 * @function displayModal
 * @returns {void}
 */
export function displayModal() {
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
export function closeModal() {
  if (document.activeElement && modal.contains(document.activeElement)) { // vérifie si l'élément actif est dans la modale
    document.activeElement.blur(); // retire le focus actif pour éviter les problèmes d'accessibilité
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
export function makeModal(data) {
  const { name } = data;
  const modalHeader = document.querySelector(".modal header");
  const photographerName = document.createElement("span");
  photographerName.className = "nameInModal";
  photographerName.textContent = `${name}`;
  modalHeader.appendChild(photographerName);
}

/**
 * Initialise le formulaire de contact
 * @returns {void}
 */
export function initContactForm() {
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
}

// Rendre les fonctions globales SEULEMENT pour les onclick dans photographer.html
if (typeof window !== 'undefined') {
window.displayModal = displayModal;
window.closeModal = closeModal;
}