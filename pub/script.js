
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}


const carousel = document.querySelector(".carousel");
let currdeg = 0;

document?.querySelector(".next")?.addEventListener("click", (e) => {
  rotate({ data: { d: "n" } });
});

document?.querySelector(".prev")?.addEventListener("click", (e) => {
  rotate({ data: { d: "p" } });
});

function rotate(e){
  if(e.data.d=="n"){
    currdeg = currdeg - 60;
  }
  if(e.data.d=="p"){
    currdeg = currdeg + 60;
  }
  carousel.style.transform = "rotateY(" + currdeg + "deg)";
  carousel.style.webkitTransform = "rotateY(" + currdeg + "deg)";
  carousel.style.mozTransform = "rotateY(" + currdeg + "deg)";
  carousel.style.oTransform = "rotateY(" + currdeg + "deg)";
}
let startX, startY;

carousel.addEventListener("touchstart", handleTouchStart);
carousel.addEventListener("touchmove", handleTouchMove);
carousel.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (startX && startY) {
    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // horizontal swipe detected
      event.preventDefault();
    }
  }
}

function handleTouchEnd(event) {
  const deltaX = event.changedTouches[0].clientX - startX;
  const deltaY = event.changedTouches[0].clientY - startY;
  const isMobile = detectMob()
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // horizontal swipe detected
    if (deltaX > 0) {
      // swipe right
      currdeg += 72;
      currdeg = currdeg - currdeg%72
    } else {
      // swipe left
      currdeg -= 72;
      console.log('aaa before', currdeg)
      if(currdeg < 0) {
        currdeg = currdeg - (currdeg%72 ? (currdeg%72): 0)
      } else {
        currdeg = currdeg - (currdeg%72 ? (currdeg%72 - 72): 0)
      }
      console.log('aaa after', currdeg)

    }

    carousel.style.transform = `rotateY(${currdeg}deg)`;
    carousel.style.webkitTransform = `rotateY(${currdeg}deg)`;
    carousel.style.mozTransform = `rotateY(${currdeg}deg)`;
    carousel.style.oTransform = `rotateY(${currdeg}deg)`;
  }
}


carousel.addEventListener("wheel", handleWheel);

function handleWheel(event) {
  event.preventDefault();
  const delta = event.deltaY;
  currdeg += delta / 5; // adjust the rotation speed
  carousel.style.transform = `rotateY(${currdeg}deg)`;
  carousel.style.webkitTransform = `rotateY(${currdeg}deg)`;
  carousel.style.mozTransform = `rotateY(${currdeg}deg)`;
  carousel.style.oTransform = `rotateY(${currdeg}deg)`;
}
setInterval(()=>{
    if(!detectMob()) {
        currdeg += .1; // adjust the rotation speed
        carousel.style.transform = `rotateY(${currdeg}deg)`;
        carousel.style.webkitTransform = `rotateY(${currdeg}deg)`;
        carousel.style.mozTransform = `rotateY(${currdeg}deg)`;
        carousel.style.oTransform = `rotateY(${currdeg}deg)`;
    }
}, 10)
