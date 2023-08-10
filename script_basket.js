/*-------------------------------------
Basket
--------------------------------------*/
function addToBasket(index) {
    ++meals[index].inBasket;
    if (meals[index].inBasket == 1)
        idxAddedToBasket.push(index);
    renderBasket();
    renderBasketMobileButton();
    renderMeal(index);
    saveAllToLocalStorage();
}


function removeFromBasket(index) {
    --meals[index].inBasket;
    if (meals[index].inBasket == 0)
        idxAddedToBasket.splice(idxAddedToBasket.indexOf(index), 1);
    renderBasket();
    renderBasketMobileButton();
    renderMeal(index);
    saveAllToLocalStorage();
}


function renderBasket() {
    if (basketIsEmpty()) {
        renderEmptyBasket();
    }
    else {
        renderBasketContent();
        renderBasketTotal();
    }
}


function basketIsEmpty() {
    if (idxAddedToBasket.length) return false;
    else return true;
}


function renderEmptyBasket() {
    document.getElementById('basket-content').innerHTML = `
        <div class="empty">
            <img src="img/shopping-bag-32.png">
            <h3>Fülle deinen Warenkorb</h3>
            <span>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
        </div>
    `;
    hideElement('basket-total');
}


function renderBasketContent() {
    const content = document.getElementById('basket-content');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    tbody.id = 'table-body';
    content.innerHTML = '';
    content.appendChild(table);
    table.appendChild(tbody);

    for (let i = 0; i < idxAddedToBasket.length; i++) {
        renderBasketItem(idxAddedToBasket[i]);
    }

    if (getOrderGap() > 0)
        content.innerHTML += renderMinOrderValue(getOrderGap());
}


function getOrderGap() {
    return MIN_ORDER_VALUE - calculateTotal();
}


function renderBasketItem(index) {
    const tbody = document.getElementById('table-body');
    const basketItem = createElementWithIdAndClass('tr', elemClass = 'basket-item');
    const basketCount = createElementWithIdAndClass('td', `count-in-basket-${index}`, 'count-in-basket');
    const basketMeal = createElementWithIdAndClass('td', `meal-in-basket-${index}`, 'meal-in-basket');
    tbody.appendChild(basketItem);
    basketItem.appendChild(basketCount);
    basketItem.appendChild(basketMeal);

    renderBasketCount(index);
    renderBasketMeal(index);
}


function renderBasketCount(index) {
    document.getElementById(`count-in-basket-${index}`).innerHTML = `<b>${meals[index].inBasket}</b>`;
}


function renderBasketMeal(index) {
    const basketMeal = document.getElementById(`meal-in-basket-${index}`);

    basketMeal.innerHTML = renderNameAndPrice(index);
    if (meals[index].toChoose.length)
        basketMeal.innerHTML += renderMadeChoices(index);
    basketMeal.innerHTML += renderNoteLessMore(index);

    setOnclickForPlusMinus(index);

}


function renderNameAndPrice(index) {
    return `
        <div class="name-and-price">
            <span><b>${meals[index].name}</b></span>
            <span>${getPriceAsString(meals[index].price * meals[index].inBasket)} €</span>
        </div>
    `;
}


function renderMadeChoices(index) {
    return `
        <div class="made-choices">${meals[index].toChoose[0]}</div>
    `;
}


function renderNoteLessMore(index) {
    return `
        <div class="note-less-more">
            <a href="#">Anmerkung hinzufügen</a>
            <div class="less-more">
                ${renderMinusIconSVG(`minus-svg-basket-${index}`)}
                ${renderPlusIconSVG(`plus-svg-basket-${index}`)}                         
            </div>
        </div>
    `;
}


function setOnclickForPlusMinus(index) {
    const plusIcon = document.getElementById(`plus-svg-basket-${index}`);
    const minusIcon = document.getElementById(`minus-svg-basket-${index}`);

    plusIcon.onclick = function () { addToBasket(index); };
    minusIcon.onclick = function () { removeFromBasket(index); };
}


function renderMinOrderValue(orderGap) {
    return `
            <div class="min-order-value">
                <span>Benötigter Betrag, um den Mindestbestellwert zu erreichen</span>
                <span>${getPriceAsString(orderGap)} €</span>
            </div>
            <div class="min-order-info">
                Leider kannst du noch nicht bestellen. Pizza Pappa liefert erst ab einem Mindestbestellwert von ${getPriceAsString(MIN_ORDER_VALUE)} € (exkl. Lieferkosten).
            </div>
        `;
}


function renderBasketTotal() {
    const total = getPriceAsString(calculateTotal());
    document.getElementById('subtotal').innerHTML = `${total} €`;
    document.getElementById('total').innerHTML = `<b>${total} €</b>`;

    setOrderButton();
    showElement('basket-total');
}


function calculateTotal() {
    let total = 0;
    for (let i = 0; i < meals.length; i++) {
        total += meals[i].inBasket * meals[i].price;
    }
    return total;
}


function setOrderButton() {
    const total = getPriceAsString(calculateTotal());
    document.getElementById('order-btn').innerHTML = `Bezahlen (${total} €)`;

    if (MIN_ORDER_VALUE - calculateTotal() > 0) {
        deactivateOrderButton();
        if (window.innerWidth <= 1024) {
            document.getElementById('order-btn').innerHTML = 'Weitere Produkte hinzufügen';
        }
    }
    else
        activateOrderButton();
}

window.addEventListener("resize", setOrderButton);


function activateOrderButton() {
    const button = document.getElementById('order-btn');
    if (button.classList.contains('gray-btn'))
        button.classList.remove('gray-btn');
}


function deactivateOrderButton() {
    const button = document.getElementById('order-btn');
    if (!button.classList.contains('gray-btn'))
        button.classList.add('gray-btn');
}


/*-------------------------------------
Basket Mobile
--------------------------------------*/
function openBasket() {
    pullElementToFront('basket');
    removeElement('main-content');
    mobileBasketIsActive = true;
}


function closeBasket() {
    pushElementToBack('basket');
    showElement('main-content');
    mobileBasketIsActive = false;
}


function continueShopping() {
    if (MIN_ORDER_VALUE - calculateTotal() > 0 && window.innerWidth <= 1024)
        closeBasket();
}


function renderBasketMobileButton() {
    if (basketIsEmpty()) {
        removeElement('basket-mobile-button');
    }
    else {
        showElement('basket-mobile-button');
        document.getElementById('item-count').innerHTML = `${countBasketItems()}`;
    }
}


function countBasketItems() {
    let count = 0;
    for (let i = 0; i < idxAddedToBasket.length; i++) {
        index = idxAddedToBasket[i];
        count += meals[index].inBasket;
    }
    return count;
}


// function pullBasketToFront() {
//     if (window.innerWidth > 1024) {
//         pullElementToFront('basket');
//     }
// }


// function pushBasketToBack() {
//     if (window.innerWidth <= 1024) {
//         pushElementToBack('basket');
//     }
// }


window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
        showElement('main-content');
        pullElementToFront('basket');
    }
    else {
        if (!mobileBasketIsActive)
            closeBasket();
    }
});
