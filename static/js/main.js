$(window).scroll(function() {

    if(window.pageYOffset > $('body').height() - $('.ingredients').height() - $('footer').height()) {
        $('.ingredients').removeClass('ing-fixed');
        $('.ingredients').addClass('ing-bottom');
    }

    else if(window.pageYOffset > $('header').height()) {
        $('.ingredients').addClass('ing-fixed');
        $('.ingredients').removeClass('ing-bottom');
    }

    else if(window.pageYOffset < $('header').height()) {
        $('.ingredients').removeClass('ing-fixed');
    }
});