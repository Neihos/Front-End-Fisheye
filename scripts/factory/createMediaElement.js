/**
 * Factory qui retourne un élément HTML selon le type de média (image ou vidéo)
 *
 * @param {object} data - Objet de configuration du média
 * @param {'image'|'video'} data.type - Type de média à générer
 * @param {string} data.src - Chemin vers le fichier du média
 * @param {string} data.title - Titre pour accessibilité
 * @param {boolean} [data.showControls=false] - Affiche les contrôles vidéo si true
 * @param {boolean} [data.showCloseupView=false] - Utilise une vue rapprochée (modifie le alt)
 * @returns {HTMLElement} Élément <img> ou <video> prêt à être inséré dans le DOM
 */
export default function createMediaElement({
  type,
  src,
  title,
  showControls = false,
  showCloseupView = false,
}) {
  let mediaElement;
 
  // Vérification du type de média et création de l'élément approprié
  if (type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.setAttribute("src", src);
    if (showCloseupView) {
      mediaElement.setAttribute("alt", title);
    } else {
      mediaElement.setAttribute("alt", `${title}, closeup view`);
    }
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

  // Ajout des classes et attributs communs
  mediaElement.className = "media";
  mediaElement.setAttribute("tabindex", "0");

  return mediaElement;
}
