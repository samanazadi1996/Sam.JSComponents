function init(id) {
  var element = document.getElementById(id);
  element.setAttribute("contenteditable", "true");
  element.classList = "Sam-HtmlEditor-editor";
  var toolBar = CreateToolBar(element);

  element.onclick = function (e) {
    toolBar.setAttribute("hidden", "");
  };
  element.onkeyup = function () {
    toolBar.setAttribute("hidden", "");
  };

  if (element.addEventListener) {
    element.addEventListener(
      "contextmenu",
      function (e) {
        toolBar.removeAttribute("hidden");
        toolBar.style.left = e.clientX + "px";
        toolBar.style.top = e.clientY + "px";
        e.preventDefault();
      },
      false
    );
  }
}

function CreateToolBar(element) {
  const setIcon = (el, name) => {
    var img = document.createElement("img");
    img.setAttribute("src", `images/${name}.svg`);
    el.appendChild(img);
  };
  var toolBar = document.createElement("div");
  toolBar.classList.add("Sam-HtmlEditor-toolBar");
  toolBar.setAttribute("hidden", "");
  document.body.appendChild(toolBar);
  const setImage = () => {
    var btn = document.createElement("button");
    btn.classList.add("Sam-HtmlEditor-toolBar-item");
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("hidden", "");
    setIcon(btn, "img");
    toolBar.appendChild(btn);
    toolBar.appendChild(input);
    btn.onclick = function () {
      input.click();
    };
    input.oninput = function () {
      if (input.files.length > 0) {
        var img = document.createElement("img");
        img.setAttribute("src", window.URL.createObjectURL(this.files[0]));
        img.style.maxWidth = "300px";
        img.style.maxHeight = "300px";
        element.appendChild(img);
      }
    };
  };
  const setPar = () => {
    var select = document.createElement("select");
    select.classList.add("Sam-HtmlEditor-toolBar-item");

    var array = ["p", "h6", "h5", "h4", "h3", "h2", "h1"];
    array.forEach((element) => {
      var option = document.createElement("option");
      var innerHtml = document.createElement(element);
      innerHtml.innerText = element;
      option.appendChild(innerHtml);
      select.appendChild(option);
    });

    select.onchange = function () {
      var selectedHeading = select.value;
      document.execCommand("formatBlock", false, selectedHeading);
    };
    toolBar.appendChild(select);
  };
  const setFontStyle = (style) => {
    var btn = document.createElement("button");
    btn.classList.add("Sam-HtmlEditor-toolBar-item");
    btn.onclick = function () {
      document.execCommand(style, false, null);
    };
    setIcon(btn, style);
    toolBar.appendChild(btn);
  };
  const setTextDir = () => {
    var array = ["justifyLeft", "justifyCenter", "justifyRight"];
    array.forEach((element) => {
      var btn = document.createElement("button");
      btn.classList.add("Sam-HtmlEditor-toolBar-item");
      btn.onclick = function () {
        document.execCommand(element, false, null);
      };
      toolBar.appendChild(btn);
      setIcon(btn, element);
    });
  };
  const setColor = (color) => {
    var btn = document.createElement("button");
    btn.classList.add("Sam-HtmlEditor-toolBar-item");
    var input = document.createElement("input");
    input.setAttribute("type", "color");
    input.setAttribute("hidden", "");
    setIcon(btn, color);
    btn.onclick = function () {
      input.click();
    };
    input.oninput = function () {
      document.execCommand(color, false, input.value);
    };
    toolBar.appendChild(input);
    toolBar.appendChild(btn);
  };

  setImage();
  setPar();
  setFontStyle("bold");
  setFontStyle("italic");
  setTextDir();
  setColor("foreColor");
  setColor("backColor");

  return toolBar;
}
