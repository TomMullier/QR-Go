import QrScanner from 'qr-scanner';
import Scan from './scan.js';

let qrScanner;
if (window.isSecureContext) {
  qrScanner = new QrScanner(
      document.getElementById('qr-video'),
      result => {
        Scan.getCurrentDescription(result.data);
        qrScanner.stop();
        document.getElementById('qr-display').classList.add('paused');
      }, {returnDetailedScanResult: true}
  );
  document.getElementById('qr-display').appendChild(qrScanner.$canvas);
  qrScanner.start();
} else {
  document.getElementById('qr-display').appendChild(document.createElement('canvas'));
  document.getElementById('qr-display').classList.add('camera-not-available');
  document.getElementById('qr-display').addEventListener("click", function (e) {
    modals.show("display_camera_help");
  })
}


function startCam() {
  if (window.isSecureContext) {
    qrScanner.start();
    document.getElementById('qr-display').classList.remove('paused');
  } else return;
}


document.getElementById("window-location").innerText = window.location.origin;
document.getElementById("window-location-copy").setAttribute('text-to-clipboard', window.location.origin);


document.querySelectorAll("[text-to-clipboard]").forEach((element) => {
  element.addEventListener("click", () => {
    copyToClipboard(element.getAttribute("text-to-clipboard")).then(() => {
      const iconClasses = element.querySelector("i").classList;
      iconClasses.replace("fa-regular", "fa-solid");
      iconClasses.replace("fa-clipboard", "fa-clipboard-check");
      element.classList.add("bg-success");
      setTimeout(() => {
        iconClasses.replace("fa-solid", "fa-regular");
        iconClasses.replace("fa-clipboard-check", "fa-clipboard");
        element.classList.remove("bg-success");
      }, 1000);
    });
  });
});

function copyToClipboard(textToCopy) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
}

export default {
  startCam
};