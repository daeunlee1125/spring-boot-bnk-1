
// 상단 메인메뉴 js ///////////////////////////////////////////////////////////////////////////

const menuItems = document.querySelectorAll(".menu-item");
const dropdowns = document.querySelectorAll(".dropdown");

// 현재 열려 있는 메뉴 추적
let currentDropdown = null;

menuItems.forEach(item => {
  const targetId = item.dataset.target;
  const dropdown = document.getElementById(targetId);

  // 🔹 1차 카테고리에 마우스 올렸을 때
  item.addEventListener("mouseenter", () => {
    dropdowns.forEach(d => d.classList.remove("show"));
    dropdown.classList.add("show");
    currentDropdown = dropdown;
  });

  // 🔹 드롭다운으로 마우스 들어왔을 때 닫히지 않도록 유지
  dropdown.addEventListener("mouseenter", () => {
    dropdown.classList.add("show");
  });

  // 🔹 드롭다운 벗어났을 때 닫기
  dropdown.addEventListener("mouseleave", () => {
    dropdown.classList.remove("show");
    currentDropdown = null;
  });
});

// 🔹 메뉴 전체(nav + dropdown) 영역에서 벗어날 때만 닫기
document.querySelector("header").addEventListener("mouseleave", () => {
  dropdowns.forEach(d => d.classList.remove("show"));
  currentDropdown = null;
});




// 슬라이드 배너 js ///////////////////////////////////////////////////////////////////////////

window.addEventListener("load", () => {
  const slideWrapper = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let current = 0;
  let slideInterval;
  const intervalTime = 3000; // 3초

  function showSlide(index) {
    slideWrapper.style.transition = "transform 1s ease-in-out";
    slideWrapper.style.transform = `translateX(-${index * 100}%)`;
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












////////////////////////////////////////////////////////////////////////////

// mypage js

////////////////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleCurrencies");
  const hiddenCurrencies = document.querySelectorAll(".currency-card.hidden");

  let expanded = false;

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;

    hiddenCurrencies.forEach(card => {
      card.style.display = expanded ? "block" : "none";
    });

    toggleBtn.textContent = expanded ? "− 접기" : "+ 더보기";
  });
});







////////////////////////////////////////////////////////////////////////////

// member.terms(약관페이지)

////////////////////////////////////////////////////////////////////////////

// 전체 동의 체크박스
const agreeAll = document.getElementById('agreeAll');
const checkboxes = document.querySelectorAll('.terms-check input');

agreeAll.addEventListener('change', () => {
  checkboxes.forEach(chk => chk.checked = agreeAll.checked);
});

// 개별 체크 시 전체동의 자동 상태 반영
checkboxes.forEach(chk => {
  chk.addEventListener('change', () => {
    agreeAll.checked = [...checkboxes].every(c => c.checked);
  });
});