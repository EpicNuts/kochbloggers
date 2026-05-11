(function () {
    var MAX_SELECTED_FILTERS = 3;

    function normalizeTag(value) {
        return (value || "").trim().toLowerCase();
    }

    document.addEventListener("DOMContentLoaded", function () {
        var filterButtons = Array.from(document.querySelectorAll(".tag-filter"));
        var recipeCards = Array.from(document.querySelectorAll(".recipe-card-link[data-tags], .recipe-card[data-tags]"));
        var filterSelectionCount = document.querySelector(".filter-selection-count");

        if (!filterButtons.length || !recipeCards.length) {
            return;
        }

        function setButtonState(button, isActive) {
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", isActive ? "true" : "false");
        }

        function syncButtonStates(selectedFilters) {
            var hasActiveFilters = selectedFilters.length > 0;

            filterButtons.forEach(function (button) {
                var filterValue = normalizeTag(button.getAttribute("data-filter") || "alle");
                var isAllButton = filterValue === "alle";
                var isActive = isAllButton ? !hasActiveFilters : selectedFilters.includes(filterValue);

                setButtonState(button, isActive);
            });

            if (filterSelectionCount) {
                var hasSelections = selectedFilters.length > 0;
                filterSelectionCount.textContent = hasSelections
                    ? String(selectedFilters.length) + "/" + String(MAX_SELECTED_FILTERS)
                    : "";
                filterSelectionCount.classList.toggle("is-visible", hasSelections);
            }
        }

        function applyFilter(selectedFilters) {
            var normalizedFilters = selectedFilters.map(normalizeTag).filter(Boolean);
            var showAll = normalizedFilters.length === 0;

            recipeCards.forEach(function (card) {
                var tagList = (card.getAttribute("data-tags") || "")
                    .split(",")
                    .map(normalizeTag)
                    .filter(Boolean);

                var shouldShow = showAll || normalizedFilters.some(function (filterTag) {
                    return tagList.includes(filterTag);
                });

                card.classList.toggle("is-hidden", !shouldShow);
            });
        }

        var selectedFilters = [];

        filterButtons.forEach(function (button) {
            button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
        });

        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var selectedFilter = button.getAttribute("data-filter") || "alle";
                var normalizedFilter = normalizeTag(selectedFilter);
                var isAllButton = normalizedFilter === "alle";

                if (isAllButton) {
                    selectedFilters = [];
                    syncButtonStates(selectedFilters);
                    applyFilter(selectedFilters);
                    return;
                }

                if (selectedFilters.includes(normalizedFilter)) {
                    selectedFilters = selectedFilters.filter(function (filterTag) {
                        return filterTag !== normalizedFilter;
                    });
                } else {
                    if (selectedFilters.length >= MAX_SELECTED_FILTERS) {
                        return;
                    }

                    selectedFilters = selectedFilters.concat(normalizedFilter);
                }

                syncButtonStates(selectedFilters);
                applyFilter(selectedFilters);
            });
        });

        syncButtonStates(selectedFilters);
        applyFilter(selectedFilters);
    });
})();
