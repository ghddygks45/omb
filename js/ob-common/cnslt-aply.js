/**
 * 인증번호발송제한
 */
function fn_time_of_send_timer(init_sec) {
    if (typeof init_sec != "undefined") {
        fn_set_time_of_send_timer(init_sec);
        _send_timer = setTimeout(fn_time_of_send_timer, 1000);
    } else {
        fn_set_time_of_send_timer(--_time_of_send);
        if (_time_of_send > 0) {
            _send_timer = setTimeout(fn_time_of_send_timer, 1000);
        }
    }
}

function fn_set_time_of_send_timer(sec) {
    if (typeof _send_timer != "undefined" && _send_timer != null) clearTimeout(_send_timer);
    _time_of_send = sec;
    console.log("_time_of_send = " + _time_of_confirm);
}

/**
 * 인증번호확인제한
 */
function fn_time_of_confirm_timer(init_sec) {
    if (typeof init_sec != "undefined") {
        fn_set_time_of_confirm_timer(init_sec);
        _confirm_timer = setTimeout(fn_time_of_confirm_timer, 1000);
    } else {
        fn_set_time_of_confirm_timer(--_time_of_confirm);
        if (_time_of_confirm > 0) {
            _confirm_timer = setTimeout(fn_time_of_confirm_timer, 1000);
        }
    }
}

function fn_set_time_of_confirm_timer(sec) {
    if (typeof _confirm_timer != "undefined" && _confirm_timer != null) clearTimeout(_confirm_timer);
    _time_of_confirm = sec;
    console.log("_time_of_confirm = " + _time_of_confirm);
    if (_time_of_confirm >= 0) {
        var mm = parseInt(_time_of_confirm / 60);
        var ss = _time_of_confirm % 60;
        if (ss < 10) ss = "0" + ss;
        $("#frm_dstrss_cnslt_aply #txt_confirm_pwd_timer").text(mm + ":" + ss);
        $("#frm_dstrss_cnslt_aply #txt_confirm_pwd_timer").parent().removeClass("blind");
    }
}

function fn_aply_dstrss_cnslt() {
    var frm = document.frm_dstrss_cnslt_aply;
    frm.action = "cnslt-aply.do";
    frm.method = "post";
    try {
        frm.type.value = "";
        frm.type.remove();
    } catch (e) {}
    frm.submit();
    return false;
}

$(function () {

    //외국인투자촉진법 제2조 4항에서 정의하고 있는 외국인투자 기업에 해당하는 기업이 맞습니까?
    $("#frm_dstrss_cnslt_aply input:radio[name='fgvst_entp_yn']").on("change", function () {
        if ($("#frm_dstrss_cnslt_aply").hasClass("law") === false) {
            this.checked = false;
            fn_open_popup("law");
        } else {
            $("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_law'][value='" + this.value + "']").prop("checked", true);
            if (this.value != "Y") {
                fn_open_popup("law_alim");
            }
        }
    });
    $("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_law']").on("change", function () {
        $("#frm_dstrss_cnslt_aply input:radio[name='fgvst_entp_yn'][value='" + this.value + "']").prop("checked", true);
        // if (this.value != "Y") {
        //     console.log('조건3')
        //     fn_open_popup("law_alim");
        // }
    });
    $("#frm_dstrss_cnslt_aply #btn_pop_law").on("click", function (e) {
        $("#frm_dstrss_cnslt_aply").addClass("law");
        if ($("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_law']:checked").val() == "Y") {
            fn_hide_popup("law");
        } else {
            fn_open_popup("law_alim");
        }
        return false;
    });

    //개인정보처리방침
    $("#frm_dstrss_cnslt_aply input:radio[name='indinf_agre_yn']").on("change", function () {
        if ($("#frm_dstrss_cnslt_aply").hasClass("info") === false) {
            this.checked = false;
            fn_open_popup("info");
        } else {
            $("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_info'][value='" + this.value + "']").prop("checked", true);
            if (this.value != "Y") {
                fn_open_popup("info_alim");
            }
        }
    });
    $("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_info']").on("change", function () {
        $("#frm_dstrss_cnslt_aply input:radio[name='indinf_agre_yn'][value='" + this.value + "']").prop("checked", true);
        // if (this.value != "Y") {
        //     fn_open_popup("info_alim");
        // }
    });
    $("#frm_dstrss_cnslt_aply #btn_pop_info").on("click", function (e) {
        $("#frm_dstrss_cnslt_aply").addClass("info");
        if ($("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_info']:checked").val() == "Y") {
            fn_hide_popup("info");
        } else {
            fn_open_popup("info_alim");
        }
        return false;
    });

    //외국인투자옴부즈만 고충상담 시 당사의 면책(Disclaimer) 알림
    $("#frm_dstrss_cnslt_aply input:radio[name='hedofc_dsclmr_agre_yn']").on("change", function () {
        if ($("#frm_dstrss_cnslt_aply").hasClass("Disclaimer") === false) {
            this.checked = false;
            fn_open_popup("Disclaimer");
        } else {
            $("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_Disclaimer'][value='" + this.value + "']").prop("checked", true);
            if (this.value != "Y") {
                fn_open_popup("Disclaimer_alim");
            }
        }
    });
    $("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_Disclaimer']").on("change", function () {
        $("#frm_dstrss_cnslt_aply input:radio[name='hedofc_dsclmr_agre_yn'][value='" + this.value + "']").prop("checked", true);
        // if (this.value != "Y") {
        //     fn_open_popup("Disclaimer_alim");
        // }
    });
    $("#frm_dstrss_cnslt_aply #btn_pop_Disclaimer").on("click", function (e) {
        $("#frm_dstrss_cnslt_aply").addClass("Disclaimer");
        if ($("#frm_dstrss_cnslt_aply input:radio[name='rdo_pop_Disclaimer']:checked").val() == "Y") {
            fn_hide_popup("Disclaimer");
        } else {
            fn_open_popup("Disclaimer_alim");
        }
        return false;
    });

    //인증번호발송
    $("#frm_dstrss_cnslt_aply input[name='email']").on("change", function () {
        fn_time_of_confirm_timer(-1);
    });
    $("#frm_dstrss_cnslt_aply #btn_send_pwd").on("click", function (e) {
        var email = $("#frm_dstrss_cnslt_aply input[name='email']");
        if (email.val() == "") {
            alert("수신가능한 이메일을 입력해 주세요.");
            email.focus();
            return false;
        }
        var emailre = /^[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z가-힣])*@[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z가-힣])*.[a-zA-Z가-힣]{2,3}$/i;
        if (email.val().match(emailre) == null) {
            alert("올바른 이메일을 입력해 주세요.");
            email.focus();
            return false;
        }
        if (typeof _time_of_send != "undefined" && _time_of_send >= 0) { //30초이내 재발송 금지
            return false;
        }
        if ($("#frm_dstrss_cnslt_aply input:radio[name='fgvst_entp_yn']:checked").val() != "Y") {
            fn_open_popup("law_alim");
            return false;
        }
        if ($("#frm_dstrss_cnslt_aply input:radio[name='indinf_agre_yn']:checked").val() != "Y") {
            fn_open_popup("info_alim");
            return false;
        }
        if ($("#frm_dstrss_cnslt_aply input:radio[name='hedofc_dsclmr_agre_yn']:checked").val() != "Y") {
            fn_open_popup("Disclaimer_alim");
            return false;
        }
        fn_time_of_send_timer(30); //코드전송시작
        $.post("/ob-kr/ob/dstrss/front/cnslt-aply-send-code.do", {
            "email": email.val()
        }, function (result) {
            fn_set_time_of_confirm_timer(-1);
            if (result.code) {
                if (result.code == "success") {
                    fn_open_popup("check");
                    fn_time_of_confirm_timer(600); //확인시작
                }
            } else {
                alert(result);
            }
        }).fail(function (r, s, e) {
            console.log("code:" + r.status + "\nmessage:" + r.responseText + "\nerror:" + e);
            try {
                var result = jQuery.parseJSON(r.responseText);
                if (result.message) {
                    alert(result.message);
                }
            } catch (e) {}
        });
        return false;
    });

    //인증번호확인
    $("#frm_dstrss_cnslt_aply #btn_confirm_pwd").on("click", function (e) {
        var email = $("#frm_dstrss_cnslt_aply input[name='email']");
        var pwd = $("#frm_dstrss_cnslt_aply input[name='pwd']");
        if (typeof _time_of_confirm == "undefined" || _time_of_confirm <= 0) { // 10분초과시 인증번호 다시받기
            alert("고충상담을 위해 이메일 인증이 반드시 필요합니다.");
            email.focus();
            return false;
        }
        $.post("/ob-kr/ob/dstrss/front/cnslt-aply-auth-code.do", {
            "email": email.val(),
            "pwd": pwd.val()
        }, function (result) {
            if (result.code) {
                if (result.code == "success") {
                    fn_set_time_of_confirm_timer(-1);
                    var frm = document.frm_dstrss_cnslt_aply;
                    frm.action = "cnslt-aply.do";
                    frm.method = "post";
                    frm.type.value = "write";
                    frm.submit();
                } else {
                    alert("인증번호가 일치하지 않습니다.");
                }
            } else {
                alert(result);
            }
        }).fail(function (r, s, e) {
            console.log("code:" + r.status + "\nmessage:" + r.responseText + "\nerror:" + e);
            try {
                var result = jQuery.parseJSON(r.responseText);
                if (result.message) {
                    alert(result.message);
                }
            } catch (e) {}
        });
        return false;
    });

});