import SocketManager from './SocketManager/SocketScan.js';

document.getElementById("button_back").addEventListener("click", function (e) {
        modals.show("display_location");
})

document.getElementById("camera_help").addEventListener("click", function (e) {
        modals.show("display_camera_help");
})


function showCurrentInstruction(name, instruction) {
        document.getElementById("instructions_text").innerText = instruction;
        document.getElementById('div_scaner_title_txt').innerHTML = name;
}

SocketManager.getCurrentInstruction();

function showCurrentDescription(name, description) {
        document.getElementById('txt_title').innerHTML = name;
        document.querySelector("#txt_descr h3").innerText = description;
        modals.show("display_location");
}

function showWrongQrCode() {
        document.getElementById('txt_title').innerHTML = "Wrong QR Code !";
        document.querySelector("#txt_descr h3").innerText = "Find the good one following the instructions";
        modals.show("display_location");
}

function showEndGame(){
        document.getElementById('txt_title').innerHTML = "You win !";
        document.querySelector("#txt_descr h3").innerText = "You have finished the route. We hope you like this !";
        modals.show("display_location", () => {
                alert("Il faut rediriger vers la page user_route_list");
        });
}


export default {
        showCurrentInstruction,
        showCurrentDescription,
        showWrongQrCode
}