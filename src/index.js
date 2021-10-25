document.addEventListener("DOMContentLoaded", () => {
  const magicUrl = "https://api.magicthegathering.io/v1/sets/ktk/booster";

  fetch(magicUrl)
    .then((response) => response.json())
    .then((magicData) => magicData.cards.forEach((value) => renderChar(value)));

  function renderChar(e) {
    const body = document.querySelector("body");
    const cardContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");
    img.src = e.imageUrl;
    h3.textContent = e.name;
    cardContainer.append(img);
    cardContainer.append(h3);
    body.append(cardContainer);

    console.log("renderChar is running");
  }

  console.log("Global scope is working");
});
