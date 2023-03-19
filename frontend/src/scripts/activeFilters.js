const foodCategories = document.querySelectorAll(".food-categories");
const ibuCategories = document.querySelectorAll(".angle-right-icon");

foodCategories.forEach(category => {
    category.addEventListener("click", () => {
      document.querySelector(".food-active-color")?.classList.remove("food-active-color");
      category.classList.add("food-active-color");
    });
  });

  ibuCategories.forEach(category =>{
    category.addEventListener("click", () =>{
        document.querySelector(".active-color")?.classList.remove("active-color");
        category.classList.add("active-color");
    })
  })