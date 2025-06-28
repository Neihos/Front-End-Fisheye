import getPhotographers from "../api/api.js";
import mediaTemplate from "../templates/media.js";
import photographerTemplate from "../templates/photographer.js";
import { setupLightbox, openLightbox } from "../utils/lightbox.js";
import { calcLikes } from "../templates/photographerInfos.js";

// On récupére l'id depuis l'url
const params = new URLSearchParams(window.location.search);
const photographId = parseInt(params.get("id"));

// Fonction asynchrone pour filtrer les données par id des photographes
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
  } else {
    console.error(`Aucun photographe trouvé avec l’ID : ${photographId}`);
    photographersContent.innerHTML = `<p class="error-message">Photographe introuvable.</p>`;
  }
}

async function init() {
  const { photographers, media } = await getPhotographers();
  displayData(photographers, media);
}

init();