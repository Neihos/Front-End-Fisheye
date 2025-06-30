import getPhotographers from "../api/api.js";
import mediaTemplate from "../templates/media.js";
import photographerTemplate from "../templates/photographer.js";
import { setupLightbox, openLightbox } from "../utils/lightbox.js";
import addLikes from "../handlers/likesHandler.js";
import calcLikes from "../utils/likesCalculator.js";
import { sortingMedia } from "../utils/sortingMedia.js";
import { makeModal, initContactForm } from "../utils/contactForm.js";

// On récupére l'id depuis l'url
const params = new URLSearchParams(window.location.search);
const photographId = parseInt(params.get("id"));

/**
 * Affiche les données d'un photographe spécifique et ses médias
 * Filtre les données par ID de photographe, génère la page photographe avec header,
 * médias, lightbox et fonctionnalités de likes
 *
 * @function displayData
 * @async
 * @param {Array} photographers - Liste complète des photographes
 * @param {Array} media - Liste complète des médias
 * @returns {Promise<void>}
 */
async function displayData(photographers, media) {
  const photographersContent = document.querySelector(".photographerMedias");

  const photographer = photographers.find(
    (photographer) => photographer.id === photographId // Filtre le photographe par ID
  );

  if (photographer) {
    const folderName = photographer.name.split(" ")[0]; // Utilise le prénom du photographe pour le dossier des médias

    let photographerMedias = media.filter(
      (media) => media.photographerId === photographId // Filtre les médias par ID de photographe
    );

    makeModal(photographer);
    initContactForm();

    photographerMedias = sortingMedia(photographerMedias, "popularity"); // Tri initial des médias par popularité

    const total = calcLikes(photographerMedias);

    const photographerModel = photographerTemplate(photographer);  // Crée un modèle de page photographe
    photographerModel.makePhotographPage(total); // Génère la page du photographe avec le total des likes

    /**
     * Affiche les médias à l'écran
     * @param {Array} mediasToDisplay - Tableau des médias à afficher
     * @function displayMedias
     * @returns {void}
     */
    function displayMedias(mediasToDisplay) {
      photographersContent.innerHTML = ""; // Vider le contenu

      mediasToDisplay.forEach((mediaItem, index) => { // Parcourt chaque média
        const mediaModel = mediaTemplate(mediaItem, folderName);
        const mediaCard = mediaModel.getMediaCardDOM();

        mediaCard.querySelector(".media").dataset.index = index; // Ajoute l'index du média pour la lightbox

        mediaCard.querySelector(".media").addEventListener("click", () => { // Ouvre la lightbox au clic et charge le média par rapport à l'index
          openLightbox(index, folderName);
        });

        mediaCard.querySelector(".media").addEventListener("keydown", (e) => { // Ouvre la lightbox avec la touche Entrée
          if (e.key === "Enter") {
            openLightbox(index, folderName);
          }
        });

        photographersContent.appendChild(mediaCard);
      });
    }

    // Affiche les médias non triés
    displayMedias(photographerMedias);

    // Gestion du changement de tri
    const sortSelect = document.querySelector("#sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        const sortedMedias = sortingMedia(photographerMedias, e.target.value);
        displayMedias(sortedMedias);
        setupLightbox(sortedMedias, folderName); // Mettre à jour la lightbox
      });
    }

    setupLightbox(photographerMedias, folderName); // Initialise la lightbox avec les médias du photographe
    addLikes(); // Ajoute la logique de likes aux médias
  } else {
    console.error(`Aucun photographe trouvé avec l'ID : ${photographId}`);
    photographersContent.innerHTML = `<p class="error-message">Photographe introuvable.</p>`;
  }
}

/**
 * Fonction d'initialisation de la page photographe
 * Récupère les données des photographes et médias depuis l'API,
 * puis lance l'affichage des données
 *
 * @function init
 * @async
 * @returns {Promise<void>}
 */
async function init() {
  const { photographers, media } = await getPhotographers(); // Récupère les données des photographes et médias
  displayData(photographers, media); // Affiche les données du photographe et ses médias
}

init();
