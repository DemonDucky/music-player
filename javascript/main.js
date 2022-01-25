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
    index: 0,
    songs: [
        {
            id: 0,
            src: './songs/rickroll.mp3',
            url_pic: './img/rickroll.jpg',
            title: 'Never Gonna Give You Up',
            author: 'Rick Astley',
            love: function() {
                return window.localStorage.getItem(`loved id: ${this.id}`)
            }
        },
        {
            id: 1,
            src: './songs/obsession.mp3',
            url_pic: './img/obsession.jpg',
            title: 'Obsession',
            author: 'Consoul Trainin',
            love: function() {
                return window.localStorage.getItem(`loved id: ${this.id}`)
            }
        },
        {
            id: 2,
            src: './songs/posisi.mp3',
            url_pic: './img/posisi.png',
            title: 'Posisi Dior',
            author: 'DJ Taebang',
            love: function() {
                return window.localStorage.getItem(`loved id: ${this.id}`)
            }
        },
    ],

    findSong: function() { // Find bat hat theo id
        let _this = this
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
                    <i style="font-size: 22px;" class="fas fa-heart ${getSong.love()}"></i>   
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
        let _this = this
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
            if (this.index <= 0) {
                this.index = this.songs.length - 1
            }else {
                this.index--
            }
            $('.progress').value = 0
            this.renderSong()
            this.isPlaying = true
            $('audio').play()
            controlButton.classList.remove('fa-play-circle')
            controlButton.classList.add('fa-pause-circle')
            this.progressBar()
            this.handleEventEnd()
            this.loveSong()
        }
        nextButton.onclick = () => {
            if (this.index >= this.songs.length - 1) {
                this.index = 0
            }else {
                this.index++
            }
            $('.progress').value = 0
            this.renderSong()
            this.isPlaying = true
            $('audio').play()
            controlButton.classList.remove('fa-play-circle')
            controlButton.classList.add('fa-pause-circle')
            this.progressBar()
            this.handleEventEnd()
            this.loveSong()
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
        let _this = this

        randomButton.onclick = function() {
            this.classList.toggle('enable')
            if (this.classList.contains('enable')) {
                window.localStorage.setItem('random', true)
                window.localStorage.removeItem('redo')
            }else {
                window.localStorage.removeItem('random')
            }
            redoButton.classList.remove('enable')
            _this.handleEventEnd()
        }
        redoButton.onclick = function() {
            this.classList.toggle('enable')
            if (this.classList.contains('enable')) {
                window.localStorage.setItem('redo', true)
                window.localStorage.removeItem('random')
            }else {
                window.localStorage.removeItem('redo')
            }
            randomButton.classList.remove('enable')
            _this.handleEventEnd()
        }

        if (randomButton.classList.contains('enable')) {
            console.log("random")
            $('audio').onended = () => {
                _this.index = Math.floor(Math.random() * _this.songs.length)
                $('.progress').value = 0
                this.renderSong()
                this.progressBar()
                this.isPlaying = true
                $('audio').play()
                this.handleEventEnd()
                _this.loveSong()
            }            
        }else if (redoButton.classList.contains('enable')) {
            console.log("redo")
            $('audio').onended = () => {
                $('.progress').value = 0
                this.isPlaying = true
                $('audio').play()
                this.handleEventEnd()
                _this.loveSong()
            }            

        }else {
            console.log("call end")
            $('audio').onended = () => {
                this.index++
                $('.progress').value = 0
                this.renderSong()
                this.progressBar()
                this.isPlaying = true
                $('audio').play()
                this.handleEventEnd()
            }
        }
    },

    loveSong : function() {
        _this = this
        let getSong = _this.findSong(this.index)
        $('.fa-heart').onclick = function() {
            this.classList.toggle('loved')
            if (this.classList.contains('loved')) {
                this.classList.remove('null')
                window.localStorage.setItem('loved id: ' + getSong.id, 'loved')
            }else {
                window.localStorage.removeItem('loved id: ' + getSong.id)
            }
        }
    },

    shortcut : function() {
        _this = this
        window.onkeydown = function(e) {
            if (e.which === 32) {
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
            }else if (e.which === 37) {
                if (_this.index <= 0) {
                    _this.index = _this.songs.length - 1
                }else {
                    _this.index--
                }
                $('.progress').value = 0
                _this.renderSong()
                _this.isPlaying = true
                $('audio').play()
                controlButton.classList.remove('fa-play-circle')
                controlButton.classList.add('fa-pause-circle')
                _this.progressBar()
                _this.handleEventEnd()
                _this.loveSong()
            }else if (e.which === 39) {
                if (_this.index >= _this.songs.length - 1) {
                    _this.index = 0
                }else {
                    _this.index++
                }
                $('.progress').value = 0
                _this.renderSong()
                _this.isPlaying = true
                $('audio').play()
                controlButton.classList.remove('fa-play-circle')
                controlButton.classList.add('fa-pause-circle')
                _this.progressBar()
                _this.handleEventEnd()
                _this.loveSong()
            }
        }
    },

    handleLocalStorage: function() {
        window.localStorage.getItem('random') ? randomButton.classList.add('enable') : randomButton.classList.remove('enable')
        window.localStorage.getItem('redo') ? redoButton.classList.add('enable') : redoButton.classList.remove('enable')
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
        this.shortcut()
        this.handleLocalStorage()
        this.loveSong()
        this.handleEventEnd()
        this.playPause()
        this.eventChange()
        this.progressBar()
    }

}

app.run()

