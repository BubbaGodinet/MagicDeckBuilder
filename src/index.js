document.addEventListener("DOMContentLoaded", () => {
  const magicUrl = "https://api.magicthegathering.io/v1/sets/ktk/booster";

  fetch(magicUrl)
    .then((response) => response.json())
    .then((magicData) => magicData.cards.forEach((value) => renderChar(value)));

  function renderChar(e) {
    const allCards = document.querySelector(".all-cards");
    const cardContainer = document.createElement("div");
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.className = "one-card";
    img.src = e.imageUrl;
    img.className = "zoom";
    div.append(img);
    cardContainer.append(div);
    allCards.append(cardContainer);
    div.addEventListener("click", () => getDeck(div));

    console.log("renderChar is running");
  }

  function getDeck(e) {
    const deck = document.querySelector(".deck-container");
    deck.append(e);
  }

  console.log("Global scope is working");
});
