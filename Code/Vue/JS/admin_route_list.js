import SocketManager from './SocketManager/SocketRoute.js';


SocketManager.getAllRoutes();

let all_desc = document.getElementsByClassName("route_element_desc_text")
let all_expand_buttons = document.getElementsByClassName("expand_button")
all_desc = Array.from(all_desc)
all_expand_buttons = Array.from(all_expand_buttons)

function updateShowMoreBtn() {
        all_expand_buttons.forEach(function (element) {
                element.addEventListener("click", function (e) {

                        console.log(e)
                        all_desc.forEach(function (el) {
                                el.style.overflow = "hidden"
                                el.style.lineClamp = 3;
                                el.style.display = "-webkit-box";

                        })
                        let desc = e.target.parentElement.parentElement.getElementsByClassName("route_element_desc_text")[0]
                        desc.style.overflow = "visible";
                        desc.style.lineClamp = 999999;
                        desc.style.display = "flex";

                });
        })
}

updateShowMoreBtn();


//get name, desc and duraction from modal
let route_name = document.getElementById("route_name")
let route_desc = document.getElementById("route_desc")
let route_duration = document.getElementById("route_duration")
let route_title = document.getElementById("title_txt")

document.getElementById("new_route_button").addEventListener("click", function (e) {
        modals.show("create_route_modal");
        route_title.innerText = "Create Route"
        route_name.value = ""
        route_desc.value = ""
        route_duration.value = ""
        if (document.activeElement != document.body) document.activeElement.blur();

        document.getElementById("validate").setAttribute("existing", "false")
        document.getElementById("delete").innerHTML = "";
        SocketManager.getRouteInfo(route_name.value, false);
})

document.getElementById("delete").addEventListener("click", () => {
        SocketManager.deleteRoute(route_name.value.toUpperCase());
});

let allCards = document.getElementsByClassName("route-element")
allCards = Array.from(allCards)
console.log(allCards)

function allEventCards() {
        allCards.forEach(function (element) {
                element.addEventListener("click", function (e) {
                        if (!e.target.classList.contains("expand_button")) {
                                route_title.innerText = "Edit Route"
                                route_name.value = element.getElementsByClassName("titles")[0].innerText
                                route_desc.value = element.getElementsByClassName("route_element_desc_text")[0].innerText
                                route_duration.value = element.getElementsByClassName("duration")[0].innerText
                                document.getElementById("validate").setAttribute("existing", "true");
                                document.getElementById("delete").innerHTML = "Delete";
                                modals.show("create_route_modal");
                                if (document.activeElement != document.body) document.activeElement.blur();
                                SocketManager.getRouteInfo(route_name.value, true)
                                SocketManager.getAllLocationInRoute(route_name.value)
                        }

                });
        })
}


const dragAreaVerti = document.querySelector("#list_verti");
new Sortable(dragAreaVerti, {
        group:{
                name: 'shared',
        },
        handle: '.handle',
        animation: 350
});

const dragAreaHori = document.querySelector("#list_horiz");
new Sortable(dragAreaHori, {
        group:{
                name: 'shared',
        },
        sort:false,
        handle: '.handle',
        animation: 350
});



document.getElementById('searchBar').addEventListener('input', filterList);

function filterList() {
        const searchBar = document.getElementById('searchBar');
        const filter = searchBar.value.toLowerCase();

        let listItems = document.getElementsByClassName("titles")
        let auteurs = document.getElementsByClassName('auteur');
        listItems = Array.from(listItems);
        let listNames = Array.from(auteurs);
        for (let i = 0; i < listItems.length; i++) {
                let text = listItems[i].innerText;
                let text2 = listNames[i].innerText;
                if (text.toLowerCase().includes(filter)) {
                        const parent1 = listItems[i].parentElement;
                        const parent2 = parent1.parentElement;
                        parent2.style.display = '';
                } else if (text2.toLowerCase().includes(filter)) {
                        const parent1 = listNames[i].parentElement;
                        const parent2 = parent1.parentElement;
                        parent2.style.display = '';
                } else {
                        const parent1 = listItems[i].parentElement;
                        const parent2 = parent1.parentElement;
                        parent2.style.display = 'none';
                }
        };
}


document.getElementById("validate").addEventListener("click", (e) => {
        let name = route_name.value;
        let description = route_desc.value;
        let duration = route_duration.value;
        let locationsHTML = document.querySelectorAll("#list_verti .card_scroll_verti h1");
        let locations = []
        locationsHTML.forEach(locationHTML => {
                locations.push(locationHTML.innerText);
        })

        if (name == "" || name == null) return
        if (document.getElementById("validate").getAttribute("existing") == "false") {
                SocketManager.addRoute(name.toUpperCase(), description, duration, locations);
        } else {
                SocketManager.modifyRoute(name.toUpperCase(), description, duration, locations);
        }
})


function refreshAllRoutes(tabRoutes) {
        document.getElementById("scroll_list").innerHTML = "";
        tabRoutes.forEach(route => {
                createRouteListElement(route.name, route.description, route.duration, route.locations, route.author);
        })
        allEventCards();
}

function createRouteListElement(name, description, duration, locations, author) {
        // create html card
        const routeElement = document.createElement("div");
        routeElement.classList.add("route-element");
        allCards.push(routeElement);

        const routeElementTop = document.createElement("div");
        routeElementTop.classList.add("route-element-top");
        const h1 = document.createElement("h1");
        h1.classList.add("titles");
        h1.textContent = name;
        routeElementTop.appendChild(h1);
        const top = document.createElement("div");
        top.classList.add("top");
        const b = document.createElement("b");
        b.textContent = "Click to Modify";
        top.appendChild(b);
        routeElementTop.appendChild(top);
        routeElement.appendChild(routeElementTop);

        const routeElementDesc = document.createElement("div");
        routeElementDesc.classList.add("route-element-desc");
        const h6 = document.createElement("h6");
        h6.classList.add("duration");
        const i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-clock");
        h6.appendChild(i);
        h6.textContent = duration;
        routeElementDesc.appendChild(h6);
        const p = document.createElement("p");
        p.classList.add("route_element_desc_text");
        p.textContent = description;
        all_desc.push(p)
        routeElementDesc.appendChild(p);
        const showMoreContainer = document.createElement("div");
        showMoreContainer.classList.add("show_more_container");
        const expandButton = document.createElement("a");
        expandButton.classList.add("expand_button");
        expandButton.textContent = "Show more";
        all_expand_buttons.push(expandButton);
        showMoreContainer.appendChild(expandButton);
        routeElementDesc.appendChild(showMoreContainer);
        routeElement.appendChild(routeElementDesc);

        const routeElementBottom = document.createElement("div");
        routeElementBottom.classList.add("route-element-bottom");
        const h6_1 = document.createElement("h6");
        h6_1.textContent = locations.length + " steps";
        routeElementBottom.appendChild(h6_1);
        const h6_2 = document.createElement("h6");
        h6_2.classList.add("auteur");
        h6_2.textContent = "By " + author;
        routeElementBottom.appendChild(h6_2);
        routeElement.appendChild(routeElementBottom);

        document.getElementById("scroll_list").appendChild(routeElement)
        updateShowMoreBtn()
}

function createNotUsedLocation(name, description){
        const cardScrollVerti = document.createElement("div");
        cardScrollVerti.classList.add("card_scroll_verti");

        const left = document.createElement("div");
        left.classList.add("left");
        const h1 = document.createElement("h1");
        h1.textContent = name;
        left.appendChild(h1);
        const p = document.createElement("p");
        p.textContent = description;
        left.appendChild(p);
        cardScrollVerti.appendChild(left);

        const right = document.createElement("div");
        right.classList.add("right", "handle");
        const i = document.createElement("i");
        i.classList.add("fa-solid", "fa-up-down");
        right.appendChild(i);
        cardScrollVerti.appendChild(right);

        document.getElementById("list_horiz").appendChild(cardScrollVerti);
}

function createUsedLocation(name, description){
        const cardScrollVerti = document.createElement("div");
        cardScrollVerti.classList.add("draggable", "card_scroll_verti");
        cardScrollVerti.setAttribute("draggable", "true");

        const left = document.createElement("div");
        left.classList.add("left");
        const h1 = document.createElement("h1");
        h1.textContent = name;
        left.appendChild(h1);
        const p = document.createElement("p");
        p.textContent = description;
        left.appendChild(p);
        cardScrollVerti.appendChild(left);

        const right = document.createElement("div");
        right.classList.add("right", "handle");
        const i = document.createElement("i");
        i.classList.add("fa-solid", "fa-up-down");
        right.appendChild(i);
        cardScrollVerti.appendChild(right);

        document.getElementById("list_verti").appendChild(cardScrollVerti);
}

function setLocModal(tabLocUsed, tabLocAvail) {
        document.getElementById("list_horiz").innerHTML = "";
        document.getElementById("list_verti").innerHTML = "";
        console.log(tabLocUsed, tabLocAvail);
        tabLocUsed.forEach(loc => {
                createUsedLocation(loc.name, loc.description);
        })
        tabLocAvail.forEach(loc => {
                createNotUsedLocation(loc.name, loc.description);
        })
}

function printAllLocInRoute(allLocName){
        console.log(allLocName);
}

export default {
        refreshAllRoutes,
        setLocModal,
        printAllLocInRoute
}