function mediaTemplate(mediaData, folderName) {
  const { title, image, video, likes } = mediaData;
  const mediaSrc = `assets/media/${folderName}/${image || video}`;
  const heartIconSrc = "assets/icons/heart.svg";

  function getMediaCardDOM() {
    const article = document.createElement("article");

    // Image ou Vidéo
    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", mediaSrc);
      mediaElement.setAttribute("alt", title);
    } else if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", mediaSrc);
      mediaElement.setAttribute("controls", ""); // rend la vidéo lisible
      mediaElement.setAttribute("aria-label", title);
    }

    mediaElement.className = "media";
    mediaElement.setAttribute("tabindex", "0");

    // Titre
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    // Bloc likes
    const likesContainer = document.createElement("div");
    likesContainer.className = "likes-container";

    const likesElement = document.createElement("span");
    likesElement.className = "likes";
    likesElement.textContent = likes;

    const heartElement = document.createElement("img");
    heartElement.setAttribute("src", heartIconSrc);
    heartElement.setAttribute("alt", "J’aime");
    heartElement.className = "heart-icon";

    likesContainer.appendChild(likesElement);
    likesContainer.appendChild(heartElement);

    // Assemblage
    article.appendChild(mediaElement);
    article.appendChild(titleElement);
    article.appendChild(likesContainer);

    return article;
  }

  return { getMediaCardDOM };
}
