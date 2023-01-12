import Route from "../admin_route_list.js";

let socket = io()

/* -------------------------------------------------------------------------- */
/*                               FUNCTIONS EMIT                               */
/* -------------------------------------------------------------------------- */

function addRoute(name, description, duration, locations) {
        socket.emit("addRoute", name, description, duration, locations);
}

function modifyRoute(name, description, duration, locations) {
        socket.emit("modifyRoute", name, description, duration, locations);
}

function deleteRoute(name) {
        socket.emit("deleteRoute", name);
}

function getAllRoutes() {
        socket.emit("getAllRoutes");
}

function getRouteInfo(route_name) {
        socket.emit("getRouteInfo", route_name);
}


/* -------------------------------------------------------------------------- */
/*                                  Socket.ON                                 */
/* -------------------------------------------------------------------------- */

socket.on("addRouteFailed", () => {
        console.log("failed");
})

socket.on("addRouteSuccess", () => {
        console.log("success");
        getAllRoutes();
})

socket.on("refreshAllRoutes", (routes) => {
        console.log(routes);
        Route.refreshAllRoutes(routes)
})

socket.on("showLocModal", (tabLocUsed, tabLocAvail) => {
        Route.setLocModal(tabLocUsed, tabLocAvail);
})

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */
export default {
        addRoute,
        modifyRoute,
        deleteRoute,
        getAllRoutes,
        getRouteInfo
}