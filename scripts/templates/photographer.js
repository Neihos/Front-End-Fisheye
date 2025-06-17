function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
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

    const location = document.createElement("p");
    location.className = "location";
    location.textContent = `${city}, ${country}`;

    const showTagline = document.createElement("p");
    showTagline.className = "tagline";
    showTagline.textContent = tagline;

    const showPrice = document.createElement("p");
    showPrice.className = "price";
    showPrice.textContent = `${price}€/jour`;

    article.appendChild(profileLink);
    profileLink.appendChild(wrapper);
    profileLink.appendChild(h2);     
    wrapper.appendChild(img);
    
    article.appendChild(location);
    article.appendChild(showTagline);
    article.appendChild(showPrice);

    return article;
  }

  return { name, picture, getUserCardDOM };
}
