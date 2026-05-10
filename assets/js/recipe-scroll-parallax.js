(function () {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    var containers = Array.prototype.slice.call(document.querySelectorAll(".recipe-page .recipe-hero-image"));
    if (!containers.length) {
        return;
    }

    var zoom = 1.12;
    var safetyPx = 1;
    var maxShiftCap = 30;
    var startScrollY = window.scrollY || window.pageYOffset || 0;
    var ticking = false;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function updateAll() {
        var scrollY = window.scrollY || window.pageYOffset || 0;
        var header = document.querySelector("header");
        var navBottom = header ? header.getBoundingClientRect().bottom : 0;

        containers.forEach(function (container) {
            var rect = container.getBoundingClientRect();
            if (!rect.height) {
                return;
            }

            var extraHalf = Math.max((rect.height * (zoom - 1)) / 2 - safetyPx, 0);
            var maxShift = Math.min(extraHalf, maxShiftCap);

            // Start from initial scroll position and complete when image bottom
            // passes the bottom edge of the fixed header/nav area.
            var docBottom = rect.bottom + scrollY;
            var endScrollY = docBottom - navBottom;
            var range = Math.max(endScrollY - startScrollY, 1);
            var progress = clamp((scrollY - startScrollY) / range, 0, 1);
            var shiftY = maxShift * (1 - progress * 2);
            container.style.setProperty("--recipe-hero-shift-y", shiftY.toFixed(2) + "px");
        });

        ticking = false;
    }

    function requestUpdate() {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(updateAll);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);
    requestUpdate();
})();
