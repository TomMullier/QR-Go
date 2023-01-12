import SocketManager from './SocketManager/SocketRoute.js';


SocketManager.getAllRoutes();

let all_desc = document.getElementsByClassName("route_element_desc_text")
let all_expand_buttons = document.getElementsByClassName("expand_button")
all_desc = Array.from(all_desc)
all_expand_buttons = Array.from(all_expand_buttons)

document.addEventListener("click", function(e){
        console.log(e.target)
})

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
})

let allCards = document.getElementsByClassName("route-element")
allCards = Array.from(allCards)
console.log(allCards)


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

                }

        });
})


const dragArea = document.querySelector("#list");
new Sortable(dragArea, {
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
        listNames = Array.from(auteurs);
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
        let locationsHTML = document.querySelectorAll(".card_scroll_verti h1");
        let locations = []
        locationsHTML.forEach(locationHTML => {
                locations.push(locationHTML.innerText);
        })


        if (document.getElementById("validate").getAttribute("existing") == "false") {
                SocketManager.addRoute(name.toUpperCase(), description, duration, locations);
        } else {
                SocketManager.modifyRoute(name.toUpperCase(), description, duration, locations);
        }
})


function showAllRoutes(tabRoutes) {
        document.getElementById("scroll_list").innerHTML = "";
        tabRoutes.forEach(route => {
                createRouteListElement(route.name, route.description, route.duration, route.locations, route.author);
        })
        // allEventCards();
}

function createRouteListElement(name, description, duration, locations, author) {
        // create html card
}

export default {
        showAllRoutes
}