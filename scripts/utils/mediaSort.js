/**
 * Trie un tableau de médias selon le critère spécifié
 *
 * @function
 * @param {Array} mediaArray - Tableau des médias à trier
 * @param {string} sortBy - Critère de tri ('popularity', 'date', 'title')
 * @returns {Array} Tableau trié des médias
 */
export function sortingMedia(mediaArray, sortBy) {
  const sortedArray = [...mediaArray];

  switch (sortBy) {
    case "popularity":
      return sortedArray.sort((a, b) => b.likes - a.likes); // Décroissant

    case "date":
      return sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date)); // Plus récent d'abord

    case "title":
      return sortedArray.sort((a, b) => a.title.localeCompare(b.title)); // Alphabétique

    default:
      return sortedArray;
  }
}
