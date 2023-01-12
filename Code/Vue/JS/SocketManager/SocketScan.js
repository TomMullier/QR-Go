import Scan from "../scan.js";

let socket = io()

/* -------------------------------------------------------------------------- */
/*                               FUNCTIONS EMIT                               */
/* -------------------------------------------------------------------------- */

function getCurrentInstruction() {
      socket.emit("getCurrentCard", false);
}


/* -------------------------------------------------------------------------- */
/*                                  Socket.ON                                 */
/* -------------------------------------------------------------------------- */

socket.on("showCurrentInstruction", (name, instruction) => {
      console.log(name, instruction);
      Scan.showCurrentInstruction(name, instruction);
})

//socket.on("wrongQrCode", () => {
//    console.log("Wrong QR");
//    Scan.showWrongQr();
//})




/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export default {
      getCurrentInstruction,
}