const modal=document.getElementById("modal-box"),seeMore=async n=>{let s=n.getAttribute("beer-id");const t=await fetch(`https://api.punkapi.com/v2/beers/${s}`),a=await t.json();modal.innerHTML=`\n      <div class="modal-content">\n          <div class="modal-header">\n            <div class="d-flex header-content">\n              <p class="header-title">Ab: ${a[0].ph}</p>\n              <p class="header-name">${a[0].name}</p>\n            </div>\n            <button\n              type="button"\n              class="btn-close btn-close-white close-button"\n              data-bs-dismiss="modal"\n              aria-label="Close"\n            ></button>\n          </div>\n          <div class="modal-body">\n            <p>With us since: <span class="date-text">${a[0].first_brewed}</span></p>\n            <p class="description-text">${a[0].description}</p>\n            <p>It goes great width:</p>\n            <p class="food-pairing-text">${a[0].food_pairing.join(", ")}</p>\n          </div>\n          <div class="modal-footer">\n            <div class="row">\n              <div class="col-lg-3">\n                <p class="abv">\n                  Abv:<br />\n                  <span class="result-text">${a[0].abv}</span>\n                </p>\n              </div>\n              <div class="col-lg-9">\n                <p>\n                  And Our tip:\n                  <span class="tips-text">${a[0].brewers_tips}</span>\n                </p>\n              </div>\n            </div>\n          </div>\n        </div>\n  `};