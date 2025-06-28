import createMediaElement from "../factory/createMediaElement.js";

let currentMediaIndex = 0;
let mediaArray = [];
const lightbox = document.querySelector("#lightbox");
const main = document.querySelector("main");

function hideLightbox() {
  lightbox.style.display = "none";
  main.removeAttribute("inert");
  document.body.classList.remove("no-scroll");
}

function onKeydown(e) {
  if (e.key === "Escape") hideLightbox();
}

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
