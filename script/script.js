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
        .then(data => console.log(data));
    }
})
//Remove Warning when input field is clicked.
lyricsInput.addEventListener("click", function() {
    warning.style.display = "none";
})

// https://api.lyrics.ovh/suggest/${searchText}
// https://api.lyrics.ovh/v1/artist/title