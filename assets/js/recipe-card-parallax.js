(function () {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    var cards = Array.prototype.slice.call(document.querySelectorAll(".recipes-grid .recipe-card:not(.coming-soon)"));
    if (!cards.length) {
        return;
    }

    var hoverZoom = 1.12;
    var panSafetyPx = 0.75;

    cards.forEach(function (card) {
        var rect = null;
        var imageRect = null;
        var image = card.querySelector(".recipe-image");

        if (!image) {
            return;
        }

        function updatePan(clientX, clientY) {
            if (!rect) {
                rect = card.getBoundingClientRect();
            }

            if (!imageRect) {
                imageRect = image.getBoundingClientRect();
            }

            if (!rect.width || !imageRect.width || !imageRect.height) {
                return;
            }

            var localX = clamp(clientX - rect.left, 0, rect.width);
            var localY = clamp(clientY - rect.top, 0, rect.height);
            var progress = localX / rect.width;
            var progressY = localY / rect.height;

            // Cap pan to the extra pixels created by zoom so no edges are exposed.
            var maxPanX = Math.max((imageRect.width * (hoverZoom - 1)) / 2 - panSafetyPx, 0);
            var maxPanY = Math.max((imageRect.height * (hoverZoom - 1)) / 2 - panSafetyPx, 0);
            var panX = (0.5 - progress) * 2 * maxPanX;
            var panY = (0.5 - progressY) * 2 * maxPanY;

            card.style.setProperty("--image-pan-x", panX.toFixed(2) + "px");
            card.style.setProperty("--image-pan-y", panY.toFixed(2) + "px");
        }

        card.addEventListener("mouseenter", function (event) {
            rect = card.getBoundingClientRect();
            imageRect = image.getBoundingClientRect();
            card.classList.add("is-parallax-active");
            updatePan(event.clientX, event.clientY);
        });

        card.addEventListener("mousemove", function (event) {
            updatePan(event.clientX, event.clientY);
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("is-parallax-active");
            card.style.setProperty("--image-pan-x", "0px");
            card.style.setProperty("--image-pan-y", "0px");
            rect = null;
            imageRect = null;
        });
    });
})();
