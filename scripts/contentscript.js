let pizzaData = [
    {
        'pizza': 'Pizza Margherita, Pizza Salami, Pizza Mozzarella, Pizza Proscuitto',
        'cut': 'geschnitten, ungeschnitten',
        'size': 'Klein, Groß, XXL',
        'sizecm': '25, 32, 40',
        'price': '8.90, 12.90, 17.90',
        'extras': 'Ananas, Avocado, Bacon, Broccoli, Champignons, Garnelen',
        'extrasprice': '1.50',
        'dough': '3.00',
        'selectiontext': 'Wahl aus: Pizza geschnitten, Pizza ungeschnitten, mit Dinkel-Vollkornteig (mit Olivenöl), mit Ananas, mit Avocado und Mehr'
    }
];

let quantity = 1;

function render() {
    let foodContent = document.getElementById('foodcontent');
    foodContent.innerHTML = '';
    pizzaData.forEach(food => {
        let pizzas = food['pizza'].split(', ');
        let selectionText = food['selectiontext'];
        let pizzaPrice = food['price'].split(", ")[0].trim().replace('.', ',');
        pizzas.forEach((pizza, index) => {
            foodContent.innerHTML += /*html*/`
                <div onclick="openDialog(${index})" class="foodcontent">
                    <h5><b>${pizza}</b></h5>
                    <span>${selectionText}</span>
                    <h5><b>ab ${pizzaPrice}</b></h5>
                </div>
            `;
        });
    });
};

function openDialog(index) {
    let selectedPizza = getPizzaByIndex(index);
    loadContentToDialog(selectedPizza);
    document.getElementById('dialog').classList.remove('d_none');
    document.getElementById('mobilebasketbottom').style.display = 'none';
};

function getPizzaByIndex(index) {
    let pizzaIndex = 0;
    for (let i = 0; i < pizzaData.length; i++) {
        let pizzas = pizzaData[i]['pizza'].split(', ');
        if (index < pizzaIndex + pizzas.length) {
            return {
                name: pizzas[index - pizzaIndex],
                price: pizzaData[i]['price'].split(", ")[0].trim().replace('.', ',')
            };
        }
        pizzaIndex += pizzas.length;
    }
};

function loadContentToDialog(pizza) {
    document.getElementById('pizzaname').innerText = pizza.name;
    document.getElementById('priceheader').innerText = "ab " + pizza.price + " €";
    let sizeOptionsHTML = '';
    let sizes = pizzaData[0]['size'].split(', ');
    let sizeCMs = pizzaData[0]['sizecm'].split(', ');
    let prices = pizzaData[0]['price'].split(', ');

    for (let i = 0; i < sizes.length; i++) {
        sizeOptionsHTML += `
            <option value="${i}">${sizes[i]} ø ${sizeCMs[i]} cm ${prices[i].replace('.', ',')} €</option>
        `;
    }
    document.getElementById('sizeselection').innerHTML = sizeOptionsHTML;

    let preparationOptionsHTML = '';
    let cuts = pizzaData[0]['cut'].split(', ');
    for (let i = 0; i < cuts.length; i++) {
        preparationOptionsHTML += `
            <option value="${i}">Pizza ${cuts[i]}</option>
        `;
    }
    document.getElementById('preparation').innerHTML = preparationOptionsHTML;
    generateExtrasCheckboxes();
    updatePrice();
};

function closeDialogAndSave() {
    saveSelection();
    renderBasket();
    closeDialog();
};

function closeDialog() {
    document.getElementById('dialog').classList.add('d_none');
    document.getElementById('mobilebasketbottom').style.display = 'flex';
};

function generateExtrasCheckboxes() {
    let extrasCheckBox = document.getElementById('extrasCheckBox');
    extrasCheckBox.innerHTML = '';
    let selectedPizza = pizzaData[0];
    let extrasArray = selectedPizza['extras'].split(', ');

    for (let i = 0; i < extrasArray.length; i++) {
        extrasCheckBox.innerHTML += /*html*/`
            <label ${i} class="checkbox">${extrasArray[i]}
                <input ${i} id="extrasCheck" class="extras" type="checkbox">
                <span class="checkmark"></span>
            </label>
        `;
    }
};

function updatePrice() {
    let selectedSizeIndex = document.getElementById('sizeselection').value;
    let selectedPrice = parseFloat(pizzaData[0]['price'].split(', ')[selectedSizeIndex]);

    let doughCheckbox = document.getElementById('dough');
    let doughPrice = 0;
    if (doughCheckbox.checked) {
        doughPrice = parseFloat(pizzaData[0]['dough']);
    }
    let extrasCheckboxes = document.getElementsByClassName('extras');
    let extrasPrice = 0;
    for (let i = 0; i < extrasCheckboxes.length; i++) {
        if (extrasCheckboxes[i].checked) {
            extrasPrice += parseFloat(pizzaData[0]['extrasprice']);
        }
    }

    let totalPrice = (selectedPrice + doughPrice + extrasPrice) * quantity;
    document.getElementById('selectedPrice').innerText = totalPrice.toFixed(2).replace('.', ',') + " €";
};

function plusQuantity() {
    if (quantity < 10) {
        quantity++;
        updatePrice();
        document.getElementById('quantity').textContent = quantity;
    }
};

function minusQuantity() {
    if (quantity > 1) {
        quantity--;
        updatePrice();
        document.getElementById('quantity').textContent = quantity;
    }
};

function changeQuantity(newQuantity) {
    quantity = newQuantity;
    document.getElementById('quantity').textContent = quantity;
};

function capturePizzaSelection() {
    let selectedPizza = document.getElementById('pizzaname').innerText;
    let selectedSizeIndex = document.getElementById('sizeselection').value;
    let selectedSize = pizzaData[0]['size'].split(', ')[selectedSizeIndex];
    let selectedDough = document.getElementById('dough').checked ? 'mit Dinkel-Vollkornteig (mit Olivenöl)' : '';
    let selectedPreparationIndex = document.getElementById('preparation').value;
    let selectedPreparation = pizzaData[0]['cut'].split(', ')[selectedPreparationIndex];
    let selectedSizeCmIndex = document.getElementById('sizeselection').value;
    let selectedSizeCm = pizzaData[0]['sizecm'].split(', ')[selectedSizeCmIndex];
    let selectedExtras = [];

    document.querySelectorAll('.extras').forEach(checkbox => {
        if (checkbox.checked) {
            selectedExtras.push(checkbox.parentElement.innerText.trim());
        }
    });

    return createPizzaSelectionObject(selectedPizza, selectedSize, selectedDough, selectedPreparation, selectedExtras, selectedSizeCm);
};

function createPizzaSelectionObject(pizza, size, dough, preparation, extras, sizeCm) {
    return {
        pizza: pizza,
        size: size,
        dough: dough,
        preporation: preparation,
        extras: extras,
        sizeCm: sizeCm
    };
};

function calculatePricePerItem(selectedPrice, selectedQuantity) {
    return selectedQuantity !== 0 ? selectedPrice / selectedQuantity : 0;
};

function capturePriceAndQuantity() {
    let selectedPrice = parseFloat(document.getElementById('selectedPrice').innerText.replace(',', '.'));
    let selectedQuantity = parseInt(document.getElementById('quantity').innerText);
    return { selectedPrice, selectedQuantity };
};

function formatPriceString(pricePerItem) {
    return pricePerItem.toFixed(2).replace('.', ',');
};

function saveSelectionToStorage(selection) {
    storageBasket.push(selection);
    localStorage.setItem('storageBasket', JSON.stringify(storageBasket));
    resetDialog();
};

function saveSelection() {
    let { selectedPrice, selectedQuantity } = capturePriceAndQuantity();
    let pricePerItem = calculatePricePerItem(selectedPrice, selectedQuantity);
    let pricePerItemString = formatPriceString(pricePerItem);
    let selection = {
        ...capturePizzaSelection(),
        price: pricePerItemString,
        quantity: selectedQuantity
    };
    saveSelectionToStorage(selection);
};

function resetDialog() {
    document.getElementById('dialog').classList.add('d_none');
    document.getElementById('sizeselection').selectedIndex = 0;
    document.getElementById('preparation').selectedIndex = 0;
    document.getElementById('dough').checked = false;

    document.querySelectorAll('extras').forEach(checkbox => {
        checkbox.checked = false;
    });

    quantity = 1;
    document.getElementById('quantity').textContent = '1';
};

function openDialogMobile() {
    document.getElementById('shoppingbasketmobile').classList.remove('d_none-mobile');
    document.getElementById('mobilebasketbottom').style.display = 'none';
};

function closeDialogMobile() {
    document.getElementById('shoppingbasketmobile').classList.add('d_none-mobile');
    document.getElementById('mobilebasketbottom').style.display = 'flex';
};
