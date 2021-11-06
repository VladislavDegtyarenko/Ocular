document.addEventListener("DOMContentLoaded", () => {
   /* append (load) script to body function */
   const loadScript = (scriptSrc, onLoadFunction) => {
      let script = document.createElement("script");
      script.src = scriptSrc;
      document.body.appendChild(script);
      script.onload = onLoadFunction;
   };

   /* MicroModal - load & setup */
   const micromodalInit = () => {
      MicroModal.init({
         awaitCloseAnimation: true,
         awaitOpenAnimation: true,
         disableFocus: true,
         onShow: (modal) => bodyAddScrollLock(),
         onClose: (modal) => bodyRemoveScrollLock(),
      });
   };
   loadScript("js/micromodal.min.js", micromodalInit);

   // SplideJS Slide Plugin - load & setup
   const splideSliderSettings = () => {
      new Splide("#careSlider", {
         classes: {
            arrows: "splide__arrows your-class-arrows",
            arrow: "splide__arrow your-class-arrow",
            prev: "splide__arrow-prev your-class-prev",
            next: "splide__arrow-next your-class-next",
         },
         pagination: false,
         type: "loop",
         perPage: 1,
         perMove: 1,
         breakpoints: {
            767: {
               pagination: true,
            },
         },
      }).mount();

      const servicesSliders = document.querySelectorAll(".services__slider");

      for (let i = 0, len = servicesSliders.length; i < len; i++) {
         new Splide(servicesSliders[i], {
            classes: {
               arrows: "splide__arrows your-class-arrows",
               arrow: "splide__arrow your-class-arrow",
               prev: "splide__arrow-prev your-class-prev",
               next: "splide__arrow-next your-class-next",
            },
            perPage: 3,
            perMove: 1,
            breakpoints: {
               1199: {
                  perPage: 2,
               },
               767: {
                  perPage: 1,
               },
            },
         }).mount();
      }

      new Splide("#doctorsSlider", {
         classes: {
            arrows: "splide__arrows your-class-arrows",
            arrow: "splide__arrow your-class-arrow",
            prev: "splide__arrow-prev your-class-prev",
            next: "splide__arrow-next your-class-next",
         },
         perPage: 4,
         perMove: 1,
         pagination: false,
         breakpoints: {
            1199: {
               perPage: 3,
            },
            991: {
               perPage: 2,
            },
            575: {
               perPage: 2,
               pagination: true,
            },
         },
      }).mount();

      new Splide("#certificatesSlider", {
         classes: {
            arrows: "splide__arrows your-class-arrows",
            arrow: "splide__arrow your-class-arrow",
            prev: "splide__arrow-prev your-class-prev",
            next: "splide__arrow-next your-class-next",
         },
         perPage: 3,
         perMove: 1,
         pagination: false,
         gap: "40px",
         breakpoints: {
            991: {
               gap: "20px",
            },
            767: {
               perPage: 2,
               gap: "10px",
               pagination: true,
            },
            575: {
               perPage: 2,
               pagination: true,
            },
         },
      }).mount();

      new Splide("#reviewsSlider", {
         classes: {
            arrows: "splide__arrows your-class-arrows",
            arrow: "splide__arrow your-class-arrow",
            prev: "splide__arrow-prev your-class-prev",
            next: "splide__arrow-next your-class-next",
         },
         perPage: 2,
         perMove: 1,
         type: "loop",
         gap: "40px",
         breakpoints: {
            991: {
               perPage: 1,
            },
         },
      }).mount();

      new Splide("#equipmentSlider", {
         classes: {
            arrows: "splide__arrows your-class-arrows",
            arrow: "splide__arrow your-class-arrow",
            prev: "splide__arrow-prev your-class-prev",
            next: "splide__arrow-next your-class-next",
         },
         type: "loop",
      }).mount();

      // two cards centered
      let viewportWidth = window.innerWidth;

      const cardsCentered = () => {
         servicesSliders.forEach((slider) => {
            if (viewportWidth > 1199 && slider.querySelector(".splide__list").childElementCount == 2) {
               slider.querySelector(".splide__track").style.display = "flex";
               slider.querySelector(".splide__track").style.justifyContent = "center";
            } else if (viewportWidth > 767 && slider.querySelector(".splide__list").childElementCount == 1) {
               slider.querySelector(".splide__track").style.display = "flex";
               slider.querySelector(".splide__track").style.justifyContent = "center";
            } else {
               slider.querySelector(".splide__track").style.display = "";
               slider.querySelector(".splide__track").style.justifyContent = "";
            }
         });
      };
      cardsCentered();

      /* equipment slider arrows vertical align */
      const equipmentSlider = document.querySelector("#equipmentSlider");
      const equipmentSliderPhoto = equipmentSlider.querySelector(".equipment__card_photo");
      const equipmentSliderPrevBtn = equipmentSlider.querySelector(".splide__arrow-prev");
      const equipmentSliderNextBtn = equipmentSlider.querySelector(".splide__arrow-next");

      const equipmentSliderArrowsAlign = () => {
         equipmentSliderPrevBtn.style.bottom = `${equipmentSliderPhoto.offsetHeight / 2}px`;
         equipmentSliderNextBtn.style.bottom = `${equipmentSliderPhoto.offsetHeight / 2}px`;
      };
      equipmentSliderArrowsAlign();
   };

   const splidePluginSrc = "js/splide.min.js";
   loadScript(splidePluginSrc, splideSliderSettings);

   /* SERVICES MENU / TABS */
   const servicesMenu = document.querySelector(".services__menu"),
      servicesTabs = document.querySelectorAll(".services__tab"),
      servicesSelected = document.querySelector(".services__selected");

   servicesTabs.forEach((tab) => {
      tab.addEventListener("click", function (event) {
         servicesTabActiveClassSet(tab);

         servicesSelectedTextInit();

         servicesSwitchSlides(event);
      });
   });
   servicesSelected.addEventListener("click", toggleServiceMenu);

   function servicesTabActiveClassSet(tab) {
      servicesTabs.forEach((tab) => {
         tab.classList.remove("services__tab-active");
      });
      tab.classList.add("services__tab-active");
   }

   function servicesSwitchSlides(event) {
      let servicesActiveTab = event.target.dataset.tabCategory;

      servicesSliders.forEach((slider) => {
         slider.classList.remove("services__slider-active");

         if (slider.dataset.sliderCategory === servicesActiveTab) {
            slider.classList.add("services__slider-active");
            toggleServiceMenu();
         }
      });
   }

   function servicesSelectedTextInit(tab) {
      let servicesTabActive = document.querySelector(".services__tab-active");
      let servicesTabActiveText = servicesTabActive.innerHTML;

      servicesSelected.innerHTML = servicesTabActiveText;
   }

   function toggleServiceMenu() {
      servicesMenu.classList.toggle("services__menu-opened");
   }
   servicesSelectedTextInit();

   // detect click outside servicesMenu
   document.addEventListener("click", function (event) {
      const isClickInside = servicesMenu.contains(event.target);
      let isMenuOpened = document.querySelector(".services__menu-opened");

      if (!isClickInside && isMenuOpened) {
         //the click was outside the specifiedElement, do something
         toggleServiceMenu();
      }
   });

   /* burger menu */
   const burgerMenuSticks = document.querySelectorAll(".stick");
   const mobileMenu = document.querySelector(".header__nav");
   const mobileMenuCurtain = document.querySelector(".nav__curtain");
   const toggleMobileMenuButtons = document.querySelectorAll(".jsToggleMobileMenu");
   const openMobileMenuButtons = document.querySelectorAll(".jsOpenMobileMenu");
   const closeMobileMenuButtons = document.querySelectorAll(".jsCloseMobileMenu");

   toggleMobileMenuButtons.forEach((button) => {
      button.onclick = () => toggleMobileMenu();
   });

   openMobileMenuButtons.forEach((button) => {
      button.onclick = () => openMobileMenu();
   });

   closeMobileMenuButtons.forEach((button) => {
      button.onclick = () => closeMobileMenu();
   });

   /* Buttons that do overflow hidden on body */
   const scrollLockButtons = document.querySelectorAll(".jsBodyAddScrollLock");
   const removeScrollLockButtons = document.querySelectorAll(".jsBodyRemoveScrollLock");

   scrollLockButtons.forEach((button) => {
      button.onclick = () => bodyAddScrollLock();
   });

   removeScrollLockButtons.forEach((button) => {
      button.onclick = () => bodyRemoveScrollLock();
   });

   function toggleMobileMenu() {
      burgerMenuSticks.forEach((stick) => {
         stick.classList.toggle("close");
         stick.classList.toggle("open");
      });
      mobileMenu.classList.toggle("header__nav-closed");
      mobileMenu.classList.toggle("header__nav-opened");

      mobileMenuCurtain.classList.toggle("curtain-down");
      mobileMenuCurtain.classList.toggle("curtain-up");

      document.body.classList.toggle("noScroll");
   }

   function openMobileMenu() {
      burgerMenuSticks.forEach((stick) => {
         stick.classList.remove("close");
         stick.classList.add("open");
      });
      mobileMenu.classList.remove("header__nav-closed");
      mobileMenu.classList.add("header__nav-opened");

      mobileMenuCurtain.classList.remove("curtain-down");
      mobileMenuCurtain.classList.add("curtain-up");

      bodyAddScrollLock();
   }

   function closeMobileMenu() {
      burgerMenuSticks.forEach((stick) => {
         stick.classList.remove("open");
         stick.classList.add("close");
      });
      mobileMenu.classList.remove("header__nav-opened");
      mobileMenu.classList.add("header__nav-closed");

      mobileMenuCurtain.classList.remove("curtain-up");
      mobileMenuCurtain.classList.add("curtain-down");

      bodyRemoveScrollLock();
   }

   function bodyAddScrollLock() {
      document.body.classList.add("noScroll");
   }

   function bodyRemoveScrollLock() {
      document.body.classList.remove("noScroll");
   }

   /* Certificate Cards */
   const certCards = document.querySelectorAll(".certificates__card");

   certCards.forEach((card) => {
      card.addEventListener("click", function (event) {
         if (event.target.classList.contains("certificates__card-click")) {
            event.target.classList.remove("certificates__card-click");
         } else {
            certCards.forEach((card) => {
               card.classList.remove("certificates__card-click");
            });

            card.classList.add("certificates__card-click");
         }
      });
   });

   /* handling scroll position */
   const header = document.querySelector(".header");

   if (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
   ) {
      let observer = new IntersectionObserver((entries) => {
         if (entries[0].boundingClientRect.y < 0) {
            header.classList.add("header-hidden");
         } else {
            header.classList.remove("header-hidden");
         }
      });
      observer.observe(document.querySelector("#pixel-anchor"));
   }

   /* form validation */

   // inputMask

   let inputMaskIsLoaded;
   const inputmaskSrc = "js/inputmask.min.js";
   const inputs = document.querySelectorAll('input[type="tel"]');

   const inputmaskSettings = () => {
      let im = new Inputmask("+38099-999-99-99");
      im.mask(inputs);
   };

   const loadInputmaskPlugin = () => {
      if (!inputMaskIsLoaded) {
         loadScript(inputmaskSrc, inputmaskSettings);

         inputs.forEach((input) => input.removeEventListener("click", loadInputmaskPlugin));
         inputMaskIsLoaded = true;
      }
   };

   inputs.forEach((input) => input.addEventListener("click", loadInputmaskPlugin));

   // validate
   const justvalidateSettings = () => {
      validateForm("#formMain", "modalMainForm");
      validateForm("#formCall", "modalMainCall");

      const serviceCardsForms = document.querySelectorAll(".formServices");
      serviceCardsForms.forEach((form) => {
         let formId = "#" + form.id;
         let formModalWindowId = form.closest(".modal__service").id;
         validateForm(formId, formModalWindowId);
      });
   };

   const validateForm = (selector, modalWindow) => {
      new window.JustValidate(selector, {
         colorWrong: "#FF3D3D",

         rules: {
            name: { required: true },
            tel: { required: true, strength: { custom: "^.[0-9]{5}-?[0-9]{3}-?[0-9]{2}-?[0-9]{2}" } },
            comment: { required: true, minLength: 5 },
         },
         messages: {
            name: {
               required: `Це поле обов'язкове для заповнення`,
            },
            tel: {
               required: `Це поле обов'язкове для заповнення`,
               strength: `Заповніть, будь ласка, це поле`,
            },
            comment: {
               required: `Це поле обов'язкове для заповнення`,
               minLength: `Поле має містити не менше :value символів.`,
            },
         },
         submitHandler: function (form, values, ajax) {
            let formData = new FormData(form);
            let errorDiv = form.getElementsByClassName("form-error-message")[0];
            let loadingIndicator = form.getElementsByClassName("form-loading-indicator")[0];

            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            loadingIndicator.style.display = "block";

            fetch(myAjax.url, {
               method: "POST",
               body: formData,
            })
               .then(function (response) {
                  return response.json();
               })
               .then(function (data) {
                  if (data.error) {
                     errorDiv.style.display = "block";
                     errorDiv.innerHTML = data.error;
                  } else {
                     form.reset();
                     MicroModal.close(modalWindow);
                     MicroModal.show("thankYou");
                  }
               })
               .finally(function () {
                  loadingIndicator.style.display = "none";
               });
         },
      });
   };

   justValidateSrc = "js/just-validate.min.js";
   loadScript(justValidateSrc, justvalidateSettings);

   /* resizing events */
   window.onresize = () => {
      viewportWidth = window.innerWidth;
      cardsCentered();
      equipmentSliderArrowsAlign();
   };
}); /* DOMContentLoaded */
