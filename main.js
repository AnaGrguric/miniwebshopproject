const products = document.querySelector(".products");
const addedItems = document.querySelector(".added-items");
const total = document.querySelector(".final-price");

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
const paymentInfo = document.getElementById("payment-info");
const confirmationPopup = document.querySelector(".confirmation-popup");
const btnOk = document.querySelector(".ok");

const filterPrice = document.querySelector("#checkbox-price");
const btnFilterApply = document.querySelector(".apply-filter");

const mobileCart = document.querySelector(".mobile-cart");
const circle = document.querySelector(".circle");
const shoppingBag = document.querySelector(".shopping-bag");

const product1 = {
  id: 1,
  name: "T-shirt",
  type: "t-shirt",
  image: "images/img1.jpeg",
  price: 200,
  size: ["S", "M", "L"],
  inBag: 0,
};

const product2 = {
  id: 2,
  name: "Silk Dress",
  type: "dress",
  image: "images/img2.jpeg",
  price: 300,
  size: ["S", "M", "L"],
  inBag: 0,
};

const product3 = {
  id: 3,
  name: "Denim trousers",
  type: "trousers",
  image: "images/img3.jpeg",
  price: 300,
  size: ["XS", "M", "L"],
  inBag: 0,
};

const product4 = {
  id: 4,
  name: "Short skirt",
  type: "skirt",
  image: "images/img4.jpeg",
  price: 150,
  size: ["XS", "S"],
  inBag: 0,
};

const productsArr = [product1, product2, product3, product4];
let newArray;

products.innerHTML = "";

function productsGallery() {
  productsArr.map((product) => {
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

btnFilter.addEventListener("click", () => {
  filterPopup.classList.toggle("hidden");
});

// Add to cart

newArray = productsArr.slice().sort(
  (a, b) => parseFloat(a.price) - parseFloat(b.price)
);

console.log(newArray);
console.log(productsArr)

function filter(){
  if (filterPrice.checked) {
    products.innerHTML = "";
    newArray.map((product) => {
      const html = `<div class="product">
          <img src="${product.image}" class="product-image"/>
          <h6 class="product-name">${product.name}</h6>
          <p class="product-price">${product.price}kn</p>
          <button class="btn-add-to-bag">Add to bag</button>
      </div>`;
      products.insertAdjacentHTML("beforeend", html);
    });
  }
}

btnFilterApply.addEventListener("click", filter);

const product = document.querySelectorAll(".product");
const productName = document.querySelector(".product-name");
const productImg = document.querySelectorAll(".product-image");
const btnAdd = document.querySelectorAll(".btn-add-to-bag");

btnOneImg.addEventListener("click", () => {
  productImg.forEach((img) => img.classList.add("product-image-wider"));
  productImg.forEach((img) => img.classList.remove("product-image"));
  products.classList.add("products-column");
});

btnTwoImg.addEventListener("click", () => {
  productImg.forEach((img) => img.classList.add("product-image"));
  productImg.forEach((img) => img.classList.remove("product-image-wider"));
  products.classList.remove("products-column");
});

btnAdd.forEach((btn, i) => {
  btn.addEventListener("click", function () {
      if(filterPrice.checked){
        updateShoppingCart(newArray[i]);
      } else {
        updateShoppingCart(productsArr[i]);
      }
  });
});

function updateShoppingCart(p) {
  let numberOfItems = localStorage.getItem("quantity");
  numberOfItems = parseInt(numberOfItems);

  if (numberOfItems) {
    localStorage.setItem("quantity", numberOfItems + 1);
    circle.textContent = numberOfItems + 1;
  } else {
    localStorage.setItem("quantity", 1);
    circle.textContent = 1;
  }

  addProducts(p);
  totalPrice(p);
  renderShoppingCart();
}

function addProducts(p) {
  let addedProducts = localStorage.getItem("products");
  console.log(addedProducts);
  addedProducts = JSON.parse(addedProducts);

  if (addedProducts != null) {
    if (addedProducts[p.id] == undefined) {
      addedProducts = {
        ...addedProducts,
        [p.id]: p,
      };
    }
    addedProducts[p.id].inBag += 1;
  } else {
    p.inBag = 1;
    addedProducts = {
      [p.id]: p,
    };
  }

  localStorage.setItem("products", JSON.stringify(addedProducts));
}

function onLoad() {
  localStorage.clear();
}

onLoad();

function totalPrice(p) {
  let itemPrice = localStorage.getItem("price");
  console.log(itemPrice);

  if (itemPrice != null) {
    itemPrice = parseInt(itemPrice);
    localStorage.setItem("price", itemPrice + p.price);
  } else {
    localStorage.setItem("price", p.price);
  }
}

function renderShoppingCart() {
  let productsInBag = localStorage.getItem("products");
  let productsPrice = localStorage.getItem("price");
  productsInBag = JSON.parse(productsInBag);
  if (productsInBag && productsPrice) {
    addedItems.innerHTML = "";
    Object.values(productsInBag).map((item) => {
      addedItems.innerHTML += `<div class="cart-items">
      <p>${item.name}</p>
      <p>x${item.inBag}</p>
      <p>${item.price * item.inBag}kn</p>
      </div>`;
    });
    total.innerHTML = "";
    total.insertAdjacentHTML("beforeend", `${productsPrice} kn`);
  }
}
// payment info

btnConfirmInfo.addEventListener("click", () => {
  const html = `<div>
    <h6>Payment info:</h6>
    <p>Name: ${inputName.value == "" ? "name not entered" : inputName.value}</p>
    <p>Card info: ${
      inputCard.value.length == 16 ? inputCard.value : "wrong card number"
    }</p>
    <p>Address: ${
      inputAddress.value == "" ? "address not entered" : inputAddress.value
    }</p>
    </div>`;
  paymentInfo.insertAdjacentHTML("afterbegin", html);
  popup.classList.add("hidden");
  btnPurchase.textContent = "Confirm Order";
});

btnPurchase.addEventListener("click", () => {
  if (
    btnPurchase.textContent === "Confirm Order" &&
    (inputCard.value.length != 16 ||
      inputAddress.value === "address not entered" ||
      inputName.value === "name not entered")
  ) {
    paymentInfo.innerHTML = "";
    btnPurchase.textContent = "Change payment info";
  } else if (btnPurchase.textContent === "Confirm Order") {
    confirmationPopup.classList.remove("hidden");
    shoppingBag.classList.add("hidden");
  } else if (addedItems.textContent === "Empty bag :(") {
    alert("Please add items");
  } else {
    popup.classList.remove("hidden");
  }
});

btnOk.addEventListener("click", () => {
  confirmationPopup.classList.add("hidden");
  window.location.reload();
  localStorage.clear();
});

//

function mobile() {
  if (window.innerWidth <= 768) {
    shoppingBag.classList.add("hidden");
  }
}

mobile();

// mobile

mobileCart.addEventListener("click", () => {
  shoppingBag.classList.toggle("hidden");
});
