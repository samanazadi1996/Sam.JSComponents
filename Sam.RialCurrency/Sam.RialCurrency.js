// Created By https://github.com/samanazadi1996

HTMLElement.prototype.IsRialCurrency = function () {
    var element = this
    element.style.display = 'none'
    var input = document.createElement('input')
    input.value = element.value
    input.setAttribute("type", "text")

    if (this.attributes["class"])
        input.setAttribute("class", this.attributes["class"]?.value)

    const SetValue = (val) => {
        var number = String(Number(val.replace(/[^0-9.]/g, '')) * 1)
        element.value = number
        input.value = number.split(/(?=(?:...)*$)/).join(',')
    }

    input.onchange = function () { SetValue(this.value) }
    input.onkeyup = function () { SetValue(this.value) }
    input.onpaste = function () { SetValue(this.value) }

    SetValue(input.value)

    this.parentNode.insertBefore(input, this.nextSibling);
}

NodeList.prototype.IsRialCurrency = function () {
    for (let index = 0; index < this.length; index++) {
        this[index].IsRialCurrency();
    }
}

HTMLCollection.prototype.IsRialCurrency = function () {
    for (let index = 0; index < this.length; index++) {
        this[index].IsRialCurrency();
    }
}