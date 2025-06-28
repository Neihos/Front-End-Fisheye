/**
 * Factory qui retourne un élément HTML selon le type de média (image ou vidéo)
 * @param {object} data - { type: 'image' | 'video', src: string, title: string }
 * @returns {HTMLElement}
 */
export default function createMediaElement({ type, src, title, showControls = false }) {
  let mediaElement;

  if (type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.setAttribute("src", src);
    mediaElement.setAttribute("alt", title);
  } else if (type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.setAttribute("src", src);
    mediaElement.setAttribute("aria-label", title);
    if (showControls) {
      mediaElement.setAttribute("controls", "");
    }
  } else {
    throw new Error(`Type de média non supporté : ${type}`);
  }

  mediaElement.className = "media";
  mediaElement.setAttribute("tabindex", "0");

  return mediaElement;
}
