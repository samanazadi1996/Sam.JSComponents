// Created By https://github.com/samanazadi1996
var textbox = null;
var daySelected = 0;
var monthSelected = 0;
var yearSelected = 0;

var days = [
    { name: "شنبه", color: "white" },
    { name: "یکشنبه", color: "white" },
    { name: "دوشنبه", color: "white" },
    { name: "سه شنبه", color: "white" },
    { name: "چهارشنبه", color: "white" },
    { name: "پنجشنبه", color: "white" },
    { name: "جمعه", color: "red" }
]
var months = [
    { name: null, color: null },
    { name: "فروردین", color: "white" },
    { name: "اردیبهشت", color: "white" },
    { name: "خرداد", color: "white" },
    { name: "تیر", color: "white" },
    { name: "مرداد", color: "white" },
    { name: "شهریور", color: "white" },
    { name: "مهر", color: "red" },
    { name: "آبان", color: "red" },
    { name: "آذر", color: "red" },
    { name: "دی", color: "red" },
    { name: "بهمن", color: "red" },
    { name: "اسفند", color: "red" },
]

const CreateAndAppend = (name, element, cls = null, text = null) => {
    var temp = document.createElement(name)
    if (cls)
        temp.classList = cls
    if (text)
        temp.innerText = text
    element.appendChild(temp);
    return temp;
}

var bodyPersianCalendar = document.createElement("div")
var headerPersianCalendar = CreateAndAppend("div", bodyPersianCalendar)
var previousPersianCalendar = CreateAndAppend("button", headerPersianCalendar, "SamPersianCalendar_previous", ">")
var nextPersianCalendar = CreateAndAppend("button", headerPersianCalendar, "SamPersianCalendar_next", "<")
var monthPersianCalendar = CreateAndAppend("h4", headerPersianCalendar, "SamPersianCalendar_year", "فروردین-1402")

bodyPersianCalendar.classList = "SamPersianCalendar";

var tablePersianCalendar = CreateAndAppend("table", bodyPersianCalendar)

const CreateHeaderAndAppendToTable = () => {

    var trHeader = document.createElement("tr")
    for (let index = 0; index < days.length; index++) {
        var temp = document.createElement("td")
        temp.innerText = days[index].name[0];
        trHeader.appendChild(temp)
    }
    tablePersianCalendar.innerHTML = "";
    tablePersianCalendar.appendChild(trHeader)
}
CreateHeaderAndAppendToTable()
document.body.appendChild(bodyPersianCalendar)
function GoToDate() {
    monthPersianCalendar.innerText = `${months[monthSelected].name}-${yearSelected}`
}
function ToEnChars(str) {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
}
previousPersianCalendar.onclick = function () {
    monthSelected -= 1;
    if (monthSelected == 0) {
        yearSelected -= 1
        monthSelected = 12
    }
    GoToDate()
}
nextPersianCalendar.onclick = function () {
    monthSelected += 1;
    if (monthSelected == 12) {
        yearSelected += 1
        monthSelected = 1
    }
    GoToDate()
}
function GetDate() {
    return ToEnChars(new Date().toLocaleDateString("fa-IR"))
}

HTMLElement.prototype.InitPersianCalendar = function () {
    this.onclick = function () {
        var temp = (GetDate()).split("/")
        if (this.value)
            temp = this.value.split("/")
            
        textbox = this
        daySelected = Number(temp[2]);
        monthSelected = Number(temp[1]);
        yearSelected = Number(temp[0]);
        CreateHeaderAndAppendToTable()
        GoToDate()
    }
}
