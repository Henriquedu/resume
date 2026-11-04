/* theme.js — applies the saved colour theme before first paint.
   Loaded synchronously in <head> so there is no flash of the wrong theme. */
(function () {
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) { /* private mode: fall back to the OS preference */ }
})();

/* Delegated toggle — no dependency on DOMContentLoaded ordering. */
document.addEventListener('click', function (event) {
  var button = event.target.closest('[data-theme-toggle]');
  if (!button) return;

  var root = document.documentElement;
  var current = root.getAttribute('data-theme');
  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  var effective = current || (prefersLight ? 'light' : 'dark');
  var next = effective === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }

  button.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
});