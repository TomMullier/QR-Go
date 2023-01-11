import Location from "../admin_location_list.js"

let socket = io()

function addLocation(name,description, instruction){
    socket.emit("addLocation", name, description,instruction);
}

function modifyLocation(name,description, instruction){
    socket.emit("modifyLocation", name, description,instruction);
}

function deleteLocation(name){
    socket.emit("deleteLocation", name)
}

function getAllLocation(){
    socket.emit("getAllLocation");
}

socket.on("addLocationFailed", () => {
    console.log("failed");
})

socket.on("addLocationSuccess", () => {
    console.log("success");
    getAllLocation();
})

socket.on("showAllLocation", (locations) => {
    Location.showAllLocation(locations)
})


export default{
    addLocation,
    getAllLocation,
    modifyLocation,
    deleteLocation
}