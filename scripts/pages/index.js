import getPhotographers from "../data/dataPhotographer.js";
import photographerTemplate from "../templates/photographer.js";


/**
 * fonction displayData pour la page index
 * Récupère les données des photographes via l'API, puis crée et insère les cartes de chaque photographe dans le DOM.
 *
 * @function displayData
 * @async
 * @param {Array} photographers - Liste des photographes à afficher
 * @returns {Promise<void>}
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // Crée un modèle de page photographe
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Initialise la page d'accueil
 * Récupère les données des photographes et les affiche sur la page.
 * @function init
 * @async
 * @return {Promise<void>}
 */
async function init() {
  const { photographers } = await getPhotographers(); // Récupère les données des photographes
  displayData(photographers); // Affiche les données des photographes
  // console.log(photographers);
}

init();
