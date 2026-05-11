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
        
        // Setup theme switcher instance (nav)
        var toggle = document.getElementById("theme-toggle");
        var menu = document.getElementById("theme-menu");
        var current = document.getElementById("theme-current");
        
        // Setup theme switcher instance (footer)
        var toggleFooter = document.getElementById("theme-toggle-footer");
        var menuFooter = document.getElementById("theme-menu-footer");
        var currentFooter = document.getElementById("theme-current-footer");
        
        // Get all theme option buttons
        var options = Array.prototype.slice.call(document.querySelectorAll(".theme-option"));

        // Check if at least one instance exists
        if (!toggle && !toggleFooter) {
            return;
        }

        function setTheme(theme) {
            var nextTheme = applyTheme(theme);
            
            // Update nav instance
            if (current) {
                current.textContent = themeNames[nextTheme];
            }
            if (toggle) {
                toggle.setAttribute("aria-label", "Theme switcher, current theme " + themeNames[nextTheme]);
            }
            
            // Update footer instance
            if (currentFooter) {
                currentFooter.textContent = themeNames[nextTheme];
            }
            if (toggleFooter) {
                toggleFooter.setAttribute("aria-label", "Theme switcher, current theme " + themeNames[nextTheme]);
            }
            
            // Update all option buttons
            options.forEach(function (option) {
                var isActive = option.getAttribute("data-theme-value") === nextTheme;
                option.classList.toggle("is-active", isActive);
                option.setAttribute("aria-checked", isActive ? "true" : "false");
            });
            
            persistTheme(nextTheme);
        }

        function openMenu(toggleEl, menuEl) {
            menuEl.classList.add("is-open");
            toggleEl.setAttribute("aria-expanded", "true");
        }

        function closeMenu(toggleEl, menuEl) {
            menuEl.classList.remove("is-open");
            toggleEl.setAttribute("aria-expanded", "false");
        }

        function toggleMenu(toggleEl, menuEl) {
            if (menuEl.classList.contains("is-open")) {
                closeMenu(toggleEl, menuEl);
            } else {
                openMenu(toggleEl, menuEl);
            }
        }

        setTheme(getSavedTheme());

        // Setup nav instance event listeners
        if (toggle && menu) {
            toggle.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleMenu(toggle, menu);
            });

            menu.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        }

        // Setup footer instance event listeners
        if (toggleFooter && menuFooter) {
            toggleFooter.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleMenu(toggleFooter, menuFooter);
            });

            menuFooter.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        }

        // Setup option button click handlers
        options.forEach(function (option) {
            option.addEventListener("click", function () {
                setTheme(option.getAttribute("data-theme-value"));
                // Close both menus
                if (menu) {
                    closeMenu(toggle, menu);
                }
                if (menuFooter) {
                    closeMenu(toggleFooter, menuFooter);
                }
            });
        });

        document.addEventListener("click", function () {
            if (menu) {
                closeMenu(toggle, menu);
            }
            if (menuFooter) {
                closeMenu(toggleFooter, menuFooter);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                if (menu) {
                    closeMenu(toggle, menu);
                }
                if (menuFooter) {
                    closeMenu(toggleFooter, menuFooter);
                }
            }
        });

        root.addEventListener("themechange", function (event) {
            setTheme(event.detail && event.detail.theme);
        });
    });
})();
