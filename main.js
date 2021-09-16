const products = document.querySelector(".products");
const addedItems = document.querySelector(".added-items");
const totalPrice = document.querySelector(".final-price");

const filterPopup = document.querySelector(".filter-popup");
const btnFilter = document.querySelector(".btn-filter-products");
const btnOneImg = document.querySelector(".btn-one-img");
const btnTwoImg = document.querySelector(".btn-two-img");
const btnPurchase = document.querySelector(".btn-purchase");
const btnConfirmInfo = document.querySelector(".confirm-info");

const popup = document.querySelector(".popup");
const inputName = document.querySelector("#name");
const inputCard = document.querySelector("#card-number");
const inputAddress = document.querySelector("#address");
const confirmationPopup = document.querySelector(".confirmation-popup");
const btnOk = document.querySelector(".ok");

const filterPrice = document.querySelector("#checkbox-price");
const btnFilterApply = document.querySelector(".apply-filter");

const mobileCart = document.querySelector(".mobile-cart");
const numberOfItems = document.querySelector(".circle");
const shoppingBag = document.querySelector(".shopping-bag");

const product1 = {
  id: 1,
  name: "T-shirt",
  type: "t-shirt",
  image: "images/img1.jpeg",
  price: 200,
  size: ["S", "M", "L"],
};

const product2 = {
  id: 2,
  name: "Silk Dress",
  type: "dress",
  image: "images/img2.jpeg",
  price: 300,
  size: ["S", "M", "L"],
};

const product3 = {
  id: 3,
  name: "Denim trousers",
  type: "trousers",
  image: "images/img3.jpeg",
  price: 300,
  size: ["XS", "M", "L"],
};

const product4 = {
  id: 3,
  name: "Short skirt",
  type: "skirt",
  image: "images/img4.jpeg",
  price: 150,
  size: ["XS", "S"],
};

const productsArr = [product1, product2, product3, product4];

products.innerHTML = "";

function productsGallery() {
  productsArr.forEach((product) => {
    const html = `<div class="product">
        <img src="${product.image}" class="product-image"/>
        <h6 class="product-name">${product.name}</h6>
        <p class="product-price">${product.price}kn</p>
        <button class="btn-add-to-bag">Add to bag</button>
    </div>`;
    products.insertAdjacentHTML("beforeend", html);
  });
}

productsGallery();

const product = document.querySelectorAll(".product");
const productName = document.querySelector(".product-name");
const productImg = document.querySelectorAll(".product-image");
const btnAdd = document.querySelectorAll(".btn-add-to-bag");

btnFilter.addEventListener("click", () => {
  filterPopup.classList.toggle("hidden");
});

btnOneImg.addEventListener("click", () => {
  productImg.forEach((img) => (img.classList.add("product-image-wider")));
  productImg.forEach((img) => (img.classList.remove("product-image")));
  products.classList.add("products-column");
});

btnTwoImg.addEventListener("click", () => {
  productImg.forEach((img) => (img.classList.add("product-image")));
  productImg.forEach((img) => (img.classList.remove("product-image-wider")));
  products.classList.remove("products-column");
});

let btn;
let listItems;
let price;
let prices;
function addToCart() {
  for (let i = 0; i < productsArr.length; i++) {
    btn = btnAdd[i];
    addedItems.innerHTML = "";
    var pricesArr;
    btn.addEventListener("click", () => {
      listItems = `<div class="cart-items"><h6>${productsArr[i].name}</h6><p>${productsArr[i].price}kn</p></div>`;
      addedItems.insertAdjacentHTML("afterbegin", listItems);
      pricesArr = [productsArr[i].price];
      price = `<p>${pricesArr}\n</p>`;
      totalPrice.insertAdjacentHTML("beforeend", price);
      const totalString = totalPrice.textContent.toString();
      const totalArr = totalString.split("\n");
      totalPrice.innerHTML = "";
      price = `<p>${totalArr
        .map((x) => +x)
        .reduce((acc, num) => acc + num, 0)}\n</p>`;
      totalPrice.insertAdjacentHTML("beforeend", price);
    });
  }
}

addToCart();


// payment info 

btnConfirmInfo.addEventListener("click", () => {
  const html = `<div id="payment-info">
    <h6>Payment info:</h6>
    <p>Name: ${
      inputName.value == "" ? "name not entered" : inputName.value}</p>
    <p>Card info: ${inputCard.value.length == 16 ? inputCard.value : "wrong card number"}</p>
    <p>Address: ${inputAddress.value == "" ? "address not entered" : inputAddress.value}</p>
    </div>`;
  btnPurchase.insertAdjacentHTML("beforebegin", html);
  popup.classList.add("hidden");
  btnPurchase.textContent = "Confirm Order";
  console.log(inputName.value)
});

btnPurchase.addEventListener("click", () => {
  if(btnPurchase.textContent === "Confirm Order" && (inputCard.value.length != 16) || inputAddress.value == "address not entered"){
    btnPurchase.insertAdjacentHTML("beforebegin", `<p>Please enter right information</p>`);
    btnPurchase.textContent = "Change payment info";
    document.getElementById("payment-info").innerHTML = ""
  }
  else if(btnPurchase.textContent === "Confirm Order"){
    confirmationPopup.classList.remove("hidden");
  }  else{
  popup.classList.remove("hidden");
  }
});

btnOk.addEventListener("click", ()=> {
  confirmationPopup.classList.add("hidden");
  window.location.reload();
})


// Filter

btnFilterApply.addEventListener("click", ()=> {
  if(filterPrice.value == "on"){
    productsArr.map(x => x.price)
  }
});

// mobile

mobileCart.addEventListener("click", ()=>{
  shoppingBag.style.display = "block";
})
