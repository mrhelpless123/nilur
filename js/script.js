//copyright current year
const copyright = document.querySelector('#copyright')
const content = copyright.innerHTML
copyright.innerHTML = 'Copyright © '
copyright.innerHTML += new Date().getFullYear()
copyright.innerHTML += content

//mark active nav tab  
window.onload = () => {
    navLink = document.querySelectorAll('a')
    navLink.forEach((item) => {
        if (document.location.href.includes(item.getAttribute('href'))) {
            item.classList.add('active-nav-page')
        }
    });
};

//gallery filter
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("gallery-column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

function activeButton(elem) {
  var button = document.getElementsByTagName('button');
  for (i = 0; i < button.length; i++) {
      button[i].classList.remove('active')
  }
  elem.classList.add('active');
}

/*var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn-gallery");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

irrelevant dank neuer function*/

function removeAll() {
  var element = document.getElementById("all");
  element.classList.remove("active");
}

function filterbuero() {
  var element = document.getElementById("bn-buero");
  element.classList.add("active");
}

function filtermuseum() {
  var element = document.getElementById("bn-museum");
  element.classList.add("active");
}

function filterhaus() {
  var element = document.getElementById("bn-haus");
  element.classList.add("active");
}

if (window.location.href.indexOf("buero") > -1) {
  filterSelection("buero");
  filterbuero();
  removeAll();
}

if (window.location.href.indexOf("museum") > -1) {
  filterSelection("museum");
  filtermuseum();
  removeAll();
}

if (window.location.href.indexOf("haus") > -1) {
  filterSelection("haus");
  filterhaus();
  removeAll();
}

/*// disable scroll for lightbox
function bodyOverflowHidden() {
  document.getElementsByTagName("html")[0].style.overflow = "hidden";
}

function bodyOverflowAuto() {
  document.getElementsByTagName("html")[0].style.overflow = "auto";
}*/

//pinch and zoom image

const pinchZoom = (imageElement) => {
  let imageElementScale = 1;

  let start = {};

  const distance = (event) => {
    return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
  };

  imageElement.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
      event.preventDefault();

      start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
      start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
      start.distance = distance(event);
    }
  });

  imageElement.addEventListener('touchmove', (event) => {
    if (event.touches.length === 2) {
      event.preventDefault();

      let scale;
      if (event.scale) {
        scale = event.scale;
      } else {
        const deltaDistance = distance(event);
        scale = deltaDistance / start.distance;
      }
      imageElementScale = Math.min(Math.max(1, scale), 4);

      const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2;
      const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2;

      const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
      imageElement.style.transform = transform;
      imageElement.style.WebkitTransform = transform;
      imageElement.style.zIndex = "9999";
    }
  });

  imageElement.addEventListener('touchend', (event) => {
    imageElement.style.transform = "";
    imageElement.style.WebkitTransform = "";
    imageElement.style.zIndex = "";
  });
}