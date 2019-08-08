// Шапка сайта
var pageHeader = document.querySelector(".page-header");

// Навигация
var pageNav = document.querySelector(".page-nav");

// Кнопка меню
var menuToggle = document.querySelector(".page-header__toggle");

// По умолчанию страницу не скролили
var scroll = false;

// Если включен js убираем класс
pageHeader.classList.remove("page-header--no-js");

// По умолчанию шапка синего цвета
if (!pageHeader.classList.contains("page-header--blue") || pageHeader.classList.contains("page-header--white")) {
  pageHeader.classList.remove("page-header--white");
  pageHeader.classList.add("page-header--blue");
}

// Нажали на кнопку меню
menuToggle.addEventListener("click", function (evt) {
  evt.preventDefault();

  // Меняем иконку открытия меню при открытии/закрытии меню
  if (menuToggle.classList.contains("page-header__toggle--open")) {
    menuToggle.classList.remove("page-header__toggle--open");
    menuToggle.classList.add("page-header__toggle--close");
  } else if (menuToggle.classList.contains("page-header__toggle--close")) {
    menuToggle.classList.remove("page-header__toggle--close");
    menuToggle.classList.add("page-header__toggle--open");
  }

  // Если навигация скрыта - показываем ее
  if (pageNav.classList.contains("page-nav--close")) {
    pageNav.classList.remove("page-nav--close");
    pageNav.classList.add("page-nav--open");

    // Меняем фон шапки сайта
    if (pageHeader.classList.contains("page-header--blue")) {
      pageHeader.classList.remove("page-header--blue");
      pageHeader.classList.add("page-header--white");
    } // Если навигация открыта - закрываем ее
  } else if (pageNav.classList.contains("page-nav--open")) {
    pageNav.classList.remove("page-nav--open");
    pageNav.classList.add("page-nav--close");

    // Если страница не проскролена шапка сайта синего цвета
    if (!scroll) {
      // Меняем фон шапки сайта
      if (pageHeader.classList.contains("page-header--white")) {
        pageHeader.classList.remove("page-header--white");
        pageHeader.classList.add("page-header--blue");
      }
      pageHeader.classList.remove("page-header--fixed");
    }
  }
});

// Скролим страницу
window.addEventListener("scroll", function (evt) {
  if (window.innerWidth < 1440) {
    if (window.pageYOffset > 0) {
      scroll = true;
    } else {
      scroll = false;
    }
  } else {
    if (window.pageYOffset > 750) {
      scroll = true;
    } else {
      scroll = false;
    }
  }

  // Если страница проскролена
  if(scroll || pageNav.classList.contains("page-nav--open")) {
    // Меняем фон шапки сайта на белый
    if (pageHeader.classList.contains("page-header--blue")) {
      pageHeader.classList.remove("page-header--blue");
      pageHeader.classList.add("page-header--white");
    }
    // Фиксируем шапку
    pageHeader.classList.add("page-header--fixed");
  } else {
    // Меняем фон шапки сайта
    if (pageHeader.classList.contains("page-header--white")) {
      pageHeader.classList.remove("page-header--white");
      pageHeader.classList.add("page-header--blue");
    }
    // Не фиксируем шапку
    pageHeader.classList.remove("page-header--fixed");
  }
});

// Для больших экранах закрываем навигацию
window.addEventListener('resize', function(evt) {
  if (window.innerWidth >= 1440) {
    // Меняем иконку
    if (menuToggle.classList.contains("page-header__toggle--close")) {
      menuToggle.classList.remove("page-header__toggle--close");
      menuToggle.classList.add("page-header__toggle--open");
    }

    // Если навигация открыта - закрываем ее
      if (pageNav.classList.contains("page-nav--open")) {
      pageNav.classList.remove("page-nav--open");
      pageNav.classList.add("page-nav--close");

      // Если страница не проскролена шапка сайта синего цвета
      if (!scroll) {
        // Меняем фон шапки сайта
        if (pageHeader.classList.contains("page-header--white")) {
          pageHeader.classList.remove("page-header--white");
          pageHeader.classList.add("page-header--blue");
        }
        pageHeader.classList.remove("page-header--fixed");
      }
    }
  }
});


var country = document.querySelector(".country-filter__country");
var countryItem = document.querySelectorAll(".country-filter__country-item");
var heightCountryList = document.querySelector(".country-filter__country-list").offsetHeight;
var heightCountrySubList = document.querySelector(".country-filter__country-item--active .country-filter__country-sublist").offsetHeight;
country.style.height = heightCountryList + heightCountrySubList + 50 + 'px';

for (var i = 0; i < countryItem.length; i++) {
  countryItem[i].addEventListener("click", function (evt) {
    evt.preventDefault();

    for (var j = 0; j < countryItem.length; j++) {
      countryItem[j].classList.remove('country-filter__country-item--active');
    }

    this.classList.add('country-filter__country-item--active');

    heightCountryList = document.querySelector(".country-filter__country-list").offsetHeight;
    try {
      heightCountrySubList = document.querySelector(".country-filter__country-item--active .country-filter__country-sublist").offsetHeight;
    } catch (e) {
      heightCountrySubList = 0;
    }

    country.style.height = heightCountryList + heightCountrySubList + 50 + 'px';
  });
}

var countryWrapp = document.querySelector(".country-filter__main-wrapp");
var continentButton = document.querySelector(".country-filter__continent-button");

continentButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (countryWrapp.classList.contains("country-filter__main-wrapp--close")) {
    countryWrapp.classList.remove("country-filter__main-wrapp--close");
    countryWrapp.classList.add("country-filter__main-wrapp--open");
  } else {
    countryWrapp.classList.remove("country-filter__main-wrapp--open");
    countryWrapp.classList.add("country-filter__main-wrapp--close");
  }

  heightCountryList = document.querySelector(".country-filter__country-list").offsetHeight;
  try {
    heightCountrySubList = document.querySelector(".country-filter__country-item--active .country-filter__country-sublist").offsetHeight;
  } catch (e) {
    heightCountrySubList = 0;
  }

  country.style.height = heightCountryList + heightCountrySubList + 50 + 'px';
});

var countryButton = document.querySelector(".country-filter__country-button");
countryButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (countryWrapp.classList.contains("country-filter__main-wrapp--close")) {
    countryWrapp.classList.remove("country-filter__main-wrapp--close");
    countryWrapp.classList.add("country-filter__main-wrapp--open");
  } else {
    countryWrapp.classList.remove("country-filter__main-wrapp--open");
    countryWrapp.classList.add("country-filter__main-wrapp--close");
  }
});
