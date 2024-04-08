
let storageBasket = JSON.parse(localStorage.getItem("shoppingBasket")) || [];
let i = 0;
let lotalPrice = 0;
let deliveryPricePerItem = 0.90;

function renderBasket() {
    let ingredientContent = document.getElementById('basketproduct');
    ingredientContent.innerHTML = '';

    for (let i = 0; i < storageBasket.length; i++) {
        let basket = storageBasket[i];

        ingredientContent.innerHTML += /*html*/`
            <div class="products"> 
                <span><u><b>${basket['pizza']}</b></u> </span><b id="productprice_${i}">${basket['price']}</b>
            </div>
            <div class="productsdescription"><span>${basket['size']} ø ${basket['sizeCm']} cm ${basket['preporation']} ${basket['dough']} ${basket['extras'].join(', ')}</span>
            </div>
            <div class="addproduct">
                <svg onclick="plusQuantityBasket(${i})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
                <h4 id=quantityBasket>${basket['quantity']}</h4>
                <svg onclick="minusQuantityBasket(${i})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                </svg>
            </div>
        `;
    }
    loadBasket();
    updateBasketPrice();
};

function loadBasket() {
    let storageBasket = localStorage.getItem("shoppingbasket");
    if (storageBasket) {
        shoppingBasket = JSON.parse(storageBasket);
    }
};

function updateLocalStorage() {
    localStorage.setItem('shoppingBasket', JSON.stringify(storageBasket));
};

function plusQuantityBasket(i) {
    let basket = storageBasket[i];
    if (basket.quantity < 5) {
        basket.quantity++;
        updateLocalStorage();
        updateBasketPrice();
        renderBasket();
    }
};

function minusQuantityBasket(i) {
    let basket = storageBasket[i];
    if (basket.quantity > 1) {
        basket.quantity--;
        updateLocalStorage();
        updateBasketPrice();
    } else {
        (basket.quantity < 1)
        deleteProduct();
    }
    renderBasket();
};

function deleteProduct(index) {
    storageBasket.splice(index, 1);
    localStorage.setItem('shoppingBasket', JSON.stringify(storageBasket));
    renderBasket();
};

function updateBasketPrice() {
    let basketPrice = 0;

    for (let i = 0; i < storageBasket.length; i++) {
        let basket = storageBasket[i];
        let productPrice = parseFloat(basket['price'].replace(',', '.'));
        let quantity = basket['quantity'];
        let totalPriceForProduct = productPrice * quantity;
        let productPriceElement = document.getElementById(`productprice_${i}`);
        if (productPriceElement) {
            productPriceElement.innerHTML = `${totalPriceForProduct.toFixed(2).replace('.', ',')} €`;
        }
        basketPrice += totalPriceForProduct;
    }
    let deliveryPrice = deliveryPricePerItem;
    let totalPrice = basketPrice + deliveryPrice;
    let produktPrice = document.getElementById('basketprice');
    produktPrice.innerHTML = `${basketPrice.toFixed(2).replace('.', ',')} €`;

    let deliveryContent = document.getElementById('deliveryprice');
    deliveryContent.innerHTML = `${deliveryPrice.toFixed(2).replace('.', ',')} €`;

    let endPrice = document.getElementById('totalprice');
    if (endPrice) {
        endPrice.innerHTML = `${totalPrice.toFixed(2).replace('.', ',')} €`;
    }

    let checkoutElement = document.getElementById('checkout');
    if (checkoutElement) {
        checkoutElement.innerHTML = `${totalPrice.toFixed(2).replace('.', ',')} €`;
    }
};





