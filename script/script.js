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
//All Lyric List Container 
let lyricsListContainer = document.querySelector(".all-lyrics-list");
let lyricsInput = document.getElementById("lyric-input")
let warning = document.querySelector(".warning");
let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function() {
    //Give warning if input value is empty
    if(lyricsInput.value === "") {
        warning.style.display = "block";
    }
    else {
        //Display Lyrics list when button is clicked
        lyricsListContainer.style.display = "block";
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
        lyricsInput.value = "";
    }
})
//Remove Warning when input field is clicked.
lyricsInput.addEventListener("click", function() {
    warning.style.display = "none";
    lyricsListContainer.style.display = "none";
})
//Display data value..
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
    lyricsListContainer.appendChild(allSongDetails);
};
//Display Lyrics..
let lyricsDetails = document.querySelector(".lyrics-details");
function displayLyrics(artist, title) {
    lyricsDetails.style.display = "block";
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => {
        if(data.lyrics === undefined) {
            warning.style.display = "block";
            lyricsDetails.style.display = "none";
        }
        else {
            console.log(data);
            warning.style.display = "none";
            lyricsDetails.innerHTML = `${data.lyrics}
            <button class="custom-btn hide-lyrics" onclick="hideLyrics()">Hide Lyrics</button> 
        `
        };
     
    });
    
};
//Hide lyrics when hide button is clicked..
function hideLyrics() {
    lyricsDetails.style.display = "none";
}


// https://api.lyrics.ovh/suggest/${searchText}
// https://api.lyrics.ovh/v1/artist/title