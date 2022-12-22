const modal = document.getElementById("modal-box");

const seeMore = async elem => {
  let id = elem.getAttribute("beer-id");
  const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  const result = await response.json();

  modal.innerHTML = `
      <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex header-content">
              <p class="header-title">Ab: ${result[0].ph}</p>
              <p class="header-name">${result[0].name}</p>
            </div>
            <button
              type="button"
              class="btn-close btn-close-white close-button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>With us since: <span class="date-text">${
              result[0].first_brewed
            }</span></p>
            <p class="description-text">${result[0].description}</p>
            <p>It goes great width:</p>
            <p class="food-pairing-text">${result[0].food_pairing.join(
              ", "
            )}</p>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-lg-3">
                <p class="abv">
                  Abv:<br />
                  <span class="result-text">${result[0].abv}</span>
                </p>
              </div>
              <div class="col-lg-9">
                <p>
                  And Our tip:
                  <span class="tips-text">${result[0].brewers_tips}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
  `;
};
