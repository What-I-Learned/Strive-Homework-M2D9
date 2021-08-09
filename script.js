// scroll animation

function isVisible(element, distance) {
  let elementDiv = element.getBoundingClientRect();
  let distanceFromTop = distance;
  return elementDiv.top - window.innerHeight < distanceFromTop ? true : false;
}

let addAlbumBtn = document.querySelector(".add-album-btn");
// let sectionElements = document.getElementsByTagName("section");
// for (let el of sectionElements) {
//   el.id === "top" ? console.log(el.id) : console.log("kitas");
// }
//console.log(sectionElements);

function addAlbum() {
  let submitAlbumBtn = document.querySelector(
    ".modal-footer .btn.btn-primary.submit-album"
  );
  submitAlbumBtn.addEventListener("click", function () {
    let albumCoverURL = document.querySelector(".form-group input[type=file]")
      .files[0];
    let url = URL.createObjectURL(albumCoverURL);

    let albumName = document.querySelector(".form-group #album-name").value;
    let artistName = document.querySelector(".form-group #artist-name").value;
    let genreName = document.querySelector(".form-group #genre-name").value;
    let albumYear = document.querySelector(".form-group #album-year").value;

    let favAlbumsContainer = document.querySelector(
      ".favorite-albums-container"
    );
    let albumContainer = document.createElement("div");
    let albumInnerContainer = document.createElement("div");
    albumInnerContainer.classList.add("album-container");
    albumContainer.classList.add(
      "col-6",
      "col-md-4",
      "col-lg-3",
      "mb-3",
      "h-100"
    );
    albumInnerContainer.innerHTML = `
    <div class="card text-center hover-shadow-lg hover-translate-y">
        <div class="card-top py-3 px-1">
            <img class="img-fluid rounded-circle" src=${url} alt="">
            <span class="album-genre">${genreName}</span> 
        </div>
        <div class="card-body py-1 mb-2">
            <h4 class="album-title mb-0">"${albumName}"</h4>
            <span class="album-artist">${artistName}</span>
            <span class="album-year">${albumYear}</span>   
        </div>
    </div>`;

    albumContainer.appendChild(albumInnerContainer);
    albumInnerContainer.classList.add("transition-y");
    favAlbumsContainer.insertBefore(
      albumContainer,
      favAlbumsContainer.childNodes[0]
    );
  });

  let albumCover = document.querySelector(".form-group input[type=file]")
    .files[0];
  let sumbmitBtn = document.querySelector(".form-group button.submit-btn");
  console.log("hello world");
}
addAlbumBtn.addEventListener("click", addAlbum);

function addVerticalTransistion() {
  let favoriteAlbumsEl = document.getElementById("favorite-albums");
  let albumEl = document.querySelectorAll(".album-container");
  if (isVisible(favoriteAlbumsEl, -120)) {
    for (let i = 0; i < albumEl.length; i++) {
      setTimeout(function timer() {
        albumEl[i].classList.add("transition-y");
      }, i * 200);
    }
  } else {
    for (let i = 0; i < albumEl.length; i++) {
      setTimeout(function timer() {
        albumEl[i].classList.remove("transition-y");
      }, i * 200);
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

// for performance efficiency
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
