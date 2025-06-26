// Fonction asynchrone via fetch pour récupérer les données du fichier photographer.json
export default async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");

    if (!response.ok) {
      throw new Error("Le chargement a échoué");
    }

    const data = await response.json();

    // On retourne un objet avec une propriété photographers
    return {
      photographers: data.photographers,
      media: data.media,
    };
  } catch (error) {
    console.error("Erreur :", error.message);

    // Retourne un objet vide mais avec la bonne forme
    return {
      photographers: [],
      media: [],
    };
  }
}
