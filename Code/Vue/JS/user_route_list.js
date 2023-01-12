import SocketManager from './SocketManager/SocketUserRoute.js';

SocketManager.getAllUserRoutes();

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
        let route_desc = document.getElementById("route_desc")
        let route_duration = document.getElementById("route_duration")
        // let route_title=document.getElementById("title_txt")

        let allCards = document.getElementsByClassName("route-element")
        allCards = Array.from(allCards)

        allCards.forEach(function (element) {
                element.addEventListener("click", function (e) {
                        if (!e.target.classList.contains("expand_button")) {
                                route_title.innerText = element.getElementsByClassName("titles")[0].innerText
                                route_desc.innerText = element.getElementsByClassName("route_element_desc_text")[0].innerText
                                route_duration.value = element.getElementsByClassName("auteur")[0].innerText
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



function refreshAllUserRoutes(routes) {
        document.getElementById("scroll_list").innerHTML = "";
        routes.forEach(route => {
                createRouteListElement(route.name, route.description, route.duration, route.locations, route.author);
        })
}


function createRouteListElement(name, description, duration, locations, author) {
        const container = document.createElement("div");
        container.classList.add("route-element");

        const topContainer = document.createElement("div");
        topContainer.classList.add("route-element-top");

        const h1 = document.createElement("h1");
        h1.classList.add("titles");
        h1.textContent = name; // Récupérer de BDD

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
        h6_desc.innerText= duration;

        const p = document.createElement("p");
        p.classList.add("route_element_desc_text");
        p.textContent = description // Récupérer de BDD
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
        h6_1.textContent = locations.length + " steps"; // Récupérer de BDD

        const h6_2 = document.createElement("h6");
        h6_2.classList.add("auteur");
        h6_2.textContent = "By " + author; // Récupérer de BDD

        bottomContainer.appendChild(h6_1);
        bottomContainer.appendChild(h6_2);

        container.appendChild(topContainer);
        container.appendChild(descContainer);
        container.appendChild(bottomContainer);

        document.getElementById("scroll_list").appendChild(container);
        updateShowMoreBtn();
        allEventCards();
}

document.getElementById('sort-title').addEventListener('click', sortTitles);
document.getElementById('sort-duration').addEventListener('click', sortDuration);
document.getElementById('sort-author').addEventListener('click', sortAuthor);


function sortTitles()
{
       
        let listItems = document.getElementsByClassName("titles") //contient tous les H1 contenant les titres
        
        let sortList = [];
        listItems = Array.from(listItems);

        for (let i = 0; i < listItems.length; i++) 
        {     
                sortList[i] = listItems[i].innerText.toLowerCase();
                
        }

        sortList.sort()

        let all_cards_author = document.getElementsByClassName("route-element");
        all_cards_author = Array.from(all_cards_author);

        let parentElement= document.getElementById("scroll_list");
        let all_cards_save= document.getElementsByClassName("route-element");
        all_cards_save = Array.from(all_cards_save);
        parentElement.innerHTML = "";

        sortList.forEach(element => {
                all_cards_save.forEach(el => {
                        if(el.children[0].children[0].innerText.toLowerCase() == element)
                        {
                                parentElement.appendChild(el);
                        }
                });
        })   
}    
        

function sortDuration()
{
        let listItems = document.getElementsByClassName("duration") //contient tous les H1 contenant les titres
        
        let sortList = [];
        listItems = Array.from(listItems);

        for (let i = 0; i < listItems.length; i++) 
        {     
                let txtTime = listItems[i].innerText;
                let time = txtTime.split(":");
                let timeInMin= parseInt(time[0])*60 + parseInt(time[1]);
                sortList[i] = timeInMin;
                
        }

        sortList.sort(function(a, b){return a-b})

        let all_cards_author = document.getElementsByClassName("route-element");
        all_cards_author = Array.from(all_cards_author);

        let parentElement= document.getElementById("scroll_list");
        let all_cards_save= document.getElementsByClassName("route-element");
        all_cards_save = Array.from(all_cards_save);
        parentElement.innerHTML = "";

        sortList.forEach(element => {
                all_cards_save.forEach(el => {
                        let txtTime = el.children[1].children[0].innerText;
                        let time = txtTime.split(":");
                        let timeInMin= parseInt(time[0])*60 + parseInt(time[1]);
                        if(timeInMin == element)
                        {
                                parentElement.appendChild(el);
                        }
                });
        })   
        sortList.forEach(element => {
                all_cards_save.forEach(el => {
                        let txtTime = el.children[1].children[0].innerText;
                        let time = txtTime.split(":");
                        let timeInMin= parseInt(time[0])*60 + parseInt(time[1]);
                        if(isNaN(timeInMin))
                        {
                                parentElement.appendChild(el);
                        }
                });
        })   

}

function sortAuthor()
{
        let listItems = document.getElementsByClassName("auteur") //contient tous les H1 contenant les titres
        
        let sortList = [];
        listItems = Array.from(listItems);

        for (let i = 0; i < listItems.length; i++) 
        {     
                sortList[i] = listItems[i].innerText.toLowerCase();
                
        }

        sortList.sort()

        let all_cards_author = document.getElementsByClassName("route-element");
        all_cards_author = Array.from(all_cards_author);

        let parentElement= document.getElementById("scroll_list");
        let all_cards_save= document.getElementsByClassName("route-element");
        all_cards_save = Array.from(all_cards_save);
        parentElement.innerHTML = "";

        sortList.forEach(element => {
                all_cards_save.forEach(el => {
                        if(el.children[2].children[1].innerText.toLowerCase() == element)
                        {
                                parentElement.appendChild(el);
                        }
                });
        })
}






let play_button = document.getElementById("play_button");
play_button.addEventListener('click', (e) => {
        e.preventDefault()

        let name = play_button.parentElement.getElementsByTagName("h1")[0].innerText;
        /* ------------------ // console.log(JSON.stringify(name)); ----------------- */

        const data = {
                name:name,
        }
        fetch('/scan', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        }).then(res => {
                console.log(res);
                if (res.ok) {
                        console.log('Granted access to scan');
                        window.location.href = 'scan';
                } else {
                        console.log('Failed access to scan');
                }
        }).catch(err => {
                console.log(err);
        })

})

export default {
        refreshAllUserRoutes
}