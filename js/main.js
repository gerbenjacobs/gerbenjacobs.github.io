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
});

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