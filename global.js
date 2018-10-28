
//jQuery.fn.imageResponsive = function () {
//    return this.each(function () {
//        var img = jQuery(this).find("img"),
//            defaultWidth = img.prop('naturalWidth'),
//            defaultHeight = img.prop('naturalHeight'),
//            parentHeight = jQuery(this).height(),
//            parentWidth = jQuery(this).width(),
//            aspectRatio = defaultWidth / defaultHeight;
//        img.css({
//            "height": "auto",
//            "width": "100%",
//            "margin-left": "0px",
//            "max-width": "inherit"
//        });
//        var imgHeight = parentWidth / aspectRatio;
//        var imgTop = (imgHeight - parentHeight) / 2;
//        img.css({
//            "margin-top": "-" + imgTop + "px"
//        });
//        if (img.height() < parentHeight) {
//            img.css({
//                "height": "100%",
//                "width": "auto"
//            });
//            var right_margin = (img.width() - parentWidth) / 2;
//            img.css({
//                "margin-left": "-" + right_margin + "px",
//                "margin-top": "0"
//            });
//        }
//        else if (img.width() < parentWidth) {
//            img.css({
//                "height": "auto",
//                "width": "100%",
//                "margin-left": "0"
//            });
//            img.css({
//                "margin-top": "-" + imgTop + "px"
//            });
//        }
//    });
//};

(function ($) {

    $(document).ready(function () {

        $('h2:contains(ios)').html(function () {
            return $(this).html().replace('ios', '<span>iOS</span>');
        });
        $('h3:contains(ios)').html(function () {
            return $(this).html().replace('ios', '<span>iOS</span>');
        });

        $('.outer-icon img').click(function () {
            $('.search-box').addClass('open');
            var searchInput = $(this).parents('.main-search').find('input.search-input');
            setTimeout(function () {
                $(searchInput).focus();
            }, 600);
        });

        $('.search-box span.cross').click(function () {
            $('.search-box input.search-input').val('');
            $('.search-box').removeClass('open');
        });

        $('.toggle').click(function (e) {
            $('body').toggleClass('menu-overflow');

            $('.toggle > span:first-child').toggleClass('first-span');
            $('.toggle > span:nth-child(2)').toggleClass('mid-span');
            $('.toggle > span:last-child').toggleClass('last-span');
            e.stopPropagation();
            $('.mobile-menu').stop(true, true).slideToggle();
        });
    });

//    $(window).on("load",function () {
//        $(window).on("resize", function () {
//            $(".right-col .bg-img").imageResponsive();
//        }).resize();
//    });

})(jQuery);


//# sourceMappingURL=global.js.map
