import Scan from "../scan.js";

let socket = io()


/* -------------------------------------------------------------------------- */
/*                               FUNCTIONS EMIT                               */
/* -------------------------------------------------------------------------- */

function getCurrentDescription(name) {
      console.log("lkjhdsrtx", name);
      socket.emit("getCurrentCard", true, name);
}

/* -------------------------------------------------------------------------- */
/*                                  Socket.ON                                 */
/* -------------------------------------------------------------------------- */

socket.on("showCurrentDescription", (name, description) => {
      console.log(name, description);
      Scan.showCurrentDescription(name, description);
})

socket.on("wrongQrCode", () => {
      console.log("Wrong QR");
      Scan.showWrongQrCode();
});



/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export default {
      getCurrentDescription
}