// Created By https://github.com/samanazadi1996

HTMLElement.prototype.IsNatonalcode = function () {
  const Validate = nationalcode => {
    this.value = nationalcode = nationalcode.replace(/\D/g, "")
    this.style.color = IsNatonalcode(nationalcode) ? "green" : "red"
  };
  this.setAttribute("maxlength", 10)
  this.onkeyup = function () { Validate(this.value) }
  this.oncut = function () { Validate(this.value) }
  this.onload = function () { Validate(this.value) }

}
function IsNatonalcode(notionalcode) {
  for (var index = 0; index < 10; index++)
    if (notionalcode == new Array(11).join(index)) return false

  if (notionalcode.length != 10) return false
  if (notionalcode.substr(0, 3) == '000') return false;

  var check = 0;
  for (var i = 0; i < notionalcode.length; i++) {
    var num = notionalcode.substr(i, 1);
    check += num * (10 - i)
  }
  if (check % 11) return false;

  return true;
}