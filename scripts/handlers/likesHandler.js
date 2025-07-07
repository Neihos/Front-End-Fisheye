/**
 * @function addLikes
 *
 * Ajoute la logique de like/dislike à tous les boutons .buttonHeart présents dans le DOM.
 * Ne fonctionne que si chaque bouton est accompagné d'un compteur .likes dans le même parent.
 *
 * @returns {void}
 */
export default function addLikes() {
  document
    .querySelector(".photographerMedias")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("buttonHeart")) {
        const heartButton = event.target.closest(".buttonHeart");
        const mediaElement = heartButton.closest("article");
        const likeDisplay = mediaElement.querySelector(".likes");

        let currentLikes = parseInt(likeDisplay.textContent);
        const liked = mediaElement.dataset.liked === "true";

        if (!liked) {
          likeDisplay.textContent = currentLikes + 1;
          mediaElement.dataset.liked = "true";
          heartButton.setAttribute("aria-label", "vous aimez cela");
        } else {
          likeDisplay.textContent = currentLikes - 1;
          mediaElement.dataset.liked = "false";
          heartButton.setAttribute("aria-label", "cliquez pour aimer cela");
        }
      } else {
        return 
      }
    });
}
