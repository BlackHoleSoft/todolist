console.log('Script started');

const apiHost = 'http://localhost:3000';

const btn = document.getElementById('button-add');

function save() {

    // local storage implementation
    // let html = document.getElementById('items-container').innerHTML;
    // localStorage.setItem('itemsHtml', html);   
}

function load() {

    // local storage implementation
    // let html = localStorage.getItem('itemsHtml');
    // document.getElementById('items-container').innerHTML = html;

    // let items = document.querySelectorAll('.item');
    // items.forEach(item => {
    //     let button = item.querySelector('button');
    //     button.onclick = () => removeItem(item);
    // })
}

function getTodos() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiHost}/get`);
        xhr.addEventListener('load', () => {
            let todos = [];
            let resp = xhr.responseText;
            if (resp) {
                todos = JSON.parse(resp);
            }
            console.log('LOADED:', todos);
            resolve(todos);
    
        });
        xhr.send();
    });
    
}

function addTodo(text) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiHost}/add?text=${text}`);
        xhr.addEventListener('load', () => {
            resolve(xhr.status === 200);
        });
        xhr.send();
    });    
}

function onInput() {
    console.log('input');

    let input = document.getElementById('item-text');
    let name = input.value;    

    if (name.length > 0) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function addButtonClick() {
    addItem();    
}

function removeItem(el) {
    let container = document.getElementById('items-container');
    container.removeChild(el);
}

function addTodoIntoDom(name) {
    let element = document.createElement('div');
    element.className = 'item';
    element.innerHTML = `<span>${name}</span>`;

    let removeButton = document.createElement('button');
    removeButton.innerText = 'x';
    removeButton.onclick = () => removeItem(element);
    element.appendChild(removeButton);

    let container = document.getElementById('items-container');
    container.appendChild(element);
}

function addItem() {
    let input = document.getElementById('item-text');
    let name = input.value;

    input.value = '';
    btn.disabled = true;

    addTodo(name).then((added) => {
        if (added) addTodoIntoDom(name);
    });
    
}

function init() {
    getTodos().then((todos) => {
        todos.forEach(el => {
            addTodoIntoDom(el);
        });
    });
}

btn.onclick = addButtonClick;
document.getElementById('item-text').onkeyup = onInput;

init();
