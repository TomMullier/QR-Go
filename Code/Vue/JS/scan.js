import SocketManager from './utils/SocketManager.js';

document.getElementById("button_back").addEventListener("click", function (e) {
        modals.show("display_location");
})

document.getElementById("camera_help").addEventListener("click", function (e) {
        modals.show("display_camera_help");
})
