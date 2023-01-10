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