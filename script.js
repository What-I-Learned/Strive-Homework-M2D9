// scroll animation

function isVisible(element, distance) {
  let elementDiv = element.getBoundingClientRect();
  let distanceFromTop = distance;
  return elementDiv.top - window.innerHeight < distanceFromTop ? true : false;
}

let favoriteAlbumsEl = document.getElementById("favorite-albums");
let albumEl = document.querySelectorAll(".album-container");
let addAlbumBtn = document.querySelector(".add-album-btn");
// let sectionElements = document.getElementsByTagName("section");
// for (let el of sectionElements) {
//   el.id === "top" ? console.log(el.id) : console.log("kitas");
// }
//console.log(sectionElements);

function addAlbum() {
  console.log("hello world");
}
addAlbumBtn.addEventListener("click", addAlbum);

function addVerticalTransistion() {
  if (isVisible(favoriteAlbumsEl, -120)) {
    for (let i = 0; i < albumEl.length; i++) {
      setTimeout(function timer() {
        albumEl[i].classList.add("transition-y");
      }, i * 400);
    }
  } else {
    for (let i = 0; i < albumEl.length; i++) {
      setTimeout(function timer() {
        albumEl[i].classList.remove("transition-y");
      }, i * 400);
    }
  }
}

function addBackground() {
  let headerEl = document.getElementsByTagName("header")[0];
  let distanceFromTop = 70;
  lastKnownScrollPosition = Math.floor(window.scrollY);
  let isBellowHeader = lastKnownScrollPosition > distanceFromTop ? true : false;
  if (isBellowHeader) {
    headerEl.classList.add("background-on");
  } else {
    headerEl.classList.remove("background-on");
  }
}

window.addEventListener("scroll", throtle(addBackground, 50));
window.addEventListener("scroll", throtle(addVerticalTransistion, 50));

// for permormance efficiency
function throtle(fn, delay) {
  let lastCall = 0;
  return (...arg) => {
    let context = this;
    let current = new Date().getTime();
    if (current - lastCall < delay) {
      return;
    }
    lastCall = current;
    return fn.apply(context, ...arg);
  };
}

function addBadges() {
  let musicCards = document.querySelectorAll(".music-card");
  for (let card of musicCards) {
    let badge = document.createElement("div");
    badge.classList.add("genre-badge", "shadow-sm");
    badge.innerText = card.querySelector(".genre").innerText;
    card.append(badge);
  }
}

addBadges();
