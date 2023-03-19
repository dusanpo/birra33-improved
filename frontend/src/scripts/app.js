const baseUrl = "https://api.punkapi.com/v2/beers?page=";
const cardWrapper = document.querySelector(".card-wrapper");
const searchByName = document.getElementById("inp-search");
const filterFood = document.getElementById("filter-food");
const inputBrewedDates = document.querySelectorAll(".date-input");
const pageNumber = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const loaderOutput = document.getElementById("loader-output");
const ibuFilter = document.getElementById("ibu-filter");
const arrowLeft = document.querySelector(".fa-angles-left");
const listView = document.getElementsByClassName("list-view");
const gridView = document.getElementsByClassName("grid-view");
const liGrid = document.querySelector(".li-grid");
const liList = document.querySelector(".li-list");

let addToBasket = JSON.parse(localStorage.getItem("data")) || [];
let currentView = localStorage.getItem("currentView");

let foodPairing = "",
  ABVmin = "",
  ABVmax = "",
  brewedAfter = "",
  brewedBefore = "",
  IBU = "",
  page = localStorage.getItem("PageNumber")
    ? localStorage.getItem("PageNumber")
    : 1,
  perPage = "&per_page=9";

window.addEventListener("load", () => {
  loader();
  fetchApi();
});

const loader = () => {
  loaderOutput.innerHTML =
    '<div class="gif-spinner mx-auto"><img src="images/loader.webp" /></div>';
};

searchByName.addEventListener("change", () => {
  let searchQuery = searchByName.value.trim();
  loader();
  setTimeout(() => {
    fetchApi(searchQuery);
  }, 500);

  searchByName.value = "";
});

filterFood.addEventListener("change", e => {
  const value = e.target.value;
  switch (value) {
    case "chicken":
      foodPairing = "&food=chicken";
      break;
    case "cake":
      foodPairing = "&food=cake";
      break;
    case "cheese":
      foodPairing = "&food=cheese";
      break;
    case "salad":
      foodPairing = "&food=salad";
      break;
  }
  page = 1;
  loader();
  setTimeout(() => {
    fetchApi();
  }, 500);
});

[sliderOne, sliderTwo].forEach(element => {
  element.addEventListener("change", () => {
    let termMin = sliderOne.value;
    let termMax = sliderTwo.value;
    ABVmin = "&abv_gt=" + termMin;
    ABVmax = "&abv_lt=" + termMax;
    page = 1;
    loader();
    setTimeout(() => {
      fetchApi();
    }, 500);
  });
});

inputBrewedDates.forEach(input => {
  input.addEventListener("change", e => {
    let value = e.target.value;
    let date = `${value.substring(5, 7)}-${value.substring(0, 4)}`;
    if (e.target.id === "after") {
      brewedAfter = "&brewed_after=" + date;
    } else {
      brewedBefore = "&brewed_before=" + date;
    }
    page = 1;
    loader();
    setTimeout(() => {
      fetchApi();
    }, 500);
  });
});

ibuFilter.addEventListener("click", e => {
  const value = e.target.value;
  switch (value) {
    case 1:
      IBU = "&ibu_gt=24&ibu_lt=45";
      break;
    case 2:
      IBU = "&ibu_gt=45&ibu_lt=60";
      break;
    case 3:
      IBU = "&ibu_gt=59&ibu_lt=80";
      break;
    case 4:
      IBU = "&ibu_gt=0&ibu_lt=25";
      break;
    case 5:
      IBU = "&ibu_gt=79";
      break;
    case 6:
      IBU = "&ibu_lt=1";
      break;
  }
  page = 1;
  loader();
  setTimeout(() => {
    fetchApi();
  }, 500);
});

const fetchApi = async query => {
  let response;
  if (query) {
    response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${query}`
    );
  } else {
    response = await fetch(
      baseUrl +
        page +
        perPage +
        foodPairing +
        ABVmin +
        ABVmax +
        brewedBefore +
        brewedAfter +
        IBU
    );
  }
  let results = await response.json();

  pageNumber.innerText = page;
  if (page === 1) {
    prevPage.disabled = true;
    arrowLeft.classList.replace("show-icon", "hide-icon");
  } else {
    prevPage.disabled = false;
    arrowLeft.classList.replace("hide-icon", "show-icon");
  }
  if (results.length < 9) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }

  let generatedHTML = "";
  results.map(result => {
    const { image_url, abv, id, name } = result;
    if (id > 80) {
      nextPage.disabled = true;
      return;
    }
    generatedHTML += `
    <div beer-id="${id}" class="col-md-6 col-lg-6 col-xl-4 grid-view">
    <div class="card text-center border-0 cards">
      <div class="card-body card-main" >
        <img class="img" src=${image_url} alt="image"/>
        <p class="beer-price">$${abv}</p>
        <div class="logo">
          <i onclick="seeMore(this)" class="fa-solid fa-link fa-3x" beer-id="${id}" data-bs-toggle="modal" data-bs-target="#seeMoreModal"></i>
        </div>
      </div>
      <div class="card-footer card-bottom">
        <h5>
          <button onclick="increment(${id}); addToCart(this);" class="w-100">Add to Cart</button>
        </h5>
      </div>
    </div>
  </div>

  <div beer-id="${id}" class="list-view">
    <div class="card mb-4 border-0 rounded-0 card-list-view">
    <div class="row g-0">
    <div class="col-md-4 text-center">
      <img class="img-fluid grid-img" src=${image_url}  alt="image">
     </div>
     <div class="col-md-8">
      <div class="card-body">
        <h2 class="card-title beer-name">${name}</h2>
          <p class="card-text beer-description">Ut wisi enim ad minim veniam, quis nostrud 
             exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
             Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, 
             vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent 
             luptatum zzril delenit augue duis.</p>
          <p class="card-title beer-price">$${abv}</p>
          <div class="modal-logo">
             <i onclick="seeMore(this)" class="fa-solid fa-link fa-3x" beer-id="${id}" data-bs-toggle="modal" data-bs-target="#seeMoreModal"></i>
           </div>
            <button onclick="increment(${id}); addToCart(this);" class="list-button">Add to Cart</button>  
        </div>
      </div>
     </div>
   </div>
  </div>
    `;
    cardWrapper.classList.remove("not-found");
  });
  if (results.length === 0) {
    generatedHTML = "No products were found matching your selection.";
    cardWrapper.classList.add("not-found");
  }
  cardWrapper.innerHTML = generatedHTML;

  if (currentView === "list") {
    showListView();
  } else {
    showGridView();
  }
};

const addToCart = elem => {
  elem.innerText = "Added";
  elem.setAttribute("disabled", "true");
  elem.classList.add("addedBtn");
};

const increment = id => {
  let selectedItem = id;
  let searchItem = addToBasket.find(elem => elem.id === selectedItem);
  if (searchItem === undefined) {
    addToBasket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    searchItem.item += 1;
  }
  calculation();
  localStorage.setItem("data", JSON.stringify(addToBasket));
};

calculation();

prevPage.addEventListener("click", () => {
  loader();
  if (page > 1) {
    page--;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    fetchApi();
  }, 500);
  localStorage.setItem("PageNumber", page);
});

nextPage.addEventListener("click", () => {
  loader();
  page++;
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    fetchApi();
  }, 500);
  localStorage.setItem("PageNumber", page);
});

const clearFilters = () => {
  loader();
  setTimeout(() => {
    window.location.reload();
  }, 500);
  localStorage.removeItem("PageNumber");
};

const showGridView = () => {
  for (let listItems of listView) {
    listItems.style.display = "none";
  }
  for (let gridItems of gridView) {
    gridItems.style.display = "block";
  }
  liList.classList.remove("active");
  liGrid.classList.add("active");
  localStorage.setItem("currentView", "grid");
};

const showListView = () => {
  for (let gridItems of gridView) {
    gridItems.style.display = "none";
  }
  for (let listItems of listView) {
    listItems.style.display = "block";
  }
  liGrid.classList.remove("active");
  liList.classList.add("active");
  localStorage.setItem("currentView", "list");
};
