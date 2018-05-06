;
'use strict';

$("#toggle-menu").click(function() {
    $(this).toggleClass("on");
    // $(".header__menu-list").toggleClass('active');
    // $(".header__logo-wrapper").toggleClass('hide');
    // $("body").children().not('header, .header--white').toggleClass('blur');
});


$(function(){
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        infinite: true,
        vertical: true,
        arrows: false,
        verticalSwiping: true,
        // centerMode: true,
        focusOnSelect: true
    });

    $("#header").on("click","a.link-scroll", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});