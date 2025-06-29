// Méthode de création du header de la page photographer
export function makePhotographPage(data, totalLikes) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `./assets/photographers/${portrait}`;

  const header = document.querySelector(".photograph-header");
  const info = document.createElement("div");
  info.className = "info";

  const h1 = document.createElement("h1");
  h1.textContent = name;

  const pictureContainer = document.createElement("div");
  pictureContainer.className = "pictureContainer";

  const location = document.createElement("p");
  location.className = "location";
  location.textContent = `${city}, ${country}`;

  const showTagline = document.createElement("p");
  showTagline.className = "tagline";
  showTagline.textContent = tagline;

  const img = document.createElement("img");
  img.className = `photograph${id}`;
  img.setAttribute("src", picture);
  img.setAttribute("alt", `${name}`);

  const bottomPrice = document.querySelector(".price");
  bottomPrice.innerHTML = `${price}€ / jour`;

  const showTotalLikes = document.querySelector(".total-likes");
  showTotalLikes.innerHTML = `${totalLikes} <img src="assets/icons/blackheart.svg" alt="likes" class="heart-total" />`;


  header.appendChild(info);
  info.appendChild(h1);
  info.appendChild(location);
  info.appendChild(showTagline);
  header.appendChild(pictureContainer);
  pictureContainer.appendChild(img);
}

export function calcLikes(photographerMedias) {
  const totalLikes = photographerMedias.reduce(
    (acc, media) => acc + media.likes,
    0
  );
  return totalLikes;
}

export function addLikes() {
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
