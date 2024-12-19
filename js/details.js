const characterContainer = document.querySelector("main");
let id = "";

const searchParams = new URLSearchParams(window.location.href);
for (const [key, value] of searchParams) {
  id = value;
}

async function getCharacter() {
  let name = await fetch(`https://hp-api.onrender.com/api/character/${id}`, {
    header: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response.json());
  name = name[0];
  console.log(name);

  characterContainer.innerHTML = "";

  const character = document.createElement("div");
  character.innerHTML = `

      <section>
        <h3>${name.name}</h3>
        <div class="perso">
          <figure class="perso__left">
            <img src=${name.image} alt="" srcset="" />
            <figcaption>Harry Potter</figcaption>
          </figure>
          <div class="perso__right">
            <div>
              <p>Gender</p>
              <p class="attr">${name.gender || "undefiend"}</p>
            </div>            
            <div>
              <p>Eye</p>
              <p class="attr">${name.eyeColour}</p>
            </div>            
            <div>
              <p>Hair</p>
              <p class="attr">${name.hairColour}</p>
            </div>            
            <div>
              <p>Date of birth</p>
              <p class="attr">${name.dateOfBirth}</p>
            </div>            
            <div>
              <p>Patronus</p>
              <p class="attr">${name.patronus || "none"}</p>
            </div>            
        </div>
      </section>
      <section class="house__perso">
        <img src=${getImageHouse(name.house)} alt="" srcset="" />
      </section>
`;

  characterContainer.appendChild(character);
}

function getImageHouse(house) {
  switch (house) {
    case "Gryffindor":
      return "../images/logo/Gryffindor.png";

    case "Slytherin":
      return "../images/logo/Slytherin.png";

    case "Ravenclaw":
      return "../images/logo/Ravenclaw.png";

    case "Hufflepuff":
      return "../images/logo/Hufflepuff.png";

    default:
      return "../images/logo/Gryffindor.png";
  }
}

getCharacter();
