// Created By https://github.com/samanazadi1996

var toastOptions = null
var toast = null

function Toast(type, subject, message) {
  var timeout = toastOptions?.timeout ?? 3000;

  var toastBody = document.createElement("div")
  var toastHeader = document.createElement("div")
  var toastMessage = document.createElement("div")
  var toastProgressBar = document.createElement("div")
  var toastClose = document.createElement("span")
  var toastSubject = document.createElement("span")
  toastHeader.appendChild(toastClose)
  toastHeader.appendChild(toastSubject)
  toastBody.appendChild(toastHeader)
  toastBody.appendChild(toastMessage)
  toastBody.appendChild(toastProgressBar)
  toastHeader.style.borderBottom = "1px solid gray"
  toastHeader.style.paddingBottom = "2px"
  toastClose.innerHTML = "&#10006;"
  toastClose.style.marginLeft = "10px"
  toastClose.style.float = "right"
  toastClose.style.cursor = "pointer"
  toastMessage.innerHTML = message
  toastMessage.style.textAlign = "center"
  toastSubject.innerHTML = subject
  toastBody.style.margin = "10px"
  toastBody.style.padding = "4px"
  toastBody.style.borderRadius = "4px"
  toastProgressBar.style.height = "5px"
  toastProgressBar.style.width = "0px"
  toastProgressBar.style.transition = `${timeout}ms`
  toastProgressBar.style.backgroundColor = "gray"
  toastProgressBar.style.borderRadius = "2px"
  setTimeout(() => {
    toastProgressBar.style.width = "100%"
  }, 20);
  switch (type.toLowerCase()) {
    case "error":
      toastBody.style.backgroundImage = "linear-gradient(to bottom right, crimson, pink)"
      break;
    case "success":
      toastBody.style.backgroundImage = "linear-gradient(to bottom right, green, chartreuse)"
      break;
    case "info":
      toastBody.style.backgroundImage = "linear-gradient(to bottom right, darkcyan, cyan)"
      break;
    case "warning":
      toastBody.style.backgroundImage = "linear-gradient(to bottom right, darkorange, yellow)"
      break;
    default:
      toastBody.style.backgroundColor = "silver"
      break;
  }
  toastClose.onclick = function () {
    toastBody.remove()
  }

  setTimeout(() => {
    if (toastBody)
      toastBody.remove()
  }, timeout);

  toast.appendChild(toastBody)
}
function InitToaster(option) {
  toastOptions = option
  toast = document.createElement("div")
  toast.style.position = "absolute"
  toast.style.padding = "2px"
  toast.style.minWidth = "230px"
  toast.style.maxwidth = "100%"
  toast.style.opacity = "0.8"

  if (toastOptions?.position) {
    if (toastOptions?.position.toLowerCase() == "topleft") {
      toast.style.top = "0px"
      toast.style.left = "0px"
    } else if (toastOptions?.position.toLowerCase() == "topcenter") {
      toast.style.top = "0px"
      toast.style.left = "50%"
      toast.style.transform = "translateX(-50%)"
    } else if (toastOptions?.position.toLowerCase() == "bottomleft") {
      toast.style.bottom = "0px"
      toast.style.left = "0px"
    } else if (toastOptions?.position.toLowerCase() == "bottomcenter") {
      toast.style.bottom = "0px"
      toast.style.left = "50%"
      toast.style.transform = "translateX(-50%)"
    } else if (toastOptions?.position.toLowerCase() == "bottomright") {
      toast.style.bottom = "0px"
      toast.style.right = "0px"
    } else {
      toast.style.top = "0px"
      toast.style.right = "0px"
    }
  } else {
    toast.style.top = "20px"
    toast.style.right = "20px"
  }

  document.body.appendChild(toast)
}