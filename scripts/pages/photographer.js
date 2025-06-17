const params = new URLSearchParams(window.location.search);
const photographId = parseInt(params.get("id"));

const photographMedia = [];

async function getMedia() {
  try {
    const reponse = await fetch("/data/photographers.json");

    if (!reponse.ok) {
      throw new Error("Le chargement a échoué");
    }

    const data = await reponse.json();

    return { photographMedia: data.media };
  } catch (error) {
    console.error("Erreur :", error.message);

    // Retourne un objet vide mais avec la bonne forme
    return { photographMedia: [] };
  }
}
