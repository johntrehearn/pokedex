const pokeDisplay = document.querySelector('.pokeDisplay')

let pokeData = [];

const fetchData = async () => {
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then(res => res.json())
    .then((data) => {
        const fetches = data.results.map((item) => {
            return fetch(item.url)
            .then((res) => res.json())
            .then ((data) => {
                return {
                    id: data.id,
                    name: data.name,
                    img: data.sprites.other['showdown'].back_shiny,
                    types: data.types,
                    height: data.height,
                    weight: data.weight,
                };

            });
        });
        Promise.all(fetches)
        .then((res) => {
            pokeData = res;
            pokeCards('');
        });
    });
};

const pokeCards = (all) => {
    const cards = pokeData
    .map((pokemon) => {
        const pokemonTypes = pokemon.types.map((item) => {
            return `<span class="type"> ${item.type.name} </span>`;
        });
        return `<div class="card">
        <p
        >#${pokemon.id}</p>
        <img src="${pokemon.img}" alt="${pokemon.name}"/>
        
        <h3 class="name_card">${pokemon.name.toUpperCase()}</h3>
        <div>
        <span${pokemonTypes.join(' ')}</span>
        <p>
        <span> ${pokemon.height} cm</span>
        <span> ${pokemon.weight.toFixed(1)} kg</span>
        </p>
        </div>
        </div>`;
    })
    .join('');
    pokeDisplay.innerHTML = cards;
};

fetchData();