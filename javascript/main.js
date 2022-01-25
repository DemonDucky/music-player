// Render bai hat
// play/pause
// prev/next
// progress-bar
// repeat
// random
// Love

var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
const controlButton = $('.control-button')
const prevButton = $('.prev-button')
const nextButton = $('.next-button')
const redoButton = $('.redo-button')
const randomButton = $('.random-button')
app = {
    isPlaying: false,
    isRandom: false,
    isRedo: false,
    index: 2,
    songs: [
        {
            id: 0,
            src: '../songs/rickroll.mp3',
            url_pic: '../img/rickroll.jpg',
            title: 'Never Gonna Give You Up',
            author: 'Rick Astley'
        },
        {
            id: 1,
            src: '../songs/obsession.mp3',
            url_pic: '../img/obsession.jpg',
            title: 'Obsession',
            author: 'Consoul Trainin'
        },
        {
            id: 2,
            src: '../songs/posisi.mp3',
            url_pic: '../img/posisi.png',
            title: 'Posisi Dior',
            author: 'DJ Taebang'
        },
    ],

    findSong: function() { // Find bat hat theo id
        _this = this
        let getSong = this.songs.find(function(song) {
            return song.id === _this.index
        })
        return getSong
    },
    renderSong: function() {
        let _this = this
        let getSong = this.findSong(this.index)
        $('main').innerHTML = `
                <div class="img-wrapper">
                <img style="width: 100%;" src="${getSong.url_pic}" alt="Banner">
            </div>
            <div class="content">
                <h1>${getSong.title}
                </h1>
                    <i style="font-size: 22px;" class="fas fa-heart"></i>   
                <h4>${getSong.author}</h4>
            </div>
            <div class="control-time">
                <div class="progress-container">
                    <input id="progress" class="progress" type="range" value="0" step="0.1" min="0" max="100">
                    <div class="progress-bar"></div>
                </div>
                <audio id="audio" src="${getSong.src}"></audio>
                <div class="time-container">
                    <h5 style="float: right">${_this.formatTime($('audio').duration)}</h5>
                    <h5>${_this.formatTime($('audio').currentTime)}</h5>
                </div>  
            </div>
        `
        
        $('audio').addEventListener('timeupdate', function(e) { //Update current time bai hat
            $('.time-container h5:last-child').textContent = _this.formatTime($('audio').currentTime)
            $('.time-container h5').textContent = _this.formatTime($('audio').duration)
            $('.progress').value = Number.isNaN($('audio').duration) ? 0 : $('audio').currentTime / $('audio').duration * 100
            $('.progress').style.background = `linear-gradient(to right, #1fa1c2 0%, #1fa1c2 ${Number($('.progress').value)}%, white ${$('.progress').value}% , white 100%)`
            // console.log(Math.round($('audio').currentTime / $('audio').duration * 100))
        })

    },

    playPause: function() {
        _this = this
        $('.control-button').onclick = function() {
            if (_this.isPlaying === false) {
                $('audio').play()
                _this.isPlaying = true
                controlButton.classList.add('fa-pause-circle')
                controlButton.classList.remove('fa-play-circle')
            } else {
                $('audio').pause()
                _this.isPlaying = false
                controlButton.classList.add('fa-play-circle')
                controlButton.classList.remove('fa-pause-circle')
            }
        }
    },

    eventChange: function() {
        prevButton.onclick = () => {
            this.index--
            $('.progress').value = 0
            this.renderSong()
            this.isPlaying = true
            $('audio').play()
            controlButton.classList.remove('fa-play-circle')
            controlButton.classList.add('fa-pause-circle')
            this.progressBar()
        }
        nextButton.onclick = () => {
            this.index++
            $('.progress').value = 0
            this.renderSong()
            this.isPlaying = true
            $('audio').play()
            controlButton.classList.remove('fa-play-circle')
            controlButton.classList.add('fa-pause-circle')
            this.progressBar()
        }
    },

    progressBar: function() {
        $('.progress').oninput = function() {
            $('audio').currentTime = $('audio').duration / 100 * this.value
            this.style.background = `linear-gradient(to right, #1fa1c2 0%, #1fa1c2 ${Number(this.value)}%, white ${this.value}% , white 100%)`
            console.log(Number(this.value) + 1)
        }
    },


    handleEventEnd: function() {
        randomButton.onclick = function() {
            this.classList.toggle('enable')
        }

        $('audio').onended = () => {
            this.index++
            this.renderSong()
        }
    },



    formatTime: function (time) {
        Number.parseInt(time)
        let minutes = Math.floor(time / 60)
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        let secondsLeft = Math.floor(time % 60)
        if (secondsLeft < 10) {
            secondsLeft = `0${secondsLeft}`
        }
        return `${minutes}:${secondsLeft}`
    },

    run: function() {
        this.renderSong()
        this.handleEventEnd()
        this.playPause()
        this.eventChange()
        this.progressBar()
    }

}

app.run()
