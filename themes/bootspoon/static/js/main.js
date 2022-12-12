let cards = document.querySelectorAll('.card');
let buttons = document.querySelectorAll('.btn-primary');
let listgroups = document.querySelectorAll('.list-group-item');
let darkmode = null;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// add listeners
document.addEventListener("DOMContentLoaded", function (event) {
    darkmode = document.querySelector('#darkmode');
    toggleDarkMode(prefersDarkScheme.matches);
    darkmode.addEventListener("click", function (event) {
        event.preventDefault();
        let isDarkMode = document.body.classList.contains("dark-theme");
        toggleDarkMode(!isDarkMode);
    });
});

// toggle dark mode
function toggleDarkMode(on) {
    if (on) {
        document.body.classList.add("dark-theme");
        for (let card of cards) {
            card.classList.add("text-bg-dark");
        }
        for (let button of buttons) {
            button.classList.add("btn-secondary");
            button.classList.remove("btn-primary");
        }
        for (let listgroup of listgroups) {
            listgroup.classList.add("list-group-item-dark");
        }
    } else {
        document.body.classList.remove("dark-theme");
        for (let card of cards) {
            card.classList.remove("text-bg-dark");
        }
        for (let button of buttons) {
            button.classList.remove("btn-secondary");
            button.classList.add("btn-primary");
        }
        for (let listgroup of listgroups) {
            listgroup.classList.remove("list-group-item-dark");
        }
    }
}