var infoScroll = [];
infoScroll += ("<div class='info_scroll'></div>");

$(document).ready(function () {

    // desktop, mobile 구분
    if ($(this).width() < 1218) {
        $("html").removeClass("desktop").addClass("mobile");
    } else {
        $("html").removeClass("mobile").addClass("desktop");
        $('.main-layer-popup').draggable();
    }


    // 리사이즈 했을 경우
    $(window).resize(function () {
        if (this.resizeTO) {
            clearTimeout(this.resizeTO);
        }
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 100);
    });

    // 리사이즈가 끝났을 경우
    $(window).on("resizeEnd", function () {
        ChangeImg()
        // desktop, mobile 구분
        if ($(this).width() < 1217) {
            $("html").removeClass("desktop").addClass("mobile");
        } else {
            $("html").removeClass("mobile").addClass("desktop");
            $(".gnb_wrap").removeClass('open');
            $('div').remove(".header_bg");
            $('.info_scroll').remove();
            $("table").parent(".tbl_box").prepend(infoScroll);
            $('.main-layer-popup').draggable();
            $('.main-layer-popup').css('position', 'absolute')
        }
    });

    function ChangeImg() {
        $('.changeImg').each(function () {
            var oldSrc = $(this).attr("src");
            if ($(window).width() < 1200) {
                var newSrc = oldSrc.replace("_pc.", "_m.");
            } else {
                var newSrc = oldSrc.replace("_m.", "_pc.");
            }
            $(this).attr("src", newSrc);
        });
    } ChangeImg()

})