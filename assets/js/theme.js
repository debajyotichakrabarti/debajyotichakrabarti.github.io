(function () {
    const storageKey = 'debajyoti-site-theme';
    const root = document.documentElement;

    function preferredTheme() {
        const savedTheme = localStorage.getItem(storageKey);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        root.style.colorScheme = theme;

        const button = document.querySelector('[data-theme-toggle]');
        if (!button) return;

        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        button.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
        button.setAttribute('title', `Switch to ${nextTheme} theme`);
        button.setAttribute('aria-pressed', String(theme === 'dark'));
        button.querySelector('.theme-toggle-icon').textContent = theme === 'dark' ? '\u2600' : '\u263E';
        button.querySelector('.theme-toggle-label').textContent = nextTheme;
    }

    applyTheme(preferredTheme());

    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(root.dataset.theme || preferredTheme());

        const button = document.querySelector('[data-theme-toggle]');
        if (!button) return;

        button.addEventListener('click', function () {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem(storageKey, nextTheme);
            applyTheme(nextTheme);
        });
    });
}());
