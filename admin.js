// api here


//getting id's from document here

//navBar id's
let product=document.getElementById("product");
let addProduct=document.getElementById("addProduct");
let customer=document.getElementById("customer");
let orders=document.getElementById("orders");
let updateProduct=document.getElementById("updateProduct");
let discount=document.getElementById("discount");
let logout=document.getElementById("logout");

// nav id's end

let main=document.querySelector("#main");

//url here

const productApi='https://63f43aabfe3b595e2eef9ab6.mockapi.io/products';
const usersApi='https://63f43aabfe3b595e2eef9ab6.mockapi.io/users';

//api fetching




//adEventListner here

//product page eventListner


  async function fetchForProduct(url){
    try {
        let response=await fetch(url);
        response=await response.json();
        console.log(response)
        return productFun(response);
    } catch (error) {
        
    }
  }
  
  
  //adProduct eventListner
  product.addEventListener("click",()=>{
    fetchForProduct(productApi);
  })




  //product function
function productFun(data){
let div=`<div class="mainDiv">
${data.map((item,index)=>getCard(index,item.id,item.title,item.brand,item.price,item.image)).join("")}
</div>
`
main.innerHTML=div;
let del=document.querySelectorAll("button");
 for(let i=0;i<del.length;i++){

     del[i].addEventListener("click",()=>{
         deletingFun(del[i].id)
     })
 }

 let searchBar=document.querySelector(".searchingFilter");
 searchBar.addEventListener("search",()=>{
    if(searchBar.value==""){
        productFun(data);
    }else{
        let filtered=data.filter((element)=>{
            if(element.brand.toUpperCase().includes(searchBar.value.toUpperCase())==true ||
            element.title.toUpperCase().includes(searchBar.value.toUpperCase())==true){
                return true;
            }else{
                return false;
            }
        })
        productFun(filtered)
    }
 })
}
function getCard(index,id,title,brand,price){
    if(index==0){
        return `
        <input class="searchingFilter" type="search" placeholder="Search">
        <div class="mainCard">
        <p>No.</p>
        <p>Title</p>
        <p>Brand</p>
        <p>Price</p>
        <h4>Remove item </h4>
        </div>
        <div class="card" data-id=${id}>
        <p>${index+1}</p>
        <p>${title}</p>
        <p>${brand}</p>
        <p>${price}</p>
        <button class="delete" id=${id}>Remove Item</button>
        </div>`
    }else{
        return `
<div class="card" data-id=${id}>
<p>${index+1}</p>
<p>${title}</p>
<p>${brand}</p>
<p>${price}</p>
<button id=${id}>Remove Item</button>
</div>`
    }
}
async function deletingFun(id) {
    try {
      let delete_request = await fetch(`https://63f43aabfe3b595e2eef9ab6.mockapi.io/products/${id}`, {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json'
        }
      });
      if (delete_request.ok) {
        alert("Item Removed")
        fetchForProduct(productApi);
        
      }
    }catch(error){
console.log(error);
    }

}
//addProduct
addProduct.addEventListener("click",()=>{

    displayForm();
})
function displayForm(){
    let formCard= ` <div class="form-style-5">
    <form>
    <fieldset>
    <legend><span class="number">+</span>Add New Product</legend>
    <input type="text" id="title" name="field1" placeholder="Product Title " required>
    <input type="text" id="brand" name="field2" placeholder="Product Brand " required>
    <input type="url" id="img" name="field3" placeholder="Image Link " required>
    <input type="text" id="price" name="field4" placeholder="Product Price" required> 
    <input type="text" id="color" name="field5" placeholder="Product Color" required>
    <input type="text" id="fabric" name="field5" placeholder="Product Fabric" required>
    </fieldset>
    <input type="submit" value="Add Product" />
    </form>
    </div>`
    main.innerHTML=formCard;
//getting form;

let form=document.querySelector("form");
let title=document.getElementById("title");
let brand=document.getElementById("brand");
let image=document.getElementById("img");
let price=document.getElementById("price");
let color=document.getElementById("color");
let fabric=document.getElementById("fabric");

async function postProduct(){
    try{
        let product={
            title:title.value,
            brand:brand.value,
            image:image.value,
            price:price.value,
            color:color.value,
            fabric:fabric.value
        }
       let postProductval=await fetch(productApi,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
        if(postProductval.ok){
            fetchForProduct(productApi)
            alert("Product Added")
        }
    }catch(err){
        console.log("Some issue");
    }
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    postProduct(title,brand,image,price,color,fabric);
})
}

//customer

async function fetchForCustomer(url){
    try {
        let response=await fetch(url);
        response=await response.json();
        console.log(response)
        return userFun(response);
    } catch (error) {
        console.log(error);
    }
  }
  
  
  //adProduct eventListner
  customer.addEventListener("click",()=>{
    fetchForCustomer(usersApi);
  })

  //customer function
function userFun(data){
let div=`<div class="mainDiv">
${data.map((item,index)=>getCardCus(index,item.id,item.name,item.email,item.mobile)).join("")}
</div>
`
main.innerHTML=div;
let del=document.querySelectorAll("button");
 for(let i=0;i<del.length;i++){

     del[i].addEventListener("click",()=>{
        deletingFunCus(del[i].id)
     })
 }
}
function getCardCus(index,id,name,email,mobile){
    if(index==0){
        return `
        <div class="mainCard">
        <p>No.</p>
        <p>Name</p>
        <p>Email</p>
        <p>Mobile</p>
        <h4>Remove User</h4>
        </div>
        <div class="card" data-id=${id}>
        <p>${index+1}</p>
        <p>${name}</p>
        <p>${email}</p>
        <p>${mobile}</p>
        <button class="delete" id=${id}>Remove User</button>
        </div>`
    }else{
        return `
<div class="card" data-id=${id}>
<p>${index+1}</p>
<p>${name}</p>
<p>${email}</p>
<p>${mobile}</p>
<button id=${id}>Remove User</button>
</div>`
    }
}
async function deletingFunCus(id) {
    try {
      let delete_request = await fetch(`https://63f43aabfe3b595e2eef9ab6.mockapi.io/users/${id}`, {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json'
        }
      });
      if (delete_request.ok) {
        alert("Item Removed")
        fetchForCustomer(usersApi);
        
      }
    }catch(error){
console.log(error);
    }

}


//orders eventListner
orders.addEventListener("click",()=>{
    main.innerHTML="orders Page"
})
//updateProduct
updateProduct.addEventListener("click",()=>{
fetchUpdateProduct(productApi);
})

async function fetchUpdateProduct(url){
    try {
        let response=await fetch(url);
        response=await response.json();
        console.log(response)
        return updateProductFun(response)
    } catch (error) {
        console.log(error);
    }
}


//update function
function updateProductFun(data){
    let div=`<div class="mainDiv">
    ${data.map((item,index)=>updateGetCard(index,item.id,item.title,item.brand,item.price,item.image)).join("")}
    </div>
    `
    main.innerHTML=div;
    let edit=document.querySelectorAll("button");
     for(let i=0;i<edit.length;i++){
    
         edit[i].addEventListener("click",()=>{
             fetchingEdit(edit[i].id)
         })
     }
    }
     
    async function fetchingEdit(id){
try {
    let response=await fetch(`${productApi}/${id}`);
    response=await response.json();
    // console.log(response.id,response.brand,response.title,response.price,response.image,response.color,response.fabric)
    return editFun(response.id,response.brand,response.title,response.price,response.image,response.color,response.fabric);
} catch (error) {  
    console.log(error);
}
    }



    function updateGetCard(index,id,title,brand,price){
        if(index==0){
            return `
            <div class="mainCard">
            <p>No.</p>
            <p>Title</p>
            <p>Brand</p>
            <p>Price</p>
            <h4>Edit item </h4>
            </div>
            <div class="card" data-id=${id}>
            <p>${index+1}</p>
            <p>${title}</p>
            <p>${brand}</p>
            <p>${price}</p> 
            <button class="delete" id=${id}>Edit Item</button>
            </div>`
        }else{
            return `
    <div class="card" data-id=${id}>
    <p>${index+1}</p>
    <p>${title}</p>
    <p>${brand}</p>
    <p>${price}</p>
    <button id=${id}>Edit Item</button>
    </div>`
        }
    }
function editFun(id,brand,title,price,image,color,fabric) {
    let formCard= ` <div class="form-style-5">
    <form>
    <fieldset>
    <legend><span class="number">+</span>Update Product<span class="prodID" id=${id}>-id:no-${id}</span></legend>
    <label>Brand</label>
    <input type="text" id="brand" name="field2" placeholder="update brand" value='${brand}' required>
    <label>Title</label>
    <input type="text" id="title" name="field1" placeholder="Update Product Title" value='${title}' required>
    <label>Price</label>
    <input type="text" id="price" name="field4" placeholder="Update Product Price" value='${price}' required> 
    <label>Image</label>
    <input type="url" id="img" name="field3" placeholder="Update Image Link" value='${image}' required>
    <label>Color</label>
    <input type="text" id="color" name="field5" placeholder="Update Product Color" value='${color}' required>
    <label>Fabric</label>
    <input type="text" id="fabric" name="field5" placeholder="Update Product Fabric" value='${fabric}' required>
    </fieldset>
    <input type="submit" value="Update Product" />
    </form>
    </div>`
    main.innerHTML=formCard;
     


let formUpdate=document.querySelector("form");
let productId=document.querySelector(".prodID")
let titleUpdate=document.getElementById("title");
let brandUpdate=document.getElementById("brand");
let imageUpdate=document.getElementById("img");
let priceUpdate=document.getElementById("price");
let colorUpdate=document.getElementById("color");
let fabricUpdate=document.getElementById("fabric");

async function patchProduct(){
    try{

        let UpdateProduct={
            brand:brandUpdate.value,
            title:titleUpdate.value,
            image:imageUpdate.value,
            price:priceUpdate.value,
            color:colorUpdate.value,
            fabric:fabricUpdate.value
        }
       let postProductval=await fetch(`${productApi}/${productId.id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(UpdateProduct)
        })
        if(postProductval.ok){
            alert("Product Updated")
            
        }
    console.log(productId.id,product);
    }catch(err){
        console.log("Some issue");
    }
}
formUpdate.addEventListener("submit",(e)=>{
    e.preventDefault()
    patchProduct()
})
    }

