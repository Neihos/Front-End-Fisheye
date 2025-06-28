import createMediaElement from "../factory/createMediaElement.js";

let currentMediaIndex = 0;
let mediaArray = [];
const lightbox = document.querySelector("#lightbox");
const main = document.querySelector("main");

export function setupLightbox(medias) {
  mediaArray = medias;
}

export function openLightbox(index, folderName) {
  currentMediaIndex = index;
  lightbox.style.display = "flex";
  main.setAttribute("inert", ""); // bloque le focus et les interactions sur le reste

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
  });
  
  content.appendChild(mediaNow);
}

function hideLightbox() {
  lightbox.style.display = "none";
  main.removeAttribute("inert");
}

export function closeLightbox() {
  const cross = document.querySelector(".lightbox-close");
  cross.addEventListener("click", hideLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideLightbox();
    }
  });
}


