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
// display products
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
                            <i class="fas fa-shopping-cart"></i>
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
                                <i class="fas fa-shopping-cart"></i>
                                S
                            </button>
                    `
                } else if(hoodyCnt == 1) {
                        result2 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 35%; width: 8em">
                                <i class="fas fa-shopping-cart"></i>
                                M
                            </button>
                    `
                } else if(hoodyCnt == 2) {
                        result2 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 55%; width: 8em">
                                <i class="fas fa-shopping-cart"></i>
                                L
                            </button>
                    `
                } else if(hoodyCnt == 3) {
                        result2 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 75%; width: 8em">
                                <i class="fas fa-shopping-cart"></i>
                                XL
                            </button>
                        </div>
                        <h3>${product.title} S - XL</h3>
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
                                <i class="fas fa-shopping-cart"></i>
                                add to cart
                            </button>
                        </div>
                        <h3>${product.title} ${product.size}</h3>
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
                                <i class="fas fa-shopping-cart"></i>
                                S
                            </button>
                    `
                } else if(teesCnt == 1) {
                        result3 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 35%; width: 8em">
                                <i class="fas fa-shopping-cart"></i>
                                M
                            </button>
                    `
                } else if(teesCnt == 2) {
                        result3 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 55%; width: 8em">
                                <i class="fas fa-shopping-cart"></i>
                                L
                            </button>
                    `
                } else if(teesCnt == 3) {
                        result3 += `
                            <button class="bag-btn" data-id="${product.id}" style="top: 75%; width: 8em">
                                <i class="fas fa-shopping-cart"></i>
                                XL
                            </button>
                        </div>
                        <h3>${product.title} S - XL</h3>
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
                                <i class="fas fa-shopping-cart"></i>
                                add to cart
                            </button>
                        </div>
                        <h3>${product.title} ${product.size}</h3>
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
                event.target.innerText = "In Cart"
                event.target.disabled = true
    
                // get product from local storage and use the spread operator to add a quatity field
                let cartItem = {...Storage.getProduct(id), amount: 1}
                // add to the cart
                cart = [...cart, cartItem]
                // save cart in local storage
                Storage.saveCart(cart)
                // set cart values
                this.setCartValues(cart)
                // display cart item
                this.addCartItem(cartItem)
                // wait until you load the next products to show the cart
                // this.showCart()
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
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
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

    setupAPP() {
        cart = Storage.getCart()
        this.setCartValues(cart)
        this.populateCart(cart)
        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart)
    }

    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item))
    }

    hideCart() {
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }

    cartLogic() {
        // clear the entire cart
        clearCartBtn.addEventListener('click', () => {
            this.clearCart()
        })

        // remove a selected item from the cart
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
            }
        })

        purchaseBtn.addEventListener('click', () => {
            purchaseClicked()
        })
    }

    clearCart() {
        let cartItems = cart.map(item => item.id)
        cartItems.forEach(id => this.removeItem(id))
        while(cartContent.children.length > 0){
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart()
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
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>S`
        } else if(product.size == "Medium") {
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>M`
        } else if(product.size == "Large") {
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>L`
        } else if(product.size == "XL") {
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>XL`
        } else {
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`
        }
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
})

// Payment Sections
// Stripe

