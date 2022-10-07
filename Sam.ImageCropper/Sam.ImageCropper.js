// Created By https://github.com/samanazadi1996
HTMLElement.prototype.InitImageCropper = function (input, options = null) {
  var c = document.createElement("Canvas");
  var element = this;
  var minWidth = options?.minWidth ?? 50
  var minHeigth = options?.minHeigth ?? 50
  var aspectRatio = options?.aspectRatio
  element.classList.add("InitImagecropper")

  var img = document.createElement("img")
  var cropper = document.createElement("div")
  cropper.classList.add("Cropper")

  var resRight = document.createElement("div")
  var resLeft = document.createElement("div")
  var resBottom = document.createElement("div")
  var resTop = document.createElement("div")
  resRight.classList.add("resRight")
  resLeft.classList.add("resLeft")
  resBottom.classList.add("resBottom")
  resTop.classList.add("resTop")

  var yr = document.createElement("div")
  var yl = document.createElement("div")
  var xt = document.createElement("div")
  var xb = document.createElement("div")
  xt.classList.add("xt")
  xb.classList.add("xb")
  yr.classList.add("yr")
  yl.classList.add("yl")

  var tl = document.createElement("div")
  var tr = document.createElement("div")
  var bl = document.createElement("div")
  var br = document.createElement("div")
  tl.classList.add("tl")
  tr.classList.add("tr")
  bl.classList.add("bl")
  br.classList.add("br")

  var resl = document.createElement("div")
  var rest = document.createElement("div")
  var resr = document.createElement("div")
  var resb = document.createElement("div")
  resl.classList.add("resl")
  rest.classList.add("rest")
  resr.classList.add("resr")
  resb.classList.add("resb")

  const SetCanvasToInput = () => {
    if (input.files.length > 0) {
      c.toBlob((blob) => {
        var dT = new DataTransfer();
        dT.items.add(new File([blob], input.files[0].name, { type: input.files[0].type }));
        input.files = dT.files;
      });
    }
  }

  const SetImageToCanvas = () => {
    c.width = img.width / element.offsetWidth * cropper.offsetWidth
    c.height = img.height / element.offsetHeight * cropper.offsetHeight
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    var l = img.width / element.offsetWidth * cropper.offsetLeft
    var t = img.height / element.offsetHeight * cropper.offsetTop
    var w = img.width / element.offsetWidth * cropper.offsetWidth
    var h = img.height / element.offsetHeight * cropper.offsetHeight
    ctx.drawImage(img, l, t, w, h, 0, 0, c.width, c.height);
  }
  input.oninput = function () {
    if (input.files.length > 0) {
      img.setAttribute("src", window.URL.createObjectURL(this.files[0]))
      element.style.backgroundImage = `url(${window.URL.createObjectURL(this.files[0])})`
    }
  }
  img.onload = function () {
    var height = element.offsetWidth / this.width * this.height;
    element.style.height = height
    var z = element.offsetWidth > height ? height : element.offsetWidth
    cropper.style.top = (height - z) / 2
    cropper.style.left = (element.offsetWidth - z) / 2
    cropper.style.width = z
    cropper.style.height = z
    SetImageToCanvas()
    SetCanvasToInput()
  };
  cropper.appendChild(resRight)
  cropper.appendChild(resLeft)
  cropper.appendChild(resBottom)
  cropper.appendChild(resTop)

  cropper.appendChild(yl)
  cropper.appendChild(yr)
  cropper.appendChild(xt)
  cropper.appendChild(xb)

  cropper.appendChild(tl)
  cropper.appendChild(tr)
  cropper.appendChild(bl)
  cropper.appendChild(br)

  cropper.appendChild(resl)
  cropper.appendChild(rest)
  cropper.appendChild(resb)
  cropper.appendChild(resr)

  element.appendChild(cropper)
  var mMove = false
  var mouse = ""
  var top = 0;
  var left = 0;
  cropper.onmousedown = function (e) {
    mMove = true;
    if (mouse == "") {
      mouse = "Drag"
      left = e.clientX - cropper.offsetLeft
      top = e.clientY - cropper.offsetTop
    }
  }

  br.onmousedown = function (e) {
    mouse = "BottomRight"
  }
  bl.onmousedown = function (e) {
    mouse = "BottomLeft"
    left = cropper.offsetWidth + cropper.offsetLeft
  }
  tr.onmousedown = function (e) {
    mouse = "TopRight"
    top = cropper.offsetHeight + cropper.offsetTop
  }
  tl.onmousedown = function (e) {
    mouse = "TopLeft"
    top = cropper.offsetHeight + cropper.offsetTop
    left = cropper.offsetWidth + cropper.offsetLeft
  }

  resBottom.onmousedown = function (e) {
    mouse = "Botton"
  }
  resRight.onmousedown = function (e) {
    mouse = "Right"
  }
  resTop.onmousedown = function (e) {
    mouse = "Top"
    top = cropper.offsetHeight + cropper.offsetTop
  }
  resLeft.onmousedown = function (e) {
    mouse = "Left"
    left = cropper.offsetWidth + cropper.offsetLeft
  }

  resl.onmousedown = function (e) {
    mouse = "Left"
    left = cropper.offsetWidth + cropper.offsetLeft
  }
  rest.onmousedown = function (e) {
    mouse = "Top"
    top = cropper.offsetHeight + cropper.offsetTop
  }
  resr.onmousedown = function (e) {
    mouse = "Right"
  }
  resb.onmousedown = function (e) {
    mouse = "Botton"
  }
  document.body.onmousemove = function (e) {
    if (mMove) {
      if (mouse == "Botton") {
        var h = e.clientY - element.offsetTop - cropper.offsetTop
        if (h >= minHeigth && h + cropper.offsetTop < element.offsetHeight)
          cropper.style.height = h
      }
      else if (mouse == "Right") {
        var w = e.clientX - element.offsetLeft - cropper.offsetLeft
        if (w >= minWidth && w + cropper.offsetLeft < element.offsetWidth)
          cropper.style.width = w

      }
      else if (mouse == "Top") {
        var t = e.clientY - element.offsetTop
        if (top - t > minHeigth && t >= 0) {
          cropper.style.top = t
          cropper.style.height = top - t
        }
      }
      else if (mouse == "Left") {
        var l = e.clientX - element.offsetLeft
        if (left - l > minWidth && l >= 0) {
          cropper.style.left = l
          cropper.style.width = left - l
        }
      }
      else if (mouse == "BottomRight") {
        var h = e.clientY - element.offsetTop - cropper.offsetTop
        if (h >= minHeigth && h + cropper.offsetTop < element.offsetHeight)
          cropper.style.height = h

        var w = e.clientX - element.offsetLeft - cropper.offsetLeft
        if (w >= minWidth && w + cropper.offsetLeft < element.offsetWidth)
          cropper.style.width = w
      }
      else if (mouse == "BottomLeft") {
        var h = e.clientY - element.offsetTop - cropper.offsetTop
        if (h >= minHeigth && h + cropper.offsetTop < element.offsetHeight)
          cropper.style.height = h

        var l = e.clientX - element.offsetLeft
        if (left - l > minWidth && l >= 0) {
          cropper.style.left = l
          cropper.style.width = left - l
        }
      }
      else if (mouse == "TopRight") {
        var t = e.clientY - element.offsetTop
        if (top - t > minHeigth && t >= 0) {
          cropper.style.top = t
          cropper.style.height = top - t
        }

        var w = e.clientX - element.offsetLeft - cropper.offsetLeft
        if (w >= minWidth && w + cropper.offsetLeft < element.offsetWidth)
          cropper.style.width = w

      }
      else if (mouse == "TopLeft") {
        var t = e.clientY - element.offsetTop
        if (top - t > minHeigth && t >= 0) {
          cropper.style.top = t
          cropper.style.height = top - t
        }
        var l = e.clientX - element.offsetLeft
        if (left - l > minWidth && l >= 0) {
          cropper.style.left = l
          cropper.style.width = left - l
        }
      }
      else if (mouse == "Drag") {
        var t = e.clientY - top
        var l = e.clientX - left
        if (l > 0 && l + cropper.offsetWidth < element.offsetWidth)
          cropper.style.left = l
        else {
          if (l < 0)
            cropper.style.left = 0
          else
            cropper.style.left = element.offsetWidth - cropper.offsetWidth
        }
        if (t > 0 && t + cropper.offsetHeight < element.offsetHeight)
          cropper.style.top = t
        else {
          if (t < 0)
            cropper.style.top = 0
          else
            cropper.style.top = element.offsetHeight - cropper.offsetHeight

        }
      }

      SetImageToCanvas()
    }
  }
  document.body.onmouseup = function (e) {
    mMove = false;
    mouse = "";
    SetCanvasToInput()
  }
  element.appendChild(img)

  //#region rightClick
  const CreateSplit = () => {
    var el = document.createElement("hr")
    return el
  }
  var menu = document.createElement("div")
  menu.classList.add("CropperMenu")
  var menuItemCrop = document.createElement("p")
  var menuItemCancel = document.createElement("p")
  var menuItemSelectAll = document.createElement("p")

  menuItemCrop.innerText = "Crop"
  menuItemCancel.innerText = "Cancel"
  menuItemSelectAll.innerText = "Select All"

  menu.appendChild(menuItemCrop)
  menu.appendChild(menuItemSelectAll)
  menu.appendChild(CreateSplit())
  menu.appendChild(menuItemCancel)

  if (element.addEventListener) {
    element.addEventListener('contextmenu', function (e) {
      menu.style.display = "block"
      menu.style.left = e.clientX
      menu.style.top = e.clientY
      e.preventDefault();
    }, false);
  }
  menuItemCrop.onclick = function () {
    input.oninput()
  }
  menuItemSelectAll.onclick = function () {
    cropper.style.top = 0
    cropper.style.left = 0
    cropper.style.width = element.offsetWidth
    cropper.style.height = element.offsetHeight
    SetImageToCanvas()
    SetCanvasToInput()
  }
  menuItemCancel.onclick = function () {
    menu.removeAttribute("style")
  }
  document.body.appendChild(menu)
  document.body.onclick = function () {
    menu.removeAttribute("style")
  }
}