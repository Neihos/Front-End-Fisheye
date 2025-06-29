import createMediaElement from "../factory/createMediaElement.js";

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
