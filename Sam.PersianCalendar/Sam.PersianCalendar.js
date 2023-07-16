// Created By https://github.com/samanazadi1996
var textbox = null;
var daySelected = 0;
var monthSelected = 0;
var yearSelected = 0;

var days = [
  { name: "شنبه", closed: false, shift: 0 },
  { name: "یکشنبه", closed: false, shift: 1 },
  { name: "دوشنبه", closed: false, shift: 2 },
  { name: "سه‌شنبه", closed: false, shift: 3 },
  { name: "چهارشنبه", closed: false, shift: 4 },
  { name: "پنجشنبه", closed: false, shift: 5 },
  { name: "جمعه", closed: true, shift: 6 },
];
var months = [
  { name: null, color: null },
  { name: "فروردین", color: "#00ff0077" },
  { name: "اردیبهشت", color: "#00ff0077" },
  { name: "خرداد", color: "#00ff0077" },
  { name: "تیر", color: "#00ff00" },
  { name: "مرداد", color: "#00ff00" },
  { name: "شهریور", color: "#00ff00" },
  { name: "مهر", color: "#ff8800aa" },
  { name: "آبان", color: "#ff8800aa" },
  { name: "آذر", color: "#ff8800aa" },
  { name: "دی", color: "#00aaffaa" },
  { name: "بهمن", color: "#00aaffaa" },
  { name: "اسفند", color: "#00aaffaa" },
];

const CreateAndAppend = (name, element, cls = null, text = null) => {
  var temp = document.createElement(name);
  if (cls) temp.classList = cls;
  if (text) temp.innerText = text;
  element.appendChild(temp);
  return temp;
};

var bodyPersianCalendar = document.createElement("div");
var headerPersianCalendar = CreateAndAppend("div", bodyPersianCalendar);
var previousPersianCalendar = CreateAndAppend(
  "button",
  headerPersianCalendar,
  "SamPersianCalendar_previous",
  ">"
);
var nextPersianCalendar = CreateAndAppend(
  "button",
  headerPersianCalendar,
  "SamPersianCalendar_next",
  "<"
);
var monthPersianCalendar = CreateAndAppend(
  "h4",
  headerPersianCalendar,
  "SamPersianCalendar_year",
  "فروردین-1402"
);

bodyPersianCalendar.classList = "SamPersianCalendar";

var tablePersianCalendar = CreateAndAppend("table", bodyPersianCalendar);

const CreateHeaderAndAppendToTable = () => {
  var trHeader = document.createElement("tr");
  for (let index = 0; index < days.length; index++) {
    var temp = document.createElement("td");
    temp.innerText = days[index].name[0];
    temp.classList =
      "SamPersianCalendar_Day " +
      (days[index].closed
        ? "SamPersianCalendar_Day_closed"
        : "SamPersianCalendar_Day_open");
    trHeader.appendChild(temp);
  }
  tablePersianCalendar.innerHTML = "";
  tablePersianCalendar.appendChild(trHeader);
};
CreateHeaderAndAppendToTable();
document.body.appendChild(bodyPersianCalendar);
function GoToDate() {
  CreateHeaderAndAppendToTable();

  monthPersianCalendar.innerText = `${months[monthSelected].name}-${yearSelected}`;
  bodyPersianCalendar.style.backgroundColor = months[monthSelected].color;
  var countDaysInMonth = CountDaysInMonth(monthSelected, yearSelected);

  var daysWithShift = [];

  var dayOfWeek = new Date(
    ToGregorian(yearSelected, monthSelected, 1)
  ).toLocaleDateString("fa-ir", {
    weekday: "long",
  });
  var shift = days.filter((p) => p.name == dayOfWeek)[0].shift;

  for (let index = 0; index < shift; index++) daysWithShift.push("");
  for (let index = 1; index <= countDaysInMonth; index++)
    daysWithShift.push(index);

  var tds = [];

  for (let index = 0; index < daysWithShift.length; index++) {
    var temp = document.createElement("td");
    if (daysWithShift[index]) {
      temp.innerText = daysWithShift[index];
      temp.classList = "SamPersianCalendar_Day";
    }
    tds.push(temp);
  }

  for (let w = 0; w < Math.ceil(tds.length / 7); w++) {
    var tr = document.createElement("tr");
    for (let e = 0; e < 7; e++) {
      const element = tds[w * 7 + e];
      if (element) {
        tr.appendChild(element);
        if (element.innerText) {
          element.onclick = function () {
            daySelected = Number(element.innerText);
            textbox.value = `${yearSelected}/${monthSelected}/${daySelected}`;
            bodyPersianCalendar.style.display = "none";
          };
          if (e == 6) element.classList.add("SamPersianCalendar_Day_closed");

          if (
            Number(element.innerText) == daySelected &&
            monthSelected == textbox.value.split("/")[1] &&
            yearSelected == textbox.value.split("/")[0]
          )
            element.classList.add("SamPersianCalendar_Day_mark_Selected_Day");
        }
      }
    }
    tablePersianCalendar.appendChild(tr);
  }
}
function ToEnChars(str) {
  return str
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}
previousPersianCalendar.onclick = function () {
  monthSelected -= 1;
  if (monthSelected <= 0) {
    yearSelected -= 1;
    monthSelected = 12;
  }
  GoToDate();
};
nextPersianCalendar.onclick = function () {
  monthSelected += 1;
  if (monthSelected > 12) {
    yearSelected += 1;
    monthSelected = 1;
  }
  GoToDate();
};
function CountDaysInMonth(month, year) {
  const daysInMonth = [
    31, // فروردین
    31, // اردیبهشت
    31, // خرداد
    31, // تیر
    31, // مرداد
    31, // شهریور
    30, // مهر
    30, // آبان
    30, // آذر
    30, // دی
    30, // بهمن
    (year + 1) % 4 ? 29 : 30, // اسفند
  ];

  return daysInMonth[month - 1];
}
function ToGregorian(year, month, day) {
  JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  };

  var jy = parseInt(year) - 979;
  var jm = parseInt(month) - 1;
  var jd = parseInt(day) - 1;

  var j_day_no =
    365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
  for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

  j_day_no += jd;

  var g_day_no = j_day_no + 79;

  var gy =
    1600 +
    400 *
      parseInt(
        g_day_no / 146097
      ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
  g_day_no = g_day_no % 146097;

  var leap = true;
  if (g_day_no >= 36525) {
    /* 36525 = 365*100 + 100/4 */ g_day_no--;
    gy +=
      100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
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

  for (
    var i = 0;
    g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    i++
  )
    g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
  var gm = i + 1;
  var gd = g_day_no + 1;

  gm = gm < 10 ? "0" + gm : gm;
  gd = gd < 10 ? "0" + gd : gd;

  return `${gy}-${gm}-${gd}`;
}
function GetDate() {
  return ToEnChars(new Date().toLocaleDateString("fa-IR"));
}

HTMLElement.prototype.InitPersianCalendar = function () {
  this.onclick = function () {
    var temp = GetDate().split("/");
    if (this.value) temp = this.value.split("/");

    textbox = this;
    daySelected = Number(temp[2]);
    monthSelected = Number(temp[1]);
    yearSelected = Number(temp[0]);
    CreateHeaderAndAppendToTable();
    GoToDate();
    bodyPersianCalendar.style.display = "block";

    bodyPersianCalendar.style.top = this.offsetTop + this.offsetHeight;
    bodyPersianCalendar.style.left = this.offsetLeft;
  };
};

NodeList.prototype.InitPersianCalendar = function () {
  for (let index = 0; index < this.length; index++) {
    this[index].InitPersianCalendar();
  }
};

HTMLCollection.prototype.InitPersianCalendar = function () {
  for (let index = 0; index < this.length; index++) {
    this[index].InitPersianCalendar();
  }
};
