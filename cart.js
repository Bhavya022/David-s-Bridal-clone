let arr = [14, 9, 10, 12, 11, 13,15];

localStorage.setItem("cart", JSON.stringify(arr));
let lsData = JSON.parse(localStorage.getItem("cart")) || [];
let leftSide = document.querySelector("#mainCard");
let totalItem = document.getElementById("totalItem");
let totalPrice = 0;
let totalPriceid=document.getElementById("totalPrice");
let checkoutButton=document.querySelector(".checkoutButton");

//fetching data
let url = "https://63f43aabfe3b595e2eef9ab6.mockapi.io/products";
let finalTotal=0;

window.addEventListener("load", () => {
  displayCart();
});
function displayCart() {
  for (let x of lsData) {
    fetch(`${url}/${x}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        cardData(res);
      })

      .catch((err) => console.log(err));
  }
}

if (lsData.length == 0) {
  totalItem.innerText = "0";
  leftSide.innerText = "Empty BAG";
}

function cardData(item) {
  //   leftSide.innerHTML="";
  let card = `
    <div class="itemDetails">
<div class="upperSection">
           <div class="item">
             <div class="topSection">
               <div>
                 <img
                   src=${item.image}
                   alt="imageLink"
                 />
               </div>
               <div>
                 <h5 id="itemBrand">${item.brand}</h5>
                 <h4 id="itemName">${item.title}</h4>
                 <p>COLOR: <span id="itemColor">${item.color}</span></p>
                 <p><b>PRICE:</b> <span id="itemPrice">Rs${item.price}</span></p>
               </div>
             </div>
           </div>
           <div class="selectSection">
             <select id=${item.id} class="selectQuantity">
 <option value="">Select Quantity</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>

             </select>
           </div>
           <div class="priceSection">
             <p id="itemPrice">Rs-${item.price}</p>
           </div>
         </div>
         <div class="downSectionParent">
           
            <div>DELIVERY: WED, 9/6 <br>
                 SPECIAL ORDER ITEM: 28 WEEKS</div>
             <div><button id=${item.id} class="removeProduct">Remove Product</button></div>
        
         </div>
         <hr>
         <hr>
    </div>
    `;
  totalPrice += Number(item.price);
  leftSide.innerHTML += card;
  totalItem.innerText = lsData.length;
  let removeFromCart = document.querySelectorAll(".removeProduct");
totalPriceid.innerText=totalPrice
let charge=document.getElementById("shippingCharge").innerText=totalPrice%10*10;
let gst=document.getElementById("gst");
gst.innerText=(Math.floor((totalPrice*2)/100))
let subTotal=document.getElementById("subTotal");
subTotal.innerText=totalPrice%10*10+(Math.floor((totalPrice*2)/100))+totalPrice
finalTotal=totalPrice%10*10+(Math.floor((totalPrice*2)/100))+totalPrice;

  let productQuantity = document.querySelectorAll(".selectQuantity");

  //loop eventlistner
  for (let x of removeFromCart) {
    x.addEventListener("click", () => {
      removeCartItem(x.id);
    });
  }

  //eventlist
  // let subTotal=document.getElementById("subTotal");
  for (let x of productQuantity) {
    x.addEventListener("change", () => {
      let value =(calculatePrice(x.id))
      .then((value)=>totalPriceid.innerText=((value*x.value)+totalPrice))
      .then((val)=> calculatingFinal(finalTotal+(val*x.value)-totalPrice)/2)
    });

  }
localStorage.setItem("totalAmmount",(subTotal.innerText))
function calculatingFinal(data){
  subTotal.innerText=data/2;

  localStorage.setItem("totalAmmount",(data/2));
  
}





  ///async 
  async function calculatePrice(x) {
    try {
      let fetching = await fetch(`${url}/${x}`);
      fetching = await fetching.json();
      // console.log(fetching.price);
      return fetching.price;
    } catch (error) {
      console.log(error);
    }
  }

}

function removeCartItem(value) {
  let filtered = lsData.filter((item) => {
    if (value == item) {
      return false;
    } else {
      return true;
    }
  });
  localStorage.setItem("cart", JSON.stringify(filtered));
  window.location.href = "./cart.html";
  console.log(filtered);
  totalItem.innerText = lsData.length;
}

//price Calucator
let formCoupon=document.querySelector(".applyCouponForm");
let coupon=document.getElementById("enterCoupon");

formCoupon.addEventListener("submit",(e)=>{
  e.preventDefault();
if(coupon.value=="bridal20"){
  // console.log(totalPrice);
  totalPrice=(totalPrice -(Math.floor((totalPrice*20)/100)))
  totalPriceid.innerText=(totalPrice -(Math.floor((totalPrice*20)/100)));
  let charge=document.getElementById("shippingCharge")
  charge.innerText=totalPrice%10*10;
  let gst=document.getElementById("gst");
  gst.innerText=(Math.floor((totalPrice*2)/100))
  let subTotal=document.getElementById("subTotal");
  subTotal.innerText=totalPrice%10*10+(Math.floor((totalPrice*2)/100))+totalPrice
  localStorage.setItem("totalAmmount",(subTotal.innerText));
}else{
  console.log("No")
}

})



//eventlistner

checkoutButton.addEventListener("click",()=>{
  window.location.href="./checkout.html"
})