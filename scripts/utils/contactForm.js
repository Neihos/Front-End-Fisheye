const modal = document.getElementById("contact_modal");
const modalContainer = modal.querySelector(".modal");
const main = document.querySelector(".main-content");

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

  closeBtn.focus(); // donne le focus directement à la croix
  document.addEventListener("keydown", onEscapeKey); // écoute la touche "escape"
}

// Fermer la modale grâçe à "escape"
function onEscapeKey(e) {
  if (e.key === "Escape") {
    closeModal();
    document.removeEventListener("keydown", onEscapeKey); // nettoyage
  }
}

function closeModal() {
  if (document.activeElement && modal.contains(document.activeElement)) {
    document.activeElement.blur(); // retire le focus actif
  }

  modal.style.display = "none";
  modalContainer.setAttribute("aria-hidden", "true");
  main.removeAttribute("inert"); // rétabli le focus et les interactions sur le reste
  document.body.classList.remove("no-scroll");
}

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
