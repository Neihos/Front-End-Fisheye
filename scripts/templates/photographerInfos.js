/**
 * Fonction de création du header de la page photographer
 * @param {Object} data - Données du photographe
 * @param {number} totalLikes - Nombre total de likes
 */
export default function makePhotographPage(data, totalLikes) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `./assets/photographers/${portrait}`;

  // Sélectionne le header de la page
  const header = document.querySelector(".photograph-header");
  const info = document.createElement("div");
  info.className = "info";

  // création du h1 pour le nom du photographe
  const h1 = document.createElement("h1");
  h1.textContent = name;

  // création de la div pour l'image du photographe
  const pictureContainer = document.createElement("div");
  pictureContainer.className = "pictureContainer";

  // création de la localisation du photographe 
  const location = document.createElement("p");
  location.className = "location";
  location.textContent = `${city}, ${country}`;

  // création de la tagline du photographe
  const showTagline = document.createElement("p");
  showTagline.className = "tagline";
  showTagline.textContent = tagline;

  // création de l'image du photographe
  const img = document.createElement("img");
  img.className = `photograph${id}`;
  img.setAttribute("src", picture);
  img.setAttribute("alt", `${name}`);

  // Met à jour le prix et le nombre total de likes dans le footer
  const bottomPrice = document.querySelector(".price");
  bottomPrice.innerHTML = `${price}€ / jour`;

  const showTotalLikes = document.querySelector(".total-likes");
  showTotalLikes.innerHTML = totalLikes;


  // Ajoute les éléments créés au DOM
  header.appendChild(info);
  info.appendChild(h1);
  info.appendChild(location);
  info.appendChild(showTagline);
  header.appendChild(pictureContainer);
  pictureContainer.appendChild(img);
}