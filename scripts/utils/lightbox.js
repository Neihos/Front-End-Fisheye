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
 * Gère la fermeture de la lightbox avec la touche "Escape"
 * @param {KeyboardEvent} e - L'événement de la touche
 * @returns {void}
 */
function onKeydown(e) {
  if (e.key === "Escape") hideLightbox();
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
  cross.addEventListener("click", hideLightbox);
  document.addEventListener("keydown", onKeydown);

  const arrowPrev = document.querySelector(".lightbox-prev");
  arrowPrev.addEventListener("click", () => {
    currentMediaIndex =
      (currentMediaIndex - 1 + mediaArray.length) % mediaArray.length;
    openLightbox(currentMediaIndex, folderName);
  });

  const arrowNext = document.querySelector(".lightbox-next");
  arrowNext.addEventListener("click", () => {
    currentMediaIndex = (currentMediaIndex + 1) % mediaArray.length;
    openLightbox(currentMediaIndex, folderName);
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
  currentMediaIndex = index;
  lightbox.style.display = "flex";
  main.setAttribute("inert", ""); // bloque le focus et les interactions sur le reste
  document.body.classList.add("no-scroll");

  const content = lightbox.querySelector(".lightbox-content");
  const mediaLightbox = mediaArray[currentMediaIndex];

  let fileName, mediaType;

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
  const mediaNow = createMediaElement({
    type: mediaType,
    src: mediaSrc,
    title,
    showControls: true,
    showCloseupView: true
  });
  
  content.appendChild(mediaNow);  
}
