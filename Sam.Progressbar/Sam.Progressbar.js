// Created By https://github.com/samanazadi1996

HTMLElement.prototype.InitProgressbar = function () {
  if (!this.attributes["progressbar-Active"]) {
    var color = this.attributes["progressbar-color"]?.value ?? "blue"
    var maxvalue = Number(this.attributes["progressbar-maxvalue"]?.value ?? 100)
    var value = Number(this.value)
    this.style.display = "none"
    this.setAttribute("progressbar-Active", true)

    var progressbarTable = document.createElement("table")
    var progressbarTr = document.createElement("tr")
    var progressbarText = document.createElement("td")
    var progressbarBody = document.createElement("td")
    var progressbar = document.createElement("div")
    progressbarTable.appendChild(progressbarTr)
    progressbarTr.appendChild(progressbarText)
    progressbarTr.appendChild(progressbarBody)
    progressbarBody.appendChild(progressbar)
    progressbarBody.style.width = "100%"
    progressbarBody.style.border = `1px solid ${color}`
    progressbarBody.style.borderRadius = "7px"
    progressbarBody.style.padding = "3px"
    progressbarText.innerText = `${value}%`
    progressbar.style.backgroundColor = color
    progressbarText.style.color = color
    progressbar.style.height = "10px"
    progressbar.style.width = `${value * 100 / maxvalue}%`
    progressbar.style.borderRadius = "7px"

    this.parentNode.insertBefore(progressbarTable, this.nextSibling);
  }
}

NodeList.prototype.InitProgressbar = function () {
  for (let index = 0; index < this.length; index++) {
    this[index].InitProgressbar();
  }
}

HTMLCollection.prototype.InitProgressbar = function () {
  for (let index = 0; index < this.length; index++) {
    this[index].InitProgressbar();
  }
}

