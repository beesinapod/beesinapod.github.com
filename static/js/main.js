$(window).scroll(function() {

    if(window.pageYOffset > $('body').height() - $('.side').height() - $('footer').height()) {
        $('.side').removeClass('side-fixed');
        $('.side').addClass('side-bottom');
    }

    else if(window.pageYOffset > $('header').height()) {
        $('.side').addClass('side-fixed');
        $('.side').removeClass('side-bottom');
    }

    else if(window.pageYOffset < $('header').height()) {
        $('.side').removeClass('side-fixed');
    }
});