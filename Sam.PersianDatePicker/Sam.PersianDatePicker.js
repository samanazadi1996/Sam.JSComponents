// Created By https://github.com/samanazadi1996

HTMLElement.prototype.InitPersianDatePicker = function (options = null) {
    // this.style.display = "none"
    var splitChar = options?.splitChar ?? "-"
    var selectClass = options?.selectClass
    var tableClass = options?.tableClass
    var minYear = options?.minYear ?? GetYear() - 80
    var maxYear = options?.maxYear ?? GetYear()
    var datebox = this;

    const GetOption = (val, text) => {
        var op = document.createElement("option")
        op.innerText = text
        op.value = val
        return op
    }

    var tbl = document.createElement("table")
    tableClass.split(" ").forEach(element => {
        tbl.classList.add(element)
    });

    var tr = document.createElement("tr")
    tbl.appendChild(tr)

    var tdYear = document.createElement("td")
    var year = document.createElement("select")
    if (selectClass)
        selectClass.split(" ").forEach(element => {
            year.classList.add(element)
        });

    year.appendChild(GetOption(0, "سال"))
    for (let index = minYear; index <= maxYear; index++)
        year.appendChild(GetOption(index, index))

    tdYear.appendChild(year)
    tr.appendChild(tdYear)

    var tdMonth = document.createElement("td")
    var month = document.createElement("select")
    if (selectClass)
        selectClass.split(" ").forEach(element => {
            month.classList.add(element)
        });

    strMonths = ["ماه", "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
    month.appendChild(GetOption(0, strMonths[0]))
    for (let index = 1; index <= 12; index++)
        month.appendChild(GetOption(index, strMonths[index]))

    tdMonth.appendChild(month)
    tr.appendChild(tdMonth)

    var tdDay = document.createElement("td")
    var day = document.createElement("select")
    if (selectClass)
        selectClass.split(" ").forEach(element => {
            day.classList.add(element)
        });

    day.appendChild(GetOption(0, "روز"))
    for (let index = 1; index <= 31; index++)
        day.appendChild(GetOption(index, index))

    tdDay.appendChild(day)
    tr.appendChild(tdDay)

    const SelectDate = () => {
        if (day.value != 0 && month.value != 0 && year.value != 0) {
            JalaliDate = {
                g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
            };

            var jy = parseInt(year.value) - 979;
            var jm = parseInt(month.value) - 1;
            var jd = parseInt(day.value) - 1;

            var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
            for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

            j_day_no += jd;

            var g_day_no = j_day_no + 79;

            var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
            g_day_no = g_day_no % 146097;

            var leap = true;
            if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
                g_day_no--;
                gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
                g_day_no = g_day_no % 36524;

                if (g_day_no >= 365) g_day_no++;
                else leap = false;
            }

            gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
            g_day_no %= 1461;

            if (g_day_no >= 366) {
                leap = false;

                g_day_no--;
                gy += parseInt(g_day_no / 365);
                g_day_no = g_day_no % 365;
            }

            for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
                g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
            var gm = i + 1;
            var gd = g_day_no + 1;

            gm = gm < 10 ? "0" + gm : gm;
            gd = gd < 10 ? "0" + gd : gd;

            datebox.value = `${gy}${splitChar}${gm}${splitChar}${gd}`
        } else {
            datebox.value = null
        }
    }
    if (datebox.value) {
        var date = ToEnChars(new Date(datebox.value).toLocaleDateString("fa-IR")).split("/")
        year.value = date[0]
        month.value = date[1]
        day.value = date[2]
    }

    year.onchange = function () { SelectDate() }
    month.onchange = function () { SelectDate() }
    day.onchange = function () { SelectDate() }

    this.parentNode.insertBefore(tbl, this.nextSibling);
}
NodeList.prototype.InitPersianDatePicker = function (options = null) {
    for (let index = 0; index < this.length; index++) {
        this[index].InitPersianDatePicker(options);
    }
}

HTMLCollection.prototype.InitPersianDatePicker = function (options = null) {
    for (let index = 0; index < this.length; index++) {
        this[index].InitPersianDatePicker(options);
    }
}
function ToEnChars(str) {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
}

function GetYear() {
    return parseInt(ToEnChars(new Date().toLocaleDateString("fa-IR")).split("/")[0])
}
