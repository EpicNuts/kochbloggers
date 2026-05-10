(function () {
    var defaultTheme = "kuestenwind";
    var storageKey = "kochbloggers-theme";
    var themeNames = {
        kuestenwind: "Kuestenwind",
        herdfeuer: "Herdfeuer",
        nachtkueche: "Nachtkueche",
        marktmorgen: "Marktmorgen"
    };

    function isValidTheme(theme) {
        return Object.prototype.hasOwnProperty.call(themeNames, theme);
    }

    function getSavedTheme() {
        try {
            return localStorage.getItem(storageKey);
        } catch (error) {
            return null;
        }
    }

    function persistTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {
            // Ignore storage errors in restricted browser contexts.
        }
    }

    function applyTheme(theme) {
        var nextTheme = isValidTheme(theme) ? theme : defaultTheme;
        document.documentElement.setAttribute("data-theme", nextTheme);
        return nextTheme;
    }

    var initialTheme = getSavedTheme();
    applyTheme(initialTheme);

    document.addEventListener("DOMContentLoaded", function () {
        var root = document.documentElement;
        var toggle = document.getElementById("theme-toggle");
        var menu = document.getElementById("theme-menu");
        var current = document.getElementById("theme-current");
        var options = Array.prototype.slice.call(document.querySelectorAll(".theme-option"));

        if (!toggle || !menu || !current || !options.length) {
            return;
        }

        function setTheme(theme) {
            var nextTheme = applyTheme(theme);
            current.textContent = themeNames[nextTheme];
            toggle.setAttribute("aria-label", "Theme switcher, current theme " + themeNames[nextTheme]);
            options.forEach(function (option) {
                var isActive = option.getAttribute("data-theme-value") === nextTheme;
                option.classList.toggle("is-active", isActive);
                option.setAttribute("aria-checked", isActive ? "true" : "false");
            });
            persistTheme(nextTheme);
        }

        function openMenu() {
            menu.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
        }

        function closeMenu() {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        }

        function toggleMenu() {
            if (menu.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        setTheme(getSavedTheme());

        toggle.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleMenu();
        });

        menu.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        options.forEach(function (option) {
            option.addEventListener("click", function () {
                setTheme(option.getAttribute("data-theme-value"));
                closeMenu();
            });
        });

        document.addEventListener("click", function () {
            closeMenu();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        root.addEventListener("themechange", function (event) {
            setTheme(event.detail && event.detail.theme);
        });
    });
})();
