const cartBtn = document.querySelector('.cart-btn')
const navBtn = document.querySelector('.nav-icon')
const navSec = document.querySelector('.navsection-main')
const nav1 = document.querySelector('.nav1')
const nav2 = document.querySelector('.nav2')
const nav3 = document.querySelector('.nav3')
const jump1 = document.querySelector('.headgear')
const jump2 = document.querySelector('.hoodies')
const jump3 = document.querySelector('.tees')
const bannerBtn = document.querySelector('.banner-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const purchaseBtn = document.querySelector('.purchase')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const productsDOM1 = document.querySelector('.products-center1')
const productsDOM2 = document.querySelector('.products-center2')
const productsDOM3 = document.querySelector('.products-center3')
// for checkout
const hiddenTotalCard = document.querySelector('.hidden-total-card')
const hiddenCartCard = document.querySelector('.hidden-cart-card')
const hiddenTotalPaypal = document.querySelector('.hidden-total-paypal')
const hiddenCartPaypal = document.querySelector('.hidden-cart-paypal')
const checkoutDOM = document.querySelector('.checkout')
const checkoutBtn = document.querySelector('.checkout-btn')
const closeCheckoutBtn = document.querySelector('.close-checkout')

const shippingCostCardDOM = document.querySelector('.shipping-card')
const taxCardDOM = document.querySelector('.tax-card')
const totalCardDOM = document.querySelector('.total-card')
const shippingCostPaypalDOM = document.querySelector('.shipping-paypal')
const taxPaypalDOM = document.querySelector('.tax-paypal')
const totalPaypalDOM = document.querySelector('.total-paypal')
// for checkout form
// const fname = document.getElementsByClassName(".buyer-fname")
// const lname = document.getElementsByClassName(".buyer-lname")
// const shippingAddress = document.getElementsByClassName(".buyer-shippingAddress")
// const city = document.getElementsByClassName(".buyer-city")
// const state = document.getElementsByClassName(".buyer-state")
// const zip = document.getElementsByClassName(".buyer-zip")
const checkoutCardBox1 = document.querySelector(".checkout-card-box1")
const checkoutCardBox2 = document.querySelector(".checkout-card-box2")
const checkoutPaypalBox1 = document.querySelector(".checkout-paypal-box1")
const checkoutPaypalBox2 = document.querySelector(".checkout-paypal-box2")

const checkoutCardBox3 = document.querySelector(".checkout-card-box3")
const checkoutPaypalBox3 = document.querySelector(".checkout-paypal-box3")
const checkoutCardPromoText = document.querySelector(".promocode-card-text")
const checkoutPaypalPromoText = document.querySelector(".promocode-paypal-text")
const checkoutCardPromoBtn = document.querySelector(".promocode-card-btn")
const checkoutPaypalPromoBtn = document.querySelector(".promocode-paypal-btn")

const statusDivCard = document.querySelector('.status-div-card')
const statusDivPaypal = document.querySelector('.status-div-paypal')
const checkoutCardDOM = document.querySelector('.checkout-content-card')
const checkoutPaypalDOM = document.querySelector('.checkout-content-paypal')
const checkoutCardBtn = document.querySelector('.ul-payment-card')
const checkoutPaypalBtn = document.querySelector('.ul-payment-paypal')

const emailBtn = document.querySelector(".email")


let cart = []
let buttonsDOM = []
let sizeBtnsDOM = []



// getting the products from the files
class Products {
    async getProducts() {
        try {
            let result1 = await fetch("/static/scripts/products1.json")
            let data1 = await result1.json()
            let result2 = await fetch("/static/scripts/products2.json")
            let data2 = await result2.json()
            let result3 = await fetch("/static/scripts/products3.json")
            let data3 = await result3.json()

            // use the spread operator to combine them into one array
            let products = [...data1.items, ...data2.items, ...data3.items]

            // destructuring the products, that is, pull out the fields you are interested in
            products = products.map(item => {
                const { title, description, price, size } = item.fields
                const { id } = item.sys
                const image = item.fields.image.fields.file.url
                return { title, description, price, size, id, image }
            })
            
            return products
        } catch(error) {
            console.log(error)
        }
    }
}
// display things
class UI {
    displayProducts(products, type) {
        let result1 = ''
        let result2 = ''
        let result3 = ''

        let hoodyCnt = 0
        let teesCnt = 0
        products.forEach(product => {
            // [0 - 999] headgear
            // [1000 - 1999] hoodies
            // [2000 - inf] tees and golf

            if(product.id < 1000) {
                result1 += `
                <!-- single product -->
                <article class="product">
                    <div class="img-container">
                        <img 
                            src=${product.image}
                            alt="product"
                            class="product-img"
                        />
                        <button class="bag-btn" data-id="${product.id}">
                            add to cart
                        </button>
                    </div>
                    <h3>${product.title}</h3>
                    <h4>${product.description}</h4>
                    <h3>${product.price}</h4>
                </article>
                <!-- /single product -->
                `
            }
            else if(product.id >= 1000 && product.id < 2000) {
                if(hoodyCnt == 0) {
                    result2 += `
                    <!-- single product -->
                    <article class="product">
                        <div class="img-container">
                            <img 
                                src=${product.image}
                                alt="product"
                                class="product-img"
                            />
                            <button class="bag-btn" data-id="${product.id}" style="top: 15%; width: 8em">
                                SMALL
                            </button>
                    `
                } else if(hoodyCnt == 1) {
                        result2 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 35%; width: 8em">
                                MEDIUM
                            </button>
                    `
                } else if(hoodyCnt == 2) {
                        result2 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 55%; width: 8em">
                                LARGE
                            </button>
                    `
                } else if(hoodyCnt == 3) {
                        result2 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 75%; width: 8em">
                                XLARGE
                            </button>
                        </div>
                        <h3>${product.title} (S-XL)</h3>
                        <h4>${product.description}</h4>
                        <h3>${product.price}</h4>
                    </article>
                    <!-- /single product -->
                    `
                }
                 else {
                    result2 += `
                    <!-- single product -->
                    <article class="product">
                        <div class="img-container">
                            <img 
                                src=${product.image}
                                alt="product"
                                class="product-img"
                            />
                            <button class="bag-btn" data-id="${product.id}">
                                add to cart
                            </button>
                        </div>
                        <h3>${product.title} (${product.size})</h3>
                        <h4>${product.description}</h4>
                        <h3>${product.price}</h4>
                    </article>
                    <!-- /single product -->
                    `
                }
                if(hoodyCnt == 5){
                    hoodyCnt = 0
                } else {
                    hoodyCnt = hoodyCnt + 1
                }
            }
            else if(product.id >= 2000){
                if(teesCnt == 0) {
                    result3 += `
                    <!-- single product -->
                    <article class="product">
                        <div class="img-container">
                            <img 
                                src=${product.image}
                                alt="product"
                                class="product-img"
                            />
                            <button class="bag-btn" data-id="${product.id}" style="top: 15%; width: 8em">
                                SMALL
                            </button>
                    `
                } else if(teesCnt == 1) {
                        result3 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 35%; width: 8em">
                                MEDIUM
                            </button>
                    `
                } else if(teesCnt == 2) {
                        result3 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 55%; width: 8em">
                                LARGE
                            </button>
                    `
                } else if(teesCnt == 3) {
                        result3 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 75%; width: 8em">
                                XLARGE
                            </button>
                        </div>
                        <h3>${product.title} (S-XL)</h3>
                        <h4>${product.description}</h4>
                        <h3>${product.price}</h4>
                    </article>
                    <!-- /single product -->
                    `
                }
                 else {
                    result3 += `
                    <!-- single product -->
                    <article class="product">
                        <div class="img-container">
                            <img 
                                src=${product.image}
                                alt="product"
                                class="product-img"
                            />
                            <button class="bag-btn" data-id="${product.id}">
                                add to cart
                            </button>
                        </div>
                        <h3>${product.title} (${product.size})</h3>
                        <h4>${product.description}</h4>
                        <h3>${product.price}</h4>
                    </article>
                    <!-- /single product -->
                    `
                }
                if(teesCnt == 5){
                    teesCnt = 0
                } else {
                    teesCnt = teesCnt + 1
                }
            }
        })

        // ... you only change where they are rendered
        productsDOM1.innerHTML = result1
        productsDOM2.innerHTML = result2
        productsDOM3.innerHTML = result3
        
    }


    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')]

        // save the buttons to a structure outside of the scope of this method
        buttonsDOM = buttons
        buttons.forEach(button => {
            let id = button.dataset.id
            let inCart = cart.find(item => item.id === id)
            if(inCart) {
                button.innerText = "In Cart"
                button.disabled = true
            }
            // defines what will happen when it is in the cart
            // set eventlisteners for the unsized items (headwear)
            button.addEventListener('click', event => {
                const amountBeforeAdd = Storage.getLength()
                event.target.innerText = "In Cart"
                event.target.disabled = true
    
                // get product from local storage and use the spread operator to add a quatity field
                let cartItem = {...Storage.getProduct(id), amount: 1}
                // add to the cart
                cart = [...cart, cartItem]
                // save cart in local storage
                Storage.saveCart(cart)
                // set cart values
                this.setCartValues(cart, false)
                // display cart item
                this.addCartItem(cartItem)
                // wait until you load the next products to show the cart
                // this.showCart()

                // you only have to enable the checkout if it was 0 before adding this item ...
                // ... otherwise you are doing unnecessary computation
                if(amountBeforeAdd == 0) {
                    this.enableCheckout()
                }

                // update the hidden cart
                hiddenCart.value = JSON.stringify(cart)
            })
        })
    }

    setCartValues(cart) {
        let tempTotal = 0
        let itemsTotal = 0

        cart.map(item => {
            tempTotal += item.price * item.amount
            itemsTotal += item.amount
        })
        cartTotal.innerText = parseFloat(tempTotal).toFixed(2)

        // add shipping + tax
        if(parseFloat(tempTotal).toFixed(2) < 45.00) {

            // actual amount in pennies
            let hiddenTotalTemp = Math.round((parseFloat(tempTotal + 8.99).toFixed(2)) * 100)
            let tax = Math.round(.0475 * hiddenTotalTemp)
            
            hiddenTotalCard.value = hiddenTotalTemp + tax
            hiddenTotalPaypal.value = hiddenTotalTemp + tax

            
            
            // display amount in dollars
            let displayTotalTemp = parseFloat(tempTotal + 8.99).toFixed(2)
            let displayTax = parseFloat(.0475 * displayTotalTemp).toFixed(2)
            
            // for card
            shippingCostCardDOM.innerText = "8.99"
            taxCardDOM.innerText = parseFloat(displayTax).toFixed(2)
            let displayTotal = parseFloat(displayTotalTemp) + parseFloat(displayTax)
            totalCardDOM.innerText = displayTotal.toFixed(2)

            // for paypal
            shippingCostPaypalDOM.innerText = "8.99"
            taxPaypalDOM.innerText = parseFloat(displayTax).toFixed(2)
            displayTotal = parseFloat(displayTotalTemp) + parseFloat(displayTax)
            totalPaypalDOM.innerText = displayTotal.toFixed(2)
        }
        else if(parseFloat(tempTotal).toFixed(2) >= 45.00){

            // actual amount in pennies
            let hiddenTotalTemp = Math.round((parseFloat(tempTotal).toFixed(2)) * 100)
            let tax = Math.round(.0475 * hiddenTotalTemp)

            hiddenTotalCard.value = hiddenTotalTemp + tax
            hiddenTotalPaypal.value = hiddenTotalTemp + tax

            
            
            // display amount in dollars
            let displayTotalTemp = parseFloat(tempTotal).toFixed(2)
            let displayTax = parseFloat(.0475 * displayTotalTemp).toFixed(2)
            
            // card
            shippingCostCardDOM.innerText = "0.00"
            taxCardDOM.innerText = parseFloat(displayTax).toFixed(2)
            let displayTotal = parseFloat(displayTotalTemp) + parseFloat(displayTax)
            totalCardDOM.innerText = displayTotal.toFixed(2)

            // paypal
            shippingCostPaypalDOM.innerText = "0.00"
            taxPaypalDOM.innerText = parseFloat(displayTax).toFixed(2)
            displayTotal = parseFloat(displayTotalTemp) + parseFloat(displayTax)
            totalPaypalDOM.innerText = displayTotal.toFixed(2)
        }
        
        cartItems.innerText = itemsTotal
    }

    addCartItem(item) {
        const div = document.createElement('div')
        div.classList.add('cart-item')
        div.innerHTML = `
            <img src="${item.image}" alt="product">
            <div>
                <h4>${item.title} ${item.size}</h4>
                <h4>${item.description}</h4>
                <h5>$${item.price}</h5>
                <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">${item.amount}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
        `
        cartContent.appendChild(div)
    }

    showCart() {
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }

    showCheckout() {
        checkoutDOM.classList.add('showCheckout')
    }

    hideCart() {
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }

    hideCheckout() {
        checkoutDOM.classList.remove('showCheckout')
    }

    setupAPP() {
        // for the cart
        cart = Storage.getCart()
        this.setCartValues(cart)
        this.populateCart(cart)
        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart)

        // for the checkout
        if(Storage.getLength() > 0) {
            this.enableCheckout()
        } else {
            this.disableCheckout()
        }

        // set the hidden cart
        hiddenCartCard.value = JSON.stringify(cart)
        hiddenCartPaypal.value = JSON.stringify(cart)
    }

    enableCheckout() {
        checkoutBtn.addEventListener('click', this.showCheckout)
        closeCheckoutBtn.addEventListener('click', this.hideCheckout)
    }

    disableCheckout() {
        checkoutBtn.removeEventListener('click', this.showCheckout)
        closeCheckoutBtn.removeEventListener('click', this.hideCheckout)
    }

    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item))
    }

    cartLogic() {
        // clear the entire cart
        clearCartBtn.addEventListener('click', () => {
            this.clearCart()
        })

        // increase amount of or remove a selected item from the cart
        cartContent.addEventListener('click', event => {
            if(event.target.classList.contains('remove-item')){
                let removeItem = event.target
                let id = removeItem.dataset.id
                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeItem(id)
            }
            else if(event.target.classList.contains('fa-chevron-up')) {
                let addAmount = event.target
                let id = addAmount.dataset.id
                let tempItem = cart.find(item => item.id === id)
                tempItem.amount = tempItem.amount + 1
                
                Storage.saveCart(cart)
                this.setCartValues(cart)
                addAmount.nextElementSibling.innerText = tempItem.amount

                // update the hidden cart
                hiddenCartCard.value = JSON.stringify(cart)
                hiddenCartPaypal.value = JSON.stringify(cart)
            }
            else if(event.target.classList.contains('fa-chevron-down')) {
                let lowerAmount = event.target
                let id = lowerAmount.dataset.id
                let tempItem = cart.find(item => item.id === id)
                tempItem.amount = tempItem.amount - 1
                if(tempItem.amount > 0){
                    Storage.saveCart(cart)
                    this.setCartValues(cart)
                    lowerAmount.previousElementSibling.innerText = tempItem.amount
                }
                else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement)
                    this.removeItem(id)
                }

                Storage.saveCart(cart)
                this.setCartValues(cart)
                addAmount.nextElementSibling.innerText = tempItem.amount

                // update the hidden cart
                hiddenCartCard.value = JSON.stringify(cart)
                hiddenCartPaypal.value = JSON.stringify(cart)
            }
        })
    }

    clearCart() {
        let cartItems = cart.map(item => item.id)
        cartItems.forEach(id => this.removeItem(id))
        while(cartContent.children.length > 0){
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart()
        this.disableCheckout()
    }

    removeItem(id) {
        cart = cart.filter(item => item.id !== id )
        this.setCartValues(cart)
        Storage.saveCart(cart)
        let button = this.getSingleButton(id, 1)
        button.disabled = false

        // set the text depending on what the id is for the size
        let product = Storage.getProduct(id)
        if(product.size == "Small") {
            button.innerHTML = `SMALL`
        } else if(product.size == "Medium") {
            button.innerHTML = `MEDIUM`
        } else if(product.size == "Large") {
            button.innerHTML = `LARGE`
        } else if(product.size == "XL") {
            button.innerHTML = `XLARGE`
        } else {
            button.innerHTML = `add to cart`
        }

        // update the checkout button
        if(Storage.getLength() == 0) {
            this.disableCheckout()
        }

        // update the hidden cart
        hiddenCartCard.value = JSON.stringify(cart)
        hiddenCartPaypal.value = JSON.stringify(cart)
    }
    
    getSingleButton(id, btn) {
        return buttonsDOM.find(button => button.dataset.id === id)
    }
}

// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"))
        return products.find(product => product.id === id)
    }

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
    static getLength() {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        return cart.length
    }
}

// other functions
/*
function updateCheckoutCard() {
    // card
    if(checkoutCardBox2.checked){
        statusDivCard.style.pointerEvents = "all"
        statusDivCard.style.opacity = "1"
    } else {
        statusDivCard.style.pointerEvents = "none"
        statusDivCard.style.opacity = "0.5"
    }
}
*/
///*
function updateCheckoutPaypal() {
    // paypal
    if(checkoutPaypalBox2.checked){
        statusDivPaypal.style.pointerEvents = "all"
        statusDivPaypal.style.opacity = "1"
    } else {
        statusDivPaypal.style.pointerEvents = "none"
        statusDivPaypal.style.opacity = "0.5"
    }
}
//*/

// promotional code
function showHideCardPromoText(){
    if(checkoutCardBox3.checked) {
        checkoutCardPromoText.style.display = "unset"
        checkoutCardPromoBtn.style.display = "unset"
    } else {
        checkoutCardPromoText.style.display = "none"
        checkoutCardPromoBtn.style.display = "none"
    }

    if(checkoutPaypalBox3.checked) {
        checkoutPaypalPromoText.style.display = "unset"
        checkoutPaypalPromoBtn.style.display = "unset"
    } else {
        checkoutPaypalPromoText.style.display = "none"
        checkoutPaypalPromoBtn.style.display = "none"
    }  
}
function applyPromo(){
    cart = Storage.getCart()

    let tempTotal = 0
    let itemsTotal = 0

    cart.map(item => {
        tempTotal += item.price * item.amount
        itemsTotal += item.amount
    })
    cartTotal.innerText = parseFloat(tempTotal).toFixed(2)



    let codeCard = checkoutCardPromoText.value
    let codePaypal = checkoutPaypalPromoText.value
    if(codeCard === "FREESHIP" || codePaypal === "FREESHIP"){

        // actual amount in pennies
        let hiddenTotalTemp = Math.round((parseFloat(tempTotal).toFixed(2)) * 100)
        let tax = Math.round(.0475 * hiddenTotalTemp)

        hiddenTotalCard.value = hiddenTotalTemp + tax
        hiddenTotalPaypal.value = hiddenTotalTemp + tax

        
        
        // display amount in dollars
        let displayTotalTemp = parseFloat(tempTotal).toFixed(2)
        let displayTax = parseFloat(.0475 * displayTotalTemp).toFixed(2)
        
        // card
        shippingCostCardDOM.innerText = "0.00"
        taxCardDOM.innerText = parseFloat(displayTax).toFixed(2)
        let displayTotal = parseFloat(displayTotalTemp) + parseFloat(displayTax)
        totalCardDOM.innerText = displayTotal.toFixed(2)

        // paypal
        shippingCostPaypalDOM.innerText = "0.00"
        taxPaypalDOM.innerText = parseFloat(displayTax).toFixed(2)
        displayTotal = parseFloat(displayTotalTemp) + parseFloat(displayTax)
        totalPaypalDOM.innerText = displayTotal.toFixed(2)
        
        cartItems.innerText = itemsTotal

        alert("Promotional Code Applied!\nRemember to reapply if you add or remove items!")
    } else {
        alert("Incorrect Promotional Code")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // instantiate the classes
    const ui = new UI()
    const products = new Products()

    // setup application by ...
    // getting the cart from the localsession into memory
    // render/set inner html of total and cart amount
    // render/set inner html of the cart items within the cart div
    // attach eventlisteners to the hide and show of the cart div
    ui.setupAPP()

    // get all of the products and the display them using the ui object
    // then save the products in local storage
    products
    .getProducts()
    .then(products => {
        ui.displayProducts(products)
        Storage.saveProducts(products)
    })
    .then(() => {
        // get bag buttons into an object array so you can attach eventlisteners to them
        ui.getBagButtons()
        ui.cartLogic()
        checkoutCardBox1.checked = false
        checkoutCardBox2.checked = false
        checkoutCardBox3.checked = false

        checkoutPaypalBox1.checked = false
        checkoutPaypalBox2.checked = false
        checkoutPaypalBox3.checked = false
    })
    
    // Make the SHOP NOW button jump the page
    bannerBtn.addEventListener('click', () => {
        window.scroll({
            top: window.innerHeight - 60,
            left: 0,
            behavior: 'smooth'
        });
    })

    // Set up the navbar and jumps
    var navState = false
    navBtn.addEventListener('click', () => {
        if(navState){
            navSec.classList.remove('showNav')
            navState = false
        } else if(!navState){
            navSec.classList.add('showNav')
            navState = true
        }
    })
    nav1.addEventListener('click', () => {
        jump1.scrollIntoView({behavior: 'smooth'})
        navSec.classList.remove("showNav")
        navState = false
    })
    nav2.addEventListener('click', () => {
        jump2.scrollIntoView({behavior: 'smooth'})
        navSec.classList.remove("showNav")
        navState = false
    })
    nav3.addEventListener('click', () => {
        jump3.scrollIntoView({behavior: 'smooth'})
        navSec.classList.remove("showNav")
        navState = false
    })



    // setup checkout toggle
    checkoutCardBtn.style.color = "var(--primaryColor)"
    checkoutCardBtn.addEventListener('click', () => {
        checkoutCardDOM.style.display = "unset"
        checkoutCardDOM.style.zIndex = "200"
        checkoutCardBtn.style.color = "var(--primaryColor)"

        checkoutPaypalDOM.style.display = "none"
        checkoutPaypalDOM.style.zIndex = "100"
        checkoutPaypalBtn.style.color = "#000"
    })
    checkoutPaypalBtn.addEventListener('click', () => {
        checkoutPaypalDOM.style.display = "unset"
        checkoutPaypalDOM.style.zIndex = "200"
        checkoutPaypalBtn.style.color = "var(--primaryColor)"

        checkoutCardDOM.style.display = "none"
        checkoutCardDOM.style.zIndex = "100"
        checkoutCardBtn.style.color = "#000"
    })
})

// PayPal
function initPayPalButton() {
    paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'blue',
        layout: 'vertical',
        label: 'paypal',
        
    },

    createOrder: function(data, actions) {
        return actions.order.create({
        purchase_units: [{"amount":{"currency_code":"USD","value":parseFloat(totalPaypalDOM.innerText).toFixed(2)}}]
        });
    },

    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
            emailBtn.click()
        });
    },

    onError: function(err) {
        console.log(err);
    }
    }).render('#paypal-button-container');
}
initPayPalButton()