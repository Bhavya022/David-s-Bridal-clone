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
        checkboxFilter(response)
        getCard(response)
    } catch (error) {
        console.log(error);
    }

}

function getCard(data) {
    products.innerHTML = ""
    let card = `<div class="container">
        
   ${data.map((item) => createCard(item.id, item.brand, item.title, item.price, item.color, item.fabric, item.image)).join("")}
  </div>  `
    products.innerHTML = card;

    let btns = document.querySelectorAll("button");

    for (let i of btns) {
        i.addEventListener("click", () => {
            localStorage.setItem("singleProduct", (i.id))
            window.location.href = "./single_prod.html"
        })
    }

}
function createCard(id, brand, title, price, color, fabric, image) {
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

                <button id=${id} class="goToSingleProduct">Buy Now</button>
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

var checkList = document.getElementById('list2');
checkList.getElementsByClassName('fab')[0].onclick = function (evt) {
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
        checkboxes[i].addEventListener("click", () => {
            if (checkboxes[i].checked) {
                let filtering = data.filter((item) => {
                    if (item.brand.toUpperCase().includes(checkboxes[i].id.toUpperCase()) == true) {
                        return true;
                    } else {
                        return false;
                    }
                })
                getCard(filtering)
            } else {
                console.log("");
            }
        })
    }
}
// -------------------------
function checkboxFilter(data) {
    let brandCheckboxes = document.querySelectorAll('.items input[id^="brand"]');
    let fabricCheckboxes = document.querySelectorAll('.items2 input');

    for (let i = 0; i < brandCheckboxes.length; i++) {
        brandCheckboxes[i].addEventListener("click", () => {
            if (brandCheckboxes[i].checked) {
                let filtering = data.filter((item) => {
                    if (item.brand.toUpperCase().includes(brandCheckboxes[i].id.toUpperCase())) {
                        return true;
                    } else {
                        return false;
                    }
                })
                getCard(filtering);
            } else {
                console.log("");
            }
        })
    }

    for (let i = 0; i < fabricCheckboxes.length; i++) {
        fabricCheckboxes[i].addEventListener("click", () => {
            if (fabricCheckboxes[i].checked) {
                let filtering = data.filter((item) => {
                    if (item.fabric.toUpperCase().includes(fabricCheckboxes[i].id.toUpperCase())) {
                        return true;
                    } else {
                        return false;
                    }
                })
                getCard(filtering);
            } else {
                console.log("");
            }
        })
    }
}

// -------------------------------------------

let mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// ------------

function checkboxFilter(data) {
    let brandCheckboxes = document.querySelectorAll('.items input[id^="brand"]');
    let fabricCheckboxes = document.querySelectorAll('.items2 input');
    let sortHighLink = document.getElementById('sortHigh');
    let sortLowLink = document.getElementById('sortLow');

    for (let i = 0; i < brandCheckboxes.length; i++) {
        brandCheckboxes[i].addEventListener("click", () => {
            if (brandCheckboxes[i].checked) {
                let filtering = data.filter((item) => {
                    if (item.brand.toUpperCase().includes(brandCheckboxes[i].id.toUpperCase())) {
                        return true;
                    } else {
                        return false;
                    }
                })
                sortData(filtering);
                getCard(filtering);
            } else {
                console.log("");
            }
        })
    }

    for (let i = 0; i < fabricCheckboxes.length; i++) {
        fabricCheckboxes[i].addEventListener("click", () => {
            if (fabricCheckboxes[i].checked) {
                let filtering = data.filter((item) => {
                    if (item.fabric.toUpperCase().includes(fabricCheckboxes[i].id.toUpperCase())) {
                        return true;
                    } else {
                        return false;
                    }
                })
                sortData(filtering);
                getCard(filtering);
            } else {
                console.log("");
            }
        })
    }

    sortHighLink.addEventListener("click", () => {
        let sorting = data.sort((a, b) => b.price - a.price);
        getCard(sorting);
    })

    sortLowLink.addEventListener("click", () => {
        let sorting = data.sort((a, b) => a.price - b.price);
        getCard(sorting);
    })
}

function sortData(data) {
    let sortHighLink = document.getElementById('sortHigh');
    let sortLowLink = document.getElementById('sortLow');

    sortHighLink.addEventListener("click", () => {
        let sorting = data.sort((a, b) => b.price - a.price);
        getCard(sorting);
    })

    sortLowLink.addEventListener("click", () => {
        let sorting = data.sort((a, b) => a.price - b.price);
        getCard(sorting);
    })
}

// ------------------------------


