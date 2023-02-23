document.addEventListener('DOMContentLoaded', function () {

    let products = document.querySelector('.container')
    async function fetchproducts(url) {
        let data = await fetch(url);
        let response = await data.json();
        console.log(response)
        for (let i = 0; i < response.length; i++) {


            products.innerHTML += `
        <div class="product">
                <img src="${response[i].image}" alt="error" class="product-img">
                <p class="product-brand">${response[i].brand}<p>
                <p class="product-title">${response[i].title}</p>
                 <p class="color">${response[i].color}</p>
                <p class="product-price"> $ ${response[i].price}"</p>
            </div>
        `
        }
    };
    fetchproducts("https://63f43aabfe3b595e2eef9ab6.mockapi.io/products")
})

