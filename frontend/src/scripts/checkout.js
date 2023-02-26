const baseUrl = "https://api.punkapi.com/v2/beers?page=";
const checkoutDiv = document.getElementById("checkout-div");
const productDiv = document.getElementById("products-div");
let page = 1;
let perPage = "&per_page=80";

const fetchAPI = async () => {
  const response = await fetch(baseUrl + page + perPage);
  const data = await response.json();
  productItems(data);
  checkoutPrice(data);
};
fetchAPI();

let addToBasket = JSON.parse(localStorage.getItem("data")) || [];

const productItems = data => {
  if (addToBasket.length !== 0) {
    return (productDiv.innerHTML = addToBasket
      .map(result => {
        const { id, item } = result;
        let searchItem = data.find(elem => elem.id === id) || [];
        const { name, abv } = searchItem;
        return `
          <tr>
            <td>${name.substring(0, 15)}</td>
            <td>$${abv}</td>
            <td>${item}</td>
            <td>$${(item * abv).toFixed(1)}</td>
          </tr>
          `;
      })
      .join(""));
  }
};

const checkoutPrice = data => {
  if (addToBasket.length !== 0) {
    let amount = addToBasket
      .map(result => {
        let searchItem = data.find(elem => elem.id === result.id) || [];
        return result.item * searchItem.abv;
      })
      .reduce((prev, next) => prev + next, 0);
    checkoutDiv.innerHTML = `
    <tr>
     <td colspan="3">Total Amount:</td>
     <td>$${amount.toFixed(1)}</td>
    </tr>
       `;
  }
};
