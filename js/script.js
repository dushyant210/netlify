document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector("a"); // Your existing anchor
    const overlayNav = document.getElementById("navOverlay");
    const overlayBg = document.getElementById("overlayBg");
    const closeBtn = document.querySelector(".closeBtn");

    // Open menu
    menuBtn.addEventListener("click", function (e) {
        e.preventDefault();
        overlayNav.classList.add("show");
        overlayBg.classList.add("show");
    });

    // Close menu
    closeBtn.addEventListener("click", function () {
        overlayNav.classList.remove("show");
        overlayBg.classList.remove("show");
    });

    overlayBg.addEventListener("click", function () {
        overlayNav.classList.remove("show");
        overlayBg.classList.remove("show");
    });
});



// filters
const priceRange = document.getElementById("priceRange");
const priceRangeValue = document.getElementById("priceRangeValue");
priceRange.addEventListener("input", function () {
  priceRangeValue.innerText = `₹${priceRange.value} - ₹10000`;
});
const weightRange = document.getElementById("weightRange");
const weightRangeValue = document.getElementById("weightRangeValue");
weightRange.addEventListener("input", function () {
  weightRangeValue.innerText = `${weightRange.value}g - 100g`;
});


