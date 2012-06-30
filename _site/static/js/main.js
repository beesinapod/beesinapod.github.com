$(window).scroll(function() {
    if(window.pageYOffset > $('header').height()) {
        $('.ingredients').addClass('ing-fixed');
    }

    if(window.pageYOffset < $('header').height()) {
        $('.ingredients').removeClass('ing-fixed');
    }
});