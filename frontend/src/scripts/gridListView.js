const gridList = () => {
  const liLinks = document.querySelectorAll(".links-view ul li");
  const viewWraps = document.querySelectorAll(".view_wrap");
  const listView = document.getElementsByClassName("list-view");
  const gridView = document.getElementsByClassName("grid-view");

  liLinks.forEach(link => {
    link.addEventListener("click", () => {
      let liView = link.getAttribute("data-view");

      viewWraps.forEach(view => {
        view.style.display = "none";
      });

      if (liView === "list-view") {
        for (let i = 0; i < listView.length; i++) {
          listView[i].style.display = "block";
        }
      } else {
        for (let i = 0; i < gridView.length; i++) {
          gridView[i].style.display = "block";
        }
      }
    });
  });
};
