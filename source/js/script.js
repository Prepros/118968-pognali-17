/**
* Навигационное меню
**/

var pageHeader = document.querySelector(".page-header");
var headerToggle = document.querySelectorAll(".page-header__toggle");

// Если найден .page-header
if (pageHeader) {
  // Проверка есть ли js
  if (pageHeader.classList.contains("page-header--no-js")) {
    pageHeader.classList.remove("page-header--no-js")
  }

  // Меню в .page-header - по умолчанию закрыто
  if (!pageHeader.classList.contains("page-header--close")) {
    pageHeader.classList.add("page-header--close")
  }
}

// Нажали на кнопку меню
for (var i = 0; i < headerToggle.length; i++) {
  headerToggle[i].addEventListener("click", function (evt) {
    evt.preventDefault();

    if (pageHeader) {
      // Открываем / закрываем меню
      if (pageHeader.classList.contains("page-header--close")) {
        pageHeader.classList.remove("page-header--close");
        pageHeader.classList.add("page-header--open");
      } else {
        pageHeader.classList.remove("page-header--open");
        pageHeader.classList.add("page-header--close");
      }
    }
  });
}

/**
 * Шапка при скроле страницы
 **/

// Страница еще не проскролена
var scroll = false;

window.addEventListener("scroll", function (evt) {
  // Плавный переход
  if (window.innerWidth < 1440) {
    if (window.pageYOffset > 0) scroll = true;
    else scroll = false;
  } else {
    if (window.pageYOffset >= 30) scroll = true;
    else scroll = false;
  }

  // Если страница проскролена и имеется .page-header
  if (scroll && pageHeader) {
    pageHeader.classList.add("page-header--fixed");
  } else {
    pageHeader.classList.remove("page-header--fixed");
  }
});

/**
 * Модальное окно с тарифами
 **/

var tariffPopup = document.querySelector(".tariff-popup");
var tariffPopupOpen = document.querySelector(".tariff__button-text");
var tariffPopupClose = document.querySelector(".tariff-popup__button");

// Открываем модальное окно
tariffPopupOpen.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (!tariffPopup.classList.contains("tariff-popup--show")) {
    tariffPopup.classList.add("tariff-popup--show");
  }
});

// Закрываем модальное окно
tariffPopupClose.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (tariffPopup.classList.contains("tariff-popup--show")) {
    tariffPopup.classList.remove("tariff-popup--show");
  }
});
