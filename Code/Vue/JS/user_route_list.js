let all_desc = document.getElementsByClassName("route_element_desc_text")
let all_expand_buttons = document.getElementsByClassName("expand_button")
all_desc=Array.from(all_desc)
all_expand_buttons=Array.from(all_expand_buttons)

all_expand_buttons.forEach(function (element) {
        element.addEventListener("click", function (e) {
                console.log(e.target)
                all_desc.forEach(function (el){
                        el.style.overflow="hidden"
                        el.style.lineClamp=3;
                        el.style.display="-webkit-box";

                })
                let desc = e.target.parentElement.parentElement.getElementsByClassName("route_element_desc_text")[0]
                desc.style.overflow="visible";
                desc.style.lineClamp=999999;
                desc.style.display="flex";
        });
})


let button_sort=document.getElementById("sort_button")
let sort_menu=document.getElementById("sort_menu")
button_sort.addEventListener("click", function (e) {
        if (sort_menu.style.display=="flex") {
                sort_menu.style.display="none";
                return;
        } else {
                sort_menu.style.display="flex";
                document.getElementById("scroll_list").style.height="calc(84vh - 40px)";
        }
});



document.getElementById('searchBar').addEventListener('input', filterList);

function filterList() {
        const searchBar = document.getElementById('searchBar');
        const filter = searchBar.value.toLowerCase();


        console.log(filter);

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