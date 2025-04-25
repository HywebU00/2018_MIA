$(function() {
    /*-----------------------------------*/
    ///////////// fix iOS bug /////////////
    /*-----------------------------------*/
    // document.documentElement.addEventListener('gesturestart', function(event) {
    //     event.preventDefault();
    // }, false);
    /*-----------------------------------*/
    ///////////////// 變數 ////////////////
    /*-----------------------------------*/
    var _window = $(window),
        ww = _window.width(),
        // wh = _window.height(),
        // wwNormal = 1400,
        wwMedium = 992,
        wwSmall = 768,
        // wwxs = 576,
        _body = $('body'),
        _main = $('.main'), // 2025
        // bodyW = _body.innerWidth(),
        _htmlBody = $('html, body'); // 2025

    // 2025
    var _header = $('header.header');
    /*-----------------------------------*/
    //////////// nojs 先移除////////////////
    /*-----------------------------------*/
    $('html').removeClass('no-js');
    /*-----------------------------------*/

    /*-----------------------------------*/
    /////// header 選單 tab及 fix設定////////
    /*-----------------------------------*/
    var _menu = _header.find('.menu');
    _menu.find('li').has('ul').addClass('hasChild');

    var _liHasChild = _menu.find('.hasChild');
    var _liHasChildA = _liHasChild.children('a');
    var _menuLiA = _menu.find('li>a');

    _liHasChild.children('ul').hide();

    // 滑鼠移入移出（ mouseenter / mouseleave）
    _liHasChild.on('mouseenter', function(){
        $(this).children('ul').fadeIn(200);
    }).on( 'mouseleave', function(){
        $(this).children('ul').fadeOut(200);
    })

    // 鍵盤焦點 / tab focus
    _liHasChildA.on('focus', function(){
        let _thisLi = $(this).parent('li');
        _thisLi.children('ul').show();
    })
    _menuLiA.on('focus', function(){
        $(this).parent('li').siblings().find('ul').hide();
    })

    // 離開 _menu 隱藏所有次選單
    $('*').on('focus click', function(){
        if( $(this).parents('.menu').length == 0 ){
            _liHasChild.find('ul').hide();
        }
    })


    /*-----------------------------------*/
    // 製作行動版側欄和所需元件
    /*-----------------------------------*/
    _body.prepend('<aside class="sidebar" id="mobileSideBar"><div class="m_area"><button type="button" class="sidebarClose" >關閉</button></div><div class="menu_overlay"></div></aside>');

    // 2025 修改 : 改變元件次序
    _header.find('h1').after('<button type="button" class="sidebarCtrl">側欄選單</button><button type="button" class="searchCtrl">查詢</button>');

    // var menu_status = false; 20250424 removed
    var _sidebar = $('.sidebar');
    var  _sidebarClose = $('.sidebarClose');
    var  _sidebarCtrl = $('.sidebarCtrl');
    var  _overlay = $('.menu_overlay');
    var _mArea = _sidebar.find('.m_area');

    _sidebarCtrl.append('<span></span><span></span><span></span>').attr('aria-expanded', false).attr('aria-controls', 'mobileSideBar');

    // 2025 new ////////////////////////////////////////////////////////////
    // 2025 行動版側欄內容準備
    _header.find('.menu').clone().appendTo(_mArea);
    _header.find('.navigation').clone().appendTo(_mArea);

    // 行動版側欄主選單
    var _mobileMenu = _sidebar.find('.menu');
    var _mobileMenuHasChildA = _mobileMenu.find('.hasChild').children('a');
    _mobileMenuHasChildA.attr('href', 'javascript:;').attr('role', 'button');

    // 行動版側欄次選單開合
    _mobileMenuHasChildA.on('click', function(){
        let _this = $(this);
        let _thisSubMenu = _this.next('ul');
        if (_thisSubMenu.is(':hidden')) {
            _thisSubMenu.slideDown().parent().siblings().find('ul:visible').slideUp().parent().removeClass('up');
            _this.attr('aria-expanded', true).parent().addClass('up');
        } else {
            _thisSubMenu.slideUp().find('ul:visible').slideUp();
            _thisSubMenu.find('.up').removeClass('up');
            _this.attr('aria-expanded', false).parent().removeClass('up');
        }
    })
    // 2025 new //////////////////////////////////////////////////////////// end



    // 打開側欄 function
    function showSidebar() {
        _sidebar.show();
        _mArea.show().animate({'margin-left': 0}, 500, 'easeOutQuint');
        _body.addClass('noscroll');
        _overlay.fadeIn();

        // 2025 new ////////////////////////////
        _sidebarClose.trigger('focus');
        _sidebarCtrl.attr('aria-expanded', true)
        // 2025 new ///////////////////////////// end
    }
    // 縮合側欄 function
    function hideSidebar() {
        _mArea.animate({ 'margin-left': _mArea.width() * -1 + 'px' }, 500, 'easeOutQuint', function() {
            _sidebar.fadeOut(200);
            _mArea.hide();
            _mobileMenuHasChildA.parent().removeClass('up').children('ul').hide(); // 2025 new
        });
        _body.removeClass('noscroll');
        _overlay.fadeOut();

        _sidebarCtrl.trigger('focus').attr('aria-expanded', false); // 2025 new

    }
    // 打開選單動作
    _sidebarCtrl.click(function() {
        showSidebar();
    });
    // 關閉動作
    _overlay.add(_sidebarClose).off().click(function() {
        hideSidebar();
    });


    // 2025 new ////////////////////////////////////////////////////////////
    // 行動版查詢
    var _search = $('.search');
    var _searchCtrl = $('.searchCtrl');
    _searchCtrl.on('click', function() {
        if ( _search.is(':visible')) {
            _search.stop(true, false).slideUp(300);
        } else {
            _search.stop(true, false).slideDown(300, function(){
                _search.find('input[type="text"]').trigger('focus');
            });
        }
    });

    // 行動版查詢: 離開最後一個可 focus 元件
    _search.find('a', 'input', 'button').last().on('keydown', function(e){ 
        if ( _searchCtrl.is(':visible')) {
            e.preventDefault();
            if ( e.code=='Tab' && !e.shiftKey){
                _search.stop(true, false).slideUp(300);
                _searchCtrl.trigger('focus');
            }
        }
    })
    _search.find('input[type="text"]').on('focus', function(){
        if ( _searchCtrl.is(':hidden')) {
            _htmlBody.animate({ scrollTop: 0 }, 200);
        }
    })
    // 2025 new //////////////////////////////////////////////////////////// end


    function mobileMenu() {
        // switch PC/MOBILE
        ww = _window.width();
        if (ww < wwSmall) {
            /*-----------------------------------*/
            /////////////// 手機版設定 /////////////
            /*-----------------------------------*/
            menu_status = false;
            _search.removeAttr('style');
            _body.off('touchmove');
        } else {
            /*-----------------------------------*/
            /////////////// PC版設定 /////////////
            /*-----------------------------------*/
            hideSidebar();
            _body.removeClass('noscroll');
            _search.removeAttr('style');
        }
    }

    // 2025 new ////////////////////////////////////////////////////////////
    // 離開 sidebar 最後一個可 focus 元件，焦點回到 _sidebarClose
    var _sidebarLastA = _sidebar.find('.navigation').find('a').last();
    _sidebarLastA.on('keydown', function(e){ 
        if ( e.code=='Tab' && !e.shiftKey){
            e.preventDefault();
            _sidebarClose.trigger('focus');
        }
    })
    // 2025 new //////////////////////////////////////////////////////////// end



    //設定resize 計時器
    var resizeTimer;
    _window.on("load resize", function(event) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            mobileMenu();
        }, 100);
    });
    // 固定版頭
    var hh = _header.outerHeight(true);
    _window.on("scroll resize", function() {
        ww = _window.width();
        // 185 - 40 ？這兩個數字是什麼？
        if (ww >= wwMedium && $(this).scrollTop() > 145) {
            _header.addClass('fixed').css('margin-top', -145 );
            _main.css('margin-top', 185);
        } else {
            _header.removeClass('fixed').css('margin-top', 0);
            _main.css('margin-top', 0);
        }
    });
    /*-----------------------------------*/
    //////////// notice訊息區塊 ////////////
    /*-----------------------------------*/
    $('[class*="notice"] a.close').click(function(e) {
        $(this).parent('[class*="notice"]').hide();
    });
    /*-----------------------------------*/
    //////////// Accordion設定 ////////////
    /*-----------------------------------*/
    $('.accordion').each(function() {
        // $(this).find('.accordion-content').hide();
        let _accordionCcontent = $(this).find('.accordion-content');
        let _accordionItem = _accordionCcontent.prev('a');
        _accordionCcontent.hide();
        _accordionItem.attr('role', 'button').attr('aria-expanded', false); // 2025

        _accordionItem.on('click', function(e){
            let _this = $(this);
            let _thisContent = _this.next('.accordion-content');
            e.preventDefault();
            if (_thisContent.is(':visible')) {
                _thisContent.slideUp();
                _this.attr('aria-expanded', false);
            } else {
                _accordionCcontent.not(_thisContent).slideUp();
                _accordionItem.attr('aria-expanded', false);
                _thisContent.slideDown();
                _this.attr('aria-expanded', true)
            }
        })
    });
    /*-----------------------------------*/
    /////////////fatfooter開關/////////////
    /*-----------------------------------*/
    // 2025 removed
    // $('.btn-fatfooter').click(function(e) {
    //     $(this).parent('.container').find('nav>ul>li>ul').stop(true, true).slideToggle(function() {
    //         if ($(this).is(':visible')) {
    //             $('.btn-fatfooter').html("收合");
    //             $('.btn-fatfooter').attr('name', '收合選單');
    //         } else {
    //             $('.btn-fatfooter').html("展開");
    //             $('.btn-fatfooter').attr('name', '展開選單');
    //         }
    //     });
    //     $(this).stop(true, true).toggleClass('close');
    // });

    // 2025 new
    var _fatfooterBtn = $('.fatfooter').find('.btn-fatfooter');
    var _fatFooterNav = _fatfooterBtn.next('nav').children('ul').children('li').children('ul');
    _fatfooterBtn.attr('aria-expanded', true).removeAttr('name');
    _fatfooterBtn.on('click', function(){
        if( _fatFooterNav.is(':visible')) {
            _fatFooterNav.slideUp();
            _fatfooterBtn.addClass('close').attr('aria-expanded', false).text('展開');
        } else {
            _fatFooterNav.slideDown();
            _fatfooterBtn.removeClass('close').attr('aria-expanded', true).text('收合');
        }
    })

    /*-----------------------------------*/
    ////////img objectfix cover////////////
    /*-----------------------------------*/
    _window.on('resize load', function(e) {
        $('.imgOuter').each(function(index, el) {
            var _imgContainer = $(this),
                cWidth = _imgContainer.width(),
                cHeight = _imgContainer.height(),
                ratioC = cWidth / cHeight,
                _img = _imgContainer.find('img');
            var iWidth = $(this).find('img').width(),
                iHeight = $(this).find('img').height(),
                ratioImg = iWidth / iHeight,
                scaleRatio;
            if (ratioC > ratioImg) {
                scaleRatio = cWidth / iWidth;
                _img.width(cWidth).height(iHeight * scaleRatio).css('top', -.5 * (iHeight * scaleRatio - cHeight));
            } else {
                scaleRatio = cHeight / iHeight;
                _img.height(cHeight).width(iWidth * scaleRatio).css('left', -.5 * (iWidth * scaleRatio - cWidth));
            }
            $(this).find('img').removeClass('img-responsive');
        });
    });
    /*-----------------------------------*/


    /*-----------------------------------*/
    //縮圖，same as thumbnail模組
    _window.on('resize load', function(e) {
        $('.imgOuter').each(function(index, el) {
            var _imgContainer = $(this),
                cWidth = _imgContainer.width(),
                cHeight = _imgContainer.height(),
                ratioC = cWidth / cHeight,
                _img = _imgContainer.find('img');
            var iWidth = $(this).find('img').width(),
                iHeight = $(this).find('img').height(),
                ratioImg = iWidth / iHeight,
                scaleRatio;
            if (ratioC > ratioImg) {
                scaleRatio = cWidth / iWidth;
                _img.width(cWidth).height(iHeight * scaleRatio).css('top', -.5 * (iHeight * scaleRatio - cHeight));
            } else {
                scaleRatio = cHeight / iHeight;
                _img.height(cHeight).width(iWidth * scaleRatio).css('left', -.5 * (iWidth * scaleRatio - cWidth));
            }
            $(this).find('img').removeClass('img-responsive');
        });
    });
    /*-----------------------------------*/
    ////////////////多組Tab////////////////
    /*-----------------------------------*/
    tabSet();
    var resizeTimer1;
    _window.resize(function() {
        clearTimeout(resizeTimer1);
        resizeTimer1 = setTimeout(function() {
            ww = _window.width();
            tabSet();
        }, 200);
    });

    function tabSet() { //頁籤
        $('.tabs').each(function() {
            var _tab = $(this),
                _tabItem = _tab.find('.tabItem'),
                _tabItemA = _tabItem.children('a'),
                _tabContent = _tab.find('.tabContent'),
                tabwidth = _tab.width(),
                tabItemHeight = _tabItem.outerHeight(),
                tabContentHeight = _tab.find('.active').next().innerHeight(),
                tiGap = 5,
                tabItemLength = _tabItem.length,
                tabItemWidth;
            _tab.find('.active').next('.tabContent').show();
            if (ww > wwSmall) {
                _tabContent.css('top', tabItemHeight);
                _tab.height(tabContentHeight + tabItemHeight);
                tabItemWidth = (tabwidth - (tabItemLength - 1) * tiGap) / tabItemLength;
                _tabItem.width(tabItemWidth).css('margin-left', tiGap);
                _tabItem.first().css('margin-left', 0);
                _tabItem.last().css({ 'position': 'absolute', 'top': 0, 'right': 0 }).width(tabItemWidth);
            } else {
                _tab.css('height', 'auto');
                _tabItem.width(tabwidth);
                _tabItem.css('margin-left', 0).last().css('position', 'relative');
            }
            _tabItemA.focus(tabs);
            _tabItemA.click(tabs);

            function tabs(e) {
                var _tabItemNow = $(this).parent(),
                    tvp = _tab.offset().top,
                    tabIndex = _tabItemNow.index() / 2,
                    scollDistance = tvp + tabItemHeight * tabIndex - hh;
                _tabItem.removeClass('active');
                _tabItemNow.addClass('active');
                if (ww <= wwSmall) {
                    _tabItem.not('.active').next().slideUp();
                    _tabItemNow.next().slideDown();
                    $("html,body").stop(true, false).animate({ scrollTop: scollDistance });
                } else {
                    _tabItem.not('.active').next().hide();
                    _tabItemNow.next().show();
                    tabContentHeight = _tabItemNow.next().innerHeight();
                    _tab.height(tabContentHeight + tabItemHeight);
                }
                e.preventDefault();
            }
        });
    }
    /*-----------------------------------*/
    ///////////////置頂go to top////////////
    /*-----------------------------------*/
    const _scrollToTop = $('.scrollToTop');
    const _goCenter = $('.goCenter');
    _scrollToTop.attr('role', 'button');
    _window.on('scroll', function() {
        if (_window.scrollTop() > 200) {
            _scrollToTop.fadeIn();
        } else {
            _scrollToTop.fadeOut();
        }
    });
    /*-----------------------------------*/
    /////click event to scroll to top//////
    /*-----------------------------------*/
    _scrollToTop.on('click', function(e) {
        e.preventDefault();
        _htmlBody.animate({ scrollTop: 0 }, 600, function(){
            _goCenter.trigger('focus');
        } );
    });

    /*--------------------------------------------------------*/
    /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
    /*--------------------------------------------------------*/
    // 判斷 useragnet
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);
    if (ie) {
        $(".img-container a").each(function() {
            var imgUrl = $(this).children('img').attr('src');
            var $container = $(this);
            $container.has(".cover").addClass("ie-object-cover");
            $container.has(".cover").css("backgroundImage", "url(" + imgUrl + ")");
            $container.has(".fill").addClass("ie-object-fill");
            $container.has(".fill").css("backgroundImage", "url(" + imgUrl + ")");
            $container.has(".contain").addClass("ie-object-contain");
            $container.has(".contain").css("backgroundImage", "url(" + imgUrl + ")");
        });
    }
    /*-----------------------------*/
    /////form表單 placeholder隱藏/////
    /*-----------------------------*/
    $('input,textarea').focus(function() {
        $(this).removeAttr('placeholder');
    });
    /*------------------------------------*/
    /////form表單 單個檔案上傳+多個檔案上傳/////
    /*------------------------------------*/
    $(document).on('change', '.check_file', function() {
        var names = [];
        var length = $(this).get(0).files.length;
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            names.push($(this).get(0).files[i].name);
        }
        // $('input[name=file]').val(names);
        if (length > 2) {
            var fileName = names.join(', ');
            $(this).closest('.upload_grp').find('.upload_file').attr("value", length + " files selected");
        } else {
            $(this).closest('.upload_grp').find('.upload_file').attr("value", names);
        }
    });
    /*------------------------------------*/


    /*------------------------------------*/
    /////cp table 加上響應式table wrapper/////
    /*------------------------------------*/
    $('.cp table').each(function(index, el) {
        //判斷沒有table_list
        if ($(this).parents('.table_list').length == 0) {
            $(this).wrap('<div class="table_wrapper"></div>')
        }
    });
    $('.lp table').each(function(index, el) {
        //判斷沒有table_list
        if ($(this).parents('.table_list').length == 0) {
            $(this).wrap('<div class="table_wrapper"></div>')
        }
    });
     /*-----------------------------------*/
    /////////// 無障礙快捷鍵盤組合  //////////
    /*-----------------------------------*/
    $(document).on('keydown', function(e) {
        // alt+U header
        if (e.altKey && e.code == 'KeyU' ) {
            _htmlBody.animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('header').find('.accesskey').focus();
        }
        // alt+C 主要內容區
        if (e.altKey && e.code == 'KeyC') {
            _htmlBody.stop(true, true).animate({ scrollTop: _main.find('.accesskey').offset().top }, 800, 'easeOutExpo');
            _main.find('.accesskey').focus();
        }
        // alt+Z footer
        if (e.altKey && e.code == 'KeyZ') {
            _htmlBody.stop(true, true).animate({ scrollTop: $('footer').find('.accesskey').offset().top }, 800, 'easeOutExpo');
            $('footer').find('.accesskey').focus();
        }
    });

    /*------------------------------------*/
    /////gotoCenter on focus跳到 content/////
    /*------------------------------------*/
    _goCenter.keydown(function(e) {
        // e.which == 13
        if (e.code == 'Enter') {
            _htmlBody.stop(true, true).animate({ 
                scrollTop: $('#aC').offset().top 
            }, 800, 'easeOutExpo', function(){
                $('#aC').trigger('focus');
            });
        }
    });



    /////////////////////////////////////////////////////////////////
    // 2025 2025 2025 2025 2025 2025 2025 2025 2025 2025 2025 2025 //
    /////////////////////////////////////////////////////////////////

    // 補暫停 button
    $('.mp_banner').find('.container').before('<button class="playPause" aria-label="停止輪播" data-altLabel="繼續輪播"></button>');
    $('.ad').find('.adSlider').before('<button class="playPause" aria-label="停止輪播" data-altLabel="繼續輪播"></button>');

    // 輪播暫停按鈕
    var _playPause = $('.playPause');
    _playPause.each( function(){
        let _thisPP = $(this);
        const buttonText0 = _thisPP.attr('aria-label');
        const buttonText1 = _thisPP.attr('data-altLabel');
        _thisPP.on('click', function(){
            if ( _thisPP.hasClass('paused') ){
                _thisPP.removeClass('paused').attr('aria-label', buttonText0);
                _thisPP.next().slick('slickPlay');
            } else {
                _thisPP.addClass('paused').attr('aria-label', buttonText1);
                _thisPP.next().slick('slickPause');
            }
        })
    })
});