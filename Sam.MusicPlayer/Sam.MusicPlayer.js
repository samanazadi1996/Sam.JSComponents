// Created By https://github.com/samanazadi1996

HTMLElement.prototype.InitMusicPlayer = function (url) {
    var colorTheme = this.attributes["music-theme"]?.value ?? "silver"
    if (colorTheme == "random")
        colorTheme = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);

    var audio = new Audio(url);
    const CreateImage = imgUrl => {
        var img = document.createElement("img")
        img.setAttribute("src", imgUrl)
        img.style.width = "100%"
        return img
    }
    const CreateButton = (img, w, h) => {
        var btn = document.createElement("button")
        btn.style.width = `${w}px`
        btn.style.height = `${h}px`
        btn.style.backgroundColor = "white"
        btn.style.borderRadius = "50%"
        btn.style.margin = "2px"
        btn.appendChild(img)
        return btn
    }
    const CreateLabel = (l, r) => {
        var spn = document.createElement("span")
        spn.style.left = l
        spn.style.right = r
        spn.style.transform = "translateY(-50%)"
        spn.style.top = "50%"
        spn.style.position = "absolute"
        spn.style.fontWeight = "bold"
        spn.style.color = "white"
        spn.style.font = "caption"
        spn.style.webkittoc
        return spn
    }

    var playImage = CreateImage("icons/play.png");
    var pauseImage = CreateImage("icons/pause.png");
    var rewindImage = CreateImage("icons/rewind.png");
    var forwardImage = CreateImage("icons/fastforward.png");

    var musicPlayer = document.createElement("div")
    musicPlayer.style.boxShadow = `0px 0px 14px ${colorTheme}`
    musicPlayer.style.padding = "13px"
    musicPlayer.style.border = `1px solid ${colorTheme}`
    musicPlayer.style.borderRadius = "30px";
    musicPlayer.style.textAlign = "center";
    musicPlayer.style.backgroundImage = `radial-gradient(white 21%,${colorTheme} 88%)`

    var header = document.createElement("div")
    header.style.width = "100%"
    header.style.marginBottom = "3px"

    var body = document.createElement("div")
    var currentTime = CreateLabel("0px", null)
    var rewind = CreateButton(rewindImage, 28, 28)
    var play = CreateButton(playImage, 39, 39)
    var forward = CreateButton(forwardImage, 28, 28)
    var duration = CreateLabel(null, "0px")

    rewind.style.transform = "translateY(-6px)"
    forward.style.transform = "translateY(-6px)"
    body.style.position = "relative"
    body.appendChild(currentTime)
    body.appendChild(rewind)
    body.appendChild(play)
    body.appendChild(forward)
    body.appendChild(duration)

    var timeAudio = document.createElement("input")
    timeAudio.setAttribute("type", "range")
    timeAudio.value = "0"
    timeAudio.style.width = "100%"
    header.appendChild(timeAudio)

    play.onclick = function () {
        timeAudio.setAttribute("max", audio.duration)
        duration.innerText = new Date(audio.duration * 1000).toISOString().substring(14, 19)
        play.innerHTML = ""
        if (audio.paused) {
            audio.play();
            play.appendChild(pauseImage)
        } else {
            audio.pause();
            play.appendChild(playImage)
        }
    }

    timeAudio.onchange = function () {
        audio.currentTime = this.value
    }

    rewind.onclick = function () {
        (audio.currentTime - 5) <= 0 ? audio.currentTime = 0 : audio.currentTime -= 5
    }

    forward.onclick = function () {
        (audio.currentTime + 5) >= audio.duration ? audio.currentTime = audio.duration : audio.currentTime += 5;
    }

    var temp = 0;
    audio.ontimeupdate = function () {
        var val = Math.round(this.currentTime)
        if (temp != val)
            timeAudio.value = val

        currentTime.innerText = new Date(val * 1000).toISOString().substring(14, 19)
        temp = val;
    }


    musicPlayer.appendChild(header)
    musicPlayer.appendChild(body)
    this.appendChild(musicPlayer)

}
function LoadMusics() {
    var musics = document.querySelectorAll("[music-url]")
    for (let index = 0; index < musics.length; index++) {
        musics[index].InitMusicPlayer(musics[index].attributes["music-url"].value);
    }
}