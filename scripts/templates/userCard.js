/**
 * Template de création d'une carte utilisateur
 * Génère un élément HTML article contenant les informations de l'utilisateur
 *
 * @function
 * @param {Object} data - Données de l'utilisateur à afficher
 * @param {string} data.name - Nom de l'utilisateur
 * @param {string} data.portrait - Nom du fichier image du portrait
 * @param {string} data.city - Ville de l'utilisateur
 * @param {string} data.country - Pays de l'utilisateur
 * @param {string} data.tagline - Slogan de l'utilisateur
 * @param {number} data.price - Prix par jour de l'utilisateur
 * @returns {HTMLElement} Élément HTML article représentant la carte utilisateur
 */
export default function getUserCardDOM(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `./assets/photographers/${portrait}`;

  const article = document.createElement("article");

  const profileLink = document.createElement("a");
  profileLink.setAttribute("href", `./photographer.html?id=${id}`);
  profileLink.className = "profileLink";
  profileLink.setAttribute("aria-label", `Voir le profil de ${name}`);

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const img = document.createElement("img");
  img.className = `portrait${id}`;
  img.setAttribute("src", picture);
  img.setAttribute("alt", `${name}`);

  const h2 = document.createElement("h2");
  h2.textContent = name;

  const showPrice = document.createElement("p");
  showPrice.className = "price";
  showPrice.textContent = `${price}€/jour`;

  const location = document.createElement("p");
  location.className = "location";
  location.textContent = `${city}, ${country}`;

  const showTagline = document.createElement("p");
  showTagline.className = "tagline";
  showTagline.textContent = tagline;

  article.appendChild(profileLink);
  profileLink.appendChild(wrapper);
  profileLink.appendChild(h2);
  wrapper.appendChild(img);

  article.appendChild(location);
  article.appendChild(showTagline);
  article.appendChild(showPrice);

  return article;
}
  