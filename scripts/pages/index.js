let photographers = [];

async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");

    if (!response.ok) {
      throw new Error("Le chargement a échoué");
    }

    const data = await response.json();

    // On retourne un objet avec une propriété photographers
    return { photographers: data.photographers };
  } catch (error) {
    console.error("Erreur :", error.message);

    // Retourne un objet vide mais avec la bonne forme
    return { photographers: [] };
  }
}
  
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
    
