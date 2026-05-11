(function () {
    function normalizeTag(value) {
        return (value || "").trim().toLowerCase();
    }

    document.addEventListener("DOMContentLoaded", function () {
        var filterButtons = Array.from(document.querySelectorAll(".tag-filter"));
        var recipeCards = Array.from(document.querySelectorAll(".recipe-card-link[data-tags]"));

        if (!filterButtons.length || !recipeCards.length) {
            return;
        }

        function applyFilter(filterValue) {
            var normalizedFilter = normalizeTag(filterValue);

            recipeCards.forEach(function (card) {
                var tagList = (card.getAttribute("data-tags") || "")
                    .split(",")
                    .map(normalizeTag)
                    .filter(Boolean);

                var shouldShow = normalizedFilter === "alle" || tagList.includes(normalizedFilter);
                card.classList.toggle("is-hidden", !shouldShow);
            });
        }

        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var selectedFilter = button.getAttribute("data-filter") || "alle";

                filterButtons.forEach(function (item) {
                    item.classList.remove("is-active");
                });

                button.classList.add("is-active");
                applyFilter(selectedFilter);
            });
        });

        applyFilter("alle");
    });
})();
