let pizzaData = [
    {
        'pizza': 'Pizza Margherita, Pizza Salami, Pizza Mozzarella, Pizza Proscuitto',
        'price': '8.90',
        'cut': 'geschnitten, ungeschnitten',
    }
];
let pazzaVariant = [
    {
        'size': 'Klein, Groß, XXL',
        'sizecm': '25, 32, 40',
        'price': '8.90, 12.90, 17.90',
        'extras': 'Ananas, Avocado, Bacon, Broccoli, Champignons, Garnelen',
        'extrasprice': '1.50',
        'dough': '3.00'
    }
];

let shoppingBasket = [];

let i = 0;
let quantity = 1;

function openDialog(pizzaName, pizzaPrice) {

    document.getElementById('dialog').classList.remove('d_none');
    let ingredientContent = document.getElementById('ingredientselection');
    ingredientContent.innerHTML = '';
    ingredientContent.innerHTML += /*html*/`
        <button class="btn btn-outline-primary rounded-circle p-3 lh-1" id="close"
                onclick="closeDialog()">X</button>
            <div class="dialogheader" id="pizza">
                <h3>${pizzaName}</h3>
            </div>
            <section class="ingredientsbox">
                <div id="priceheader" class="priceheader">
                    <h5>ab ${pizzaPrice} €</h5>
                </div>
                 <div id="ingredientsbox" class="ingredientselection">
                    <span>Wähle deine Größe</span>
                    <div class="custom-select">
                        <select id="size">
                            <option value="0">${pazzaVariant[0]['size'].split(', ')[0]} ø ${pazzaVariant[0]['sizecm'].split(', ')[0]} cm ${pazzaVariant[0]['price'].replace('.', ',').split(', ')[0]} €</option>
                            <option value="1">${pazzaVariant[0]['size'].split(', ')[1]} ø ${pazzaVariant[0]['sizecm'].split(', ')[1]} cm ${pazzaVariant[0]['price'].replace('.', ',').split(', ')[1]} €</option>
                            <option value="2">${pazzaVariant[0]['size'].split(', ')[2]} ø ${pazzaVariant[0]['sizecm'].split(', ')[2]} cm ${pazzaVariant[0]['price'].replace('.', ',').split(', ')[2]} €</option>
                        </select>
                    </div>
                    <div>
                        <span>Dein Zubereitungswusch</span>
                        <div class="custom-select">
                            <select id="preparation">
                                <option value="0">Pizza ${pizzaData[0]['cut'].split(', ')[0]}</option>
                                <option value="1">Pizza ${pizzaData[0]['cut'].split(', ')[1]}</option>
                            </select>
                        </div>
                        <div>
                            <span><b>Ihr Teig</b></span>
                            <label  class="checkbox">mit Dinkel-Vollkornteig (mit Olivenöl) (+3,00 €)
                                <input id="dough" type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div id="extrasCheckBox" >
                        </div>
                    </div>
            </section>
            <div class="dialogfooter">
                <div class="dialogfootercontent">
                    <svg id="plus" onclick="plusQuantity()" xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    <h3 id="quantity">1</h3>
                    <svg id="minus" onclick="minusQuantity()" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>

                    <div onclick="saveSelection()" class="dialogsum">${pazzaVariant[0]['price'].replace('.', ',').split(', ')[0]} €</div>
                </div>
            </div>
    `;

    generateExtrasCheckboxes();
    document.getElementById('size').addEventListener('change', updatePrice);
    document.getElementById('dough').addEventListener('change', updatePrice);

    let extrasCheckboxes = document.querySelectorAll('.extras');
    extrasCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePrice);
    });
};

function updatePrice() {
    let sizeIndex = document.getElementById('size').value;
    let doughCheckbox = document.getElementById('dough');

    let extrasPrice = 0;

    let extrasCheckboxes = document.querySelectorAll('.extras');
    extrasCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            extrasPrice += 1.50;
        }
    });

    let doughPrice = doughCheckbox.checked ? 3.00 : 0;

    let price = parseFloat(pazzaVariant[0]['price'].split(', ')[sizeIndex]);

    let totalPrice = (price + doughPrice + extrasPrice) * quantity;

    document.querySelector('.dialogsum').textContent = totalPrice.toFixed(2).replace('.', ',') + " €";
}

function generateExtrasCheckboxes() {
    let extrasCheckBox = document.getElementById('extrasCheckBox');
    extrasCheckBox.innerHTML = '<b>Ihre Extras + 1,50 €</b>';

    let extra = pazzaVariant[0];

    let extrasArray = extra['extras'].split(', ');

    for (let i = 0; i < extrasArray.length; i++) {
        extrasCheckBox.innerHTML += /*html*/`
            <label class="checkbox">${extrasArray[i]}
                <input class="extras" type="checkbox">
                <span class="checkmark"></span>
            </label>
        `;
    }
};

function closeDialogAndSave() {
    saveSelection(); // Speichern der aktuellen Auswahl
    closeDialog(); // Dialog schließen
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d_none');
};

function render() {
    let foodContent = document.getElementById('foodcontent');
    let ingredientContent = document.getElementById('ingredientselection');
    foodContent.innerHTML = '';
    ingredientContent.innerHTML = '';


    for (let i = 0; i < pizzaData.length; i++) {
        let food = pizzaData[i];
        let pizzas = food['pizza'].split(', ');

        for (let j = 0; j < pizzas.length; j++) {
            let pizzaName = pizzas[j].trim();
            let pizzaPrice = food['price'].trim().replace('.', ',');
            foodContent.innerHTML += /*html*/`
                <div onclick="openDialog('${pizzaName}', '${pizzaPrice}')" class="foodcontent">
                <h6><b>${pizzaName}</b></h6>
                <span>Wahl aus: Pizza geschnitten, Pizza ungeschnitten, mit Dinkel-Vollkornteig (mit Olivenöl), mit
                    Ananas, mit Avocado
                    und Mehr</span>
                <h6><b>ab ${pizzaPrice} €</b></h6></div>
        `;
            ingredientContent.innerHTML += /*html*/`
            `;
        }
    }
};

function plusQuantity() {
    if (quantity < 5) {
        quantity++;
        updatePrice()
        document.getElementById('quantity').textContent = quantity;
    }
};


function minusQuantity() {
    if (quantity > 1) {
        quantity--;
        updatePrice()
        document.getElementById('quantity').textContent = quantity;
    }
};

function changeQuantity(newQuantity) {
    quantity = newQuantity;
    document.getElementById('quantity').textContent = quantity;
};

function saveSelection() {
    let selectedPizza = document.getElementById('pizza').innerText;
    let selectedSizeIndex = document.getElementById('size').selectedIndex;
    let selectedSizeText = document.getElementById('size').options[selectedSizeIndex].text;
    let selectedSize = selectedSizeText.split(" ")[0];
    let selectedCutIndex = document.getElementById('preparation').selectedIndex;
    let selectedCut = document.getElementById('preparation').options[selectedCutIndex].text;
    let selectedDough = document.getElementById('dough').checked ? 'mit Dinkel-Vollkornteig (mit Olivenöl)' : '';
    let selectedPrice = null;
    let selectedQuantity = document.getElementById('quantity').textContent;

    let selectedPriceElement = document.querySelector('.dialogsum');
    if (selectedPriceElement) {
        selectedPrice = selectedPriceElement.textContent;
    }

    let selectedExtras = [];
    let extrasCheckboxes = document.querySelectorAll('.extras:checked');
    extrasCheckboxes.forEach(checkbox => {
        let labelText = checkbox.parentNode.textContent.trim();
        selectedExtras.push(labelText.replace(/\n/g, '').trim());
    });

    let selectedExtrasString = selectedExtras.join(' ');

    let selection = {
        pizza: selectedPizza,
        size: selectedSize,
        cut: selectedCut,
        dough: selectedDough,
        extras: selectedExtras,
        sum: selectedPrice,
        quantity: selectedQuantity
    };

    shoppingBasket.push(selection);

    localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasket));

    resetDialog();
}


function resetDialog() {
    document.getElementById('dialog').classList.add('d_none');

    document.getElementById('size').selectedIndex = 0;
    document.getElementById('preparation').selectedIndex = 0;

    document.querySelectorAll('.extras').forEach(checkbox => {
        checkbox.checked = false;
    });

    quantity = 1;
    document.getElementById('quantity').textContent = '1';

    let defaultPrice = pazzaVariant[0]['price'].replace('.', ',').split(', ')[0];
    document.querySelector('.dialogsum').textContent = defaultPrice + " €";
}


