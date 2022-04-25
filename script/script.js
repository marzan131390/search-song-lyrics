//Nav Link will Display if toggle btn is clicked
let toggleBtn = document.getElementById("toggle-icon");
let navLink = document.getElementById("nav-link");
toggleBtn.addEventListener("click", function() {
    navLink.style.display = "block";
})
//Nav Link will Hide if toggle btn is double clicked
toggleBtn.addEventListener("dblclick", function() {
    navLink.style.display = "none";
})

let lyricsInput = document.getElementById("lyric-input")
let warning = document.querySelector(".warning");
let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function() {
    //Give warning if input value is empty
    if(lyricsInput.value === "") {
        warning.style.display = "block";
    }
    else {
        let searchText = lyricsInput.value;
        fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
        .then(response => response.json())
        .then(data => {
            let allData = data.data.slice(0, 4);
           for(let i = 0; i<allData.length; i++) {
               let singleData = allData[i];
            //    console.log(singleData);
               displayDataValue(singleData);
           };
        });
    }
})
//Remove Warning when input field is clicked.
lyricsInput.addEventListener("click", function() {
    warning.style.display = "none";
})
//Display data value..
let contentElement = document.getElementById("content");
function displayDataValue(value) {
    let allSongDetails = document.createElement("div");
    allSongDetails.classList.add("all-song-details")
    allSongDetails.innerHTML = `
        <div class="album-content"> 
            <h1>Artist Name: ${value.artist.name}</h1>
            <p>Song Title: ${value.title}</p>
            <audio controls>
                <source src="${value.preview}">
            </audio>
        </div>
        <div> 
            <button class="get-lyrics custom-btn" onclick="displayLyrics('${value.artist.name}', '${value.title}')">Get Lyrics</button>
        </div>
    `;
    contentElement.appendChild(allSongDetails);
};
//Display Lyrics..
let lyrics = document.querySelector(".lyrics");
function displayLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => {
        lyrics.innerText = `${data.lyrics}`
        console.log(data.lyrics);
        console.log(lyrics);

    })
    
}


// https://api.lyrics.ovh/suggest/${searchText}
// https://api.lyrics.ovh/v1/artist/title