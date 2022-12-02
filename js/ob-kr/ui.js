var mql = window.matchMedia("all and (min-width: 1200px)");
var infoScroll = [];
infoScroll += ("<div class='info_scroll'></div>");

$(function () {

    // tab toggle
    $('.tab_area>button').click(function () {
        $(this).toggleClass('active');
        $(this).next('ul').fadeToggle('fast');
        if ($('.tab_area>.tit').hasClass('active')) {
            $(this).attr('title', '닫기');
        } else {
            $(this).attr('title', '열기');
        }
    });

    /* 2021-21-02 헤더 검색박스 */
    $(document).on('click', ".mobile .btn_glo_search", function () {
        $('.global_search').show();
    });

    $(document).on('mouseenter focus', ".desktop #gnb>ul>li>a", function () {

        $("header").addClass('open')
        if ($("header").hasClass('open')) {
            $(".header_bg").remove()
            $("header").append("<div class='header_bg'></div>");
            $("#gnb>ul>li>a").removeClass('active')
            $(this).addClass('active')
        }

        var maxHeight = 0;
        $("#gnb>ul>li>.dep02").each(function (index) {
            var currentHeight = $("#gnb>ul>li>.dep02").eq(index).css('height').replace('px', '');
            if (maxHeight < currentHeight) {
                maxHeight = currentHeight
            }
        })
        $("#gnb>ul>li>.dep02").css('height', maxHeight);
        $(".header_bg").css('height', maxHeight)
    })

    $(document).on('mouseleave', ".desktop .header_bottom", function () {
        $("header").removeClass('open');
        $(".header_bg").remove();
        $("#gnb>ul>li>a").removeClass('active');
        $("#gnb>ul>li>.dep02").removeAttr('style');
    })

    $(document).on('mouseenter focus', ".desktop #gnb>ul>li>.dep02", function () {
        $("#gnb>ul>li>a").removeClass('active');
        $(this).prev("a").addClass('active');
    })

    $(document).on('click', ".mobile .header_bottom .menu_btn", function () {
        $(".gnb_wrap").append("<div class='header_bg'><div>")
        $(".gnb_wrap").addClass('open');
        $("body").css('overflow', 'hidden');
    })

    $(document).on('click', ".mobile .gnb_wrap .btn_close, .mobile .header_bg", function () {
        $(".header_bg").remove();
        $(".gnb_wrap").removeClass('open');
        $("body").css('overflow', 'auto');
        $("#gnb>ul>li").removeClass('active');
    })

    $(document).on('click', ".mobile #gnb>ul>li>a", function (e) {
        if ($(this).next()) {
            $(this).closest('li').toggleClass('active');
            e.preventDefault();
        }
    })

    // header focus out 처리
    $("#gnb>ul>li").eq($("gnb>ul>li:last-child").index()).find(".dep02>ul>li:last-child>a").on('keydown', function (e) {
        if (e.which == 9 != e.shiftKey && e.which == 9) {
            gnbClose();
        }
    });

    function gnbClose() {
        $("header").removeClass('open')
        $("#gnb>ul>li>a").removeClass('active');
        $('div').remove(".header_bg")
    }

    $(document).on('click', ".mobile .sns_box .share", function () {
        $(this).parent(".sns_box").toggleClass("open")
        if ($(".sns_box").hasClass("open")) {
            $(this).find(".blind").text('sns 박스닫기')
        } else {
            $(this).find(".blind").text('sns 박스열기')
        }
    })

    // tab
    $(".tab").each(function (index) {
        // 각각의 탭의 li개수 구하기
        var item_length = $(".tab").eq(index).find("li").length;
        if (item_length >= 6) {
            $(".tab").eq(index).addClass('auto')
        }
    })


    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $("header").outerHeight();
    $(window).scroll(function (event) {
        // 모바일일 때
        if (mql.matches == false) {
            didScroll = true;
        }
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $(".header_wrap").removeClass('down').addClass('up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $(".header_wrap").removeClass('up').addClass('down');
            }
        }
        lastScrollTop = st;
    }

    // datepicker
    // $.datepicker.setDefaults({
    //     showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
    //         ,
    //     buttonImage: "/images/ob-kr/ico_datepicker.png" //버튼 이미지 경로        
    // });

    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
        showOn: "button",
        buttonImageOnly: false,
        buttonText: "달력",
        showOn: "both"
    });


    $(".datepicker").datepicker();


    // 모바일에서 table에 가로 스크롤이 생길 시 터치문구영억 추가
    $("table").each(function () {
        if ($(this).width() > $(this).parent(".tbl_box").width()) {
            if ($(window).width() < 1200) {
                if ($("html").attr("lang") == "ko") {
                    $(this).parent(".tbl_box").prepend(infoScroll);
                }
            }
        } else {
            $('.info_scroll').remove();
        }
    })

    // 모바일로 접속했는지 체크
    var filter = "win16|win32|win64|mac|macintel";
    if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
        $("body").addClass("client_mobile");

        // 모바일에서 가로 스크롤이 있는 테이블
        $(document).on("touchstart", ".info_scroll", function () {
            $(this).fadeOut();
        })
    } else {
        $(document).on("click", ".info_scroll", function () {
            $(this).fadeOut();
        })
    }

})

// LNB
function currentPage(dep01, dep02) {
    $("#lnb>ul>li").eq(dep01 - 1).addClass('on');
    // if (dep02) {
    //     $("#lnb>ul>li").eq(dep01 - 1).find('ul>li').eq(dep02 - 1).addClass('on');
    // }
}

// 현재 페이지 프린트
function fn_action_printing() {
    window.open('print_page.html', '', 'width=1280,height=900,left=0,scrollbars=yes');
    return false;
}

//현재 페이지 pdf로 저장
function fn_download_pdf() {
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
        $('input[checked]').each(function () {
            $(this).removeAttr('checked');
        });
    }
    loader('on', 'PDF 생성 중입니다.');
    window.setTimeout(function () {
        html2canvas(document.getElementById('ctn'), {
            scrollY: (window.pageYOffset * -1)
        }).then(function (canvas) {
            var imgData = canvas.toDataURL('image/jpeg');
            var imgWidth = 210;
            var pageHeight = imgWidth * 1.414;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF('p', 'mm');
            var position = 0;

            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 20) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            doc.save($('#ctn .ctn_top h3').text() + '.pdf');
            loader('off');
        });
        //$('.board_top .r .input_box .search_btn').attr('type', 'submit');
    }, 2000);

}

// 현재 페이지 img로 다운로드
function fn_download_img() {
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
        $('input[checked]').each(function () {
            $(this).removeAttr('checked');
        });
    }

    loader('on', '이미지 파일 생성 중입니다.');

    window.setTimeout(function () {
        html2canvas(document.getElementById('ctn'), {
            scrollY: (window.pageYOffset * -1)
        }).then(function (canvas) {
            loader('off');
            if (navigator.msSaveBlob) {
                var blob = canvas.msToBlob();
                return navigator.msSaveBlob(blob, $('#ctn .ctn_top h3').text() + '.jpg');
            } else {
                var link = document.createElement('a');
                link.href = canvas.toDataURL("image/jpeg");
                link.download = $('#ctn .ctn_top h3').text() + '.jpg';
                link.click();
            }
        });
    }, 2000);
}

function loader(mode, msg) {
    if (mode == 'on') {
        $('body').append('<div class="loader"><div class="spin"></div><div class="id-msg">' + msg + '</div></div>');
    } else {
        $('.loader').remove();
    }
}

// 레이어팝업 열기
function fn_open_popup(id) {
    $(".popup_wrap[data-popup=" + id + "]").addClass("open");
    $(".popup_wrap[data-popup=" + id + "]").attr('tabindex', '0').focus();
}
// 레이어팝업 닫기
function fn_hide_popup(id) {
    $(".popup_wrap[data-popup=" + id + "]").removeClass("open")
}


/* 패밀리 사이트 보기 */
$(document).on('click', ".more_btn", function () {
    $('div.pop_home').slideDown();
})

$(document).on('mouseenter', "div.pop_home p", function () {
    $(this).find('.btn_s').hide();
    $(this).find('.btn_o').show();
})

$(document).on('mouseleave', "div.pop_home p", function () {
    $(this).find('.btn_s').show();
    $(this).find('.btn_o').hide();
})

$(document).on('click', "div.home_box .btn_close", function () {
    var btnOn = $('div.pop_home p.on');
    btnOn.removeClass('on');
    if (btnOn) {
        btnOn.find('.btn_o').hide();
        btnOn.find('.btn_s').show();
    }

    $('div.pop_home').slideUp();
})