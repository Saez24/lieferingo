
let storageBasket = JSON.parse(localStorage.getItem("storageBasket")) || [];
let i = 0;
let lotalPrice = 0;
let deliveryPricePerItem = 0.90;

function renderBasket() {
    if (storageBasket.length === 0) {
        renderEmptyBasket();
    } else {
        renderNonEmptyBasket();
    }
};

function renderEmptyBasket() {
    let ingredientContent = document.getElementById('basketproduct');
    ingredientContent.innerHTML = '<h4>Bitte füllen Sie den Warenkorb.</h4>';
    document.getElementById('priceinfoblock').style.display = 'none';
};

function renderNonEmptyBasket() {
    let ingredientContent = document.getElementById('basketproduct');
    ingredientContent.innerHTML = '';
    document.getElementById('priceinfoblock').style.display = 'flex';
    for (let i = 0; i < storageBasket.length; i++) {
        let basket = storageBasket[i];
        ingredientContent.innerHTML += loadHtml(basket, i)
    }
    loadBasket();
    updateBasketPrice();
};

function loadHtml(basket, i) {
    return `
                <div class="products"> 
                    <span><u><b>${basket['pizza']}</b></u> </span><b id="productprice_${i}">${basket['price']}</b><img onclick="deleteProduct(${i})" src="./img/logos/trash.png" alt="">
                </div>
                <div class="productsdescription"><span>${basket['size']} ø ${basket['sizeCm']} cm ${basket['preporation']} ${basket['dough']} ${basket['extras'].join(', ')}</span>
                </div>
                <div class="addproduct">
                    <svg onclick="plusQuantityBasket(${i})" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    <h4 id=quantityBasket>${basket['quantity']}</h4>
                    <svg onclick="minusQuantityBasket(${i})" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                </div>
            `;
};

function loadBasket() {
    let storageBasket = localStorage.getItem("storageBasket");
    if (storageBasket) {
        shoppingBasket = JSON.parse(storageBasket);
    }
};

function updateLocalStorage() {
    localStorage.setItem('storageBasket', JSON.stringify(storageBasket));
};

function plusQuantityBasket(i) {
    let basket = storageBasket[i];
    if (basket.quantity < 10) {
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

function deleteProduct(i) {
    storageBasket.splice(i, 1);
    localStorage.setItem('storageBasket', JSON.stringify(storageBasket));
    renderBasket();
    renderBasketMobile();
};

function calculateBasketPrice() {
    let basketPrice = 0;

    for (let i = 0; i < storageBasket.length; i++) {
        let basket = storageBasket[i];
        let productPrice = parseFloat(basket['price'].replace(',', '.'));
        let quantity = basket['quantity'];
        let totalPriceForProduct = productPrice * quantity;
        basketPrice += totalPriceForProduct;
    }
    return basketPrice;
};

function updateProductPricesInBasket() {
    for (let i = 0; i < storageBasket.length; i++) {
        let basket = storageBasket[i];
        let productPrice = parseFloat(basket['price'].replace(',', '.'));
        let quantity = basket['quantity'];
        let totalPriceForProduct = productPrice * quantity;
        let productPriceElement = document.getElementById(`productprice_${i}`);
        if (productPriceElement) {
            productPriceElement.innerHTML = `${totalPriceForProduct.toFixed(2).replace('.', ',')} €`;
        }
    }
};

function updateBasketPrices(basketPrice, deliveryPrice) {
    let totalPrice = basketPrice + deliveryPrice;

    let produktPrice = document.getElementById('basketprice');
    produktPrice.innerHTML = `${basketPrice.toFixed(2).replace('.', ',')} €`;

    let deliveryContent = document.getElementById('deliveryprice');
    deliveryContent.innerHTML = `${deliveryPrice.toFixed(2).replace('.', ',')} €`;

    let endPrice = document.getElementById('totalprice');
    if (endPrice) {
        endPrice.innerHTML = `${totalPrice.toFixed(2).replace('.', ',')} €`;
    }
};

function updateBasketPrice() {
    let basketPrice = calculateBasketPrice();
    let deliveryPrice = deliveryPricePerItem;
    let totalPrice = basketPrice + deliveryPrice;

    updateProductPricesInBasket();
    updateBasketPrices(basketPrice, deliveryPrice);

    let checkoutElement = document.getElementById('checkout');
    if (checkoutElement) {
        checkoutElement.innerHTML = `Jetzt bestellen ${totalPrice.toFixed(2).replace('.', ',')} €`;
    }
};

function loadBasketMobile() {
    let storageBasket = localStorage.getItem("shoppingbasketmobile");
    if (storageBasket) {
        storageBasket = JSON.parse(storageBasket);
    }
};

function renderBasketMobile() {
    if (storageBasket.length === 0) {
        renderEmptyBasketMobile();
    } else {
        renderNonEmptyBasketMobile();
    }
};

function renderEmptyBasketMobile() {
    let ingredientContent = document.getElementById('mobilebasketproduct');
    ingredientContent.innerHTML = '';
    let mobilebasketContent = document.getElementById('checkoutmobile');
    mobilebasketContent.innerHTML = '<h5>Bitte füllen Sie den Warenkorb.</h5>';
    document.getElementById('mobilepriceinfoblock').style.display = 'none';
};

function renderNonEmptyBasketMobile() {
    let ingredientContent = document.getElementById('mobilebasketproduct');
    ingredientContent.innerHTML = '';
    document.getElementById('mobilepriceinfoblock').style.display = 'flex';
    for (let i = 0; i < storageBasket.length; i++) {
        let basket = storageBasket[i];
        ingredientContent.innerHTML += loadHtmlMobile(basket, i)
    }
    loadBasketMobile();
    updateBasketPriceMobile();
};

function loadHtmlMobile(basket, i) {
    return `
                <div class="products"> 
                    <span><u><b>${basket['pizza']}</b></u> </span><b id="mobilebasketproductprice_${i}">${basket['price']}</b><img onclick="deleteProduct(${i})" src="./img/logos/trash.png" alt="">
                </div>
                <div class="productsdescription"><span>${basket['size']} ø ${basket['sizeCm']} cm ${basket['preporation']} ${basket['dough']} ${basket['extras'].join(', ')}</span>
                </div>
                <div class="addproduct">
                    <svg onclick="plusQuantityBasketMobile(${i})" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    <h4 id=quantityBasketMobile>${basket['quantity']}</h4>
                    <svg onclick="minusQuantityBasketMobile(${i})" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                </div>
            `;
};

function plusQuantityBasketMobile(i) {
    let basket = storageBasket[i];
    if (basket.quantity < 15) {
        basket.quantity++;
        updateLocalStorage();
        updateBasketPriceMobile();
        renderBasketMobile();
    }
};

function minusQuantityBasketMobile(i) {
    let basket = storageBasket[i];
    if (basket.quantity > 1) {
        basket.quantity--;
        updateLocalStorage();
        updateBasketPriceMobile();
    } else {
        (basket.quantity < 1)
        deleteProduct();
    }
    renderBasketMobile()
};

function calculateBasketPriceMobile() {
    let basketPrice = 0;

    for (let i = 0; i < storageBasket.length; i++) {
        let basket = storageBasket[i];
        let productPrice = parseFloat(basket['price'].replace(',', '.'));
        let quantity = basket['quantity'];
        let totalPriceForProduct = productPrice * quantity;
        basketPrice += totalPriceForProduct;
    }
    return basketPrice;
};

function updateProductPricesInBasketMobile() {
    for (let i = 0; i < storageBasket.length; i++) {
        let basket = storageBasket[i];
        let productPrice = parseFloat(basket['price'].replace(',', '.'));
        let quantity = basket['quantity'];
        let totalPriceForProduct = productPrice * quantity;
        let productPriceElement = document.getElementById(`mobilebasketproductprice_${i}`);
        if (productPriceElement) {
            productPriceElement.innerHTML = `${totalPriceForProduct.toFixed(2).replace('.', ',')} €`;
        }
    }
};

function updateBasketPricesMobile(basketPrice, deliveryPrice) {
    let totalPrice = basketPrice + deliveryPrice;

    let produktPrice = document.getElementById('mobilebasketprice');
    produktPrice.innerHTML = `${basketPrice.toFixed(2).replace('.', ',')} €`;

    let deliveryContent = document.getElementById('mobiledeliveryprice');
    deliveryContent.innerHTML = `${deliveryPrice.toFixed(2).replace('.', ',')} €`;

    let endPrice = document.getElementById('mobiletotalprice');
    if (endPrice) {
        endPrice.innerHTML = `${totalPrice.toFixed(2).replace('.', ',')} €`;
    }
};

function updateBasketPriceMobile() {
    let basketPrice = calculateBasketPriceMobile();
    let deliveryPrice = deliveryPricePerItem;
    let totalPrice = basketPrice + deliveryPrice;

    updateProductPricesInBasketMobile();
    updateBasketPricesMobile(basketPrice, deliveryPrice);

    let checkoutElement = document.getElementById('checkoutmobile');
    if (checkoutElement) {
        checkoutElement.innerHTML = `Warenkorb ${totalPrice.toFixed(2).replace('.', ',')} €`;
    }
};






