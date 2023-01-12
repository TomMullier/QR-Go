import QrScanner from 'qr-scanner';
import Scan from './SocketManager/SocketScanner.js'

const qrScanner = new QrScanner(
  document.getElementById('qr-video'),
  result => {
    Scan.getCurrentDescription(result.data);
  }, { returnDetailedScanResult: true }
);

qrScanner.start();


document.getElementById('qr-display').appendChild(qrScanner.$canvas);


document.getElementById("window-location").innerText = window.location.origin;
document.getElementById("window-location-copy").setAttribute('text-to-clipboard', window.location.origin);


document.querySelectorAll("[text-to-clipboard]").forEach((element) => {
  element.addEventListener("click", () => {
    navigator.clipboard.writeText(element.getAttribute("text-to-clipboard")).then(() => {
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