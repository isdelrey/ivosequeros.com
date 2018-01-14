var toggle = document.querySelector(".toggle");
var header = document.querySelector("header");
toggle.addEventListener("click", function() {
  if(header.classList.contains("open"))
    header.classList.remove("open");
  else
    header.classList.add("open");
});