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
    // if (e.rarity === "Common") {
    //   img.style.border = "thick solid #ffffff";
    // } else if (e.rarity === "Rare") {
    //   img.style.border = "thick solid #FFD700";
    // } else if (e.rarity === "Uncommon") {
    //   img.style.border = "thick solid #0000FF";
    // }

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
    img.className = `${e.rarity}`;
    div.append(img);

    cardContainer.append(div);
    allCards.append(cardContainer);
    addBttn.addEventListener("click", () => getDeck(img));
    deleteBttn.addEventListener("click", () => deleteCard(div));
    console.log("renderChar is running");
  }

  function deleteCard(e) {
    e.remove();
  }

  function getDeck(img) {
    const deckStack = document.querySelector(".back-of-card");
    const cardDiv = document.getElementById(`${img.id}`);
    cardDiv.remove();
    img.id = "new-deck";
    deckStack.append(img);
    saveDeck(img);
  }

  function saveDeck(img) {
    const newCard = {
      img: img.src,
    };

    fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    }).then((response) => response.json());
  }

  const deck = document.querySelector(".back-of-card");
  deck.addEventListener("click", () => openDeck());

  function openDeck() {
    const deckContainer = document.querySelector(".deck-container");
    const deckCards = document.querySelectorAll("#new-deck");
    for (let i = 0; i < deckCards.length; i++) {
      deckContainer.append(deckCards[i]);
    }
  }
  fetch("http://localhost:3000/cards")
    .then((response) => response.json())
    .then((savedCardArr) =>
      savedCardArr.forEach((savedCards) => retrieveDeck(savedCards))
    );

  function retrieveDeck(savedCards) {
    const deckStack = document.querySelector(".back-of-card");
    const deckImg = document.createElement("img");
    deckImg.id = "new-deck";
    deckImg.src = `${savedCards.img}`;
    deckStack.append(deckImg);
  }

  const body = document.querySelector("body");
  const refreshBttn = document.createElement("button");
  refreshBttn.textContent = "New Booster Pack";
  refreshBttn.id = "refreshed";
  body.append(refreshBttn);
  refreshBttn.addEventListener("click", () => refreshBooster());

  function refreshBooster() {
    fetch(magicUrl)
      .then((response) => response.json())
      .then((magicData) =>
        magicData.cards.forEach((value) => renderChar(value))
      );
  }

  console.log("Global scope is working");
});
