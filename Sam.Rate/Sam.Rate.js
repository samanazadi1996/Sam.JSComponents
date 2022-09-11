HTMLElement.prototype.InitRate = function (nullable = null) {
    this.style.display = "none"
    var maxvalue = this.attributes['MaxRate']?.value ?? 5
    var nullable = Boolean(this.attributes['Nullable']?.value ?? false)
    var rateBody = document.createElement("div")
    const select = (rate, init) => {
        if (nullable && rate + 1 == this.value && init) {
            this.value = null

        } else {
            for (let rIndex = 0; rIndex <= rate; rIndex++) {
                rateBody.children[rIndex].style.color = "gold"
            }
            this.value = rate + 1
        }
    }
    const deSelect = rate => {
        for (let rIndex = 0; rIndex < rateBody.children.length; rIndex++) {
            rateBody.children[rIndex].style.color = "silver"
        }
    }
    for (let index = 0; index < maxvalue; index++) {
        var rate = document.createElement("span")
        rate.innerHTML = "&#9733;"
        rate.style.color = "silver"
        rate.style.cursor = "pointer"
        rate.onclick = function () {
            deSelect(index)
            select(index, true)
        }
        rateBody.appendChild(rate)
    }
    select(this.value - 1, false)
    this.parentNode.insertBefore(rateBody, this.nextSibling);
}
NodeList.prototype.InitRate = function (maxvalue = null, nullable = null) {
    for (let index = 0; index < this.length; index++) {
        this[index].InitRate(maxvalue, nullable);
    }
}

HTMLCollection.prototype.InitRate = function (maxvalue = null, nullable = null) {
    for (let index = 0; index < this.length; index++) {
        this[index].InitRate(maxvalue, nullable);
    }
}

