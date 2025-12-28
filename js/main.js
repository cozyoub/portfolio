(function () {
  AOS.init({
    duration: 800,
    once: true,
  });

  document.querySelector(".return-top").style.display = "none";

  function scrollEvent() {
    let _scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (_scrollTop > 100) {
      document.querySelector(".return-top").style.display = "flex";
      document.querySelector("header").classList.add("on");
    } else {
      document.querySelector(".return-top").style.display = "none";
      document.querySelector("header").classList.remove("on");
    }
  }

  window.addEventListener("scroll", scrollEvent);

  let animationExecuted = false; 
  const word = document.querySelector(".word"); 

  const displayLetters = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      addClassname(arr, i);
    }
  };

  const addClassname = (arr, i) => {
    setTimeout(() => {
      arr[i].classList.add("on");
    }, 350 + i * 80); 
  };
  const splitLetters = (word) => {
    const letters = [];
    const content = word.innerHTML;
    word.innerHTML = "";
    for (let i = 0; i < content.length; i++) {
      let letter = document.createElement("span");
      letter.className = "letter";
      letter.innerHTML = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }

    displayLetters(letters);
  };

  window.addEventListener("scroll", function () {
    const target = document.getElementById("contact");
    const rect = target.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (!animationExecuted) {
       
        splitLetters(word);
        animationExecuted = true; 
      }
    }
  });

  // 프로젝트 호버시 마우스 이미지 변경
const cursorImgBox = document.querySelector(".cursor .img-box");
const workLinks = document.querySelectorAll(".product__list li a");
const allImgs = document.querySelectorAll(".cursor .img-box .image");

document.addEventListener("mousemove", (e) => {
  cursorImgBox.style.top = `${e.clientY}px`;
  cursorImgBox.style.left = `${e.clientX}px`;
});

workLinks.forEach((a) => {
  const selector = a.getAttribute("data-img"); // "#img3"
  const cursorImg = selector ? document.querySelector(selector) : null;

  a.addEventListener("mouseenter", () => {
    cursorImgBox.classList.add("on");

    // 이전 이미지 on 제거
    allImgs.forEach((img) => img.classList.remove("on"));

    // 현재 이미지 on
    if (cursorImg) cursorImg.classList.add("on");
  });

  a.addEventListener("mouseleave", () => {
    cursorImgBox.classList.remove("on");
    if (cursorImg) cursorImg.classList.remove("on");
  });
});

})();

const randomX = random(-400, 400);
const randomY = random(-200, 200);
const randomDelay = random(0, 50);
const randomTime = random(6, 12);
const randomTime2 = random(5, 6);
const randomAngle = random(-30, 150);

const blurs = gsap.utils.toArray(".blur");
blurs.forEach((blur) => {
  gsap.set(blur, {
    x: randomX(-1),
    y: randomX(1),
    rotation: randomAngle(-1),
  });

  moveX(blur, 1);
  moveY(blur, -1);
  rotate(blur, 1);
});

function rotate(target, direction) {
  gsap.to(target, randomTime2(), {
    rotation: randomAngle(direction),
    // delay: randomDelay(),
    ease: Sine.easeInOut,
    onComplete: rotate,
    onCompleteParams: [target, direction * -1],
  });
}

function moveX(target, direction) {
  gsap.to(target, randomTime(), {
    x: randomX(direction),
    ease: Sine.easeInOut,
    onComplete: moveX,
    onCompleteParams: [target, direction * -1],
  });
}

function moveY(target, direction) {
  gsap.to(target, randomTime(), {
    y: randomY(direction),
    ease: Sine.easeInOut,
    onComplete: moveY,
    onCompleteParams: [target, direction * -1],
  });
}

function random(min, max) {
  const delta = max - min;
  return (direction = 1) => (min + delta * Math.random()) * direction;
}

function scrollIntoStart(id) {
  const x = document.getElementById(id);
  x.scrollIntoView({ behavior: "smooth", block: "start" });
}