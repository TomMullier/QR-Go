let all_desc = document.getElementsByClassName("route_element_desc_text")
let all_expand_buttons = document.getElementsByClassName("expand_button")
all_desc = Array.from(all_desc)
all_expand_buttons = Array.from(all_expand_buttons)

function updateShowMoreBtn() {
        all_expand_buttons.forEach(function (element) {
                element.addEventListener("click", function (e) {
                        //console.log(e.target)
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

function allEventCards() {

        //get name, desc and duraction from modal
        let route_title = document.getElementById("title_txt")
        console.log(route_title)
        let route_desc = document.getElementById("route_desc")
        let route_duration = document.getElementById("route_duration")
        // let route_title=document.getElementById("title_txt")

        let allCards = document.getElementsByClassName("route-element")
        allCards = Array.from(allCards)
        console.log("All cards"+allCards)

        allCards.forEach(function (element) {
                element.addEventListener("click", function (e) {
                        if (!e.target.classList.contains("expand_button")) {
                                route_title.innerText = element.getElementsByClassName("titles")[0].innerText
                                route_desc.innerText = element.getElementsByClassName("route_element_desc_text")[0].innerText
                                route_duration.value = element.getElementsByClassName("duration")[0].innerText
                                //focus curor on nothin

                                modals.show("display_route_modal");
                                if (document.activeElement != document.body) document.activeElement.blur();
                        }

                });
        })
}









let button_sort = document.getElementById("sort_button")
let sort_menu = document.getElementById("sort_menu")
button_sort.addEventListener("click", function (e) {
        if (sort_menu.style.display == "flex") {
                sort_menu.style.display = "none";
                document.getElementById("scroll_list").style.height = "calc(80% - 50px)";
                return;
        } else {
                sort_menu.style.display = "flex";
                document.getElementById("scroll_list").style.height = "calc(68% - 40px)";
        }
});

let sortTitle = []
let listItems = document.getElementsByClassName("titles")
listItems = Array.from(listItems);
let sortList = document.getElementsByClassName('filtre_container');
sortList = Array.from(sortList);
sortList.forEach(function (element) {
        element.addEventListener('click', function (e) {
                console.log(element)
                if (element.Id('sort-title') == true) {
                        for (let i = 0; i < listItems.length; i++) {
                                sortTitle[i] = listItems[i].innerText;
                        }
                        sortList.sort();
                        console.log(sortList);
                } else if (element.getElementById('sort-duration') == true) {

                } else if (element.getElementById('sort-author') == true) {

                }

        });
});





document.getElementById('searchBar').addEventListener('input', filterList);

function filterList() {
        const searchBar = document.getElementById('searchBar');
        const filter = searchBar.value.toLowerCase();

        let listItems = document.getElementsByClassName("titles")
        let auteurs = document.getElementsByClassName('auteur');
        console.log(listItems);
        listItems = Array.from(listItems);
        listNames = Array.from(auteurs);
        for (let i = 0; i < listItems.length; i++) {
                let text = listItems[i].innerText;
                let text2 = listNames[i].innerText;
                if (text.toLowerCase().includes(filter)) {
                        console.log(listItems[i].innerHTML)
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

function createRouteListElement(titre) {
        const container = document.createElement("div");
        container.classList.add("route-element");

        const topContainer = document.createElement("div");
        topContainer.classList.add("route-element-top");

        const h1 = document.createElement("h1");
        h1.classList.add("titles");
        h1.textContent = titre; // Récupérer de BDD

        const top = document.createElement("div");
        top.classList.add("top");

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-circle-check");

        const h6 = document.createElement("h6");
        h6.textContent = "Finished !"; // Récupérer de BDD

        top.appendChild(icon);
        top.appendChild(h6);

        topContainer.appendChild(h1);
        topContainer.appendChild(top);

        const descContainer = document.createElement("div");
        descContainer.classList.add("route-element-desc");

        const h6_desc = document.createElement("h6");
        h6_desc.classList.add("duration");
        const icon_desc = document.createElement("i");
        icon_desc.classList.add("fa-solid", "fa-clock");
        h6_desc.appendChild(icon_desc);
        h6_desc.textContent = "00:45"; // Récupérer de BDD

        const p = document.createElement("p");
        p.classList.add("route_element_desc_text");
        p.textContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error exercitationem, hic ipsa culpa iusto aliquid corporis earum aperiam odio labore laboriosam consequuntur quis unde ipsum, quaerat non voluptas veritatis officia." // Récupérer de BDD
        all_desc.push(p);

        const showMoreContainer = document.createElement("div");
        showMoreContainer.classList.add("show_more_container");
        const expandButton = document.createElement("a");
        expandButton.classList.add("expand_button");
        expandButton.textContent = "Show more";
        all_expand_buttons.push(expandButton);
        showMoreContainer.appendChild(expandButton);

        descContainer.appendChild(h6_desc);
        descContainer.appendChild(p);
        descContainer.appendChild(showMoreContainer);

        const bottomContainer = document.createElement("div");
        bottomContainer.classList.add("route-element-bottom");

        const h6_1 = document.createElement("h6");
        h6_1.textContent = "1234567890 étapes"; // Récupérer de BDD

        const h6_2 = document.createElement("h6");
        h6_2.classList.add("auteur");
        h6_2.textContent = "Par MichelDu62"; // Récupérer de BDD

        bottomContainer.appendChild(h6_1);
        bottomContainer.appendChild(h6_2);

        container.appendChild(topContainer);
        container.appendChild(descContainer);
        container.appendChild(bottomContainer);

        document.getElementById("scroll_list").appendChild(container);
        updateShowMoreBtn();
        allEventCards();
}

createRouteListElement("Test1");
createRouteListElement("Test2");
createRouteListElement("Test3");