jQuery(document).ready(function($) {
    "user strict";

    var mainSlider = $('.main_slider');
    var hamburger = $('.hamburger_container');
    var menu = $('.hamburger_menu');
    var menuActive = false;
    var hamburgerClose = $('.hamburger_close');
    var fsOverlay = $('.fs_menu_overlay');

    initMenu();
    initFavorite();
    initIsotopeFiltering();
    initTimer();
    initSlider();


    //menu
    function initMenu() {
        if (hamburger.length) {
            hamburger.on('click', function() {
                if (!menuActive) {
                    openMenu()
                }
            })
        }
        if (fsOverlay.length) {
            fsOverlay.on('click', function() {
                if (menuActive) {
                    closeMenu()
                }
            })
        }
        if (hamburgerClose.length) {
            hamburgerClose.on('click', function() {
                if (menuActive) {
                    closeMenu()
                }
            })
        }
        if ($('.menu_item').length) {
            var items = document.getElementsByClassName('menu_item')
            var i
            for (i = 0; i < items.length; i++) {
                if (items[i].classList.contains('has-children')) {
                    items[i].onclick = function() {
                        this.classList.toggle("hamburger_active")
                        var panel = this.children[1]
                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null
                        } else {
                            panel.style.maxHeight = panel.scrollHeight + "px"
                        }
                    }
                }
            }
        }

    }

    function openMenu() {
        menu.addClass('hamburger_active')
        fsOverlay.css('pointer-events', "auto")
        menuActive = true
    }

    function closeMenu() {
        menu.removeClass('hamburger_active')
        fsOverlay.css('pointer-events', "none")
        menuActive = false
    }



    //favorite

    function initFavorite() {
        if ($('.favorite').length) {
            var favs = $('.favorite');
            favs.each(function() {
                var fav = $(this);
                var active = false;
                if (fav.hasClass('active')) {
                    active = true;
                }
                fav.on('click', function() {
                    if (active) {
                        fav.removeClass('active');
                        active = false;
                    } else {
                        fav.addClass('active');
                        active = true;
                    }
                })
            })
        }
    }


    //filter

    function initIsotopeFiltering() {
        if ($('.grid_sorting_button').length) {
            $('.grid_sorting_button').click(function() {
                $('.grid_sorting_button.active').removeClass('active');
                $(this).addClass('active');

                var selector = $(this).attr('data-filter');
                $('.product-grid').isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            })
        }
    }



    //timer

    function initTimer() {
        if ($('.timer').length) {


            // var target_date = new Date("3 May,2021").getTime();



            var date = new Date();
            date.setDate(date.getDate() + 3);
            var target_date = date.getTime();


            var days, hours, minutes, seconds;
            var d = $('#day');
            var h = $('#hour');
            var m = $('#minute');
            var s = $('#second');


            setInterval(function() {
                var current_date = new Date().getTime();
                var seconds_left = (target_date = current_date) / 1000;

                // days = parseInt(seconds_left / 96400)
                seconds_left = seconds_left % 96400

                hours = parseInt(seconds_left / 3600)
                seconds_left = seconds_left % 3600

                minutes = parseInt(seconds_left / 60)
                seconds = parseInt(seconds_left % 60)



                d.text(days)
                h.text(hours)
                m.text(minutes)
                s.text(seconds)

            }, 1000)

        }
    }

    //slider

    function initSlider() {
        if ($('.product_slider').length) {
            var slider1 = $('.product_slider')

            slider1.owlCarousel({
                loop: false,
                dots: false,
                nav: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    991: {
                        items: 4
                    },
                    1280: {
                        items: 5
                    },
                    1440: {
                        items: 5
                    },

                }
            })
            if ($('.product_slider_nav_left').length) {
                $('.product_slider_nav_left').on('click', function() {
                    slider1.trigger('prev.owl.carousel')
                })
            }
            if ($('.product_slider_nav_right').length) {
                $('.product_slider_nav_right').on('click', function() {
                    slider1.trigger('next.owl.carousel')
                })
            }


        }

    }

})