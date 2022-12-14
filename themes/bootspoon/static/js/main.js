const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
let upButton;

// add listeners
document.addEventListener("DOMContentLoaded", function (event) {
    upButton = document.getElementById("btn-back-to-top");
    upButton.addEventListener("click", backToTop);

    // add listener for dark mode button
    document.querySelector('#darkmode').addEventListener("click", function (event) {
        event.preventDefault();
        let isDarkMode = document.body.classList.contains("dark-theme");
        if (isDarkMode) {
            localStorage.setItem("darkmode", "false");
        } else {
            localStorage.setItem("darkmode", "true");
        }
        toggleDarkMode();
    });

    // set dark mode or not
    toggleDarkMode();
});

function determineDarkMode() {
    // fetch dark mode settings
    let darknessSystem = prefersDarkScheme.matches;
    let darknessStored = localStorage.getItem("darkmode");

    // determine dark mode
    if (darknessStored === "true") {
       return true;
    } else if (darknessStored === "false") {
        return false;
    } else {
        return darknessSystem;
    }
}

// toggle dark mode
function toggleDarkMode() {
    let on = determineDarkMode();
    let cards = document.querySelectorAll('.card');
    let buttons = document.querySelectorAll('.btn');
    let listgroups = document.querySelectorAll('.list-group-item');

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

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
    ) {
        upButton.style.display = "block";
    } else {
        upButton.style.display = "none";
    }
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}