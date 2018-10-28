(function(window) {
  var notice, closeIcon;

  function handleWindowLoad(event) {
    notice = document.querySelector(".gdpr-notice");
    closeIcon = notice.querySelector(".close-icon");

    var alreadyShown = document.cookie.includes("cookieBanner");
    if (alreadyShown) {
      return;
    }
    notice.classList.remove("hidden");
    closeIcon.addEventListener("click", handleCloseClick);
  }

  function handleCloseClick(event) {
    event.preventDefault();
    closeIcon.removeEventListener("click", handleCloseClick);

    var expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie =
      "cookieBanner=false; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
    notice.classList.add("hidden");
  }

  window.addEventListener("load", handleWindowLoad);
})(window);
