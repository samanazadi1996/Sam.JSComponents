// Created By https://github.com/samanazadi1996

var photoViewerbody = null
var photoViewerimg = null
var photoViewerFilter = null

HTMLElement.prototype.InitVewer = function () {

    photoViewerFilter.value = "none"
    photoViewerimg.setAttribute("src", this.attributes["src"].value)
    photoViewerimg.style.transform = "translate(-50%, -50%)"
    photoViewerimg.style.maxWidth = "100%"
    photoViewerimg.style.maxHeight = "100%"
    photoViewerimg.style.removeProperty("filter")
    photoViewerimg.removeAttribute("rotete")
    photoViewerimg.removeAttribute("zoomed")
    photoViewerbody.style.removeProperty("display")

}
function CreatePhotoViewer() {
    photoViewerbody = document.createElement("div")
    photoViewerbody.style.display = "none"
    photoViewerbody.style.left = "0px"
    photoViewerbody.style.top = "0px"
    photoViewerbody.style.right = "0px"
    photoViewerbody.style.bottom = "0px"
    photoViewerbody.style.position = "absolute"
    photoViewerbody.style.padding = "10px"
    photoViewerbody.style.backgroundColor = "rgb(0 4 45)"
    photoViewerbody.style.direction = "rtl"
    photoViewerbody.style.overflow = "hidden"
    document.body.appendChild(photoViewerbody)

    var photoViewerToolBar = document.createElement("div")
    photoViewerToolBar.style.left = "0px"
    photoViewerToolBar.style.top = "0px"
    photoViewerToolBar.style.right = "0px"
    photoViewerToolBar.style.height = "45px"
    photoViewerToolBar.style.position = "absolute"
    photoViewerToolBar.style.padding = "10px"
    photoViewerToolBar.style.direction = "rtl"
    photoViewerToolBar.style.zIndex = "10"
    photoViewerToolBar.onmouseover = function () {
        for (let index = 1; index < this.childElementCount; index++) {
            this.children[index].style.removeProperty("display")
        }
    }
    photoViewerToolBar.onmouseout = function () {
        for (let index = 1; index < this.childElementCount; index++) {
            this.children[index].style.display = "none"
        }
    }
    photoViewerbody.appendChild(photoViewerToolBar)
    const buttonDesign = (element, text, color) => {
        element.innerText = text
        element.style.backgroundColor = color
        element.style.borderRadius = "10px"
        element.style.marginRight = "5px"
        element.style.marginLeft = "5px"
        element.style.cursor = "pointer"
        element.style.color = "white"
        element.style.padding = "4px"
    }

    var close = document.createElement("button")
    buttonDesign(close, "Close", "red")
    close.onclick = function () {
        photoViewerbody.style.display = "none"
    }
    photoViewerToolBar.appendChild(close)

    var download = document.createElement("button")
    download.style.display = "none"
    buttonDesign(download, "Download", "blue")
    download.onclick = function () {
        var source = photoViewerimg.attributes["src"].value
        var fileName = source.split('/').pop()
        var el = document.createElement("a")
        el.setAttribute("href", source)
        el.setAttribute("download", fileName)
        el.setAttribute("target", "_blank")
        document.body.appendChild(el)
        el.click()
        el.remove()
    }
    photoViewerToolBar.appendChild(download)

    var rotate = document.createElement("button")
    buttonDesign(rotate, "Rotate", "green")
    rotate.setAttribute("onclick", "RotateImage()")
    rotate.onclick = function () {
        var rotateDeg = Number(photoViewerimg.attributes["rotete"]?.value ?? 0)
        rotateDeg = rotateDeg + 90
        if (rotateDeg % 180 != 0) {
            if (photoViewerimg.offsetWidth > photoViewerbody.offsetHeight) {
                photoViewerimg.style.maxWidth = photoViewerbody.offsetHeight
                photoViewerimg.style.maxHeight = photoViewerbody.offsetWidth
            } else {
                photoViewerimg.style.maxHeight = photoViewerbody.offsetWidth
                photoViewerimg.style.maxWidth = photoViewerbody.offsetHeight
            }
        } else {
            photoViewerimg.style.maxWidth = "100%"
            photoViewerimg.style.maxHeight = "100%"
        }
        photoViewerimg.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg)`
        photoViewerimg.setAttribute("rotete", rotateDeg)
        photoViewerimg.removeAttribute("zoomed")
    }
    photoViewerToolBar.appendChild(rotate)

    photoViewerFilter = document.createElement("select")
    buttonDesign(photoViewerFilter, null, "magenta")
    var filterOptions = ["none", "blur(1px)", "brightness(0.5)", "contrast(0.5)", "drop-shadow(2px 4px 6px black)", "grayscale(1)", "hue-rotate(45deg)", "inherit", "invert(1)", "opacity(0.5)", "revert", "saturate(0.5)", "sepia(1)"]
    filterOptions.forEach(value => {
        var option = document.createElement("option")
        option.innerText = value.indexOf("(") == -1 ? value : value.substring(0, value.indexOf('('))
        option.setAttribute("value", value)
        photoViewerFilter.appendChild(option)
    })
    photoViewerFilter.onchange = function () {
        photoViewerimg.style.filter = this.value
    }
    photoViewerToolBar.appendChild(photoViewerFilter)

    photoViewerimg = document.createElement("img")
    photoViewerimg.style.maxHeight = "100%"
    photoViewerimg.style.maxWidth = "100%"
    photoViewerimg.style.position = "absolute"
    photoViewerimg.style.transform = "translate(-50%, -50%)"
    photoViewerimg.style.top = "50%"
    photoViewerimg.style.left = "50%"
    photoViewerimg.style.transition = "500ms"
    photoViewerimg.ondblclick = function (data) {
        var rotate = this.attributes["rotete"]?.value ?? 0
        if (this.attributes["zoomed"]?.value) {
            this.style.transform = `translate(-50%,-50%) rotate(${rotate}deg)`
            this.removeAttribute("zoomed")
        } else {
            this.style.transform = `translate(-${data.offsetX}px,-${data.offsetY}px) rotate(${rotate}deg) scale(2)`
            this.setAttribute("zoomed", true)
        }
    }
    photoViewerbody.appendChild(photoViewerimg)
}

CreatePhotoViewer()