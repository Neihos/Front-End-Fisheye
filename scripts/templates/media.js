import createMediaElement from "../factory/createMediaElement.js";

/**
 * Template de création d'une carte média pour un photographe
 * Génère un élément HTML article contenant le média, titre et système de likes
 *
 * @function
 * @param {Object} mediaData - Données du média à afficher
 * @param {string} mediaData.title - Titre du média
 * @param {string} [mediaData.image] - Nom du fichier image (si c'est une image)
 * @param {string} [mediaData.video] - Nom du fichier vidéo (si c'est une vidéo)
 * @param {number} mediaData.likes - Nombre de likes du média
 * @param {string} folderName - Nom du dossier contenant les médias du photographe
 * @returns {Object} Objet contenant la méthode getMediaCardDOM() qui retourne un élément HTML article
 */
export default function mediaTemplate(mediaData, folderName) {
  const { title, image, video, likes } = mediaData;
  const mediaSrc = `assets/media/${folderName}/${image || video}`;
  const heartIconSrc = "assets/icons/heart.svg";

  const getMediaCardDOM = () => {
    const article = document.createElement("article");

    // Appel à la factory propre
    const type = image ? "image" : "video";
    const mediaElement = createMediaElement({ type, src: mediaSrc, title });

    // Titre
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    // Bloc likes
    const likesContainer = document.createElement("div");
    likesContainer.className = "likes-container";

    const likesElement = document.createElement("span");
    likesElement.className = "likes";
    likesElement.textContent = likes;

    const buttonHeart = document.createElement("button");
    buttonHeart.setAttribute("aria-label", "like button");
    buttonHeart.className = "buttonHeart";

    const heartElement = document.createElement("img");
    heartElement.setAttribute("src", heartIconSrc);
    heartElement.setAttribute("alt", "");
    heartElement.setAttribute("aria-hidden", "true")
    heartElement.className = "heart-icon";

    likesContainer.appendChild(likesElement);
    buttonHeart.appendChild(heartElement);
    likesContainer.appendChild(buttonHeart);
    

    // Assemblage
    article.appendChild(mediaElement);
    article.appendChild(titleElement);
    article.appendChild(likesContainer);

    return article;
  };

  return { getMediaCardDOM };
}
