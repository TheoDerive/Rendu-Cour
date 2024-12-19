const charactersContainer = document.querySelector(".characters");

let filtre = "";

async function getCharacter() {
  const charactersFetch = await fetch(
    "https://hp-api.onrender.com/api/characters/",
    {
      header: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  ).then((response) => response.json());

  let characters = charactersFetch.slice(0, 12);

  if (filtre !== "") {
    characters = characters.filter((character) => character.house === filtre);
  }

  charactersContainer.innerHTML = "";
  for (let index = 0; index < characters.length; index++) {
    const element = characters[index];

    const character = document.createElement("div");
    character.innerHTML = `
          <a href="/details.html?id=${element.id}" class=${element.house}>
            <img class="img-house" src=${element.image} />
            <p>${element.name}</p>
          </a>
`;

    charactersContainer.appendChild(character);
  }
}

function filterCharacters(filter) {
  filtre = filter;
  getCharacter();
}

getCharacter();

const buttons = document.querySelectorAll(".house-container");

for (let index = 0; index < buttons.length; index++) {
  const element = buttons[index];

  element.addEventListener("click", () => filterCharacters(element.id));
}
