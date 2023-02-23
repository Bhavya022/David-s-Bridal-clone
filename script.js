document.addEventListener('DOMContentLoaded', function () {

    let products = document.querySelector('.container')
    async function fetchproducts(url) {
        let data = await fetch(url);
        let response = await data.json();
        console.log(response)
        for (let i = 0; i < response.length; i++) {


            products.innerHTML += `
        <div class="product">
        <div>
                <img src="${response[i].image}" alt="error" class="product-img">
            </div>
                <div class="product-brand">
                <p>${response[i].brand}</p> 
                <h3>${response[i].title}</h3> 
                 <h4>${response[i].color}</h4> 
                <h5> $${response[i].price}</h5> 
            </div>
        `
        }
    };
    fetchproducts("https://63f43aabfe3b595e2eef9ab6.mockapi.io/products")
})

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

