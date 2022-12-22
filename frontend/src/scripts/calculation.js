const calculation = () => {
    const cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = addToBasket
      .map(elem => elem.item)
      .reduce((prev, next) => prev + next, 0);
  };