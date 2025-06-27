import getUserCardDOM from "./userCard.js";
import makePhotographPage from "./photographerHeader.js";

function photographerTemplate(data) {
  return {
    getUserCardDOM: () => getUserCardDOM(data),
    makePhotographPage: () => makePhotographPage(data),
  };
}

export default photographerTemplate;
