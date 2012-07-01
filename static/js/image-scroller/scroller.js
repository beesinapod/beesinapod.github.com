function findImagesInLists(){
    // return lists containing images and inlineify the parents
    $('ul:has(li:has(img))').addClass('scroller-thumbs');
    return $('ul li img');
}

function switchImage(img){
    // change which image is shown in the lightbox
    $('.scroller-lightbox .image')
        .html($(img).clone());
}

function scrollGallery(dir){
    // scroll the lightbox (next or previous)
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
    )
    .append($($('<div class="scroller-lightbox"></div>')
        .hide()
        .append($('<div class="scroller-lightbox-close-button"></div>')
            .click(function () {
                hideLightbox();
            })
        )
        .append($('<div class="image"></div>'))
    ));

    var images = findImagesInLists();

    images
        .click(function () {
            switchImage(this);
            showLightbox();
        });
});