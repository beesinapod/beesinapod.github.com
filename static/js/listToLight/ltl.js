function listToLight(selector) {
    'use strict';
    var ltl = {
        findImagesInLists: function () {
            // return lists containing images and inlineify the parents
            var i;
            if (selector) {
                $(selector + ' ul:has(li:has(img))').addClass('ltl-scroller-thumbs');
                i = $(selector + ' ul li img');
            } else {
                $('ul:has(li:has(img))').addClass('ltl-scroller-thumbs');
                i = $('ul li img');
            }
            return i;
        },

        switchImage: function (img) {
            var that = this;
            // change which image is shown in the lightbox
            $('.ltl-box .image')
                .html($(img).clone());
            // when the image loads, align the lightbox
            $('.ltl-box .image img').load(function () {
                $('.ltl-box')
                    .css(
                        'marginTop',
                        -$('.ltl-box img').height() / 2
                    )
                    .css(
                        'marginLeft',
                        -$('.ltl-box img').width() / 2
                    );
            });
            // remember the current image
            this.current = img;
            // display the correct scroll arrows
            if ($(img).parent().prev().length) {
                $('.ltl-scroller.left').css('display', 'block');
            } else {
                $('.ltl-scroller.left').css('display', 'none');
            }
            if ($(img).parent().next().length) {
                $('.ltl-scroller.right').css('display', 'block');
            } else {
                $('.ltl-scroller.right').css('display', 'none');
            }
            $(document).keydown(function (e) {
                // We don't need to worry about unbinding these events
                // This is because hideLightbox() doesn't do anything of
                // significance if the lightbox is already hidden, and
                // scrollGallery() only scrolls if there's something to
                // scroll to.
                console.log(e.keyCode);
                if (e.keyCode === 27) {
                    that.hideLightbox();
                }
                if (e.keyCode === 37) {
                    that.scrollGallery('left');
                }
                if (e.keyCode === 39) {
                    that.scrollGallery('right');
                }
            });
        },

        scrollGallery: function (dir) {
            // scroll the lightbox (next or previous)
            var img = this.current;
            if (img) {
                if (dir === 'left' && $(img).parent().prev().length) {
                    this.switchImage($(img).parent().prev().children()[0]);
                } else if (dir === 'right' && $(img).parent().next().length) {
                    this.switchImage($(img).parent().next().children()[0]);
                }
            }
        },

        showLightbox: function () {
            // show the lightbox
            $('.ltl-modal-overlay').css('display', 'block');
            $('.ltl-box').css('display', 'block');
        },

        hideLightbox: function () {
            // hide the lightbox
            $('.ltl-modal-overlay').css('display', 'none');
            $('.ltl-box').css('display', 'none');
        },

        init: function () {
            var that = this;
            $('body')
                .append($('<div class="ltl-modal-overlay"></div>')
                    .hide()
                    .click(function () {
                        that.hideLightbox();
                    })
                    )
                .append($($('<div class="ltl-box"></div>')
                    .append($('<div class="ltl-close-button"></div>')
                        .click(function () {
                            that.hideLightbox();
                        })
                        )
                    .append($('<div class="ltl-scroller left"></div>')
                        .click(function () {
                            that.scrollGallery('left');
                        })
                        )
                    .append($('<div class="ltl-scroller right"></div>')
                        .click(function () {
                            that.scrollGallery('right');
                        })
                        )
                    .append($('<div class="image"></div>'))
                    .hide()
                    ));

            this.findImagesInLists().click(function () {
                that.switchImage(this);
                that.showLightbox();
            });
        }
    };
    ltl.init();
}

$(document).ready(function () {
    'use strict';
    listToLight('.post .main');
});