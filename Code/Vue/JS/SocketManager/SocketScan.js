import Scan from "../scan.js";

let socket = io()

/* -------------------------------------------------------------------------- */
/*                               FUNCTIONS EMIT                               */
/* -------------------------------------------------------------------------- */

function getCurrentInstruction() {
      console.log("ici");
      socket.emit("getCurrentCard", false);
}

function getCurrentDescription(name) {
      console.log("lkjhdsrtx", name);
      socket.emit("getCurrentCard", true, name);
}


/* -------------------------------------------------------------------------- */
/*                                  Socket.ON                                 */
/* -------------------------------------------------------------------------- */

socket.on("showCurrentInstruction", (name, instruction) => {
      console.log(name, instruction);
      Scan.showCurrentInstruction(name, instruction);
})

socket.on("showCurrentDescription", (name, description) => {
      console.log("showCurrentDescription");
      console.log(name, description);
      Scan.showCurrentDescription(name, description);
})

socket.on("wrongQrCode", () => {
      console.log("Wrong QR");
      Scan.showWrongQrCode();
});

socket.on("endGame", () => {
      console.log("Finish");
      Scan.showEndGame();
})


/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export default {
      getCurrentInstruction,
      getCurrentDescription
}