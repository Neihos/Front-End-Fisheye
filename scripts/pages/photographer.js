import getPhotographers from "../api/api.js";
import mediaTemplate from "../templates/media.js";
import photographerTemplate from "../templates/photographer.js";

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

    const photographerModel = photographerTemplate(photographer);
    photographerModel.makePhotographPage();

    makeModal(photographer);

    const photographerMedias = media.filter(
      (media) => media.photographerId === photographId
    );

    photographerMedias.forEach((mediaItem) => {
      const mediaModel = mediaTemplate(mediaItem, folderName);
      const mediaCard = mediaModel.getMediaCardDOM();
      photographersContent.appendChild(mediaCard);
    });
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
