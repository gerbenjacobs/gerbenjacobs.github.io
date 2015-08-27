/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

// Tooltip Init
$(function () {
    $("[data-toggle='tooltip']").tooltip();
});

// make all images responsive
$(function () {
    $("img").addClass("img-responsive").addClass("center-block");
});

// responsive tables
$(document).ready(function () {
    $("table").wrap("<div class='table-responsive'></div>");
    $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function () {
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function ($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function () {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});

// Age calculator for contact page
$(document).ready(function () {
    $("#age").html(calcAge());
});

function calcAge() {
    var birthday = +new Date("1988-03-14");
    return ~~((Date.now() - birthday) / (31557600000));
}

(function (document, $) {
    "use strict";

    var flickrPhotoStream = function ($el, options) {
        var url = [
            'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=',
            options.key,
            '&user_id=',
            options.id,
            '&photoset_id=',
            options.setId,
            '&extras=date_taken',
            '&format=json&jsoncallback=?'
        ].join('');

        var elem = $('#' + $el[0].id);
        return $.getJSON(url).done(function (data) {
            elem.prev('p').append(' <small>(' + data.photoset.photo.length + ' photos)</small>');
            $.each(data.photoset.photo, function (index, item) {
                var link = "https://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_c.jpg";
                var active = (index == 0) ? ' active' : '';
                elem.find('.carousel-inner').append('<div class="item' + active + '"><img src="' + link + '" alt="' + item.title + '"><div class="carousel-caption">' + item.title + '<br><small>' + item.datetaken + '</small></div></div>');
            });
        });
    };

    $.fn.flickrPhotoStream = function () {
        var options = {};
        options.key = "235a5d3aea9e6807deecebb148b2df60";
        options.id = $(this).attr('data-id');
        options.setId = $(this).attr('data-set-id');
        return flickrPhotoStream($(this).get(), options);
    };
})(document, jQuery);

$(document).ready(function () {
    $(".carousel").each(function(){
       $(this).flickrPhotoStream();
    });
});
