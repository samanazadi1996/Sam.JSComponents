HTMLElement.prototype.IsNatonalcode = function () {
  const Validate = nationalcode => {
    if (IsNatonalcode(nationalcode)) {
      this.style.color = "green"

    } else {
      this.style.color = "red"
    }
  };

  this.onkeyup = function () { Validate(this.value) }
  this.oncut = function () { Validate(this.value) }
  this.onload = function () { Validate(this.value) }

}
function IsNatonalcode(notionalcode) {
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