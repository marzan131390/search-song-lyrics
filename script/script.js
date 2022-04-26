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
//All Lyrics List Container function done here..
let lyricsListContainer = document.querySelector(".all-lyrics-list");
let lyricsInput = document.getElementById("lyric-input")
let warning = document.querySelector(".warning");
let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function() {
    //Give warning if the input value is empty
    if(lyricsInput.value === "") {
        warning.style.display = "block";
        warning.innerText = "You Must Be Enter Something Before Search Lyrics";
    }
    //Display Lyrics list when button is clicked
    else {
        //Lyrics List will be displayed if they are previously hid..
        lyricsListContainer.style.display = "block";
        let searchText = lyricsInput.value;
        //Loads Data From External Server through API.
        fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
        .then(response => response.json())
        .then(data => {
            let allData = data.data.slice(0, 4);
            //Delete All Lyrics list if they are previously inserted..
            lyricsListContainer.innerHTML = "";
           for(let i = 0; i<allData.length; i++) {
               let singleData = allData[i];
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
//Display data value into web page..
function displayDataValue(value) {
    //Insert All Data Values into a div
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
    //Append The information container  into web page.. 
    lyricsListContainer.appendChild(allSongDetails);
};
//Display Lyrics..
let lyricsDetails = document.querySelector(".lyrics-details");
function displayLyrics(artist, title) {
    //Lyrics Details are displayed if they are previously hid
    lyricsDetails.style.display = "block";
    //Load lyrics details data from external server..
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => {
        //If No lyrics found then give a warning 
        if(data.lyrics === undefined) {
            warning.style.display = "block";
            warning.innerText = "No Lyrics Found! Please Try Another One!!!"
            // hide previously open lyrics details
            lyricsDetails.style.display = "none";
        }
        else {
            //warning will be hid if lyrics details are found
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

//All Important links are here.
// https://api.lyrics.ovh/suggest/${searchText}
// https://api.lyrics.ovh/v1/artist/title