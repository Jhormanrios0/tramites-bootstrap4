document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 3;
  const itemsContainer = document.getElementById("items-container");
  const items = Array.from(itemsContainer.getElementsByClassName("item-card"));
  const paginationContainer = document.querySelector(".pagination");
  const buscador = document.getElementById("buscador");
  const noResults = document.getElementById("noResults");

  let currentPage = 1;

  function showPage(page) {
    const filteredItems = items.filter(
      (item) => !item.classList.contains("filtro")
    );
    const totalFilteredPages = Math.ceil(filteredItems.length / itemsPerPage);
    itemsContainer.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToShow = filteredItems.slice(start, end);

    itemsToShow.forEach((item) => {
      itemsContainer.appendChild(item);
    });

    updatePagination(totalFilteredPages);
  }

  function updatePagination(totalPages) {
    paginationContainer.innerHTML = "";

    // Previous button
    const prevItem = document.createElement("li");
    prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevItem.innerHTML = `
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="${
                      currentPage === 1
                    }">
                        <i class="fa-solid fa-chevron-left"></i>
                    </a>
                `;
    prevItem.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });
    paginationContainer.appendChild(prevItem);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("li");
      pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
      pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
      pageItem.addEventListener("click", function (e) {
        e.preventDefault();
        currentPage = i;
        showPage(currentPage);
      });
      paginationContainer.appendChild(pageItem);
    }

    // Next button
    const nextItem = document.createElement("li");
    nextItem.className = `page-item ${
      currentPage === totalPages ? "disabled" : ""
    }`;
    nextItem.innerHTML = `
                    <a class="page-link" href="#">
                        <i class="fa-solid fa-chevron-right"></i>
                    </a>
                `;
    nextItem.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });
    paginationContainer.appendChild(nextItem);
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const searchHandler = debounce((e) => {
    const searchText = e.target.value.toLowerCase();
    let found = false;

    items.forEach((item) => {
      const title = item.querySelector("a").textContent.toLowerCase();
      if (title.includes(searchText)) {
        item.classList.remove("filtro");
        found = true;
      } else {
        item.classList.add("filtro");
      }
    });

    noResults.classList.toggle("hidden", found);
    currentPage = 1;
    showPage(currentPage);
  }, 300);

  buscador.addEventListener("keyup", (e) => {
    if (e.key === "Escape") e.target.value = "";
    searchHandler(e);
  });

  // Initial load
  showPage(1);
});

document.addEventListener("DOMContentLoaded", function () {
  const itemsContainer = document.getElementById("items-container");
  const items = Array.from(itemsContainer.getElementsByClassName("item-card"));
  const buscador = document.getElementById("buscador");
  const noResults = document.getElementById("noResults");

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const searchHandler = debounce((e) => {
    const searchText = e.target.value.toLowerCase();
    let found = false;

    items.forEach((item) => {
      const title = item.querySelector("a").textContent.toLowerCase();
      if (title.includes(searchText)) {
        item.classList.remove("filtro");
        found = true;
      } else {
        item.classList.add("filtro");
      }
    });

    noResults.classList.toggle("hidden", found);
  }, 300);

  buscador.addEventListener("keyup", (e) => {
    if (e.key === "Escape") e.target.value = "";
    searchHandler(e);
  });
});
