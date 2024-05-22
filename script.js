const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const types = document.getElementById("types");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
let img;

searchButton.addEventListener("click", (e) => {
  if (searchInput.value != "") {
    e.preventDefault();
    console.log()
    resetAll();
    fetchPokemonData(convertInputValue(searchInput.value));
  }
});
let data
async function fetchPokemonData(nameOrId) {
  try {
    const response = await fetch(url + nameOrId);

    if (!response.ok) {
      alert("Pokémon not found");
    }

    data = await response.json();
    console.log(data);

    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = "#" + data.id;
    weight.textContent = "Weight: " + data.weight;
    height.textContent = "Height: " + data.height;

    img = document.createElement("img");
    img.src = data.sprites.front_default;
    img.id = "sprite";

    types.innerHTML = data.types
      .map((type) => `<div class="type">${type.type.name.toUpperCase()}</div>`)
      .join("");

    height.after(img);
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
  } catch (error) {
    console.log(error);
    alert("Pokémon not found");
  }
}

function convertInputValue(value) {
  const regex = /[a-z0-9]/gi;
  value = value.match(regex).join("").toLowerCase();
  return value.includes("♀")
    ? `${value}-f`
    : value.includes("♂")
    ? `${value}-m`
    : value;
}

function resetAll() {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  types.innerHTML = "";
  const img = document.getElementById("sprite");
  if (img) {
    img.remove();
  }
}


