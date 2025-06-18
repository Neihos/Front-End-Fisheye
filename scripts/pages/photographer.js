let photographers = [];
const params = new URLSearchParams(window.location.search);
const photographId = parseInt(params.get("id"));

async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");

    if (!response.ok) {
      throw new Error("Le chargement a échoué");
    }

    const data = await response.json();

    // On retourne un objet avec une propriété photographers
    return { photographers: data.photographers };
  } catch (error) {
    console.error("Erreur :", error.message);

    // Retourne un objet vide mais avec la bonne forme
    return { photographers: [] };
  }
}

async function displayData(photographers) {
  const photographersContent = document.querySelector(".photographerContent");

  const photographer = photographers.find((p) => p.id === photographId);

  if (photographer) {
    const photographerModel = photographerTemplate(photographer);
    const makePhotographPage = photographerModel.makePhotographPage();
    photographersContent.appendChild(makePhotographPage);
  } else {
    console.error(`Aucun photographe trouvé avec l’ID : ${photographId}`);
    photographersContent.innerHTML = `<p class="error-message">Photographe introuvable.</p>`;
  }
}
  

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

