/**
 * Calcule le nombre total de likes d'un photographe
 * @param {Array} photographerMedias - Les médias du photographe
 * @returns {number} - Le nombre total de likes
 */
export default function calcLikes(photographerMedias) {
  const totalLikes = photographerMedias.reduce(
    (acc, media) => acc + media.likes,
    0
  );
  return totalLikes;
}
