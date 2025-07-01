/**
 * Récupère les données des photographes et des médias depuis le fichier JSON.
 * Utilise `fetch()` de manière asynchrone et gère les erreurs en retournant une structure vide en cas d’échec.
 *
 * @async
 * @function getPhotographers
 * @returns {Promise<{ photographers: object[], media: object[] }>} Un objet contenant deux tableaux : `photographers` et `media`
 */
export default async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");

    if (!response.ok) {
      throw new Error("Le chargement a échoué");
    }

    const data = await response.json();

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
