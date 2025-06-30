/**
 * @function addLikes
 * 
 * Ajoute la logique de like/dislike à tous les boutons .buttonHeart présents dans le DOM.
 * Ne fonctionne que si chaque bouton est accompagné d'un compteur .likes dans le même parent.
 *
 * @returns {void}
 */
export default function addLikes() {
  const buttons = document.querySelectorAll(".buttonHeart");

  buttons.forEach((button) => {
    let liked = false;

    button.addEventListener("click", function () {
      const likeDisplay = this.parentElement.querySelector(".likes");

      if (!likeDisplay) return;

      let currentLikes = parseInt(likeDisplay.textContent);

      if (!liked) {
        likeDisplay.textContent = currentLikes + 1;
        liked = true;
      } else {
        likeDisplay.textContent = currentLikes - 1;
        liked = false;
      }
    });
  });
}
