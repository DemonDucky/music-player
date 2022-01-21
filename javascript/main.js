// Render bai hat
// play/pause
// prev/next
// progress-bar
// repeat
// random

var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

var app = {
    AllSongs: [
        {
            id: 0,
            url: "../songs",
            name: "Never Gonna Give You Up",
            author: "Rick Astley"
        },
        {
            id: 1,
            url: "http://",
            name: "Name1",
            author: "Name2"
        },
        {
            id: 2,
            url: "http://",
            name: "Name1",
            author: "Name2"
        }
    ],
    playSong: function() {
        $('.control-button').onclick = function() {
            $('audio').play()
        }
    }
}

app.playSong()