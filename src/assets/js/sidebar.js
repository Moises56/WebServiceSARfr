let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".fa-search");

btn.onclick = function () {
  sidebar.classList.toggle("active");
};

searchBtn.onclick = function(){
    sidebar.classList.toggle("active") ;
}

// document.addEventListener("DOMContentLoaded", function () {
//   var searchBtn = document.getElementById("#btn");
//   var sidebar = document.getElementById(".sidebar");
//   if (searchBtn && sidebar) {
//     searchBtn.onclick = function () {
//       sidebar.classList.toggle("active");
//     };
//   } else {
//     console.error("No se encontró el botón o la barra lateral.");
//   }
// });

// document.addEventListener("DOMContentLoaded", function() {
//   let btn = document.querySelector("#btn");
//   let sidebar = document.querySelector('.sidebar');
//   let searchBtn = document.querySelector('.fa-search');

//   if (btn && sidebar && searchBtn) {
//       btn.onclick = function() {
//           sidebar.classList.toggle("active");
//       };

//       searchBtn.onclick = function() {
//           sidebar.classList.toggle("active");
//       };
//   } else {
//       console.error("No se encontraron todos los elementos necesarios.");
//   }
// });
