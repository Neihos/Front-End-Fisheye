import getUserCardDOM from "./userCard.js";
import { makePhotographPage } from "./photographerInfos.js";

function photographerTemplate(data) {
  return {
    getUserCardDOM: () => getUserCardDOM(data),
    makePhotographPage: (totalLikes) => makePhotographPage(data, totalLikes),
  };
}

export default photographerTemplate;

