console.log('Script started');

function addButtonClick() {
    addItem();    
}

function removeItem(el) {
    let container = document.getElementById('items-container');
    container.removeChild(el);
}

function addItem() {
    let input = document.getElementById('item-text');
    let name = input.value;
    input.value = '';

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

document.getElementById('button-add').onclick = addButtonClick;