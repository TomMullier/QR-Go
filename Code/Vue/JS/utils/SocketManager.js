import Location from "../admin_location_list.js";
// import Route from "../admin_route_list.js";

let socket = io()

/* -------------------------------------------------------------------------- */
/*                               FUNCTIONS EMIT                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------- LOCATIONS ------------------------------- */
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


/* --------------------------------- ROUTES --------------------------------- */
function addRoute(name, description, duration, locations){
    socket.emit("addRoute", name, description, duration, locations);
}

function modifyRoute(name, description, duration, locations){
    socket.emit("modifyRoute", name, description, duration, locations);
}

function deleteRoute(name){
    socket.emit("deleteRoute", name);
}

function getAllRoutes(){
    socket.emit("getAllRoutes");
}



/* -------------------------------------------------------------------------- */
/*                                  Socket.ON                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------- LOCATIONS ------------------------------- */
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

/* --------------------------------- ROUTES --------------------------------- */
socket.on("addRouteFailed", () => {
    console.log("failed");
})

socket.on("addRouteSuccess", () => {
    console.log("success");
    getAllRoutes();
})

socket.on("showAllRoutes", (routes) => {
    Route.showAllRoutes(routes)
})

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */
export default{
    addLocation,
    getAllLocation,
    modifyLocation,
    deleteLocation,
    addRoute,
    modifyRoute,
    deleteRoute,
    getAllRoutes
}