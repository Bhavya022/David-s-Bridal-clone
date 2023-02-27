
let inData = localStorage.getItem("singleProduct") || [];
let main = document.querySelector("main");
let productApi = 'https://main-server-qat8.onrender.com/product';
let cartData = JSON.parse(localStorage.getItem("cart")) || [];


function createCard(id, brand, title, price, color, fabric, image) {

    let card = `<div class="product">
                <img src="${image}" alt="error" class="product-img">
                <div class="product-brand">
                <p>${brand}</p> 
                <h3>${title}</h3> 
                <h6>STYLE# D28NY23361M</h6>
                <h5> $${price}</h5> 
                <h4>${color}</h4> 
                <label for="color">Color:</label>
    <select id="color" name="color">
      <option value="red">Black</option>
      <option value="green">Lavender</option>
      <option value="blue">Maroon</option>
      <option value="mar">Beige</option>

    </select>
                <h2>${fabric}</h2>
                <div class="container-box">
                <div class="box box1"></div>
                <div class="box box2"></div>
                <div class="box box3"></div>
                <div class="box box4"></div>
                </div>
                </div>
                <button id=${id} class="addToCart">Add To Cart</button>
                </div>
    `;
    return card;
}



window.addEventListener("load", () => {
    loadingSingle();

})

async function loadingSingle() {
    try {
        let res = await fetch(`${productApi}/${inData}`);
        res = await res.json();
        // console.log(res)
        let productCard = createCard(res.id, res.brand, res.title, res.price, res.color, res.fabric, res.image);

        main.innerHTML = productCard;

        let addToCart = document.querySelector(".addToCart");


        addToCart.addEventListener("click", () => {
            if (checkCart(addToCart.id)) {
                alert("Already in Cart")
            } else {
                cartData.push(+(addToCart.id));
                localStorage.setItem("cart", JSON.stringify(cartData))
                alert("Added In Cart")
            }
        })



    } catch (error) {
        console.log(error);
    }
}

function checkCart(x) {
    for (let i = 0; i < cartData.length; i++) {
        if (cartData[i] == x) {
            return true;
        }
    }
    return false;
}
// -----------------------------

window.onscroll = function () { myFunction() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}
