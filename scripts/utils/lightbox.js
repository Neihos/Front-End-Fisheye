let currentMediaIndex = 0;
let mediaArray = [];

export function setupLightbox(medias) {
  mediaArray = medias;
  console.log(medias)
}

export function openLightbox(index){
    currentMediaIndex = index;
}