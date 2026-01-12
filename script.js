// fare una funzione che fa la fetch all'endpoint dato
// fare una funziona che fa il ciclo sull'array dei risultati e crea le card
// fare una funzione che crea l'html della card

const griglia = document.querySelector("#searchSection")
const input = document.querySelector("#searchField")
const button = document.querySelector("#button-search")
button.addEventListener("click", (event) => {
    event.preventDefault()
    const search = input.value
    getSong(search)
})


function getSong(searchValue = "eminem") {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + searchValue)
        .then(result => result.json())
        .then(data => canzoniCard(data.data))
        .catch(error => console.log(error))
}
getSong();

function canzoniCard(songs) {
    griglia.innerHTML = ""
    for (let song of songs) {
        let card = renderCard(song)
        griglia.appendChild(card);
    }
}

function renderCard(song) {
    // <div class="card" style="width: 18rem;">
    //   <img src="..." class="card-img-top" alt="...">
    //   <div class="card-body">
    //     <h5 class="card-title">Card title</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>
    //   </div>
    // </div>
    const col = document.createElement("div");
    col.classList.add("col");
    const card = document.createElement("div");
    card.classList.add("card")
    col.appendChild(card);
    // const img = document.createElement("img");
    // img.classList.add("card-img-top");
    // img.alt = "album-cover";
    // img.src = song.album.cover_medium;
    const img = document.createElement("div");
    img.classList.add("card-img-top")
    img.style.backgroundImage = "url(" + song.album.cover_medium + ")"
    img.style.backgroundSize = "cover";
    img.style.height = "300px"
    img.style.backgroundPosition = "center"
    card.appendChild(img);
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = song.title
    cardBody.appendChild(h5);
    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = song.album.title;
    cardBody.appendChild(p);
    return col
}