// On récupére l'id depuis l'url
const params = new URLSearchParams(window.location.search);
const photographId = parseInt(params.get("id"));

// Fonction asynchrone via fetch pour récupérer les données du fichier photographer.json
async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");

    if (!response.ok) {
      throw new Error("Le chargement a échoué");
    }

    const data = await response.json();

    // On retourne un objet avec une propriété photographers
    return {
      photographers: data.photographers,
      media: data.media,
    };
  } catch (error) {
    console.error("Erreur :", error.message);

    // Retourne un objet vide mais avec la bonne forme
    return {
      photographers: [],
      media: [],
    };
  }
}

// Fonction asynchrone pour filtrer les données par id des photographes
async function displayData(photographers, media) {
  const photographersContent = document.querySelector(".photographerContent");

  const photographer = photographers.find((photographer) => photographer.id === photographId);

  if (photographer) {
    const folderName = photographer.name.split(" ")[0];

    const photographerModel = photographerTemplate(photographer);
    photographerModel.makePhotographPage();

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
