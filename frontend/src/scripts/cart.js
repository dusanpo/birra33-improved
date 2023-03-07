const baseUrl = "https://api.punkapi.com/v2/beers?page=";
const labelDiv = document.getElementById("label-cart");
const shoppingCart = document.getElementById("shopping-cart");
const totalAmountDiv = document.getElementById("total-amount");
let page = 1;
let perPage = "&per_page=80";

const fetchAPI = async () => {
  const response = await fetch(baseUrl + page + perPage);
  const data = await response.json();
  generateCartItems(data);
  totalAmount(data);
};
fetchAPI();

let addToBasket = JSON.parse(localStorage.getItem("data")) || [];
calculation();

const generateCartItems = data => {
  if (addToBasket.length !== 0) {
    return (shoppingCart.innerHTML = addToBasket
      .map(result => {
        const { id, item } = result;
        let searchItem = data.find(elem => elem.id === id) || [];
        const { image_url, name, abv } = searchItem;
        return `
        <div class="cart-item">
        <div class="image-wrapper">
        <img src=${image_url} class="image" alt=${image_url} />
        </div>

        <div class="details">

        <div class="cart-title">
          <h4 class="title-price">
          <p>${name.substring(0, 20)}</p>
          <p class="cart-price">$${abv}</p>
          </h4>
          <i onclick="removeItem(${id})" class="fa-sharp fa-solid fa-xmark"></i>
        </div>

        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-caret-down-square-fill"></i>
          <div id=${id} class="quantity">${item}</div>
          <i onclick="increment(${id})" class="bi bi-caret-up-square-fill"></i>
        </div>

        <p class="sum-price">$${(item * abv).toFixed(1)}</p>
        </div>
        </div>
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = "";
    labelDiv.innerHTML = `
    <h2 class="empty-cart">Cart is empty</h2>
    <a href="index.html">
    <i class="fa-solid fa-circle-arrow-left"></i>
    </a>
    `;
  }
};

const increment = id => {
  let searchItem = addToBasket.find(elem => elem.id === id);
  if (searchItem === undefined) {
    addToBasket.push({
      id: id,
      item: 1,
    });
  } else {
    searchItem.item += 1;
  }
  fetchAPI();
  update(id);
  localStorage.setItem("data", JSON.stringify(addToBasket));
};

const decrement = id => {
  let search = addToBasket.find(elem => elem.id === id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);
  addToBasket = addToBasket.filter(elem => elem.item !== 0);
  fetchAPI();
  localStorage.setItem("data", JSON.stringify(addToBasket));
};

const update = id => {
  let search = addToBasket.find(elem => elem.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

const removeItem = id => {
  addToBasket = addToBasket.filter(x => x.id !== id);
  fetchAPI();
  calculation();
  localStorage.setItem("data", JSON.stringify(addToBasket));
};

const totalAmount = data => {
  if (addToBasket.length !== 0) {
    let amount = addToBasket
      .map(result => {
        let searchItem = data.find(elem => elem.id === result.id) || [];
        return result.item * searchItem.abv;
      })
      .reduce((prev, next) => prev + next, 0);
    totalAmountDiv.innerHTML = `
  <div class="fixed-top amount">
    <div class="container">
     <div class="d-flex justify-content-between align-items-center amount-wrapper">
     <div class="your-cart">YOUR CART</div>
      <h2 class="text-center total">Total Amount : $${amount.toFixed(1)}</h2>
         <div class="current-page">
           <button onclick="homePage()" class="home-btn">SHOP</button><i class="fa-solid fa-angle-right fa-xs"></i> YOUR CART
         </div>
     </div>
   </div>
 </div>
<div class="buttons">
  <button onclick="checkoutPage()" class="checkout">CHECKOUT</button>
  <button onclick="clearCart()" class="clear-cart">CLEAR CART</button>
</div>
   `;
  } else {
    totalAmountDiv.innerHTML = "";
    return;
  }
};

const clearCart = () => {
  addToBasket = [];
  fetchAPI();
  calculation();
  localStorage.setItem("data", JSON.stringify(addToBasket));
};

const checkoutPage = () => {
  location.href = "checkout.html";
};
const homePage = () => {
  location.href = "index.html";
};
