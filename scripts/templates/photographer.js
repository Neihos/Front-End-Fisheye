import getUserCardDOM from "./userCard.js";
import makePhotographPage from "./photographerHeader.js";

/**
 * Template de création d'une carte photographe
 * Génère un élément HTML article contenant les informations du photographe
 *
 * @function
 * @param {Object} data - Données du photographe à afficher
 * @param {number} data.id - ID du photographe
 * @param {string} data.name - Nom du photographe
 * @param {string} data.city - Ville du photographe
 * @param {string} data.country - Pays du photographe
 * @param {string} data.tagline - Slogan du photographe
 * @param {number} data.price - Prix par jour du photographe
 * @returns {Object} Objet contenant la méthode getUserCardDOM() qui retourne un élément HTML article
 */
function photographerTemplate(data) {
  return {
    getUserCardDOM: () => getUserCardDOM(data), // Méthode pour obtenir la carte du photographe
    makePhotographPage: (totalLikes) => makePhotographPage(data, totalLikes), // Méthode pour générer la page du photographe avec le total des likes
  };
}

export default photographerTemplate;

