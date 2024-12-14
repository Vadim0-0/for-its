
/* preloader */
document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const preloader = document.getElementById('preloader');

  // Блокируем прокрутку на начальном этапе
  body.style.overflow = 'hidden';

  // После полной загрузки страницы
  window.addEventListener('load', function() {

    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1000); // Время совпадает с анимацией fade-out

    // Восстанавливаем прокрутку после задержки скрытия прелоадера
    setTimeout(() => {
      body.style.overflow = '';
    }, 1000);
  });
});


/* Header */
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("header-menu-btn");
  const menu = document.getElementById("header-menu");
  const menuContent = document.getElementById("header-menu-content");

  const svgDefault = `
    <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="0.966406" x2="16" y2="0.966406" stroke="black" stroke-width="1.2"/>
      <line y1="5.96641" x2="11" y2="5.96641" stroke="black" stroke-width="1.2"/>
      <line y1="10.9664" x2="16" y2="10.9664" stroke="black" stroke-width="1.2"/>
    </svg>
  `;

  const svgActive = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0.8189" y1="12.8423" x2="12.5647" y2="1.09651" stroke="black" stroke-width="1.2"/>
    <line x1="12.565" y1="13.1801" x2="0.819165" y2="1.43429" stroke="black" stroke-width="1.2"/>
    </svg>
  `;

  // Функция для переключения меню и иконки
  function toggleMenu() {
    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menuBtn.innerHTML = `Меню ${menu.classList.contains("active") ? svgActive : svgDefault}`;
  }

  // Обработчик нажатия на кнопку
  menuBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMenu();
  });

  // Обработчик клика вне меню
  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target) && menu.classList.contains("active")) {
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
      menuBtn.innerHTML = `Меню ${svgDefault}`;
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const objectBtns = document.querySelectorAll('.object-btn');
  const objectLists = document.querySelectorAll('.header__content-nav__list-item .object-list');

  // Функция переключения класса active
  function toggleActive(button, list) {
      const currentlyActiveIndex = getCurrentlyActiveIndex();

      // Если есть активный другой блок, закрываем его
      if (currentlyActiveIndex !== -1 && objectBtns[currentlyActiveIndex] !== button) {
          removeActive(objectBtns[currentlyActiveIndex], objectLists[currentlyActiveIndex]);
      }

      list.classList.toggle('active');
      button.classList.toggle('active');
  }

  // Функция добавления класса active
  function addActive(button, list) {
      const currentlyActiveIndex = getCurrentlyActiveIndex();

      // Если есть активный другой блок, закрываем его
      if (currentlyActiveIndex !== -1 && objectBtns[currentlyActiveIndex] !== button) {
          removeActive(objectBtns[currentlyActiveIndex], objectLists[currentlyActiveIndex]);
      }

      list.classList.add('active');
      button.classList.add('active');
  }

  // Функция удаления класса active
  function removeActive(button, list) {
      list.classList.remove('active');
      button.classList.remove('active');
  }

  // Проверка ширины экрана
  function isMobileScreen() {
      return window.innerWidth <= 768;
  }

  // Получение индекса текущего активного блока
  function getCurrentlyActiveIndex() {
      return Array.from(objectBtns).findIndex(button => button.classList.contains('active'));
  }

  // Добавление обработчиков событий для всех кнопок
  function updateEventListeners() {
      objectBtns.forEach((button, index) => {
          const list = objectLists[index]; // предполагается, что порядок кнопок и списков совпадает

          if (isMobileScreen()) {
              // На мобильных устройствах добавляем класс по клику
              button.addEventListener('click', function(event) {
                  event.stopPropagation(); // Останавливаем всплытие события
                  toggleActive(button, list);
              });
              button.removeEventListener('mouseenter', function() { addActive(button, list); });
          } else {
              // На десктопах добавляем класс по наведению
              button.removeEventListener('click', function(event) {
                  event.stopPropagation(); // Останавливаем всплытие события
                  toggleActive(button, list);
              });
              button.addEventListener('mouseenter', function() { addActive(button, list); });
          }
      });
  }

  // Удаление класса active при клике вне блока object-list
  document.addEventListener('click', function (event) {
      objectLists.forEach((list, index) => {
          const button = objectBtns[index];
          if (!list.contains(event.target) && !button.contains(event.target)) {
              removeActive(button, list);
          }
      });
  });

  // Удаление класса active, если курсор покинул блок object-list
  objectLists.forEach((list, index) => {
      const button = objectBtns[index];
      list.addEventListener('mouseleave', function() {
          removeActive(button, list);
      });
  });

  // Добавляем или обновляем обработчики событий при загрузке и изменении размера экрана
  updateEventListeners();
  window.addEventListener('resize', updateEventListeners);
});


document.addEventListener("DOMContentLoaded", function() {
  const openButton = document.getElementById("header-mobile-menu-open");
  const closeButton = document.getElementById("header-mobile-menu-close");
  const header = document.getElementById("header"); // Блок header
  const headerContent = document.getElementById("header-content");
  const body = document.body;

  function toggleActiveClass(add) {
      if (add) {
          header.classList.add("active"); // Добавляем класс active к header
          headerContent.classList.add("active");
          body.style.overflow = "hidden"; // Отключаем скролл для body
      } else {
          header.classList.remove("active"); // Убираем класс active у header
          headerContent.classList.remove("active");
          body.style.overflow = ""; // Возвращаем прокрутку для body
      }
  }

  // Проверка ширины экрана
  function checkScreenWidth() {
      return window.innerWidth <= 768;
  }

  // Назначение обработчиков клика, если ширина экрана <= 768px
  function setEventListeners() {
      if (checkScreenWidth()) {
          openButton.addEventListener("click", () => toggleActiveClass(true));
          closeButton.addEventListener("click", () => toggleActiveClass(false));
      } else {
          // Удаление классов active и восстановление прокрутки, если ширина экрана больше 768px
          header.classList.remove("active");
          headerContent.classList.remove("active");
          body.style.overflow = ""; // Возвращаем прокрутку для body
      }
  }

  // Пересчёт при изменении размера окна
  window.addEventListener("resize", setEventListeners);

  // Первоначальная установка обработчиков
  setEventListeners();
});


/* footer - открытие меню с объектами */
document.addEventListener('DOMContentLoaded', function () {
  const objectBtns = document.querySelectorAll('.footer-object-btn');
  const objectLists = document.querySelectorAll('.footer__content-top__nav-list__item .object-list');

  // Функция переключения класса active
  function toggleActive(button, list) {
      const currentlyActiveIndex = getCurrentlyActiveIndex();

      // Если есть активный другой блок, закрываем его
      if (currentlyActiveIndex !== -1 && objectBtns[currentlyActiveIndex] !== button) {
          removeActive(objectBtns[currentlyActiveIndex], objectLists[currentlyActiveIndex]);
      }

      list.classList.toggle('active');
      button.classList.toggle('active');
  }

  // Функция добавления класса active
  function addActive(button, list) {
      const currentlyActiveIndex = getCurrentlyActiveIndex();

      // Если есть активный другой блок, закрываем его
      if (currentlyActiveIndex !== -1 && objectBtns[currentlyActiveIndex] !== button) {
          removeActive(objectBtns[currentlyActiveIndex], objectLists[currentlyActiveIndex]);
      }

      list.classList.add('active');
      button.classList.add('active');
  }

  // Функция удаления класса active
  function removeActive(button, list) {
      list.classList.remove('active');
      button.classList.remove('active');
  }

  // Проверка ширины экрана
  function isMobileScreen() {
      return window.innerWidth <= 768;
  }

  // Получение индекса текущего активного блока
  function getCurrentlyActiveIndex() {
      return Array.from(objectBtns).findIndex(button => button.classList.contains('active'));
  }

  // Добавление обработчиков событий для всех кнопок
  function updateEventListeners() {
      objectBtns.forEach((button, index) => {
          const list = objectLists[index]; // предполагается, что порядок кнопок и списков совпадает

          if (isMobileScreen()) {
              // На мобильных устройствах добавляем класс по клику
              button.addEventListener('click', function(event) {
                  event.stopPropagation(); // Останавливаем всплытие события
                  toggleActive(button, list);
              });
              button.removeEventListener('mouseenter', function() { addActive(button, list); });
          } else {
              // На десктопах добавляем класс по наведению
              button.removeEventListener('click', function(event) {
                  event.stopPropagation(); // Останавливаем всплытие события
                  toggleActive(button, list);
              });
              button.addEventListener('mouseenter', function() { addActive(button, list); });
          }
      });
  }

  // Удаление класса active при клике вне блока object-list
  document.addEventListener('click', function (event) {
      objectLists.forEach((list, index) => {
          const button = objectBtns[index];
          if (!list.contains(event.target) && !button.contains(event.target)) {
              removeActive(button, list);
          }
      });
  });

  // Удаление класса active, если курсор покинул блок object-list
  objectLists.forEach((list, index) => {
      const button = objectBtns[index];
      list.addEventListener('mouseleave', function() {
          removeActive(button, list);
      });
  });

  // Добавляем или обновляем обработчики событий при загрузке и изменении размера экрана
  updateEventListeners();
  window.addEventListener('resize', updateEventListeners);
});


document.addEventListener('DOMContentLoaded', function () {
  const openButton = document.getElementById('cookies-text-open');
  const contentText = document.querySelector('.cookies__content-text');

  openButton.addEventListener('click', function () {
      // Устанавливаем высоту контента на auto, чтобы она соответствовала содержимому
      contentText.style.maxHeight = contentText.scrollHeight + 'px';

      // Отключаем кнопку
      openButton.style.display = "none";
  });
});

/* filter */
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация слайдера
  function initializeSlider(block) {
    const minInput = block.querySelector('.min-input');
    const maxInput = block.querySelector('.max-input');
    const minSlider = block.querySelector('.min-slider');
    const maxSlider = block.querySelector('.max-slider');
    const track = block.querySelector('.slider__blocks-container__track');
    const minPrice = parseInt(block.querySelector('.slider__blocks-container').dataset.minPrice);
    const maxPrice = parseInt(block.querySelector('.slider__blocks-container').dataset.maxPrice);
    const minGap = 1;

    function updateTrack() {
      const percentMin = ((minSlider.value - minPrice) / (maxPrice - minPrice)) * 100;
      const percentMax = ((maxSlider.value - minPrice) / (maxPrice - minPrice)) * 100;
      track.style.left = `${percentMin}%`;
      track.style.right = `${100 - percentMax}%`;
    }

    function syncSliders() {
      if (maxSlider.value - minSlider.value < minGap) {
        if (this === minSlider) minSlider.value = maxSlider.value - minGap;
        else maxSlider.value = minSlider.value + minGap;
      }
      minInput.value = minSlider.value;
      maxInput.value = maxSlider.value;
      updateTrack();
    }

    function syncInputs() {
      let minValue = parseInt(minInput.value) || minPrice;
      let maxValue = parseInt(maxInput.value) || maxPrice;

      if (minValue < minPrice) minValue = minPrice;
      if (minValue > maxSlider.value - minGap) minValue = maxSlider.value - minGap;

      if (maxValue > maxPrice) maxValue = maxPrice;
      if (maxValue < minSlider.value + minGap) maxValue = minSlider.value + minGap;

      minSlider.value = minValue;
      maxSlider.value = maxValue;
      updateTrack();
    }

    minSlider.addEventListener('input', syncSliders);
    maxSlider.addEventListener('input', syncSliders);
    minInput.addEventListener('input', syncInputs);
    maxInput.addEventListener('input', syncInputs);
    updateTrack();
  }

  // Инициализация селектов
  function initializeSelect(select) {
    const selectDescr = select.querySelector('.select-descr');
    const choices = select.querySelectorAll('.select-blocks__choise');

    select.addEventListener('click', (event) => {
      // Проверяем, был ли клик внутри блока select
      if (select.classList.contains('active')) {
        select.classList.remove('active');
      } else {
        // Закрываем другие активные select перед открытием текущего
        document.querySelectorAll('.filter__content-blocks__fields-block.select.active')
          .forEach(s => s.classList.remove('active'));
        select.classList.add('active');
      }
    });

    choices.forEach(choice => {
      choice.addEventListener('click', (event) => {
        selectDescr.textContent = choice.textContent;
        select.classList.remove('active');
        event.stopPropagation(); // Останавливаем всплытие, чтобы избежать повторного закрытия
      });
    });
  }


  // Закрытие select при клике вне его и вне слайдера
  document.addEventListener('click', (event) => {
    const activeSelect = document.querySelector('.filter__content-blocks__fields-block.select.active');
    if (activeSelect && !event.target.closest('.filter__content-blocks__fields-block.select') && !event.target.closest('.slider__blocks')) {
      activeSelect.classList.remove('active');
    }
  });

  // Инициализация кнопки "Ещё"
  function initializeShowMore(labels, button, visibleCount) {
    let allLabelsVisible = false;

    function updateLabels() {
      labels.forEach((label, index) => label.style.display = allLabelsVisible || index < visibleCount ? 'block' : 'none');
      button.textContent = allLabelsVisible
        ? 'Скрыть'
        : `Ещё ${labels.length - visibleCount} преимуществ`;
    }

    button.addEventListener('click', () => {
      allLabelsVisible = !allLabelsVisible;
      updateLabels();
    });

    updateLabels();
  }

  // Инициализация кнопки сброса
  function initializeResetButton(resetButton, sliders, numberInputs, checkboxes, selectDescriptions, selectChoices) {
    resetButton.addEventListener('click', () => {
      checkboxes.forEach(checkbox => checkbox.checked = false);
      sliders.forEach(slider => {
        slider.value = slider.getAttribute('min');
        slider.dispatchEvent(new Event('input'));
      });
      numberInputs.forEach(input => input.value = input.getAttribute('value'));
      selectDescriptions.forEach(desc => desc.textContent = 'Любой');
      selectChoices.forEach(choice => choice.classList.toggle('selected', choice.textContent.trim() === 'Любой'));
    });
  }

  // Инициализация кнопки раскрытия фильтра
  function initializeExpandButton(expandButton, filterBtns) {
    expandButton.addEventListener('click', () => {
      filterBtns.classList.toggle('active');
      expandButton.classList.toggle('active');
    });
  }

  // Основная инициализация
  const sliderBlocks = document.querySelectorAll('.slider__blocks');
  sliderBlocks.forEach(initializeSlider);

  const selectBlocks = document.querySelectorAll('.filter__content-blocks__fields-block.select');
  selectBlocks.forEach(initializeSelect);

  const labels = document.querySelectorAll('.filter__content-blocks__btns-label');
  const showMoreButton = document.querySelector('.show-more');
  initializeShowMore(labels, showMoreButton, 5);

  const resetButton = document.querySelector('.resetting-filter');
  const sliders = document.querySelectorAll('input[type="range"]');
  const numberInputs = document.querySelectorAll('input[type="number"]');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectDescriptions = document.querySelectorAll('.select-descr');
  const selectChoices = document.querySelectorAll('.select-blocks__choise');
  initializeResetButton(resetButton, sliders, numberInputs, checkboxes, selectDescriptions, selectChoices);

  const filterBtns = document.querySelector('.filter__content-blocks__btns');
  const expandButton = document.querySelector('.expand-filter');
  initializeExpandButton(expandButton, filterBtns);
});



/* Главная */
document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.index-hero__content-scroll__blocks');
  const blocks = Array.from(document.querySelectorAll('.index-hero__content-scroll__blocks-block'));
  const paginations = Array.from(document.querySelectorAll('.index-hero__content-scroll__controll-paginations span'));
  const btnPrev = document.getElementById('index-scroll-prev');
  const btnNext = document.getElementById('index-scroll-next');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  function updatePagination() {
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0); // Обновляем позицию без анимации при изменении размера окна
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0; // Текущая позиция
    const distance = targetOffset - start;
    const duration = 500; // Длительность анимации в мс
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1); // Время, прошедшее с начала анимации
      const easedProgress = easeInOutQuad(progress); // Применение easing функции для плавности

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`; // Сдвиг контейнера

      if (progress < 1) {
        requestAnimationFrame(animationStep); // Запрашиваем следующее кадро анимации
      }
    }

    requestAnimationFrame(animationStep); // Запуск анимации
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Конечная позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0) {
        // Свайп влево (вперед)
        if (currentIndex < blocks.length - 1) {
          currentIndex++;
        }
      } else {
        // Свайп вправо (назад)
        if (currentIndex > 0) {
          currentIndex--;
        }
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  updatePagination();
});

document.addEventListener("DOMContentLoaded", () => {
  const productLists = document.querySelectorAll('.index-about__content-cards');
  const maxScrollStep = 40; // Максимальная длина шага прокрутки

  // Функция плавного скроллинга для одного элемента
  function startSmoothScroll(container, targetScrollPosition) {
    let isScrolling = false;
    let animationFrameId;

    function smoothScrollStep() {
      const currentScrollPosition = container.scrollLeft;
      const difference = targetScrollPosition - currentScrollPosition;

      if (Math.abs(difference) > 1) {
        const scrollStep = Math.sign(difference) * Math.min(maxScrollStep, Math.abs(difference));
        container.scrollLeft += scrollStep;
        animationFrameId = requestAnimationFrame(smoothScrollStep);
      } else {
        isScrolling = false;
        container.scrollLeft = targetScrollPosition;
        cancelAnimationFrame(animationFrameId);
      }
    }

    if (!isScrolling) {
      isScrolling = true;
      animationFrameId = requestAnimationFrame(smoothScrollStep);
    }
  }

  // Проверка переполнения контейнера
  function isOverflowing(container) {
    return container.scrollWidth > container.clientWidth;
  }

  // Добавление обработчиков событий для всех контейнеров
  productLists.forEach((container) => {
    let targetScrollPosition = 0;

    // Обработчик колеса мыши
    container.addEventListener('wheel', (event) => {
      if (isOverflowing(container)) {
        event.preventDefault();
        targetScrollPosition += event.deltaY;
        targetScrollPosition = Math.max(
          0,
          Math.min(targetScrollPosition, container.scrollWidth - container.clientWidth)
        );
        startSmoothScroll(container, targetScrollPosition);
      }
    });

    // Обработчик для свайпа на мобильных устройствах
    let startX;

    container.addEventListener('touchstart', (event) => {
      if (isOverflowing(container)) {
        startX = event.touches[0].clientX;
        cancelAnimationFrame(animationFrameId); // Останавливаем предыдущее движение
      }
    });

    container.addEventListener('touchmove', (event) => {
      if (isOverflowing(container) && startX) {
        const touchX = event.touches[0].clientX;
        const scrollDelta = startX - touchX;
        targetScrollPosition += scrollDelta;
        targetScrollPosition = Math.max(
          0,
          Math.min(targetScrollPosition, container.scrollWidth - container.clientWidth)
        );
        startX = touchX;
        startSmoothScroll(container, targetScrollPosition);
      }
    });

    container.addEventListener('touchend', () => {
      startX = null;
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const facilities = document.querySelectorAll('.index-ourFacilities__content-info');

  // Функция для десктопа
  const handleFacilitiesDesktop = () => {
    facilities.forEach(facility => {
      if (facility.classList.contains('one-object')) return;

      const img = facility.querySelector('.index-ourFacilities__content-info__img');
      const articleTop = facility.querySelector('.index-ourFacilities__content-info__article-top');
      const articleBottom = facility.querySelector('.index-ourFacilities__content-info__article-bottom');
      const button = facility.querySelector('.index-ourFacilities__content-info__btn');

      const calculateHeight = () => {
        const facilityStyles = getComputedStyle(facility);
        const paddingTop = parseFloat(facilityStyles.paddingTop);
        const paddingBottom = parseFloat(facilityStyles.paddingBottom);

        const imgHeight = img.getBoundingClientRect().height;
        const articleTopHeight = articleTop.getBoundingClientRect().height;
        const articleBottomHeight = articleBottom.getBoundingClientRect().height;

        facility.style.height = `${imgHeight + articleTopHeight + paddingTop + paddingBottom}px`;

        facility.addEventListener('mouseover', () => {
          const newMinHeight = imgHeight - articleBottomHeight;
          img.style.minHeight = `${newMinHeight}px`;
        });

        facility.addEventListener('mouseout', () => {
          img.style.minHeight = `${imgHeight}px`;
        });

        button.addEventListener('click', () => {
          const isExpanded = facility.classList.toggle('expanded');
          if (isExpanded) {
            facility.style.height = `${imgHeight + articleTopHeight + articleBottomHeight + paddingTop + paddingBottom}px`;
          } else {
            facility.style.height = `${imgHeight + articleTopHeight + paddingTop + paddingBottom}px`;
          }
        });
      };

      calculateHeight();
      window.addEventListener('resize', calculateHeight);
    });
  };

  // Функция для мобильных устройств
  const handleFacilitiesMobile = () => {
    facilities.forEach(facility => {
      const article = facility.querySelector('.index-ourFacilities__content-info__article');
      const articleTop = facility.querySelector('.index-ourFacilities__content-info__article-top');
      const expandBtn = facility.querySelector('.index-ourFacilities__content-info__btn');

      const updateHeight = () => {
        if (expandBtn.classList.contains('active')) {
          article.style.height = `${article.scrollHeight}px`;
        } else {
          article.style.height = `${articleTop.offsetHeight}px`;
        }
      };

      article.style.height = `${articleTop.offsetHeight}px`;

      expandBtn.addEventListener('click', function () {
        expandBtn.classList.toggle('active');
        updateHeight();
        expandBtn.querySelector('p').textContent = expandBtn.classList.contains('active') ? 'Свернуть' : 'Раскрыть';
      });

      window.addEventListener('resize', () => {
        if (expandBtn.classList.contains('active')) {
          article.style.height = `${article.scrollHeight}px`;
        }
      });
    });
  };

  // Убираем старые обработчики перед переключением
  const removeEventListeners = () => {
    facilities.forEach(facility => {
      const img = facility.querySelector('.index-ourFacilities__content-info__img');
      const button = facility.querySelector('.index-ourFacilities__content-info__btn');

      img.style.minHeight = '';
      facility.style.height = '';
      facility.classList.remove('expanded');

      button.replaceWith(button.cloneNode(true)); // Удаляем все обработчики с кнопки
    });
  };

  // Проверка ширины экрана и выбор кода
  const checkScreenWidth = () => {
    removeEventListeners();
    if (window.innerWidth <= 768) {
      // Код для мобильных устройств работает для всех элементов
      handleFacilitiesMobile();
    } else {
      // Код для десктопа игнорирует элементы с классом "one-object"
      handleFacilitiesDesktop();
    }
  };

  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});




document.addEventListener("DOMContentLoaded", function () {
  // Элементы для навигации
  const btnVideo = document.getElementById("index-btn-stocks-stocks");
  const btnRead = document.getElementById("index-btn--stocks-news");
  const reviewsVideoBlocks = document.querySelector(".stocks-list");
  const reviewsReadBlocks = document.querySelector(".news-list");
  const btnPrev = document.getElementById("index-btn--stocks-prev");
  const btnNext = document.getElementById("index-btn--stocks-next");

  // Начальные настройки
  let activeBlock = reviewsVideoBlocks;

  // Функция для получения ширины карточки и правого отступа из CSS для текущего активного блока
  function getScrollWidthForActiveBlock() {
    const firstCard = activeBlock.querySelector("li");
    if (firstCard) {
      const style = window.getComputedStyle(firstCard);
      const cardWidth = parseFloat(style.width);
      const marginRight = parseFloat(style.marginRight);
      return cardWidth + marginRight;
    }
    return 0;
  }

  let scrollWidth = getScrollWidthForActiveBlock();

  // Функция для переключения видимых блоков
  function toggleActiveBlock(showElement, hideElement, activeButton, inactiveButton) {

    showElement.style.display = "flex";
    hideElement.style.display = "none";

    activeButton.classList.add("active");
    inactiveButton.classList.remove("active");

    activeBlock = showElement;

    scrollWidth = getScrollWidthForActiveBlock();
    activeBlock.scrollTo({ left: 0 });
  }

  btnVideo.addEventListener("click", () => toggleActiveBlock(reviewsVideoBlocks, reviewsReadBlocks, btnVideo, btnRead));
  btnRead.addEventListener("click", () => toggleActiveBlock(reviewsReadBlocks, reviewsVideoBlocks, btnRead, btnVideo));

  // Функция для точного скроллинга на экранах шире 768px
  let isScrolling = false;

  function preciseScroll(direction) {
    if (isScrolling) return;
    isScrolling = true;

    const currentScrollPosition = activeBlock.scrollLeft;
    const newScrollPosition = currentScrollPosition + direction * scrollWidth;

    activeBlock.scrollTo({
      left: newScrollPosition,
      behavior: "smooth"
    });

    setTimeout(() => {
      isScrolling = false;
    }, 400);
  }

  btnPrev.addEventListener("click", () => preciseScroll(-1));
  btnNext.addEventListener("click", () => preciseScroll(1));

  let startX = 0;
  let currentX = 0;

  activeBlock.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  activeBlock.addEventListener("touchmove", (e) => {
    currentX = e.touches[0].clientX;
  });

  activeBlock.addEventListener("touchend", () => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {

      const scrollAmount = startX - currentX;
      activeBlock.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    } else {

      if (startX - currentX > 50) {
        preciseScroll(1);
      } else if (currentX - startX > 50) {
        preciseScroll(-1);
      }
    }
  });

  window.addEventListener("resize", () => {
    scrollWidth = getScrollWidthForActiveBlock();
  });
});


/* Акции и новости */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.stocksAndNews-feedback__content-form');
  const nameInput = document.getElementById('stocksAndNews-feedback-name');
  const telInput = document.getElementById('stocksAndNews-feedback-tel');


  telInput.addEventListener('input', () => {

    if (!telInput.value.startsWith('+7')) {
      telInput.value = '+7';
    }

    telInput.value = telInput.value.replace(/[^\d+]/g, '');

    if (telInput.value.length > 12) {
      telInput.value = telInput.value.slice(0, 12);
    }
  });

  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    nameInput.style.backgroundColor = '';
    telInput.style.backgroundColor = '';

    if (!nameInput.value.trim()) {
      nameInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
      isValid = false;
    }

    if (telInput.value.length < 12) {
      telInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});


/* Контакты */
document.addEventListener("DOMContentLoaded", function () {

  if(ymaps) {
    ymaps.ready(function () {
        // Создаем карту
        var myMap = new ymaps.Map("map", {
            center: [44.801736, 37.416887],
            zoom: 16
        });

        // Контейнер для меток
        var markers = [];

        // Данные меток из HTML
        var markerData = document.getElementById("marker-data").children;
        Array.from(markerData).forEach((item, index) => {
            var coords = JSON.parse(item.getAttribute("data-coords"));
            var title = item.getAttribute("data-title");

            // HTML-содержимое для кастомной метки с разделением на иконку и текст
            var markerContent = `
                <div class="map-marker">
                    <div class="map-marker-icon" style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 48px;
                        height: 48px;
                        border-radius: 5px;
                        box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
                        background: #fed400;">
                        <svg width="19" height="20" viewBox="0 0 19 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V5.25418L5.23193 0H0Z" />
                            <path d="M0 13.0872L12.6456 0.389617C11.7922 0.133588 10.7978 0 9.66235 0H9.27275L0 9.30983V13.0872Z" />
                            <path d="M17.4137 10.9276C17.0056 10.0594 16.3822 9.35064 15.551 8.80519C16.2746 7.85157 16.6382 6.73469 16.6382 5.46567C16.6382 4.69016 16.4972 3.9666 16.2152 3.2987C15.9889 2.75695 15.6549 2.27457 15.2319 1.85156L0 17.1429V20H11.0501C12.2375 20 13.269 19.8553 14.1447 19.5733C15.0204 19.2876 15.744 18.8794 16.3191 18.3451C16.8943 17.8108 17.321 17.1688 17.603 16.4193C17.885 15.6697 18.026 14.8274 18.026 13.8998C18.026 12.7903 17.8219 11.8033 17.4137 10.9313" />
                        </svg>
                    </div>
                    <div class="map-marker-text" style="
                    width: auto;
                     margin-top: 10px;
                    text-wrap: nowrap;
                    padding: 5px 10px;
                    margin-bottom: 10px;
                    border-radius: 2px;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 110%;
                    letter-spacing: -0.01em;
                    color: #000;
                    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
                    background: var(--white);">${title}</div>
                </div>`;

            // Метка с HTML-содержимым
            var marker = new ymaps.Placemark(coords, {
                hintContent: title,
                balloonContent: title
            }, {
                iconLayout: 'default#imageWithContent',
                iconContentLayout: ymaps.templateLayoutFactory.createClass(markerContent),
                iconImageSize: [48, 48],
                iconImageOffset: [-15, -30]
            });

            // Добовление метки на карту и в массив
            myMap.geoObjects.add(marker);
            markers.push(marker);
        });

        // Обработчики для кнопок
        document.querySelectorAll(".contacts-hero__content-list__item-btn").forEach(button => {
            button.addEventListener("click", function () {
                var index = this.getAttribute("data-marker");
                var marker = markers[index];
                if (marker) {
                    myMap.panTo(marker.geometry.getCoordinates(), { flying: true });
                }
            });
        });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contacts-feedback__content-form');
  const nameInput = document.getElementById('contacts-feedback-name');
  const telInput = document.getElementById('contacts-feedback-tel');


  telInput.addEventListener('input', () => {

    if (!telInput.value.startsWith('+7')) {
      telInput.value = '+7';
    }

    telInput.value = telInput.value.replace(/[^\d+]/g, '');

    if (telInput.value.length > 12) {
      telInput.value = telInput.value.slice(0, 12);
    }
  });

  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    nameInput.style.backgroundColor = '';
    telInput.style.backgroundColor = '';

    if (!nameInput.value.trim()) {
      nameInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
      isValid = false;
    }

    if (telInput.value.length < 12) {
      telInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});

/* Квариры */

document.addEventListener("DOMContentLoaded", () => {
  const sortingBtn = document.querySelector(".apartments-products__content-top__sorting-btn");
  const sortingList = document.querySelector(".apartments-products__content-top__sorting-list");
  const sortingItems = document.querySelectorAll(".apartments-products__content-top__sorting-list__item");

  // Открытие/закрытие списка при клике на кнопку
  sortingBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Чтобы клик не закрыл список
    sortingBtn.classList.toggle("active");
    sortingList.classList.toggle("active");
  });

  // Закрытие списка при клике вне области
  document.addEventListener("click", (event) => {
    if (!sortingList.contains(event.target) && !sortingBtn.contains(event.target)) {
      sortingBtn.classList.remove("active");
      sortingList.classList.remove("active");
    }
  });

  // Закрытие списка при уходе курсора
  sortingList.addEventListener("mouseleave", () => {
    sortingBtn.classList.remove("active");
    sortingList.classList.remove("active");
  });

  // Выбор элемента из списка
  sortingItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      // Удалить класс active у всех пунктов
      sortingItems.forEach((el) => el.classList.remove("active"));

      // Добавить класс active к выбранному элементу
      item.classList.add("active");

      // Установить текст выбранного элемента в кнопку
      const selectedText = item.querySelector("p").textContent;
      sortingBtn.querySelector("p").textContent = selectedText;

      // Закрыть список
      sortingBtn.classList.remove("active");
      sortingList.classList.remove("active");
    });
  });
});

/* Страница ЖК */

/* воспроизведение видео */

document.addEventListener("DOMContentLoaded", () => {
  // Получаем все контейнеры с видео
  const videoContainers = document.querySelectorAll('.popUp-video__content-block');

  videoContainers.forEach(container => {
      const video = container.querySelector('.popUp-video__content-block__video'); // Выбираем видео в контейнере
      const playButton = container.querySelector('.popUp-video__content-block__cards-play'); // Выбираем кнопку запуска в контейнере
      const cards = container.querySelector('.popUp-video__content-block__cards'); // Выбираем кнопку запуска в контейнере

      // Обработчик для кнопки запуска
      playButton.addEventListener('click', () => {
          video.style.display = 'block'; // Показать видео с элементами управления
          video.play(); // Запуск видео
          cards.classList.add('hidden'); // Скрыть кнопку запуска
      });
  });
});

/* hero */
document.addEventListener('DOMContentLoaded', () => {
  const heroBlock = document.querySelector('.residentialComplex-hero');
  const blocksContainer = document.querySelector('.residentialComplex-hero__images');
  const blocks = Array.from(document.querySelectorAll('.residentialComplex-hero__images img'));
  const paginationsContainer = document.querySelector('.residentialComplex-hero__content-control__paginations');
  const btnPrev = document.getElementById('residentialComplex-scroll-prev');
  const btnNext = document.getElementById('residentialComplex-scroll-next');
  const svgPrev = btnPrev.querySelector('svg');
  const svgNext = btnNext.querySelector('svg');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Создание пагинации
  function createPaginations() {
    paginationsContainer.innerHTML = ''; // Очищаем старые пагинации
    blocks.forEach((_, index) => {
      const span = document.createElement('span');
      if (index === currentIndex) {
        span.classList.add('active'); // Добавляем класс "active" текущему элементу
      }
      paginationsContainer.appendChild(span);
    });
  }

  function updatePagination() {
    const paginations = Array.from(paginationsContainer.children); // Получаем обновленный список пагинаций
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
    updateButtonOpacity();
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0);
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0;
    const distance = targetOffset - start;
    const duration = 500;
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  function updateButtonOpacity() {
    svgPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    svgNext.style.opacity = currentIndex === blocks.length - 1 ? '0.5' : '1';
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа
  heroBlock.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    endX = startX;
  });

  heroBlock.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  heroBlock.addEventListener('touchend', () => {
    const swipeDistance = startX - endX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0 && currentIndex < blocks.length - 1) {
        currentIndex++;
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--;
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  createPaginations(); // Создаем пагинацию
  updatePagination(); // Обновляем пагинацию при загрузке
});

/* Генплан */
document.addEventListener('DOMContentLoaded', () => {
  // Получаем все элементы списка "facilities" и "cards"
  const facilitiesItems = document.querySelectorAll('.residentialComplex-generalPlan__content-facilities__item');
  const cardsItems = document.querySelectorAll('.residentialComplex-generalPlan__content-cards__item');

  // Добавляем обработчик события для каждого элемента "facilities"
  facilitiesItems.forEach((facility, index) => {
    facility.addEventListener('click', (event) => {
      // Удаляем класс "active" у всех элементов "facilities" и "cards"
      facilitiesItems.forEach(fac => fac.classList.remove('active'));
      cardsItems.forEach(card => card.classList.remove('active'));

      // Добавляем класс "active" только к соответствующему элементу "facility" и "card"
      facility.classList.add('active');
      if (cardsItems[index]) {
        cardsItems[index].classList.add('active');
      }

      // Останавливаем всплытие, чтобы клик внутри элемента не считался кликом по документу
      event.stopPropagation();
    });
  });

  // Добавляем обработчик события для каждого элемента "cards"
  cardsItems.forEach(card => {
    card.addEventListener('click', (event) => {
      // Убираем класс "active" у этого элемента
      card.classList.remove('active');

      // Останавливаем всплытие, чтобы избежать закрытия по клику на саму карточку
      event.stopPropagation();
    });
  });

  // Обработчик клика на документе
  document.addEventListener('click', () => {
    // Удаляем класс "active" у всех элементов "facilities" и "cards"
    facilitiesItems.forEach(fac => fac.classList.remove('active'));
    cardsItems.forEach(card => card.classList.remove('active'));
  });
});

/* О нас */
document.addEventListener('DOMContentLoaded', () => {
  // Получаем все элементы списка "facilities" и "cards"
  const facilitiesItems = document.querySelectorAll('.residentialComplex-about__content-examples__btns button');
  const cardsItems = document.querySelectorAll('.residentialComplex-about__content-examples__images img');

  // Добавляем обработчик события для каждого элемента "facilities"
  facilitiesItems.forEach((facility, index) => {
    facility.addEventListener('click', () => {
      // Удаляем класс "active" у всех карточек
      cardsItems.forEach(card => card.classList.remove('active'));
      facilitiesItems.forEach(card => card.classList.remove('active'));

      // Добавляем класс "active" только к соответствующей карточке
      if (cardsItems[index]) {
        cardsItems[index].classList.add('active');
        facilitiesItems[index].classList.add('active');
      }
    });
  });
});

/* Преимущества */
document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.residentialComplex-advantages__content-blocks');
  const blocks = Array.from(document.querySelectorAll('.residentialComplex-advantages__content-blocks .residentialComplex-advantages__content-blocks__block'));
  const paginationsContainer = document.querySelector('.residentialComplex-advantages__content-paginations');
  const btnPrev = document.getElementById('residentialComplex-advantages-prev');
  const btnNext = document.getElementById('residentialComplex-advantages-next');
  const svgPrev = btnPrev.querySelector('svg');
  const svgNext = btnNext.querySelector('svg');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Создание пагинации
  function createPaginations() {
    paginationsContainer.innerHTML = ''; // Очищаем старые пагинации
    blocks.forEach((_, index) => {
      const span = document.createElement('span');
      if (index === currentIndex) {
        span.classList.add('active'); // Добавляем класс "active" текущему элементу
      }
      paginationsContainer.appendChild(span);
    });
  }

  function updatePagination() {
    const paginations = Array.from(paginationsContainer.children); // Получаем обновленный список пагинаций
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
    updateButtonOpacity();
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0);
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0;
    const distance = targetOffset - start;
    const duration = 500;
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  function updateButtonOpacity() {
    svgPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    svgNext.style.opacity = currentIndex === blocks.length - 1 ? '0.5' : '1';
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа на контейнере blocksContainer
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
    endX = startX; // Сбрасываем endX для начала
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Текущая позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0 && currentIndex < blocks.length - 1) {
        currentIndex++; // Свайп влево (вперед)
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--; // Свайп вправо (назад)
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  createPaginations(); // Создаем пагинацию
  updatePagination(); // Обновляем пагинацию при загрузке
});

document.addEventListener('DOMContentLoaded', () => {
  // Получаем все кнопки блока advantages и pop-up контенты
  const popUpAdvantages = document.querySelector('.popUp-advantages');
  const buttons = document.querySelectorAll('.residentialComplex-advantages__content-blocks__block');
  const popUps = document.querySelectorAll('.popUp-advantages__content');
  const closeButtons = document.querySelectorAll('.popUp-advantages__content-close');

  // Привязываем к каждой кнопке обработчик событий
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      // Добавляем класс active к соответствующему pop-up
      if (popUps[index]) {
        document.body.style.overflow = "hidden";
        popUpAdvantages.classList.add('active');
        popUps[index].classList.add('active');
      }
    });
  });

  // Привязываем обработчики к кнопкам закрытия pop-up
  closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      popUpAdvantages.classList.remove('active');
      document.body.style.overflow = "";
    });
  });
});

/* Инфраструктура */
document.addEventListener('DOMContentLoaded', () => {
  ymaps.ready(init);

  function init() {
      const map = new ymaps.Map("residentialComplex-map", {
          center: [55.751574, 37.573856],
          zoom: 10,
      });

      // Уникальные SVG для каждого типа
      const markerIcons = {
          school: `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 0.681641L0 4.2271L6.5 7.77255L11.8182 4.87119V8.95437H13V4.2271M2.36364 6.6971V9.06073L6.5 11.318L10.6364 9.06073V6.6971L6.5 8.95437L2.36364 6.6971Z" fill="black" />
                  </svg>`,
          kindergarten: `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.33459 1.02228L1.48035 1.31506L0.117852 3.22256C0.0307486 3.34464 -0.0102392 3.49365 0.00217645 3.6431C0.0145921 3.79255 0.0796066 3.93276 0.18566 4.03879L1.13624 4.98937C1.2303 5.08334 1.35153 5.14535 1.48278 5.16662C1.61402 5.18789 1.74863 5.16734 1.86755 5.10787L2.66224 4.71117L3.10077 5.29546L1.78897 9.49448L1.68124 9.4121C1.58594 9.33793 1.49496 9.25838 1.40874 9.17382C1.29219 9.05556 1.13388 8.98776 0.967866 8.98501C0.801847 8.98226 0.641381 9.04478 0.520981 9.15912C0.400581 9.27346 0.329864 9.43048 0.324042 9.59642C0.318219 9.76236 0.377756 9.92396 0.489846 10.0465L0.892892 10.4045C1.14448 10.6041 1.51394 10.864 2.00063 11.1219C2.97846 11.639 4.42525 12.146 6.33718 12.146C8.24911 12.146 9.69653 11.639 10.6737 11.1219C11.0641 10.9171 11.4349 10.6769 11.7815 10.4045C11.8791 10.3266 12.1966 10.0357 12.1845 10.0465C12.2917 9.93369 12.3537 9.78543 12.3586 9.62992C12.3635 9.47442 12.3111 9.32253 12.2113 9.2032C12.1114 9.08387 11.9712 9.00543 11.8172 8.98283C11.6633 8.96024 11.5064 8.99506 11.3765 9.08067L10.7238 5.81637C11.0552 6.12626 11.4133 6.60535 11.791 7.35948C11.8266 7.43653 11.8773 7.50564 11.9401 7.56272C12.0029 7.6198 12.0765 7.66368 12.1566 7.69176C12.2367 7.71984 12.3216 7.73154 12.4063 7.72618C12.491 7.72082 12.5738 7.6985 12.6497 7.66054C12.7256 7.62259 12.7931 7.56977 12.8482 7.50523C12.9033 7.44069 12.9449 7.36573 12.9705 7.28481C12.9961 7.20389 13.0052 7.11866 12.9972 7.03416C12.9892 6.94967 12.9643 6.86764 12.9241 6.79294C12.2549 5.45389 11.5388 4.69089 10.7396 4.29164C10.0698 3.95641 9.40439 3.91395 8.84037 3.90761H6.50068C6.43731 3.71574 6.36564 3.52671 6.28585 3.34106C6.02666 2.73649 5.59066 1.94815 4.88406 1.24155C4.14958 0.507068 3.39292 0.213022 2.79722 0.113527C2.55837 0.0739007 2.31576 0.0617809 2.07415 0.0774054C2.00254 0.0824752 1.78897 0.113527 1.74715 0.124301C1.65516 0.147393 1.56953 0.190835 1.49657 0.251426C1.42362 0.312016 1.36519 0.38821 1.32559 0.474388C1.286 0.560567 1.26626 0.654533 1.26781 0.749358C1.26937 0.844184 1.29219 0.93745 1.33459 1.02228ZM8.12807 10.6979L7.48168 8.97737H5.82513L5.14135 10.7999C5.51208 10.85 5.91005 10.8785 6.33655 10.8785C7.00132 10.8785 7.59765 10.8088 8.12681 10.6979H8.12807Z" fill="black" />
                        </svg>`,
          park: `<svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.4 10.9L7.8 7.65H9.75L7.15 4.4H8.45L5.2 0.5L1.95 4.4H3.25L0.65 7.65H2.6L0 10.9H4.55V13.5H5.85V10.9H10.4Z" fill="black" />
                </svg>`,
          cafe: `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.223 0.0540016C5.28917 0.0868032 5.34725 0.133856 5.39307 0.19178C5.43889 0.249703 5.47131 0.317057 5.488 0.389002C5.506 0.468002 6 2.582 6 4C6 4.95 5.558 5.797 4.87 6.346C4.62 6.546 4.5 6.764 4.5 6.946V7.432C4.5 7.45534 4.50133 7.47733 4.504 7.498C4.538 7.746 4.661 8.667 4.776 9.622C4.889 10.559 5 11.581 5 12C5 12.5304 4.78929 13.0391 4.41421 13.4142C4.03914 13.7893 3.53043 14 3 14C2.46957 14 1.96086 13.7893 1.58579 13.4142C1.21071 13.0391 1 12.5304 1 12C1 11.58 1.111 10.56 1.224 9.622C1.339 8.667 1.462 7.746 1.496 7.498L1.5 7.432V6.946C1.5 6.764 1.38 6.546 1.13 6.346C0.777482 6.06499 0.492828 5.70815 0.297195 5.302C0.101562 4.89584 -1.97261e-05 4.45082 2.87324e-09 4C2.87324e-09 2.587 0.49 0.484002 0.512 0.390002C0.537996 0.278842 0.600889 0.179769 0.690421 0.108943C0.779953 0.0381164 0.890841 -0.000285047 1.005 1.59311e-06C1.285 1.59311e-06 1.512 0.227002 1.512 0.507002V3.505C1.50806 3.57253 1.518 3.64015 1.54121 3.70369C1.56442 3.76723 1.6004 3.82534 1.64695 3.87443C1.69349 3.92351 1.7496 3.96254 1.81181 3.9891C1.87402 4.01566 1.94102 4.02919 2.00866 4.02884C2.07631 4.0285 2.14316 4.0143 2.2051 3.98711C2.26705 3.95992 2.32276 3.92033 2.3688 3.87077C2.41484 3.82121 2.45024 3.76275 2.4728 3.69898C2.49537 3.63521 2.50463 3.56749 2.5 3.5V0.500002C2.5 0.367393 2.55268 0.240216 2.64645 0.146448C2.74021 0.05268 2.86739 1.59311e-06 3 1.59311e-06C3.13261 1.59311e-06 3.25979 0.05268 3.35355 0.146448C3.44732 0.240216 3.5 0.367393 3.5 0.500002V3.526C3.50278 3.65728 3.55761 3.78208 3.65241 3.87294C3.74721 3.96381 3.87422 4.01329 4.0055 4.0105C4.13678 4.00772 4.26158 3.95289 4.35244 3.85809C4.4433 3.7633 4.49278 3.63628 4.49 3.505V0.505002C4.49 0.226002 4.716 1.59311e-06 4.996 1.59311e-06C5.018 1.59311e-06 5.116 1.61305e-06 5.223 0.0540016ZM7.5 4.5C7.5 3.30653 7.97411 2.16193 8.81802 1.31802C9.66193 0.474107 10.8065 1.59311e-06 12 1.59311e-06C12.1326 1.59311e-06 12.2598 0.05268 12.3536 0.146448C12.4473 0.240216 12.5 0.367393 12.5 0.500002V6.473L12.519 6.65C12.5985 7.39634 12.6749 8.14301 12.748 8.89C12.871 10.146 13 11.554 13 12C13 12.5304 12.7893 13.0391 12.4142 13.4142C12.0391 13.7893 11.5304 14 11 14C10.4696 14 9.96086 13.7893 9.58579 13.4142C9.21071 13.0391 9 12.5304 9 12C9 11.554 9.129 10.146 9.252 8.89C9.315 8.253 9.378 7.643 9.425 7.191L9.445 7H8.5C8.23478 7 7.98043 6.89464 7.79289 6.70711C7.60536 6.51957 7.5 6.26522 7.5 6V4.5Z" fill="black" />
                </svg>`,
          pharmacies: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8H8V12H4V8H0V4H4V0H8V4H12" fill="black" />
                      </svg>`,
          shops: `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4936 4.94561H10.6138L10.2132 2.5523C10.1325 2.19018 9.95524 1.85669 9.70024 1.58722C9.44524 1.31775 9.12202 1.12236 8.76491 1.02181C8.40599 0.906946 8.03233 0.844669 7.65556 0.836914H5.35469C4.97793 0.844669 4.60426 0.906946 4.24535 1.02181C3.88824 1.12236 3.56502 1.31775 3.31002 1.58722C3.05502 1.85669 2.87775 2.19018 2.79703 2.5523L2.39643 4.94561H0.516703C0.435802 4.94512 0.355929 4.96375 0.283592 4.99998C0.211255 5.03621 0.1485 5.08902 0.100441 5.1541C0.052381 5.21918 0.0203759 5.29469 0.00703301 5.37449C-0.00630985 5.45428 -0.000612953 5.5361 0.0236593 5.61328L1.95475 12.0845C2.05306 12.3971 2.24849 12.6702 2.51264 12.8642C2.77679 13.0581 3.0959 13.1628 3.42361 13.163H9.58665C9.9126 13.1606 10.2294 13.0549 10.4915 12.8611C10.7536 12.6673 10.9475 12.3954 11.0452 12.0845L12.9763 5.61328C13.0003 5.53692 13.0062 5.45602 12.9934 5.37701C12.9806 5.298 12.9495 5.22307 12.9026 5.15821C12.8557 5.09335 12.7943 5.04035 12.7233 5.00344C12.6523 4.96653 12.5736 4.94672 12.4936 4.94561ZM3.44415 4.94561L3.81393 2.71664C3.85447 2.53465 3.94851 2.36894 4.08396 2.24081C4.21941 2.11269 4.39008 2.02799 4.57404 1.99762C4.82673 1.9175 5.08968 1.87333 5.35469 1.86409H7.65556C7.92468 1.87299 8.18833 1.9175 8.44649 1.99762C8.63045 2.02799 8.80112 2.11269 8.93657 2.24081C9.07203 2.36894 9.16606 2.53465 9.2066 2.71664L9.56611 4.94561H3.40306H3.44415Z" fill="black" />
                  </svg>`,
          entertainments: `<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.0539563 13.0175L2.79952 5.50739C2.86013 5.35242 2.95419 5.23321 3.08171 5.14977C3.20923 5.06632 3.34548 5.0246 3.49046 5.0246C3.58743 5.0246 3.67834 5.04248 3.76319 5.07824C3.84805 5.114 3.92684 5.16765 3.99957 5.23917L8.90885 10.0671C8.98158 10.1386 9.03613 10.2161 9.07249 10.2995C9.10886 10.383 9.12704 10.4724 9.12704 10.5678C9.12704 10.7108 9.08461 10.845 8.99976 10.9704C8.91491 11.0958 8.79369 11.1881 8.63611 11.2472L0.999448 13.9473C0.853988 14.0069 0.714588 14.0159 0.58125 13.9745C0.447911 13.933 0.332755 13.8643 0.235782 13.7685C0.138808 13.6726 0.0689871 13.5594 0.0263188 13.4287C-0.0163496 13.2981 -0.00713702 13.161 0.0539563 13.0175ZM14.8364 3.73716C14.7273 3.84444 14.6 3.89809 14.4545 3.89809C14.3091 3.89809 14.1818 3.84444 14.0727 3.73716L14.0181 3.68351C13.8484 3.51662 13.6363 3.43318 13.3818 3.43318C13.1272 3.43318 12.9151 3.51662 12.7454 3.68351L9.05431 7.31338C8.94522 7.42067 8.81794 7.47431 8.67248 7.47431C8.52702 7.47431 8.39974 7.42067 8.29064 7.31338C8.18155 7.2061 8.127 7.08093 8.127 6.93788C8.127 6.79483 8.18155 6.66966 8.29064 6.56238L11.9817 2.93251C12.3696 2.55104 12.8363 2.36031 13.3818 2.36031C13.9272 2.36031 14.3939 2.55104 14.7818 2.93251L14.8364 2.98615C14.9455 3.09344 15 3.2186 15 3.36165C15 3.5047 14.9455 3.62987 14.8364 3.73716ZM5.34507 1.59142C5.45417 1.48413 5.58145 1.43049 5.72691 1.43049C5.87237 1.43049 5.99964 1.48413 6.10874 1.59142L6.19965 1.68083C6.58755 2.06229 6.78149 2.51528 6.78149 3.03979C6.78149 3.56431 6.58755 4.01729 6.19965 4.39876L6.1451 4.4524C6.03601 4.55969 5.90873 4.61333 5.76327 4.61333C5.61781 4.61333 5.49053 4.55969 5.38144 4.4524C5.27234 4.34512 5.2178 4.21995 5.2178 4.0769C5.2178 3.93385 5.27234 3.80868 5.38144 3.70139L5.43599 3.64775C5.60569 3.48086 5.69054 3.27821 5.69054 3.03979C5.69054 2.80138 5.60569 2.59872 5.43599 2.43183L5.34507 2.34243C5.23598 2.23514 5.18143 2.10997 5.18143 1.96692C5.18143 1.82388 5.23598 1.69871 5.34507 1.59142ZM8.29064 0.16093C8.39974 0.0536435 8.52702 0 8.67248 0C8.81794 0 8.94522 0.0536435 9.05431 0.16093L9.83616 0.929819C10.2241 1.31128 10.418 1.77023 10.418 2.30667C10.418 2.8431 10.2241 3.30205 9.83616 3.68351L7.59971 5.88289C7.49061 5.99018 7.36333 6.04382 7.21787 6.04382C7.07241 6.04382 6.94514 5.99018 6.83604 5.88289C6.72695 5.77561 6.6724 5.65044 6.6724 5.50739C6.6724 5.36434 6.72695 5.23917 6.83604 5.13189L9.07249 2.93251C9.2422 2.76562 9.32705 2.557 9.32705 2.30667C9.32705 2.05633 9.2422 1.84772 9.07249 1.68083L8.29064 0.911938C8.18155 0.804651 8.127 0.679483 8.127 0.536434C8.127 0.393385 8.18155 0.268217 8.29064 0.16093ZM14.1091 8.74387C14 8.85116 13.8727 8.9048 13.7272 8.9048C13.5818 8.9048 13.4545 8.85116 13.3454 8.74387L12.5635 7.97499C12.3938 7.80809 12.1817 7.72465 11.9272 7.72465C11.6726 7.72465 11.4605 7.80809 11.2908 7.97499L10.5089 8.74387C10.3998 8.85116 10.2725 8.9048 10.1271 8.9048C9.98162 8.9048 9.85434 8.85116 9.74525 8.74387C9.63615 8.63659 9.5816 8.51142 9.5816 8.36837C9.5816 8.22532 9.63615 8.10015 9.74525 7.99287L10.5271 7.22398C10.915 6.84251 11.3817 6.65178 11.9272 6.65178C12.4726 6.65178 12.9393 6.84251 13.3272 7.22398L14.1091 7.99287C14.2182 8.10015 14.2727 8.22532 14.2727 8.36837C14.2727 8.51142 14.2182 8.63659 14.1091 8.74387Z" fill="black" />
                          </svg>`,
      };

      const markerData = Array.from(document.querySelectorAll("#marker-data > div")).map((el) => ({
        type: el.getAttribute("data-type"),
        title: el.getAttribute("data-title"),
        coords: el.getAttribute("data-coords").split(",").map(Number),
        text: el.getAttribute("data-text"),
    }));

    const markerTypes = {};
    const allMarkers = [];

    // Создание меток
    markerData.forEach(({ type, coords, text, title }) => {
        if (!markerTypes[type]) {
            markerTypes[type] = { name: title, count: 0 };
        }
        markerTypes[type].count++;

        const marker = new ymaps.Placemark(
            coords,
            { balloonContent: text },
            {
                iconLayout: "default#imageWithContent",
                iconImageHref: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(markerIcons[type]),
                iconImageSize: [20, 20],
                iconImageOffset: [-10, -10],
            }
        );

        marker.events.add("click", () => {
            const infoDiv = document.getElementById("marker-info");
            infoDiv.innerHTML = `<p>${text}</p><p>Координаты: ${coords.join(", ")}</p>`;
        });

        map.geoObjects.add(marker);
        allMarkers.push({ marker, type });
    });

    // Функция обновления кнопок фильтрации
    function updateFilterButtons() {
        const filterDiv = document.getElementById("filter-buttons");
        filterDiv.innerHTML = "";

        // Кнопка "Все"
        const allButton = createFilterButton(
            "Все",
            allMarkers.length,
            "all",
            () => showMarkers(),
            `<svg width="13" height="12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="6" fill="grey" /></svg>`
        );
        filterDiv.appendChild(allButton);

        // Установить кнопку "Все" активной
       setActiveButton(allButton);

        // Кнопки для каждого типа
        Object.entries(markerTypes).forEach(([type, data]) => {
            const button = createFilterButton(
                data.name, // Используем пользовательский заголовок
                data.count,
                type,
                () => showMarkers(type),
                markerIcons[type]
            );
            filterDiv.appendChild(button);
        });
    }

    // Создание кнопки
    function createFilterButton(label, count, type, onClick, svg) {
        const button = document.createElement("button");
        button.className = "filter-button";
        button.setAttribute("data-type", type);
        button.innerHTML = `
            ${svg}
            <p>${label}</p>
            <p class="volue">${count}</p>
        `;
        button.addEventListener("click", () => {
            onClick();
            setActiveButton(button);
        });
        return button;
    }

    // Установка активной кнопки
    function setActiveButton(button) {
        document.querySelectorAll(".filter-button").forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
    }

    // Показ меток
    function showMarkers(type = null) {
        map.geoObjects.removeAll();
        allMarkers
            .filter(({ type: t }) => !type || t === type)
            .forEach(({ marker }) => map.geoObjects.add(marker));
    }

    updateFilterButtons();
  }

});

/* Места поблизости */
document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.residentialComplex-placesNearby__content-blocks');
  const blocks = Array.from(document.querySelectorAll('.residentialComplex-placesNearby__content-blocks__block'));
  const paginationsContainer = document.querySelector('.residentialComplex-placesNearby__content-paginations');
  const btnPrev = document.getElementById('residentialComplex-placesNearby-prev');
  const btnNext = document.getElementById('residentialComplex-placesNearby-next');
  const svgPrev = btnPrev.querySelector('svg');
  const svgNext = btnNext.querySelector('svg');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Создание пагинации
  function createPaginations() {
    paginationsContainer.innerHTML = ''; // Очищаем старые пагинации
    blocks.forEach((_, index) => {
      const span = document.createElement('span');
      if (index === currentIndex) {
        span.classList.add('active'); // Добавляем класс "active" текущему элементу
      }
      paginationsContainer.appendChild(span);
    });
  }

  function updatePagination() {
    const paginations = Array.from(paginationsContainer.children); // Получаем обновленный список пагинаций
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
    updateButtonOpacity();
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0);
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0;
    const distance = targetOffset - start;
    const duration = 500;
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  function updateButtonOpacity() {
    svgPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    svgNext.style.opacity = currentIndex === blocks.length - 1 ? '0.5' : '1';
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа на контейнере blocksContainer
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
    endX = startX; // Сбрасываем endX для начала
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Текущая позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0 && currentIndex < blocks.length - 1) {
        currentIndex++; // Свайп влево (вперед)
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--; // Свайп вправо (назад)
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  createPaginations(); // Создаем пагинацию
  updatePagination(); // Обновляем пагинацию при загрузке
});

/* Видео */
document.addEventListener('DOMContentLoaded', () => {
  const switchingButtons = document.querySelectorAll('.residentialComplex-video__content-top__switching button');
  const contentBlocks = document.querySelectorAll('.residentialComplex-video__content');
  const parentBlock = document.querySelector('.residentialComplex-video .content-container');

  const updateParentHeight = () => {
    const activeBlock = document.querySelector('.residentialComplex-video__content.active');
    if (activeBlock && parentBlock) {
      const activeHeight = activeBlock.offsetHeight;
      parentBlock.style.height = `${activeHeight}px`;
    }
  };

  // Добавляем обработчик на кнопки переключения
  switchingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Удаляем классы "active" у всех кнопок и блоков
      switchingButtons.forEach(btn => btn.classList.remove('active'));
      contentBlocks.forEach(block => block.classList.remove('active'));

      // Добавляем "active" текущей кнопке
      button.classList.add('active');

      // Определяем, какой блок должен стать активным
      const targetClass = button.textContent.trim() === 'Жилой комплекс'
        ? 'video-residentialComplex'
        : 'video-district';

      const targetBlock = document.querySelector(`.${targetClass}`);
      if (targetBlock) {
        targetBlock.classList.add('active');
      }

      // Обновляем высоту родительского блока
      updateParentHeight();
    });
  });

  // Инициализация: показать активный блок при загрузке страницы
  const activeButton = document.querySelector('.residentialComplex-video__content-top__switching button.active');
  if (activeButton) {
    activeButton.click();
  }

  // Обновляем высоту родительского блока при загрузке страницы
  updateParentHeight();
});

document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.residentialComplex-video-blocks');
  const blocks = Array.from(document.querySelectorAll('.residentialComplex-video-blocks .residentialComplex-video__content-blocks__block'));
  const paginationsContainer = document.querySelector('.video-residentialComplex .residentialComplex-video__content-paginations');
  const btnPrev = document.getElementById('video-residentialComplex-prev');
  const btnNext = document.getElementById('video-residentialComplex-next');
  const svgPrev = btnPrev.querySelector('svg');
  const svgNext = btnNext.querySelector('svg');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Создание пагинации
  function createPaginations() {
    paginationsContainer.innerHTML = ''; // Очищаем старые пагинации
    blocks.forEach((_, index) => {
      const span = document.createElement('span');
      if (index === currentIndex) {
        span.classList.add('active'); // Добавляем класс "active" текущему элементу
      }
      paginationsContainer.appendChild(span);
    });
  }

  function updatePagination() {
    const paginations = Array.from(paginationsContainer.children); // Получаем обновленный список пагинаций
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
    updateButtonOpacity();
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0);
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0;
    const distance = targetOffset - start;
    const duration = 500;
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  function updateButtonOpacity() {
    svgPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    svgNext.style.opacity = currentIndex === blocks.length - 1 ? '0.5' : '1';
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа на контейнере blocksContainer
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
    endX = startX; // Сбрасываем endX для начала
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Текущая позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0 && currentIndex < blocks.length - 1) {
        currentIndex++; // Свайп влево (вперед)
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--; // Свайп вправо (назад)
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  createPaginations(); // Создаем пагинацию
  updatePagination(); // Обновляем пагинацию при загрузке
});

document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.district-video-blocks');
  const blocks = Array.from(document.querySelectorAll('.district-video-blocks .residentialComplex-video__content-blocks__block'));
  const paginationsContainer = document.querySelector('.video-district .residentialComplex-video__content-paginations');
  const btnPrev = document.getElementById('video-district-prev');
  const btnNext = document.getElementById('video-district-next');
  const svgPrev = btnPrev.querySelector('svg');
  const svgNext = btnNext.querySelector('svg');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Создание пагинации
  function createPaginations() {
    paginationsContainer.innerHTML = ''; // Очищаем старые пагинации
    blocks.forEach((_, index) => {
      const span = document.createElement('span');
      if (index === currentIndex) {
        span.classList.add('active'); // Добавляем класс "active" текущему элементу
      }
      paginationsContainer.appendChild(span);
    });
  }

  function updatePagination() {
    const paginations = Array.from(paginationsContainer.children); // Получаем обновленный список пагинаций
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
    updateButtonOpacity();
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0);
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0;
    const distance = targetOffset - start;
    const duration = 500;
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  function updateButtonOpacity() {
    svgPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    svgNext.style.opacity = currentIndex === blocks.length - 1 ? '0.5' : '1';
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа на контейнере blocksContainer
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
    endX = startX; // Сбрасываем endX для начала
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Текущая позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0 && currentIndex < blocks.length - 1) {
        currentIndex++; // Свайп влево (вперед)
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--; // Свайп вправо (назад)
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  createPaginations(); // Создаем пагинацию
  updatePagination(); // Обновляем пагинацию при загрузке
});

/* Дизайн квартир */
document.addEventListener('DOMContentLoaded', () => {
  // Находим все popUp-design
  const popUps = document.querySelectorAll('.popUp-design');

  popUps.forEach(popUp => {
    const contents = popUp.querySelectorAll('.popUp-design__content');

    contents.forEach(content => {
      const prevButton = content.querySelector('.popUp-design-scroll-prev');
      const nextButton = content.querySelector('.popUp-design-scroll-next');
      const imagesWrapper = content.querySelector('.popUp-design__content-images');
      const images = content.querySelectorAll('.popUp-design__content-images__img');
      const nowElement = popUp.querySelector('.now'); // Текущая фотография
      const totalElement = popUp.querySelector('.total'); // Общее количество фотографий

      let currentIndex = 0; // Текущий индекс изображения для данного блока
      let totalImages = images.length; // Количество изображений для данного блока
      let isAnimating = false; // Флаг для предотвращения одновременных анимаций

      let touchStartX = 0; // Начальная точка касания
      let touchMoveX = 0; // Текущая точка касания

      // Функция для обновления общего количества изображений
      const updateTotal = () => {
        if (content.classList.contains('active')) {
          totalImages = images.length; // Пересчитываем количество изображений только для активного блока
          totalElement.textContent = totalImages;
        }
      };

      // Функция для вычисления ширины и отступа
      const calculateOffset = () => {
        const imageWidth = images[0].offsetWidth; // Текущая ширина изображения
        const imageMarginRight = parseFloat(getComputedStyle(images[0]).marginRight); // Отступ справа
        return imageWidth + imageMarginRight;
      };

      // Функция анимации
      const animateScroll = (start, end, duration) => {
        const startTime = performance.now();

        const step = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const value = start + (end - start) * progress;

          imagesWrapper.style.transform = `translateX(${value}px)`;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            isAnimating = false; // Анимация завершена
          }
        };

        requestAnimationFrame(step);
      };

      // Функция для обновления отображения
      const updateView = (newIndex) => {
        if (isAnimating || !content.classList.contains('active')) return; // Проверяем наличие класса active
        isAnimating = true;

        const offset = calculateOffset();
        const startOffset = -currentIndex * offset;
        const endOffset = -newIndex * offset;

        animateScroll(startOffset, endOffset, 300); // 300ms на анимацию

        currentIndex = newIndex;
        nowElement.textContent = currentIndex + 1; // Обновляем текущую фотографию
      };

      // Обработчик нажатия кнопки "Предыдущий"
      prevButton.addEventListener('click', () => {
        if (!content.classList.contains('active') || isAnimating) return;
        const newIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
        updateView(newIndex);
      });

      // Обработчик нажатия кнопки "Следующий"
      nextButton.addEventListener('click', () => {
        if (!content.classList.contains('active') || isAnimating) return;
        const newIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        updateView(newIndex);
      });

      // Установка начального положения
      imagesWrapper.style.transform = `translateX(0px)`; // Начальная позиция

      // Пересчет при изменении размера окна
      window.addEventListener('resize', () => {
        if (!content.classList.contains('active')) return;
        if (currentIndex === 0) {
          imagesWrapper.style.transform = `translateX(0px)`;
        } else {
          const offset = calculateOffset();
          imagesWrapper.style.transform = `translateX(${-currentIndex * offset}px)`;
        }
      });

      // Свайп: обработчики touch
      imagesWrapper.addEventListener('touchstart', (e) => {
        if (!content.classList.contains('active') || isAnimating) return;
        touchStartX = e.touches[0].clientX; // Запоминаем начальную точку касания
      });

      imagesWrapper.addEventListener('touchmove', (e) => {
        if (!content.classList.contains('active') || isAnimating) return;
        touchMoveX = e.touches[0].clientX; // Обновляем текущую точку
      });

      imagesWrapper.addEventListener('touchend', () => {
        if (!content.classList.contains('active') || isAnimating) return;

        const swipeDistance = touchStartX - touchMoveX; // Расчет расстояния свайпа
        const offset = calculateOffset();

        if (Math.abs(swipeDistance) > offset * 0.2) { // Условие для минимального расстояния свайпа
          if (swipeDistance > 0) {
            // Свайп влево
            const newIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateView(newIndex);
          } else {
            // Свайп вправо
            const newIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
            updateView(newIndex);
          }
        }
      });

      // Обновление total при активации
      const observer = new MutationObserver(() => {
        updateTotal(); // Обновляем общее количество изображений для активного блока
      });

      observer.observe(content, { attributes: true, attributeFilter: ['class'] });

      // Инициализация
      updateTotal();
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.residentialComplex-design__content-blocks');
  const blocks = Array.from(document.querySelectorAll('.residentialComplex-design__content-blocks__block'));
  const paginationsContainer = document.querySelector('.residentialComplex-design__content-paginations');
  const btnPrev = document.getElementById('residentialComplex-design-prev');
  const btnNext = document.getElementById('residentialComplex-design-next');
  const svgPrev = btnPrev.querySelector('svg');
  const svgNext = btnNext.querySelector('svg');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Создание пагинации
  function createPaginations() {
    paginationsContainer.innerHTML = ''; // Очищаем старые пагинации
    blocks.forEach((_, index) => {
      const span = document.createElement('span');
      if (index === currentIndex) {
        span.classList.add('active'); // Добавляем класс "active" текущему элементу
      }
      paginationsContainer.appendChild(span);
    });
  }

  function updatePagination() {
    const paginations = Array.from(paginationsContainer.children); // Получаем обновленный список пагинаций
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
    updateButtonOpacity();
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0);
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0;
    const distance = targetOffset - start;
    const duration = 500;
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  function updateButtonOpacity() {
    svgPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    svgNext.style.opacity = currentIndex === blocks.length - 1 ? '0.5' : '1';
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа на контейнере blocksContainer
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
    endX = startX; // Сбрасываем endX для начала
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Текущая позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0 && currentIndex < blocks.length - 1) {
        currentIndex++; // Свайп влево (вперед)
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--; // Свайп вправо (назад)
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  createPaginations(); // Создаем пагинацию
  updatePagination(); // Обновляем пагинацию при загрузке
});


/* Этапы строительства */
document.addEventListener("DOMContentLoaded", () => {
  // Находим все блоки с классом sorting-block
  const sortingBlocks = document.querySelectorAll(".residentialComplex-stages__content-top__sorting-block");

  // Для каждого блока применяем функциональность
  sortingBlocks.forEach((block) => {
    const sortingBtn = block.querySelector(".residentialComplex-stages__content-top__sorting-block__btn");
    const sortingList = block.querySelector(".residentialComplex-stages__content-top__sorting-block__list");
    const sortingItems = block.querySelectorAll(".residentialComplex-stages__content-top__sorting-block__list-item");

    // Открытие/закрытие списка при клике на кнопку
    sortingBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Чтобы клик не закрыл список
      sortingBtn.classList.toggle("active");
      sortingList.classList.toggle("active");
    });

    // Закрытие списка при клике вне области
    document.addEventListener("click", (event) => {
      if (!sortingList.contains(event.target) && !sortingBtn.contains(event.target)) {
        sortingBtn.classList.remove("active");
        sortingList.classList.remove("active");
      }
    });

    // Закрытие списка при уходе курсора
    sortingList.addEventListener("mouseleave", () => {
      sortingBtn.classList.remove("active");
      sortingList.classList.remove("active");
    });

    // Выбор элемента из списка
    sortingItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        // Удалить класс active у всех пунктов
        sortingItems.forEach((el) => el.classList.remove("active"));

        // Добавить класс active к выбранному элементу
        item.classList.add("active");

        // Установить текст выбранного элемента в кнопку
        const selectedText = item.querySelector("p").textContent;
        sortingBtn.querySelector("p").textContent = selectedText;

        // Закрыть список
        sortingBtn.classList.remove("active");
        sortingList.classList.remove("active");
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Находим все popUp-design
  const popUps = document.querySelectorAll('.popUp-stages');

  popUps.forEach(popUp => {
    const contents = popUp.querySelectorAll('.popUp-stages__content');

    contents.forEach(content => {
      const prevButton = content.querySelector('.popUp-stages-scroll-prev');
      const nextButton = content.querySelector('.popUp-stages-scroll-next');
      const imagesWrapper = content.querySelector('.popUp-stages__content-images');
      const images = content.querySelectorAll('.popUp-stages__content-images__img');
      const nowElement = popUp.querySelector('.now'); // Текущая фотография
      const totalElement = popUp.querySelector('.total'); // Общее количество фотографий

      let currentIndex = 0; // Текущий индекс изображения для данного блока
      let totalImages = images.length; // Количество изображений для данного блока
      let isAnimating = false; // Флаг для предотвращения одновременных анимаций

      let touchStartX = 0; // Начальная точка касания
      let touchMoveX = 0; // Текущая точка касания

      // Функция для обновления общего количества изображений
      const updateTotal = () => {
        if (content.classList.contains('active')) {
          totalImages = images.length; // Пересчитываем количество изображений только для активного блока
          totalElement.textContent = totalImages;
        }
      };

      // Функция для вычисления ширины и отступа
      const calculateOffset = () => {
        const imageWidth = images[0].offsetWidth; // Текущая ширина изображения
        const imageMarginRight = parseFloat(getComputedStyle(images[0]).marginRight); // Отступ справа
        return imageWidth + imageMarginRight;
      };

      // Функция анимации
      const animateScroll = (start, end, duration) => {
        const startTime = performance.now();

        const step = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const value = start + (end - start) * progress;

          imagesWrapper.style.transform = `translateX(${value}px)`;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            isAnimating = false; // Анимация завершена
          }
        };

        requestAnimationFrame(step);
      };

      // Функция для обновления отображения
      const updateView = (newIndex) => {
        if (isAnimating || !content.classList.contains('active')) return; // Проверяем наличие класса active
        isAnimating = true;

        const offset = calculateOffset();
        const startOffset = -currentIndex * offset;
        const endOffset = -newIndex * offset;

        animateScroll(startOffset, endOffset, 300); // 300ms на анимацию

        currentIndex = newIndex;
        nowElement.textContent = currentIndex + 1; // Обновляем текущую фотографию
      };

      // Обработчик нажатия кнопки "Предыдущий"
      prevButton.addEventListener('click', () => {
        if (!content.classList.contains('active') || isAnimating) return;
        const newIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
        updateView(newIndex);
      });

      // Обработчик нажатия кнопки "Следующий"
      nextButton.addEventListener('click', () => {
        if (!content.classList.contains('active') || isAnimating) return;
        const newIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        updateView(newIndex);
      });

      // Установка начального положения
      imagesWrapper.style.transform = `translateX(0px)`; // Начальная позиция

      // Пересчет при изменении размера окна
      window.addEventListener('resize', () => {
        if (!content.classList.contains('active')) return;
        if (currentIndex === 0) {
          imagesWrapper.style.transform = `translateX(0px)`;
        } else {
          const offset = calculateOffset();
          imagesWrapper.style.transform = `translateX(${-currentIndex * offset}px)`;
        }
      });

      // Свайп: обработчики touch
      imagesWrapper.addEventListener('touchstart', (e) => {
        if (!content.classList.contains('active') || isAnimating) return;
        touchStartX = e.touches[0].clientX; // Запоминаем начальную точку касания
      });

      imagesWrapper.addEventListener('touchmove', (e) => {
        if (!content.classList.contains('active') || isAnimating) return;
        touchMoveX = e.touches[0].clientX; // Обновляем текущую точку
      });

      imagesWrapper.addEventListener('touchend', () => {
        if (!content.classList.contains('active') || isAnimating) return;

        const swipeDistance = touchStartX - touchMoveX; // Расчет расстояния свайпа
        const offset = calculateOffset();

        if (Math.abs(swipeDistance) > offset * 0.2) { // Условие для минимального расстояния свайпа
          if (swipeDistance > 0) {
            // Свайп влево
            const newIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateView(newIndex);
          } else {
            // Свайп вправо
            const newIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
            updateView(newIndex);
          }
        }
      });

      // Обновление total при активации
      const observer = new MutationObserver(() => {
        updateTotal(); // Обновляем общее количество изображений для активного блока
      });

      observer.observe(content, { attributes: true, attributeFilter: ['class'] });

      // Инициализация
      updateTotal();
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.residentialComplex-stages__content-blocks');
  const blocks = Array.from(document.querySelectorAll('.residentialComplex-stages__content-blocks__block'));
  const paginationsContainer = document.querySelector('.residentialComplex-stages__content-paginations');
  const btnPrev = document.getElementById('residentialComplex-stages-prev');
  const btnNext = document.getElementById('residentialComplex-stages-next');
  const svgPrev = btnPrev.querySelector('svg');
  const svgNext = btnNext.querySelector('svg');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Создание пагинации
  function createPaginations() {
    paginationsContainer.innerHTML = ''; // Очищаем старые пагинации
    blocks.forEach((_, index) => {
      const span = document.createElement('span');
      if (index === currentIndex) {
        span.classList.add('active'); // Добавляем класс "active" текущему элементу
      }
      paginationsContainer.appendChild(span);
    });
  }

  function updatePagination() {
    const paginations = Array.from(paginationsContainer.children); // Получаем обновленный список пагинаций
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
    updateButtonOpacity();
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0);
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0;
    const distance = targetOffset - start;
    const duration = 500;
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  function updateButtonOpacity() {
    svgPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    svgNext.style.opacity = currentIndex === blocks.length - 1 ? '0.5' : '1';
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа на контейнере blocksContainer
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
    endX = startX; // Сбрасываем endX для начала
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Текущая позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0 && currentIndex < blocks.length - 1) {
        currentIndex++; // Свайп влево (вперед)
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--; // Свайп вправо (назад)
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  createPaginations(); // Создаем пагинацию
  updatePagination(); // Обновляем пагинацию при загрузке
});

/* документы */
document.addEventListener('DOMContentLoaded', () => {
  // Получаем все элементы списка "facilities" и "cards"
  const facilitiesItems = document.querySelectorAll('.residentialComplex-documents__content-top__btns button');
  const cardsItems = document.querySelectorAll('.residentialComplex-documents__content-blocks__block');

  // Добавляем обработчик события для каждого элемента "facilities"
  facilitiesItems.forEach((facility, index) => {
    facility.addEventListener('click', () => {
      // Удаляем класс "active" у всех карточек
      cardsItems.forEach(card => card.classList.remove('active'));
      facilitiesItems.forEach(card => card.classList.remove('active'));

      // Добавляем класс "active" только к соответствующей карточке
      if (cardsItems[index]) {
        cardsItems[index].classList.add('active');
        facilitiesItems[index].classList.add('active');
      }
    });
  });
});


/* Модальные окна */
document.addEventListener('DOMContentLoaded', () => {
  // Получаем все кнопки блока advantages и pop-up контенты
  const popUpAdvantages = document.querySelector('.popUp-video__residentialComplex');
  const buttons = document.querySelectorAll('.video-residentialComplex .residentialComplex-video__content-blocks__block-btn');
  const popUps = document.querySelectorAll('.popUp-video__residentialComplex .popUp-video__content-block');
  const closeButtons = document.querySelectorAll('.popUp-video__top-close');

  // Привязываем к каждой кнопке обработчик событий
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      // Добавляем класс active к соответствующему pop-up
      if (popUps[index]) {
        document.body.style.overflow = "hidden";
        popUpAdvantages.classList.add('active');
        popUps[index].classList.add('active');
      }
    });
  });

  // Привязываем обработчики к кнопкам закрытия pop-up
  closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      popUpAdvantages.classList.remove('active');
      document.body.style.overflow = "";
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Получаем все кнопки блока advantages и pop-up контенты
  const popUpAdvantages = document.querySelector('.popUp-video__district');
  const buttons = document.querySelectorAll('.video-district .residentialComplex-video__content-blocks__block-btn');
  const popUps = document.querySelectorAll('.popUp-video__district .popUp-video__content-block');
  const closeButtons = document.querySelectorAll('.popUp-video__top-close');

  // Привязываем к каждой кнопке обработчик событий
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      // Добавляем класс active к соответствующему pop-up
      if (popUps[index]) {
        document.body.style.overflow = "hidden";
        popUpAdvantages.classList.add('active');
        popUps[index].classList.add('active');
      }
    });
  });

  // Привязываем обработчики к кнопкам закрытия pop-up
  closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      popUpAdvantages.classList.remove('active');
      document.body.style.overflow = "";
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Получаем все кнопки блока advantages и pop-up контенты
  const popUpAdvantages = document.querySelector('.popUp-design');
  const buttons = document.querySelectorAll('.residentialComplex-design__content-blocks__block-btn');
  const popUps = document.querySelectorAll('.popUp-design__content');
  const closeButtons = document.querySelectorAll('.popUp-design__top-close');

  // Привязываем к каждой кнопке обработчик событий
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      // Добавляем класс active к соответствующему pop-up
      if (popUps[index]) {
        document.body.style.overflow = "hidden";
        popUpAdvantages.classList.add('active');
        popUps[index].classList.add('active');
      }
    });
  });

  // Привязываем обработчики к кнопкам закрытия pop-up
  closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      popUpAdvantages.classList.remove('active');
      document.body.style.overflow = "";
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Получаем все кнопки блока advantages и pop-up контенты
  const popUpAdvantages = document.querySelector('.popUp-stages');
  const buttons = document.querySelectorAll('.residentialComplex-stages__content-blocks__block');
  const popUps = document.querySelectorAll('.popUp-stages__content');
  const closeButtons = document.querySelectorAll('.popUp-stages__top-close');
  const popUpTitle = document.querySelector('.popUp-stages__top-title');
  const nameElement = popUpTitle.querySelector('.name');
  const dateElement = popUpTitle.querySelector('.date');

  // Привязываем к каждой кнопке обработчик событий
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));

      // Добавляем класс active к соответствующему pop-up
      if (popUps[index]) {
        // Извлекаем текст из карточки
        const nameText = button.querySelector('.name')?.textContent || 'Имя отсутствует';
        const dateText = button.querySelector('.date')?.textContent || 'Дата отсутствует';

        // Вставляем текст в pop-up
        nameElement.textContent = nameText;
        dateElement.textContent = dateText;

        // Показываем pop-up
        document.body.style.overflow = "hidden";
        popUpAdvantages.classList.add('active');
        popUps[index].classList.add('active');
      }
    });
  });

  // Привязываем обработчики к кнопкам закрытия pop-up
  closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      // Удаляем класс active у всех pop-up
      popUps.forEach(popUp => popUp.classList.remove('active'));
      popUpAdvantages.classList.remove('active');
      document.body.style.overflow = "";
    });
  });
});


/* Страница квартиры */
document.addEventListener("DOMContentLoaded", () => {
  // Кнопки для управления содержимым
  const planBtn = document.getElementById("apartmentPage-plan-btn");
  const floorPlanBtn = document.getElementById("apartmentPage-floorPlan-btn");
  const generalPlanBtn = document.getElementById("apartmentPage-generalPlan-btn");
  const planImg = document.getElementById("apartmentPage-plan-img");
  const floorPlanImg = document.getElementById("apartmentPage-floorPlan-img");
  const generalPlanImg = document.getElementById("apartmentPage-generalPlan-img");
  const closeBtn = document.querySelector(".popUp-plan-close");

  // Контейнер и блоки содержимого
  const popUpPlan = document.querySelector(".popUp-plan");
  const planBlock = document.getElementById("apartmentPage-plan-block");
  const floorPlanBlock = document.getElementById("apartmentPage-floorPlan-block");
  const generalPlanBlock = document.getElementById("apartmentPage-generalPlan-block");

  // Утилита для удаления класса active у всех блоков и восстановления скролла
  function removeActiveClasses() {
    popUpPlan.classList.remove("active");
    planBlock.classList.remove("active");
    floorPlanBlock.classList.remove("active");
    generalPlanBlock.classList.remove("active");
    document.body.style.overflow = ""; // Возвращаем скролл
  }

  // Утилита для открытия pop-up и активации нужного блока
  function openPopUp(activeBlock) {
    removeActiveClasses();
    popUpPlan.classList.add("active");
    activeBlock.classList.add("active");
    document.body.style.overflow = "hidden"; // Отключаем скролл
  }

  // Добавляем события на кнопки
  planBtn.addEventListener("click", () => openPopUp(planBlock));
  floorPlanBtn.addEventListener("click", () => openPopUp(floorPlanBlock));
  generalPlanBtn.addEventListener("click", () => openPopUp(generalPlanBlock));

  // Добавляем события на изображения
  planImg.addEventListener("click", () => openPopUp(planBlock));
  floorPlanImg.addEventListener("click", () => openPopUp(floorPlanBlock));
  generalPlanImg.addEventListener("click", () => openPopUp(generalPlanBlock));

  // Закрытие модального окна
  closeBtn.addEventListener("click", () => {
    removeActiveClasses();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const updateBlockHeight = () => {
      const blocks = document.querySelectorAll('.apartmentPage-hero__content-left__info-block.mobile');

      if (window.innerWidth < 768) {
          blocks.forEach(block => {
              const top = block.querySelector('.apartmentPage-hero__content-left__info-block__top');
              const bottom = block.querySelector('.apartmentPage-hero__content-left__info-block__bottom');
              const openButton = block.querySelector('.apartmentPage-hero__content-left__info-block__top-open');

              // Установить начальную высоту
              if (!block.dataset.initialized) {
                  block.style.height = `${top.offsetHeight}px`;
                  block.dataset.initialized = true; // Отметить как инициализированный

                  // Добавить обработчик клика один раз
                  openButton.addEventListener('click', () => {
                      const isExpanded = block.classList.contains('expanded');

                      if (isExpanded) {
                          // Свернуть
                          block.style.height = `${top.offsetHeight}px`;
                          block.classList.remove('expanded');
                      } else {
                          // Развернуть
                          block.style.height = `${top.offsetHeight + bottom.offsetHeight}px`;
                          block.classList.add('expanded');
                      }

                      // Заменить SVG внутри кнопки
                      const svg = openButton.querySelector('svg');
                      if (svg) {
                          svg.outerHTML = isExpanded
                              ? `
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g opacity="0.5">
                                          <rect x="1.37256" y="8.36426" width="15.2548" height="1.27123" rx="0.635615" fill="black" />
                                          <rect width="15.2548" height="1.27123" rx="0.635615" transform="matrix(0 -1 -1 0 9.63562 16.6279)" fill="black" />
                                      </g>
                                  </svg>`
                              : `
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g opacity="0.5">
                                          <rect x="1.37256" y="8.36426" width="15.2548" height="1.27123" rx="0.635615" fill="black" />
                                      </g>
                                  </svg>`;
                      }
                  });
              }
          });
      } else {
          // Сбросить высоту для больших экранов
          blocks.forEach(block => {
              block.style.height = '';
              block.classList.remove('expanded');
              block.removeAttribute('data-initialized'); // Сбросить инициализацию
          });
      }
  };

  // Выполнить при загрузке страницы и при изменении размера окна
  updateBlockHeight();
  window.addEventListener('resize', updateBlockHeight);
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.apartmentPage-feedback__content-form');
  const nameInput = document.getElementById('apartmentPage-feedback-name');
  const telInput = document.getElementById('apartmentPage-feedback-tel');


  telInput.addEventListener('input', () => {

    if (!telInput.value.startsWith('+7')) {
      telInput.value = '+7';
    }

    telInput.value = telInput.value.replace(/[^\d+]/g, '');

    if (telInput.value.length > 12) {
      telInput.value = telInput.value.slice(0, 12);
    }
  });

  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    nameInput.style.backgroundColor = '';
    telInput.style.backgroundColor = '';

    if (!nameInput.value.trim()) {
      nameInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
      isValid = false;
    }

    if (telInput.value.length < 12) {
      telInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});


/* Квартирограмма */
document.addEventListener('DOMContentLoaded', () => {
  /* Вписывать данные, автоматически подставятся. При указании "Подъезд 3" автоматически добавится ещё одна таблица */
  const data = [
    { buildingType: "Литер 1", building: "Подъезд 1", floor: 10, rooms: 1, column: 1, type: 2, size: 51.2, status: 'green', price: 12535000 },
    { buildingType: "Литер 1", building: "Подъезд 1", floor: 9, rooms: 2, column: 2, type: 2, size: 51.2, status: 'yellow', price: 12300000 },
    { buildingType: "Литер 1", building: "Подъезд 2", floor: 8, rooms: 3, column: 1, type: 2, size: 51.2, status: 'green', price: 13000000 },
    { buildingType: "Литер 1", building: "Подъезд 2", floor: 7, rooms: 1, column: 2, type: 3, size: 60.0, status: 'grey', price: 0 }
  ];

  const floors = 10;
  const tableWrapper = document.querySelector('.table-wrapper');
  const fixedFloorNumbersLeft = document.querySelector('.fixed-floor-numbers.left');
  const fixedFloorNumbersRight = document.querySelector('.fixed-floor-numbers.right');
  const detailsPanel = document.getElementById("detailsPanel");
  const panelTitle = document.getElementById("panelTitle");
  const panelFloor = document.getElementById("panelFloor");
  const panelSize = document.getElementById("panelSize");
  const panelStatus = document.getElementById("panelStatus");
  const panelPrice = document.getElementById("panelPrice");
  const panelBuildingType = document.getElementById("panelBuildingType");
  const panelEntrance = document.getElementById("panelEntrance");
  const closeDetailsButton = document.getElementById('closeDetailsButton');

  // Заполнить фиксированную нумерацию этажей
  for (let i = floors; i >= 1; i--) {
    const floor = document.createElement('div');
    floor.className = 'floor';
    floor.textContent = i;
    fixedFloorNumbersLeft.appendChild(floor);

    const floorRight = floor.cloneNode(true);
    fixedFloorNumbersRight.appendChild(floorRight);
  }

  // Генерация зданий
  const buildings = [...new Set(data.map(d => d.building))];
  buildings.forEach(building => {
    const buildingData = data.filter(d => d.building === building);
    const buildingType = buildingData[0]?.buildingType || "Unknown";

    const buildingContainer = document.createElement('div');
    buildingContainer.className = 'building-container';

    // Верхние заголовки
    const titleType = document.createElement('div');
    titleType.className = 'building-type';
    titleType.textContent = buildingType;

    const title = document.createElement('div');
    title.className = 'building-title';
    title.textContent = building;

    const buildingTable = document.createElement('div');
    buildingTable.className = 'building-table';

    // Создание ячеек таблицы
    for (let floor = floors; floor >= 1; floor--) {
      for (let column = 1; column <= 16; column++) {
        const cellData = buildingData.find(d => d.floor === floor && d.column === column);

        const cell = document.createElement('div');
        cell.className = `cell ${cellData ? cellData.status : 'grey'}`;
        if (cellData) {
          cell.innerHTML = `
            <div class="number">${cellData.type}</div>
            <div class="size">${cellData.size}</div>
            <div class="tooltip">
              <div class="tooltip-top">
                <p class="tooltip-top__type">${cellData.type}</p>
                <p class="tooltip-top__number">Квартира №${floor * 10 + column}</p>
              </div>
              ${
                cellData.status !== 'yellow' && cellData.status !== 'grey'
                  ? `<p class="tooltip-price">от ${cellData.price.toLocaleString()} ₽</p>`
                  : ''
              }
              <p class="tooltip-size">${cellData.size} м²</p>
            </div>
          `;
          cell.addEventListener('click', () => {
            const rooms = cellData.rooms;
            panelTitle.textContent = `${rooms}-комнатная №${floor * 10 + column} ` + cellData.size + 'м²';
            panelFloor.textContent = floor;
            panelBuildingType.textContent = buildingType;
            panelEntrance.textContent = building;
            panelSize.textContent = cellData.size + ' м²';
            panelStatus.textContent = cellData.status === 'green' ? 'Свободно' :
              cellData.status === 'yellow' ? 'Забронировано' : 'Недоступно';

            // Очистим старые классы
            panelStatus.classList.remove('green', 'yellow', 'grey');

            // Добавим новый класс в зависимости от статуса
            if (cellData.status === 'green') {
                panelStatus.classList.add('green');
            } else if (cellData.status === 'yellow') {
                panelStatus.classList.add('yellow');
            } else {
                panelStatus.classList.add('grey');
            }

            // Отключение кнопок и блока цены при статусах yellow и grey
            const btn1 = document.querySelector('.details-panel__btn1');
            const btn2 = document.querySelector('.details-panel__btn2');
            const panelPriceBlock = document.querySelector('.details-panel-price');

            if (cellData.status === 'yellow' || cellData.status === 'grey') {
              btn1.classList.add('disabled');
              btn2.classList.add('disabled');
              panelPriceBlock.classList.add('disabled');
            } else {
              btn1.classList.remove('disabled');
              btn2.classList.remove('disabled');
              panelPriceBlock.classList.remove('disabled');
            }

            // Установка цены (если статус не yellow и не grey)
            panelPrice.textContent = cellData.status !== 'yellow' && cellData.status !== 'grey'
              ? "от " + cellData.price.toLocaleString() + " ₽"
              : '';

               // Отключение скролла у body для экранов менее 768px
                if (window.innerWidth < 768) {
                  document.body.style.overflow = 'hidden';
                }

                detailsPanel.classList.add('open');
              });

              closeDetailsButton.addEventListener('click', () => {
                detailsPanel.classList.remove('open');
                // Включение скролла у body
                document.body.style.overflow = '';
            });
        }
        buildingTable.appendChild(cell);
      }
    }

    // Нижние заголовки
    const titleTypeBottom = titleType.cloneNode(true);
    const titleBottom = title.cloneNode(true);

    // Добавление заголовков и таблицы
    buildingContainer.appendChild(titleType);
    buildingContainer.appendChild(title);
    buildingContainer.appendChild(buildingTable);
    buildingContainer.appendChild(titleBottom);
    buildingContainer.appendChild(titleTypeBottom);

    tableWrapper.appendChild(buildingContainer);
  });

  closeDetailsButton.addEventListener('click', closeDetails);

  function closeDetails() {
    detailsPanel.classList.remove('open');
  }
});

/* Способы покупки */
document.addEventListener('DOMContentLoaded', () => {
  // Получаем все элементы списка "facilities" и "cards"
  const facilitiesItems = document.querySelectorAll('.purchaseMethods-hero__content-btns button');
  const cardsItems = document.querySelectorAll('.purchaseMethods-hero__content-blocks .purchaseMethods-hero__content-blocks__block');

  // Добавляем обработчик события для каждого элемента "facilities"
  facilitiesItems.forEach((facility, index) => {
    facility.addEventListener('click', () => {
      // Удаляем класс "active" у всех карточек
      cardsItems.forEach(card => card.classList.remove('active'));
      facilitiesItems.forEach(card => card.classList.remove('active'));

      // Добавляем класс "active" только к соответствующей карточке
      if (cardsItems[index]) {
        cardsItems[index].classList.add('active');
        facilitiesItems[index].classList.add('active');
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Получаем все элементы списка
  const items = document.querySelectorAll('.purchaseMethods-steps__content-list__item');

  // Перебираем элементы и задаем их номер
  items.forEach((item, index) => {
    // Ищем элемент с классом для номера
    const numberElement = item.querySelector('.purchaseMethods-steps__content-list__item-number');

    if (numberElement) {
      // Задаем номер, начиная с 1
      numberElement.textContent = index + 1;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.purchaseMethods-stocks__content-blocks');
  const blocks = Array.from(document.querySelectorAll('.purchaseMethods-stocks__content-blocks__block'));
  const paginationsContainer = document.querySelector('.purchaseMethods-stocks__content-paginations');
  const btnPrev = document.getElementById('purchaseMethods-stocks-prev');
  const btnNext = document.getElementById('purchaseMethods-stocks-next');
  const svgPrev = btnPrev.querySelector('svg');
  const svgNext = btnNext.querySelector('svg');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Создание пагинации
  function createPaginations() {
    paginationsContainer.innerHTML = ''; // Очищаем старые пагинации
    blocks.forEach((_, index) => {
      const span = document.createElement('span');
      if (index === currentIndex) {
        span.classList.add('active'); // Добавляем класс "active" текущему элементу
      }
      paginationsContainer.appendChild(span);
    });
  }

  function updatePagination() {
    const paginations = Array.from(paginationsContainer.children); // Получаем обновленный список пагинаций
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
    updateButtonOpacity();
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0);
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0;
    const distance = targetOffset - start;
    const duration = 500;
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  function updateButtonOpacity() {
    svgPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    svgNext.style.opacity = currentIndex === blocks.length - 1 ? '0.5' : '1';
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа на контейнере blocksContainer
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
    endX = startX; // Сбрасываем endX для начала
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Текущая позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0 && currentIndex < blocks.length - 1) {
        currentIndex++; // Свайп влево (вперед)
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--; // Свайп вправо (назад)
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  createPaginations(); // Создаем пагинацию
  updatePagination(); // Обновляем пагинацию при загрузке
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.purchaseMethods-feedback__content-form');
  const nameInput = document.getElementById('purchaseMethods-feedback-name');
  const telInput = document.getElementById('purchaseMethods-feedback-tel');


  telInput.addEventListener('input', () => {

    if (!telInput.value.startsWith('+7')) {
      telInput.value = '+7';
    }

    telInput.value = telInput.value.replace(/[^\d+]/g, '');

    if (telInput.value.length > 12) {
      telInput.value = telInput.value.slice(0, 12);
    }
  });

  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    nameInput.style.backgroundColor = '';
    telInput.style.backgroundColor = '';

    if (!nameInput.value.trim()) {
      nameInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
      isValid = false;
    }

    if (telInput.value.length < 12) {
      telInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Получаем все элементы заголовков FAQ
  const faqHeaders = document.querySelectorAll('.purchaseMethods-questions__content-faq__item-top');

  faqHeaders.forEach(header => {
    // Добавляем обработчик события клика на каждый заголовок
    header.addEventListener('click', function() {
      // Получаем родительский элемент FAQ item
      const faqItem = header.parentElement;
      // Получаем блок с ответом
      const answer = faqItem.querySelector('.purchaseMethods-questions__content-faq__item-answer');

      // Если блок уже открыт (класс active), то сворачиваем его
      if (faqItem.classList.contains('active')) {
        faqItem.style.height = `${header.offsetHeight}px`; // Ставим высоту только заголовка
        faqItem.classList.remove('active');
      } else {
        // Закрываем все остальные блоки, если нужно сделать аккордеон
        document.querySelectorAll('.purchaseMethods-questions__content-faq__item.active').forEach(activeItem => {
          activeItem.style.height = `${activeItem.querySelector('.purchaseMethods-questions__content-faq__item-top').offsetHeight}px`;
          activeItem.classList.remove('active');
        });

        // Получаем полную высоту: высота заголовка + высота ответа
        const fullHeight = header.offsetHeight + answer.scrollHeight;
        // Задаем новую высоту блоку FAQ item
        faqItem.style.height = `${fullHeight}px`;
        // Добавляем класс active
        faqItem.classList.add('active');
      }
    });
  });

  // Устанавливаем начальную высоту для всех блоков FAQ item
  document.querySelectorAll('.purchaseMethods-questions__content-faq__item').forEach(item => {
    const header = item.querySelector('.purchaseMethods-questions__content-faq__item-top');
    item.style.height = `${header.offsetHeight}px`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".purchaseMethods-questions__content-faq__item");
  const button = document.querySelector(".purchaseMethods-questions__content-btn");

  const showCount = 5; // Количество элементов, которые будут видны изначально
  let isExpanded = false;

  function updateVisibility() {
      items.forEach((item, index) => {
          if (index < showCount || isExpanded) {
              item.style.display = "block";
          } else {
              item.style.display = "none";
          }
      });

      const hiddenCount = items.length - showCount;
      if (hiddenCount > 0) {
          button.style.display = "flex";
          button.innerHTML = isExpanded ? "Скрыть" : `Ещё <span>${hiddenCount}</span> вопросов`;
      } else {
          button.style.display = "none";
      }
  }

  button.addEventListener("click", function () {
      isExpanded = !isExpanded;
      updateVisibility();
  });

  updateVisibility();
});



