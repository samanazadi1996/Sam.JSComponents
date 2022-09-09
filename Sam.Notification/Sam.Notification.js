var notificationOptions = null
var notification = null

function Notif(type, subject, message) {
  var timeout = notificationOptions?.timeout ?? 3000;

  var notificationBody = document.createElement("div")
  var notificationHeader = document.createElement("div")
  var notificationMessage = document.createElement("div")
  var notificationProgressBar = document.createElement("div")
  var notificationClose = document.createElement("span")
  var notificationSubject = document.createElement("span")
  notificationHeader.appendChild(notificationClose)
  notificationHeader.appendChild(notificationSubject)
  notificationBody.appendChild(notificationHeader)
  notificationBody.appendChild(notificationMessage)
  notificationBody.appendChild(notificationProgressBar)
  notificationHeader.style.borderBottom = "1px solid gray"
  notificationHeader.style.paddingBottom = "2px"
  notificationClose.innerHTML = "&#10006;"
  notificationClose.style.marginLeft = "10px"
  notificationClose.style.float = "right"
  notificationClose.style.cursor = "pointer"
  notificationMessage.innerHTML = message
  notificationMessage.style.textAlign = "center"
  notificationSubject.innerHTML = subject
  notificationBody.style.margin = "10px"
  notificationBody.style.padding = "4px"
  notificationBody.style.borderRadius = "4px"
  notificationProgressBar.style.height = "5px"
  notificationProgressBar.style.width = "0px"
  notificationProgressBar.style.transition = `${timeout}ms`
  notificationProgressBar.style.backgroundColor = "gray"
  notificationProgressBar.style.borderRadius = "2px"
  setTimeout(() => {
    notificationProgressBar.style.width = "100%"
  }, 20);
  switch (type.toLowerCase()) {
    case "error":
      notificationBody.style.backgroundImage = "linear-gradient(to bottom right, crimson, pink)"
      break;
    case "success":
      notificationBody.style.backgroundImage = "linear-gradient(to bottom right, green, chartreuse)"
      break;
    case "info":
      notificationBody.style.backgroundImage = "linear-gradient(to bottom right, darkcyan, cyan)"
      break;
    case "warning":
      notificationBody.style.backgroundImage = "linear-gradient(to bottom right, darkorange, yellow)"
      break;
    default:
      notificationBody.style.backgroundColor = "silver"
      break;
  }
  notificationClose.onclick = function () {
    notificationBody.remove()
  }

  setTimeout(() => {
    if (notificationBody)
      notificationBody.remove()
  }, timeout);

  notification.appendChild(notificationBody)
}
function InitNotification(option) {
  notificationOptions = option
  notification = document.createElement("div")
  notification.style.position = "absolute"
  notification.style.padding = "2px"
  notification.style.minWidth = "230px"
  notification.style.maxwidth = "100%"
  notification.style.opacity = "0.8"

  if (notificationOptions?.position) {
    if (notificationOptions?.position.toLowerCase() == "topleft") {
      notification.style.top = "0px"
      notification.style.left = "0px"
    } else if (notificationOptions?.position.toLowerCase() == "topcenter") {
      notification.style.top = "0px"
      notification.style.left = "50%"
      notification.style.transform = "translateX(-50%)"
    } else if (notificationOptions?.position.toLowerCase() == "bottomleft") {
      notification.style.bottom = "0px"
      notification.style.left = "0px"
    } else if (notificationOptions?.position.toLowerCase() == "bottomcenter") {
      notification.style.bottom = "0px"
      notification.style.left = "50%"
      notification.style.transform = "translateX(-50%)"
    } else if (notificationOptions?.position.toLowerCase() == "bottomright") {
      notification.style.bottom = "0px"
      notification.style.right = "0px"
    } else {
      notification.style.top = "0px"
      notification.style.right = "0px"
    }
  } else {
    notification.style.top = "20px"
    notification.style.right = "20px"
  }

  document.body.appendChild(notification)
}

