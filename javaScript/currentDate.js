document.getElementById("current-year").textContent = new Date().getFullYear();

function toggleDropdown() {
  const dropdown = document.querySelector(".dropdown-menu");
  dropdown.classList.toggle("active");
}
