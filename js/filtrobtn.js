document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll("#accordion a");
  const resetButton = document.getElementById("reset-filters");
  const cards = document.querySelectorAll(".item-card");

  filters.forEach((filter) => {
    filter.addEventListener("click", function (e) {
      e.preventDefault();
      const filterType = this.closest(".collapse")
        .id.replace("collapse", "")
        .toLowerCase();
      const filterValue = this.textContent.trim();

      applyFilters(filterType, filterValue);
    });
  });

  resetButton.addEventListener("click", function () {
    resetFilters();
  });

  function applyFilters(filterType, filterValue) {
    cards.forEach((card) => {
      const cardValue = card.dataset[filterType];
      if (cardValue.includes(filterValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  function resetFilters() {
    filters.forEach((filter) => {
      filter.classList.remove("active");
    });
    cards.forEach((card) => {
      card.style.display = "";
    });
  }
});
