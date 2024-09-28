let imageIndex = 0; // Index for cycling through images
let imageInterval; // Variable to hold the interval for image cycling

// Define emojis for each Pokémon type
const typeEmojis = {
  fire: "🔥",
  water: "💧",
  grass: "🌿",
  electric: "⚡",
  bug: "🐞",
  normal: "🌟",
  poison: "☠️",
  ground: "🌍",
  rock: "🪨",
  fairy: "🧚",
  fighting: "🥊",
  psychic: "🧠",
  ice: "❄️",
  ghost: "👻",
  dragon: "🐉",
  dark: "🌑",
  steel: "⚙️",
  flying: "🕊️",
  // Add more types as needed
};

// Add event listener to the search button
document.getElementById("searchButton").addEventListener("click", () => {
  const pokemonName = document
    .getElementById("PokemonName")
    .value.toLowerCase(); // Get the input Pokémon name
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`) // Fetch Pokémon data from API
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cannot find the Pokémon"); // Handle error if Pokémon not found
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => displayPokemon(data)) // Call function to display Pokémon data
    .catch((error) => {
      console.error(error); // Log error to console
      alert(error.message); // Show an alert if the Pokémon is not found
    });
});

// Function to display the Pokémon data
function displayPokemon(data) {
  const pokemonCardContainer = document.getElementById("pokemonCardContainer");
  pokemonCardContainer.innerHTML = ""; // Clear previous results

  const card = document.createElement("div"); // Create a card for the Pokémon
  card.className = "pokemon-card";

  const name = document.createElement("h2"); // Create an element for the Pokémon name
  name.className = "pokemon-name";
  name.textContent = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} (#${data.id})`;

  const img = document.createElement("img"); // Create an image element for the Pokémon sprite
  img.className = "pokemon-img";
  img.src = data.sprites.front_default; // Set the default image
  img.alt = data.name;

  // Get the types of the Pokémon and create a display text
  const types = data.types.map((typeInfo) => typeInfo.type.name);
  const typesText = types.join(", "); // Join types into a string
  const typeEmojisText = types.map((type) => typeEmojis[type] || "").join(" "); // Get emojis for types

  // Create a paragraph element for types with emojis
  const typesElement = document.createElement("p");
  typesElement.className = "pokemon-type";
  typesElement.textContent = `${typesText} ${typeEmojisText}`;

  // Create elements for weight and height with corresponding emojis
  const weight = document.createElement("p");
  weight.className = "pokemon-weight";
  weight.textContent = `Weight: ${data.weight / 10} kg ⚖️`;

  const height = document.createElement("p");
  height.className = "pokemon-height";
  height.textContent = `Height: ${data.height / 10} m 📏`;

  // Create elements for stats with corresponding emojis
  const health = document.createElement("p");
  health.className = "pokemon-health";
  health.textContent = `Health: ${data.stats[0].base_stat} ❤️`;

  const specialAttack = document.createElement("p");
  specialAttack.className = "pokemon-special-attack";
  specialAttack.textContent = `Special Attack: ${data.stats[3].base_stat} ⚡`;

  const defense = document.createElement("p");
  defense.className = "pokemon-defense";
  defense.textContent = `Defense: ${data.stats[2].base_stat} 🛡️`;

  const specialDefense = document.createElement("p");
  specialDefense.className = "pokemon-special-defense";
  specialDefense.textContent = `Special Defense: ${data.stats[4].base_stat} 🛡️`;

  const attack = document.createElement("p");
  attack.className = "pokemon-attack";
  attack.textContent = `Attack: ${data.stats[1].base_stat} 🔪`;

  // Append all elements to the card
  card.appendChild(name);
  card.appendChild(img);
  card.appendChild(typesElement); // Append types with emojis
  card.appendChild(weight);
  card.appendChild(height);
  card.appendChild(health);
  card.appendChild(attack);
  card.appendChild(defense);
  card.appendChild(specialAttack);
  card.appendChild(specialDefense);

  pokemonCardContainer.appendChild(card); // Add the card to the container

  // Create an array of images to cycle through
  const images = [
    data.sprites.front_default,
    data.sprites.front_shiny,
    data.sprites.back_default,
    data.sprites.back_shiny,
  ].filter(Boolean); // Filter out any undefined values

  imageIndex = 0; // Reset image index
  img.src = images[imageIndex]; // Set the initial image

  // Change image every 5 seconds
  imageInterval = setInterval(() => {
    imageIndex = (imageIndex + 1) % images.length; // Cycle through images
    img.src = images[imageIndex]; // Update the image source
  }, 5000);

  // Change image on click
  img.addEventListener("click", () => {
    imageIndex = (imageIndex + 1) % images.length; // Cycle through images on click
    img.src = images[imageIndex]; // Update the image source
  });
}
