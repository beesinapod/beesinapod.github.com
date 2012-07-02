var imageScroller = {
    current: null
}

function findImagesInLists(){
    // return lists containing images and inlineify the parents
    $(' ul:has(li:has(img))').addClass('scroller-thumbs');
    return $('ul li img');
}

function switchImage(img){
    // change which image is shown in the lightbox
    $('.scroller-lightbox .image')
        .html($(img).clone())
    // when the image loads, align the lightbox
    $('.scroller-lightbox .image img').load(function () {
        $('.scroller-lightbox')
            .css(
                'marginTop',
                -$('.scroller-lightbox img').height()/2)
            .css(
                'marginLeft',
                -$('.scroller-lightbox img').width()/2);
    });
    // remember the current image
    imageScroller.current = img;
    // display the correct scroll arrows
    if ($(img).parent().prev().length) {
        $('.scroller.left').css('display', 'block');
    }
    else {
        $('.scroller.left').css('display', 'none');
    }
    if ($(img).parent().next().length) {
        $('.scroller.right').css('display', 'block');
    }
    else {
        $('.scroller.right').css('display', 'none');
    }
}

function scrollGallery(dir){
    // scroll the lightbox (next or previous)
    var img = imageScroller.current;
    if (img) {
        if (dir === 'left' && $(img).parent().prev().length) {
            switchImage($(img).parent().prev().children()[0]);
        }
        else if (dir === 'right' && $(img).parent().next().length) {
            switchImage($(img).parent().next().children()[0]);
        }
    }
}

function showLightbox(){
    // show the lightbox
    $('.modal-overlay').css('display', 'block');
    $('.scroller-lightbox').css('display', 'block');
}

function hideLightbox(){
    // hide the lightbox
    $('.modal-overlay').css('display', 'none');
    $('.scroller-lightbox').css('display', 'none');
}

$(document).ready(function() {
    $('body')
    .append($('<div class="modal-overlay"></div>')
        .hide()
        .click(function () {
            hideLightbox();
        })
    )
    .append($($('<div class="scroller-lightbox"></div>')
        .append($('<div class="scroller-lightbox-close-button"></div>')
            .click(function () {
                hideLightbox();
            })
        )
        .append($('<div class="scroller left"></div>')
            .click(function () {
                scrollGallery('left');
            })
        )
        .append($('<div class="scroller right"></div>')
            .click(function () {
                scrollGallery('right');
            })
        )
        .append($('<div class="image"></div>'))
        .hide()
    ));

    findImagesInLists().click(function () {
        switchImage(this);
        showLightbox();
    });

});