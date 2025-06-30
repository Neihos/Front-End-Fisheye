/**
 * Fonction de création du header de la page photographer
 * @param {Object} data - Données du photographe
 * @param {number} totalLikes - Nombre total de likes
 */
export default function makePhotographPage(data, totalLikes) {
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