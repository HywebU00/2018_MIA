//自行加入的JS請寫在這裡
;
$(function() {
    $('.singleSlider').slick({
        dots: true,
        arrow: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        fade: true,
        cssEase: 'ease'
    });
    $('.adSlider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        arrow: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false,
                arrows: true
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: true
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: true
            }
        }]
    });

    $('.infoSlider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        arrow: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                arrows: true
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
            }
        }]
    });
    //設定resize 計時器
    $(window).on("load resize", function(event) {
        ww = $(window).width();
        if (ww <= 992) {
            $('.singleSlider .img-container img').removeClass().addClass('contain');
        } else {
            $('.singleSlider .img-container img').removeClass().addClass('cover');
        }
    });
    $('.cp_slider').find('a').focus(function(e) {
        $(this).css('outline', '1px solid RED');
    });
    $('.cp_slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        pauseOnFocus: true,
        focusOnSelect: true,
        accessibility: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.Slider-for').on('init reInit afterChange', function(event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.controls').html(i + '/' + slick.slideCount);
    });
    $('.Slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.Slider-nav',
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true
    });
    $('.Slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.Slider-for',
        dots: true,
        arrows: true,
        focusOnSelect: true,
        infinite: true,
    });
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);
    if (ie) {
        $(".mp_banner .img-container").each(function() {
            var imgUrl = $(this).children('a').children('img').attr('src');
            var $container = $(this);
            $(this).has(".cover").find('a').addClass("ie-object-cover");
            $(this).has(".cover").find('a').css("backgroundImage", "url(" + imgUrl + ")");
            $(this).has(".fill").find('a').addClass("ie-object-fill");
            $(this).has(".fill").find('a').css("backgroundImage", "url(" + imgUrl + ")");
            $(this).has(".contain").find('a').addClass("ie-object-contain");
            $(this).has(".contain").find('a').css("backgroundImage", "url(" + imgUrl + ")");
        });
    }
    // 業務統計
    $('.statistics .btn_grp').find('button').click(function(event) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
    $('.statistics ul li').find('button').click(function(event) {
        $(this).parents('li').siblings('li').children('button').removeClass('active');
        $(this).addClass('active');
    });
    $('.category ul li').find('a').click(function(event) {
        $(this).parents('li').siblings('li').children('a').removeClass('active');
        $(this).addClass('active');
    });
    $('.item_choose').find('label').click(function(event) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(this).siblings('label').find('input').prop('checked', false);
        $(this).find('input').prop('checked', true);
    });
    $('.item_choose').find('label input').focus(function(event) {
        $(this).parents().siblings('label').removeAttr('class');
        $(this).parents('label').addClass('active');
        $(this).parents('label').siblings('label').find('input').prop('checked', false);
        $(this).prop('checked', true);
    });
    $('.innerpage').parents('.wrapper').addClass('no_egg');
    $('.counter').after('<div style="display:block;clear:both;"></div>');
    // 設定 main-menu高度同等 col
    function colHeight() {
        var WindowWidth = $(window).outerWidth();
        var divH = Math.ceil($('.service .col .item').height() * 0.9);
        if (WindowWidth >= 768) {
            $('.service .col .item').height(divH);
        } else {
            $('.service .col .item').each(function() {
                $(this).removeAttr('style');
            });
        }
    }
    // //設定resize 計時器
    var menuResize;
    $(window).bind("load resize", function(event) {
        clearTimeout(menuResize);
        menuResize = setTimeout(function() {
            colHeight();
        }, 20);
    });
    colHeight();
    $('.lightbox_slider').find('.imgOuter').removeClass('imgOuter').addClass('imgOuter1');
    //不同語系
    var weblang = $('html').attr('lang');
    if (weblang.substring(0, 2) == 'zh') {
        // console.log("中文");
        $('.slick-prev').attr('title', '上一筆');
        $('.slick-next').attr('title', '下一筆');
        $('header').find('.accesskey').attr('title', '上方功能區塊');
        $('.main').find('.accesskey').attr('title', '中央內容區塊');
        $('footer').find('.accesskey').attr('title', '下方功能區塊');
        $('.search').find('.accesskey').attr('title', '關鍵字搜尋：文章關鍵字搜尋');
    } else if (weblang.substring(0, 2) == 'en') {
        // console.log("英文");
        $('.slick-prev').attr('title', 'previous');
        $('.slick-next').attr('title', 'next');
        $('header').find('.accesskey').attr('title', 'header');
        $('.main').find('.accesskey').attr('title', 'content');
        $('footer').find('.accesskey').attr('title', 'footer');
        $('.search').find('.accesskey').attr('title', 'search');
    } else if (weblang.substring(0, 2) == 'vi') {
        // console.log("越南");
        $('.slick-prev').attr('title', 'Trước');
        $('.slick-next').attr('title', 'kế tiếp');
    } else if (weblang.substring(0, 2) == 'id') {
        // console.log("印尼");
        $('.slick-prev').attr('title', 'sebelumnya');
        $('.slick-next').attr('title', 'berikutnya');
    } else if (weblang.substring(0, 2) == 'km') {
        // console.log("柬埔寨");
        $('.slick-prev').attr('title', 'មុន');
        $('.slick-next').attr('title', 'បន្ទាប់');
    } else if (weblang.substring(0, 2) == 'th') {
        // console.log("泰文");
        $('.slick-prev').attr('title', 'ก่อน');
        $('.slick-next').attr('title', 'ต่อไป');
    } else {
        // console.log("沒有判斷");
        $('.slick-prev').attr('title', 'previous');
        $('.slick-next').attr('title', 'next');
    }
});
