document.addEventListener("DOMContentLoaded", () => {
  const magicUrl = "https://api.magicthegathering.io/v1/sets/ktk/booster";
  const makeEl = (element) => document.createElement(element);
  const select = (element) => document.querySelector(element);
  const body = select("body");
  const deck = select(".back-of-card");
  const deckContainer = select(".deck-container");
  const refreshBttn = makeEl("button");
  refreshBttn.textContent = "New Booster Pack";
  refreshBttn.id = "refreshed";

  fetch(magicUrl)
    .then((response) => response.json())
    .then((magicCharArr) =>
      magicCharArr.cards.forEach((char) => renderChar(char))
    );

  function renderChar(char) {
    const allCards = select(".all-cards");
    const cardContainer = makeEl("div");
    const div = makeEl("div");
    const img = makeEl("img");
    const addBttn = makeEl("button");
    const deleteBttn = makeEl("button");

    cardContainer.id = char.multiverseid;
    img.className = char.multiverseid;
    addBttn.className = "add-to-deck";
    deleteBttn.className = "delete-card";
    addBttn.textContent = "Add to Deck";
    deleteBttn.textContent = "Delete Card";
    div.append(addBttn);
    div.append(deleteBttn);

    div.className = "one-card";
    img.src = char.imageUrl;
    div.append(img);

    cardContainer.append(div);
    allCards.append(cardContainer);
    addBttn.addEventListener("click", () => addToDeck(img));
    deleteBttn.addEventListener("click", () => deleteCard(div));
  }

  function addToDeck(img) {
    const cardDiv = document.getElementById(`${img.className}`);
    const myCards = document.querySelector(".deck-container");
    const newCards = document.querySelector(".my-cards");

    if (myCards.contains(newCards)) {
      cardDiv.remove();
      img.id = "new-deck";
      deckContainer.append(img);
      saveDeck(img);
    } else {
      cardDiv.remove();
      img.id = "new-deck";
      deck.append(img);
      saveDeck(img);
    }
  }

  function deleteCard(cardDiv) {
    cardDiv.remove();
  }

  deck.addEventListener("click", () => openDeck());

  function openDeck() {
    const deckCards = document.querySelectorAll("#new-deck");
    for (let i = 0; i < deckCards.length; i++) {
      deckCards[i].className = "my-cards";
      deckContainer.append(deckCards[i]);
    }
  }

  deck.addEventListener("dblclick", () => closeDeck());

  function closeDeck() {
    const newCards = document.querySelectorAll(".my-cards");
    for (let i = 0; i < newCards.length; i++) {
      if (deckContainer.contains(newCards[i])) {
        deck.append(newCards[i]);
        newCards[i].className = "my-deck";
      }
    }
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

  fetch("http://localhost:3000/cards")
    .then((response) => response.json())
    .then((savedCardArr) =>
      savedCardArr.forEach((savedCards) => retrieveDeck(savedCards))
    );

  function retrieveDeck(savedCards) {
    const deckImg = makeEl("img");
    deckImg.id = "new-deck";
    deckImg.className = `${savedCards.multiverseid}`;
    deckImg.src = `${savedCards.img}`;
    deck.append(deckImg);
  }

  refreshBttn.addEventListener("click", () => refreshBooster());
  body.append(refreshBttn);

  function refreshBooster() {
    fetch(magicUrl)
      .then((response) => response.json())
      .then((magicData) =>
        magicData.cards.forEach((value) => renderChar(value))
      );
  }
  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", () => openSesame());

  function openSesame() {
    overlay.remove();
  }
});

// https://gatherer.wizards.com/pages/card/Languages.aspx?

// if (e.rarity === "Common") {
//   img.style.border = "thick solid #ffffff";
// } else if (e.rarity === "Rare") {
//   img.style.border = "thick solid #FFD700";
// } else if (e.rarity === "Uncommon") {
//   img.style.border = "thick solid #0000FF";
// }
