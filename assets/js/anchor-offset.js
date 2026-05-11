(function () {
    var root = document.documentElement;
    var header = document.querySelector('header');
    var frameId = null;
    var lastOffset = -1;
    var isInitialized = false;

    if (!header) {
        return;
    }

    // Keep anchors aligned exactly to the fixed header bottom edge.
    function measureOffset() {
        return Math.round(header.getBoundingClientRect().height);
    }

    function applyOffset() {
        var offset = measureOffset();

        if (offset !== lastOffset) {
            lastOffset = offset;
            root.style.setProperty('--anchor-offset', offset + 'px');
            root.style.scrollPaddingTop = offset + 'px';
        }

        return offset;
    }

    function normalizePathname(pathname) {
        if (!pathname) {
            return '/';
        }

        if (pathname.length > 1 && pathname.charAt(pathname.length - 1) === '/') {
            return pathname.slice(0, -1);
        }

        return pathname;
    }

    function getHashTarget() {
        if (!window.location.hash || window.location.hash.length < 2) {
            return null;
        }

        var id = window.location.hash.slice(1);

        try {
            id = decodeURIComponent(id);
        } catch (error) {
            return null;
        }

        return document.getElementById(id);
    }

    function alignToTarget(target, behavior) {
        if (!target) {
            return;
        }

        var offset = applyOffset();
        var targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: behavior || 'auto',
        });
    }

    function alignToHashTarget() {
        alignToTarget(getHashTarget(), 'auto');
    }

    function handleAnchorClick(event) {
        var anchor = event.target.closest('a[href*="#"]');

        if (!anchor) {
            return;
        }

        var href = anchor.getAttribute('href');

        if (!href || href === '#') {
            return;
        }

        var url;

        try {
            url = new URL(href, window.location.href);
        } catch (error) {
            return;
        }

        if (!url.hash || url.hash.length < 2) {
            return;
        }

        if (url.origin !== window.location.origin) {
            return;
        }

        if (normalizePathname(url.pathname) !== normalizePathname(window.location.pathname)) {
            return;
        }

        var targetId;

        try {
            targetId = decodeURIComponent(url.hash.slice(1));
        } catch (error) {
            return;
        }

        var target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();
        alignToTarget(target, 'smooth');

        if (window.location.hash !== url.hash) {
            history.pushState(null, '', url.hash);
        }
    }

    function scheduleOffsetUpdate() {
        if (frameId !== null) {
            cancelAnimationFrame(frameId);
        }

        frameId = requestAnimationFrame(function () {
            frameId = null;
            applyOffset();
        });
    }

    function initializeOffsets() {
        if (isInitialized) {
            return;
        }

        isInitialized = true;
        applyOffset();

        if (window.location.hash) {
            requestAnimationFrame(alignToHashTarget);
        }

        document.addEventListener('click', handleAnchorClick);
    }

    document.addEventListener('DOMContentLoaded', initializeOffsets);
    window.addEventListener('load', initializeOffsets);
    window.addEventListener('resize', scheduleOffsetUpdate, { passive: true });
    window.addEventListener('orientationchange', scheduleOffsetUpdate, { passive: true });

    if (window.ResizeObserver) {
        var observer = new ResizeObserver(scheduleOffsetUpdate);
        observer.observe(header);
    }
})();