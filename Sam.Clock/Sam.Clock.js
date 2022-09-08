HTMLElement.prototype.InitClock = function () {
    this.style.position = "relative"

    var hImage = "data:image/png;base64,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";
    var mImage = "data:image/png;base64,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";
    var sImage = "data:image/png;base64,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";
    var bTime = document.createElement("b")
    bTime.style.position = "absolute"
    bTime.style.transform = "translate(-50%, -100%)"
    bTime.style.top = "50%"
    bTime.style.left = "50%"
    bTime.style.color = "red"
    bTime.style.fontFamily = "cursive"
    this.appendChild(bTime)
    var bDate = document.createElement("b")
    bDate.style.position = "absolute"
    bDate.style.transform = "translatex(-50%)"
    bDate.style.top = "50%"
    bDate.style.left = "50%"
    bDate.style.color = "blue"
    bDate.style.fontFamily = "cursive"
    this.appendChild(bDate)

    var imgh = document.createElement("img")
    var imgm = document.createElement("img")
    var imgs = document.createElement("img")
    var objs = [
        { el: imgh, img: hImage, ab: true },
        { el: imgm, img: mImage, ab: true },
        { el: imgs, img: sImage, ab: false }
    ]
    for (let index = 0; index < objs.length; index++) {
        const element = objs[index];
        element.el.style.width = "100%"
        element.el.src = element.img;
        if (element.ab)
            element.el.style.position = "absolute"
        element.el.style.transition = "1s"
        this.appendChild(element.el)
    }

    setInterval(() => {
        var now = new Date();
        var hur = now.getHours()
        var min = now.getMinutes()
        var sec = now.getSeconds();

        var array = [
            { el: imgh, ci: 12, val: hur },
            { el: imgm, ci: 60, val: min },
            { el: imgs, ci: 60, val: sec }
        ];

        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            if (element.val == 0) {
                element.el.style.transform = "rotate(360deg)"
            }
            else if (element.val == 1) {
                if (element.el.style.transform != "rotate(" + 360 / element.ci + "deg)") {
                    element.el.style.transition = null
                    element.el.style.transform = "rotate(0deg)"
                }
                setTimeout(() => {
                    element.el.style.transition = "1s"
                    element.el.style.transform = "rotate(" + 360 / element.ci + "deg)"
                }, 10);
            } else {
                element.el.style.transform = "rotate(" + 360 / element.ci * element.val + "deg)"
            }
        }

        bTime.innerText = new Date("2022 " + hur + ":" + min + ":" + sec).toLocaleTimeString("fa");
        bDate.innerText = now.toLocaleDateString("fa")
    }, 1000);
}
