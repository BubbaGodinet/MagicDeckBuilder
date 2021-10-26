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
    const addBttn = document.createElement("button");
    const deleteBttn = document.createElement("button");

    cardContainer.id = e.multiverseid;
    img.id = e.multiverseid;
    addBttn.className = "add-to-deck";
    deleteBttn.className = "delete-card";
    addBttn.textContent = "Add to Deck";
    deleteBttn.textContent = "Delete Card";
    div.append(addBttn);
    div.append(deleteBttn);

    div.className = "one-card";
    img.src = e.imageUrl;
    img.className = "zoom";
    div.append(img);
    // cardContainer.id = "her i am";
    cardContainer.append(div);
    allCards.append(cardContainer);
    addBttn.addEventListener("click", () => getDeck(img));
    deleteBttn.addEventListener("click", () => deleteCard(div));
    console.log("renderChar is running");
  }

  function deleteCard(e) {
    e.remove();
  }

  function getDeck(e) {
    const deckStack = document.querySelector(".back-of-card");
    const cardDiv = document.getElementById(`${e.id}`);
    cardDiv.remove();

    e.id = "new-deck";
    deckStack.append(e);
  }

  const deck = document.querySelector(".back-of-card");
  deck.addEventListener("click", () => openDeck());

  function openDeck() {
    const deckContainer = document.querySelector(".deck-container");
    const deckCards = document.querySelector("#new-deck");
    console.log(deckCards);
    deckContainer.append(deckCards);
  }

  console.log("Global scope is working");
});
