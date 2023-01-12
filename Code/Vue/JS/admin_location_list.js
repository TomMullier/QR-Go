import SocketManager from './SocketManager/SocketLocation.js';

let all_desc = document.getElementsByClassName("route_element_desc_text")
let all_expand_buttons = document.getElementsByClassName("expand_button")
all_desc = Array.from(all_desc)
all_expand_buttons = Array.from(all_expand_buttons)

function updateShowMoreBtn() {
        all_expand_buttons.forEach(function (element) {
                element.addEventListener("click", function (e) {
                        console.log(e.target)
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
let route_name = document.getElementById("location_name")
let route_desc = document.getElementById("location_desc")
let route_duration = document.getElementById("location_instruction")
let route_title = document.getElementById("title_txt")

document.getElementById("new_location_button").addEventListener("click", function (e) {
        modals.show("create_location_modal");
        route_title.innerText = "Create Location"
        route_name.value = ""
        route_desc.value = ""
        route_duration.value = ""
        if (document.activeElement != document.body) document.activeElement.blur();

        document.getElementById("validate").setAttribute("existing", "false")
        document.getElementById("delete").innerHTML = "";
        document.getElementById("getQrCode").innerHTML = "";
})

document.getElementById("validate").addEventListener("click", (e) => {
        let name = route_name.value;
        let description = route_desc.value;
        let instruction = route_duration.value;

        if (name == "" || name == null) return
        if (document.getElementById("validate").getAttribute("existing") == "false") {
                SocketManager.addLocation(name.toUpperCase(), description, instruction);
        } else {
                SocketManager.modifyLocation(name.toUpperCase(), description, instruction)
        }
})


let allCards = document.getElementsByClassName("route-element")
allCards = Array.from(allCards)
console.log(allCards)

function allEventCards() {
        allCards.forEach(function (element) {
                element.addEventListener("click", function (e) {
                        if (!e.target.classList.contains("expand_button") && e.target.id != "getQrCode") {
                                route_title.innerText = "Edit Location"
                                route_name.value = element.getElementsByClassName("titles")[0].innerText
                                route_desc.value = element.getElementsByClassName("route_element_desc_text")[0].innerText
                                route_duration.value = element.getElementsByClassName("auteur")[0].innerText
                                document.getElementById("validate").setAttribute("existing", "true");
                                document.getElementById("delete").innerHTML = "Delete";
                                document.getElementById("getQrCode").innerHTML = "Get QR code";
                                modals.show("create_location_modal");
                                if (document.activeElement != document.body) document.activeElement.blur();
                        }

                });
        })
}

document.getElementById("delete").addEventListener("click", () => {
        SocketManager.deleteLocation(route_name.value.toUpperCase());
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

// get all Location by emit
function getAllLocation() {
        SocketManager.getAllLocation();
}

getAllLocation();

function refreshAllLocation(tabLocations) {
        document.getElementById("scroll_list").innerHTML = "";
        tabLocations.forEach(location => {
                createLocationListElement(location.name, location.description, location.instruction);
        })
        document.getElementById("getQrCode").addEventListener("click", () => {
                let name = route_name.value;

                // Appel fonction génération qr code/pdf
        });
        allEventCards();
}

function createLocationListElement(name, description, instruction) {
        const routeElement = document.createElement('div');
        routeElement.classList.add('route-element');
        allCards.push(routeElement);

        const topDiv = document.createElement('div');
        topDiv.classList.add('route-element-top');

        const titles = document.createElement('h1');
        titles.classList.add('titles');
        titles.textContent = name;

        topDiv.appendChild(titles);

        const topB = document.createElement('div');
        topB.classList.add('top');

        const bold = document.createElement('b');
        bold.textContent = "Click to Modify";
        topB.appendChild(bold);

        topDiv.appendChild(topB);
        routeElement.appendChild(topDiv);

        const descDiv = document.createElement('div');
        descDiv.classList.add('route-element-desc');

        const descP = document.createElement('p');
        descP.classList.add('route_element_desc_text');
        descP.textContent = description;
        all_desc.push(descP);
        descDiv.appendChild(descP);

        const a_container = document.createElement('div');
        a_container.classList.add('show_more_container');

        const qrDiv = document.createElement('div');
        qrDiv.classList.add('qr_container');
        qrDiv.id = "qr_container";
        const qr_icon = document.createElement('img');
        qr_icon.id = "getQrCode";
        qr_icon.src = "../../img/qr_code.png";
        qrDiv.appendChild(qr_icon);
        a_container.appendChild(qrDiv);

        const a = document.createElement('a');
        a.classList.add('expand_button');
        a.textContent = 'Show more';
        all_expand_buttons.push(a);
        a_container.appendChild(a);
        descDiv.appendChild(a_container);

        routeElement.appendChild(descDiv);

        const bottomDiv = document.createElement('div');
        bottomDiv.classList.add('route-element-bottom');

        const h6 = document.createElement('h6');
        h6.classList.add('auteur');
        h6.textContent = instruction;
        bottomDiv.appendChild(h6);
        routeElement.appendChild(bottomDiv);

        document.getElementById("scroll_list").appendChild(routeElement);
        updateShowMoreBtn();
}



export default {
        refreshAllLocation,
}