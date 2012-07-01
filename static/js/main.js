$(window).scroll(function() {

    if(window.pageYOffset > $('body').height() - $('.side').height() - $('footer').height() - 40) {
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