document.addEventListener("DOMContentLoaded", () => {
  const itemsPerPage = 3;
  const itemsContainer = document.getElementById("items-container");
  const items = Array.from(itemsContainer.children);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      item.style.display = index >= start && index < end ? "block" : "none";
    });

    document.querySelectorAll(".pagination .page-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`.pagination .page-item a[data-page="${page}"]`)
      .parentElement.classList.add("active");

    document
      .getElementById("prev-page")
      .classList.toggle("disabled", page === 1);
    document
      .getElementById("next-page")
      .classList.toggle("disabled", page === totalPages);
  }

  document.querySelectorAll(".pagination .page-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = parseInt(e.target.getAttribute("data-page"), 10);
      if (!isNaN(page)) {
        showPage(page);
      } else if (e.target.innerText === "Anterior") {
        const currentPage = document
          .querySelector(".pagination .page-item.active a")
          .getAttribute("data-page");
        showPage(parseInt(currentPage, 10) - 1);
      } else if (e.target.innerText === "Siguiente") {
        const currentPage = document
          .querySelector(".pagination .page-item.active a")
          .getAttribute("data-page");
        showPage(parseInt(currentPage, 10) + 1);
      }
    });
  });

  showPage(1);
});

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#buscador")) {
    const query = e.target.value.toLowerCase();

    document.querySelectorAll(".item-card").forEach((card) => {
      const title = card.querySelector("a").textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }
});
