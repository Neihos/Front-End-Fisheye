import createMediaElement from "../factory/createMediaElement.js";

let currentMediaIndex = 0;
let mediaArray = [];
const lightbox = document.querySelector("#lightbox");
const main = document.querySelector("main");

/**
 * Masque la lightbox
 * Réactive les interactions sur le reste de la page et retire la classe no-scroll du body
 * @function hideLightbox
 * @returns {void}
 */
function hideLightbox() {
  lightbox.style.display = "none";
  main.removeAttribute("inert");
  document.body.classList.remove("no-scroll");
}

/**
 * Configure la lightbox avec les médias et le nom du dossier
 * @param {Array} medias - Liste des médias à afficher
 * @param {string} folderName - Nom du dossier contenant les médias
 * @function setupLightbox
 * @returns {void}
 */
export function setupLightbox(medias, folderName) {
  mediaArray = medias;

  const cross = document.querySelector(".lightbox-close");
  const arrowPrev = document.querySelector(".lightbox-prev");
  const arrowNext = document.querySelector(".lightbox-next");

  const closeLightbox = () => {
    hideLightbox();
  };
  cross.onclick = closeLightbox;
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  const toPreviousMedia = () => {
    currentMediaIndex =
      (currentMediaIndex - 1 + mediaArray.length) % mediaArray.length;
    openLightbox(currentMediaIndex, folderName);
  };

  arrowPrev.onclick = toPreviousMedia;
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      toPreviousMedia();
    }
  });

  const toNextMedia = () => {
    currentMediaIndex = (currentMediaIndex + 1) % mediaArray.length;
    openLightbox(currentMediaIndex, folderName);
  };

  arrowNext.onclick = toNextMedia;
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      toNextMedia();
    }
  });
}

/**
 * Ouvre la lightbox sur un média spécifique
 * @param {number} index - L'index du média à afficher
 * @param {string} folderName - Le nom du dossier contenant les médias
 * @function openLightbox
 * @returns {void}
 */
export function openLightbox(index, folderName) {
  // Applique les styles pour afficher la lightbox
  currentMediaIndex = index;
  lightbox.style.display = "flex";
  main.setAttribute("inert", ""); // bloque le focus et les interactions sur le reste
  document.body.classList.add("no-scroll");

  const content = lightbox.querySelector(".lightbox-content");
  const mediaLightbox = mediaArray[currentMediaIndex];

  let fileName, mediaType;

  // Vérifie si le média est une image ou une vidéo et crée l'élément approprié
  if (mediaLightbox.image) {
    fileName = mediaLightbox.image;
    mediaType = "image";
  } else if (mediaLightbox.video) {
    fileName = mediaLightbox.video;
    mediaType = "video";
  } else {
    throw new Error("Aucun fichier image ou vidéo trouvé pour ce média.");
  }

  const mediaSrc = `assets/media/${folderName}/${fileName}`;
  const title = mediaLightbox.title;

  content.innerHTML = "";
  // Crée l'élément média avec les propriétés appropriées
  const mediaNow = createMediaElement({
    type: mediaType,
    src: mediaSrc,
    title,
    showControls: true,
    showCloseupView: true
  });
  const mediaTitleContainer = document.createElement("div");
  mediaTitleContainer.className = "media-title-container";
  const mediaTitle = document.createElement("h2");
  mediaTitle.className = "media-title";
  mediaTitle.textContent = title;
  
  // Ajoute l'élément média et le titre à la lightbox
  content.appendChild(mediaNow);
  content.appendChild(mediaTitleContainer);
  mediaTitleContainer.appendChild(mediaTitle);
  content.setAttribute("aria-label", title);
  content.querySelector("video, img").setAttribute("aria-label", title);
}
