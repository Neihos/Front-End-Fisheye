// Méthode de création du header de la page photographer
export default function makePhotographPage(data) {
  const { name, portrait, city, country, tagline, id } = data;
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

  header.appendChild(info);
  info.appendChild(h1);
  info.appendChild(location);
  info.appendChild(showTagline);
  header.appendChild(pictureContainer);
  pictureContainer.appendChild(img);
}
