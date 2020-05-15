import * as sapper from "@sapper/app";

sapper.start({
  target: document.querySelector("#sapper"),
});

if (navigator.serviceWorker && typeof Notyf !== "undefined") {
  var notyf = new Notyf();
  notyf.success({
    message: `BTW: This page now works offline!`,
    duration: 3000,
    ripple: true,
  });
}
