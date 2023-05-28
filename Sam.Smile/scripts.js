function setSamSmail(val) {
    var face = document.getElementsByClassName("samFace")[0]
    face.style.backgroundColor = `rgb(${255 - val},${val},0)`
    var temp = Math.abs(Math.round((Math.abs(val) - 128) / 128 * 40))
    var lib = document.getElementById("samLib")
    lib.style.height = `${temp}px`
    if (val >= 128) {
        lib.style.borderTop = "0px"
        lib.style.borderBottom = "7px solid white"

    } else {
        lib.style.borderBottom = "0px"
        lib.style.borderTop = "7px solid white"
    }
    var toplib = Math.round(val / 255 * 20)
    lib.style.top = `${80 - toplib}px`
}
