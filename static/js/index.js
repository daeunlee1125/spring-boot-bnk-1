document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  const menuItems = document.querySelectorAll(".menu-item");
  const megaMenu = document.querySelector(".mega-menu");
  const groups = document.querySelectorAll(".menu-group");

  if (!nav || !menuItems.length || !megaMenu) {
    console.error("❌ 메뉴 요소를 찾지 못했습니다.");
    return;
  }

  // ✅ hover 시 열림
  menuItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      megaMenu.classList.add("show");
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // ✅ header와 mega-menu를 벗어나면 닫힘
  document.addEventListener("mousemove", e => {
    const navRect = nav.getBoundingClientRect();
    const menuRect = megaMenu.getBoundingClientRect();

    const inside =
      e.clientX >= Math.min(navRect.left, menuRect.left) &&
      e.clientX <= Math.max(navRect.right, menuRect.right) &&
      e.clientY >= Math.min(navRect.top, menuRect.top) &&
      e.clientY <= Math.max(navRect.bottom, menuRect.bottom);

    if (!inside) {
      megaMenu.classList.remove("show");
      menuItems.forEach(i => i.classList.remove("active"));
    }
  });
});






// 슬라이드 배너 js ///////////////////////////////////////////////////////////////////////////

window.addEventListener("load", () => {
  const slideWrapper = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // ✅ width 자동 계산
  slideWrapper.style.width = `${slides.length * 100}%`;
  slides.forEach(slide => (slide.style.flex = `0 0 ${100 / slides.length}%`));

  let current = 0;
  let slideInterval;

  const intervalTime = 3000; // 7초마다 이동

  function showSlide(index) {
    slideWrapper.style.transition = "transform 0.8s ease-in-out";
    slideWrapper.style.transform = `translateX(-${index * (100 / slides.length)}%)`; // ✅ 계산 보정
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  slideWrapper.addEventListener("mouseenter", stopAutoSlide);
  slideWrapper.addEventListener("mouseleave", startAutoSlide);
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      current = index;
      showSlide(current);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  showSlide(current);
  startAutoSlide();
});
