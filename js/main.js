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

backward.onclick = function () {
    let value = checkValue(page_num_input.value);
    if(value != false) {
        value--;
        if(value > 0) {
            wrapper[value - 1].scrollIntoView({ block: 'start',  behavior: 'smooth' });
        }
    }
}

forward.onclick = function () {
    let value = checkValue(page_num_input.value);
    if(value != false) {
        value++;
        if(value < 48) {
            wrapper[value - 1].scrollIntoView({ block: 'start',  behavior: 'smooth' });
        }
    }
}

open_menu_btn.onclick = function () {
    hidden_menu.classList.add("active");
    filter.classList.add("active");
    filter.classList.remove("close");
    filter.classList.add("show");
    document.body.onclick = function(e) {
        if(e.clientX > hidden_menu.getBoundingClientRect().width) {
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
    /*listenedElements.forEach(item => {
        // проверяем находится ли элемент в зоне видимости
        let result = isVisible(item.el);

        // если элемент находился в зоне видимости и вышел из нее
        // вызываем обработчик выпадения из зоны видимости
        if (item.el.isVisible && !result) {
            item.el.isVisible = false;
            item.outVisibleSpace(item.el);
            return;
        }
        // если элемент находился вне зоны видимости и вошел в нее
        // вызываем обработчик попадания в зону видимости
        if (!item.el.isVisible && result) {
            item.el.isVisible = true;
            item.inVisibleSpace(item.el);
            return;
        }
    });*/
}

// функция устанавливает обработчики событий 
// появления элемента в зоне видимости и
// выхода из нее
/*function onVisibleSpaceListener(elementId, cbIn, cbOut) {
    // получаем ссылку на объект элемента
    let el = document.getElementById(elementId);
    // добавляем элемент и обработчики событий 
    // в массив отслеживаемых элементов
    listenedElements.push({
        el: el,
        inVisibleSpace: cbIn,
        outVisibleSpace: cbOut
    });
}*/

// устанавливаем обработчики для элемента "video"
/*onVisibleSpaceListener("video",
    el => {
        // функция вызываемая при попадании элемента в зону видимости
        // тут вставляем код запуска анимации
        el.innerHTML = "111111111111111111111111";
        window.alert("элемент в зоне видимости");

    },
    el => {
        // функция вызываемая при выпадении элемента из зоны видимости
        // тут вставляем код остановки анимации
        el.innerHTML = "000000000000000000000000";
        window.alert("элемент вне зоны видимости");
    }
);*/

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

// глобальный объект с элементами, для которых отслеживаем их положение в зоне видимости
let listenedElements = [];
// обработчик события прокрутки экрана. Проверяет все элементы добавленные в listenedElements 
// на предмет попадания(выпадения) в зону видимости

function checkValue(value) {
    value = parseFloat(+page_num_input.value);
    if (isNaN(value) || value == "") return false;
    if (value < 1 || value > 47) return false;
    return value;
}