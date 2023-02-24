// document.addEventListener('DOMContentLoaded', function () {

let url = "https://main-server-qat8.onrender.com/product"
let products = document.querySelector('.product-container')



window.addEventListener("load", () => {
    fetchproducts()

})
async function fetchproducts() {
    try {
        let data = await fetch(url);
        let response = await data.json();
        console.log(response)

        getCard(response)
    } catch (error) {
        console.log(error);
    }

}

function getCard(data) {
    products.innerHTML = ""
    let card = `<div class="container">
        
   ${data.map((item) => createCard(item.brand, item.title, item.price, item.color, item.fabric, item.image)).join("")}
  </div>  `
    products.innerHTML = card;
}
function createCard(brand, title, price, color, fabric, image) {
    let card = `<div class="product">
                <img src="${image}" alt="error" class="product-img">
                <div class="product-brand">
                <p>${brand}</p> 
                <h3>${title}</h3> 
                <h5> $${price}</h5> 
                <h4>${color}</h4> 
                <h5>${fabric}</h5>
                <div class="container-box">
                <div class="box box1"></div>
                <div class="box box2"></div>
                <div class="box box3"></div>
                <div class="box box4"></div>
                </div>
                </div>

            </div>
    
    `
    return card;
}



var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

var checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
    if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
    else
        checkList.classList.add('visible');
}
// -----------------------------------------------------------------
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

// -----------------------------------------------------------

let arr = [];
function checkboxFilter(data) {
    let checkboxes = document.querySelectorAll('.items input');

    for (let i = 0; i < checkboxes.length; i++) {
        console.log(checkboxes[i])
    }
    // checkboxes.forEach(checkbox => {
    //     checkbox.addEventListener("change", () => {
    // arr = [];
    // checkboxes.forEach(checkbox => {
    //     if (checkbox.checked) {
    //         let filtered = data.filter(item => item.brand === checkbox.id);
    //         arr = [...arr, ...filtered];
    //     }
    // });
    // display(arr);

    //             if (checkbox.checked) {
    //                 console, log("checked")
    //             } else {
    //                 console.log("err")
    //             }
    //         });
    //     });
}




