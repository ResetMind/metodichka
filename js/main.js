let pages = document.querySelector(".pages");
let containers = document.querySelectorAll(".container");
let wrapper = document.querySelectorAll(".wrapper");
let hat = document.querySelector(".hat");
let open_menu_btn = document.querySelector(".hat i");
let close_menu_btn = document.querySelector(".hidden_menu i");
let hidden_menu = document.querySelector(".hidden_menu");
let filter = document.querySelector(".filter");
let backward = document.querySelector(".hat i.backward");
let forward = document.querySelector(".hat i.forward");
let page_num_input = document.querySelector(".hat .page_num_input");
let test_image = document.querySelector(".test_image");
let gifs = document.querySelectorAll("img.gif");
let gifs_object = [];
for (let i = 0; i < gifs.length; i++) {
    gifs_object.push({
        gif: gifs[i],
        src: gifs[i].src,
        visible: false
    });
}

page_num_input.oninput = function () {
    let value = checkValue(page_num_input.value);
    if (value != false) {
        page_num_input.onblur = function () {
            wrapper[value - 1].scrollIntoView();
        }
    } else {
        page_num_input.onblur = function () {
            page_num_input.value = getPageNum();
        }
    }
}

document.body.onkeydown = function (e) {
    if (e.key == "Enter") {
        page_num_input.blur();
    }
}

backward.onclick = function () {
    let value = checkValue(page_num_input.value);
    if (value != false) {
        value--;
        if (value > 0) {
            wrapper[value - 1].scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }
}

forward.onclick = function () {
    let value = checkValue(page_num_input.value);
    if (value != false) {
        value++;
        if (value < 48) {
            wrapper[value - 1].scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }
}

open_menu_btn.onclick = function () {
    hidden_menu.classList.add("active");
    filter.classList.add("active");
    filter.classList.remove("close");
    filter.classList.add("show");
    document.body.onclick = function (e) {
        if (e.clientX > hidden_menu.getBoundingClientRect().width) {
            close_menu_btn.dispatchEvent(new Event("click"));
        }
    }
}

close_menu_btn.onclick = function () {
    hidden_menu.classList.remove("active");
    filter.classList.remove("show");
    filter.classList.add("close");
    setTimeout(() => filter.classList.remove("active"), 200);
    document.body.onclick = null;
}

pages.onscroll = function () {
    page_num_input.value = getPageNum();
    gifs_object.forEach(item => {
        let result = isVisible(item.gif);
        if (result != false && !item.visible) {
            console.log("showed");
            item.visible = true;
            item.gif.src = item.src;
        } else if (!result && item.visible) {
            console.log("hidden");
            item.visible = false;
            item.gif.src = "";
        }
    });
}

function getPageNum() {
    let offsets = [];
    let indexes = [];
    for (let i = 0; i < wrapper.length; i++) {
        let offset = isVisible(wrapper[i]);
        if (offset != false) {
            offsets.push(offset);
            indexes.push(i);
        }
    }
    return indexes[getMaxValue(offsets)] + 1;
}

function getMaxValue(array) {
    let index = 0;
    let max = array[0];
    for (let i = 0; i < array.length; i++) {
        if (max < array[i]) {
            max = array[i];
            index = i;
        }
    }
    return index;
}

function isVisible(element) {
    let body_height = window.innerHeight;
    let hat_rect = hat.getBoundingClientRect();
    let page_height = body_height - hat_rect.height;
    let elem_rect = element.getBoundingClientRect();
    let offset = elem_rect.top;
    let corrected_offset = offset + elem_rect.height - hat_rect.height;
    let visible_size;
    if (corrected_offset < 0) return false;
    if (offset > body_height) return false;
    if (Math.abs(offset - body_height) > elem_rect.height) {
        visible_size = corrected_offset;
    } else {
        if (elem_rect.top - hat_rect.height < 0 && offset + elem_rect.height > body_height) {
            visible_size = page_height;
        } else {
            visible_size = Math.abs(offset - body_height);
        }
    }
    return visible_size;
}

function checkValue(value) {
    value = parseFloat(+page_num_input.value);
    if (isNaN(value) || value == "") return false;
    if (value < 1 || value > 47) return false;
    return value;
}