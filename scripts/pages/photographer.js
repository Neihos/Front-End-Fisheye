import getPhotographers from "../api/api.js";
import mediaTemplate from "../templates/media.js";
import photographerTemplate from "../templates/photographer.js";
import { setupLightbox, openLightbox } from "../utils/lightbox.js";
import addLikes from "../handlers/likesHandler.js";
import calcLikes from "../utils/likesCalculator.js";

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
  const photographersContent = document.querySelector(".photographerContent");

  const photographer = photographers.find(
    (photographer) => photographer.id === photographId
  );

  if (photographer) {
    const folderName = photographer.name.split(" ")[0];

    const photographerMedias = media.filter(
      (media) => media.photographerId === photographId
    );

    const total = calcLikes(photographerMedias);

    const photographerModel = photographerTemplate(photographer);
    photographerModel.makePhotographPage(total);

    makeModal(photographer);

    photographerMedias.forEach((mediaItem, index) => {
      const mediaModel = mediaTemplate(mediaItem, folderName);
      const mediaCard = mediaModel.getMediaCardDOM();

      mediaCard.querySelector(".media").dataset.index = index;

      mediaCard.querySelector(".media").addEventListener("click", () => {
        openLightbox(index, folderName);
      });

      mediaCard.querySelector(".media").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          openLightbox(index, folderName);
        }
      });

      photographersContent.appendChild(mediaCard);
    });

    setupLightbox(photographerMedias, folderName);
    
    addLikes();
  } else {
    console.error(`Aucun photographe trouvé avec l’ID : ${photographId}`);
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
  const { photographers, media } = await getPhotographers();
  displayData(photographers, media);
}

init();