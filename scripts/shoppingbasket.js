function renderBasket(shoppingBasket) {
    let ingredientContent = document.getElementById('basketproduct');
    ingredientContent.innerHTML = '';
    ingredientContent.innerHTML += /*html*/`
        <div id class="products">
            <span>${shoppingBasket['quantity']}</span>
            <span><u><b>${shoppingBasket['pizza']}</b></u></span><span>15 €</span>
        </div>
        <div class="productsdescription"><span>25, gesg</span>
        </div>
        <div class="addproduct">
            <span><u>Anmerkung<br>hinzufügen</u></span>
            <svg onclick="plusQuantityBasket()" id="plusbasket" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            <h3 id="quantitybasket">1</h3>
            <svg onclick="minusQuantityBasket()" id="minusbasket" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>
        </div>
    `;
}

function loadShoppingBasket() {
    let shoppingBasket = localStorage.getItem('shoppingBasket');
    if (shoppingBasket) {
        let parsedBasket = JSON.parse(shoppingBasket);
        renderBasket(parsedBasket); // Hier wird das geparste Objekt direkt an renderBasket übergeben
    }
}


function plusQuantityBasket() {
    if (quantity < 5) {
        quantity++;

        document.getElementById('quantitybasket').textContent = quantity;
    }
};


function minusQuantityBasket() {
    if (quantity > 1) {
        quantity--;

        document.getElementById('quantitybasket').textContent = quantity;
    }
};

function changeQuantityBasket(newQuantity) {
    quantity = newQuantity;
    document.getElementById('quantitybasket').textContent = quantity;
};





