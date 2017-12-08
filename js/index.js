$(document).on("touchmove",function(e){
    e.preventDefault();
}, false);
//点击圆点显示dialog
$(".point_1").click(function(){
    $(".dialog_under").show();
    $(".tag1").addClass("show");
});
$(".point_2").click(function(){
    $(".dialog_under").show();
    $(".tag2").addClass("show");
});
$(".point_3").click(function(){
    $(".dialog_under").show();
    $(".tag3").addClass("show");
});
$(".point_4").click(function(){
    $(".dialog_under").show();
    $(".tag4").addClass("show");
});
$(".point_5").click(function(){
    $(".dialog_under").show();
    $(".tag5").addClass("show");
});
$(".point_6").click(function(){
    $(".dialog_under").show();
    $(".tag6").addClass("show");
});
$(".point_7").click(function(){
    $(".dialog_under").show();
    $(".tag7").addClass("show");
});
$(".point_8").click(function(){
    $(".dialog_under").show();
    $(".tag8").addClass("show");
});
$(".point_9").click(function(){
    $(".dialog_under").show();
    $(".tag9").addClass("show");
});
$(".point_10").click(function(){
    $(".dialog_under").show();
    $(".tag10").addClass("show");
});
//隐藏dialog
$(".secondpage>.dialog_wrap>.dialog_under").click(function(){
    $(".secondpage>.dialog_wrap>.dialog").removeClass("show");
    $(this).hide();
});
$(".thirdpage>.dialog_wrap>.dialog_under").click(function(){
    $(".thirdpage>.dialog_wrap>.dialog").removeClass("show");
    $(this).hide();
});
$(".forthpage>.dialog_wrap>.dialog_under").click(function(){
    $(".forthpage>.dialog_wrap>.dialog").removeClass("show");
    $(this).hide();
});
$(".fivepgae>.dialog_wrap>.dialog_under").click(function(){
    $(".fivepgae>.dialog_wrap>.dialog").removeClass("show");
    $(this).hide();
});
$(".sixpage>.dialog_wrap>.dialog_under").click(function(){
    $(".sixpage>.dialog_wrap>.dialog").removeClass("show");
    $(this).hide();
});
$(".sevenpage>.dialog_wrap>.dialog_under").click(function(){
    $(".sevenpage>.dialog_wrap>.dialog").removeClass("show");
    $(this).hide();
});
 $(".btn_img").click(function(){
      $(".box1").show()
      registerHSlide(null, null, $(".photo_1"), $(".photo_2"), null);
      registerHSlide(null, $(".photo_1"), $(".photo_2"), $(".photo_3"), null);
      registerHSlide(null, $(".photo_2"), $(".photo_3"), $(".photo_4"), null);
      registerHSlide(null, $(".photo_3"), $(".photo_4"), $(".photo_5"), null);
      registerHSlide(null, $(".photo_4"), $(".photo_5"),$(".eightpage"), function(){
        $(".box").css("display","block")
        console.log($(".box").css("display"))
      });
 })
registerSlide(null, null, $(".firstpage"), $(".secondpage"), null);
registerSlide(null, $(".firstpage"), $(".secondpage"), $(".thirdpage"),null);
registerSlide(null, $(".secondpage"), $(".thirdpage"), $(".forthpage"),null);
registerSlide(null, $(".thirdpage"), $(".forthpage"), $(".fivepgae"), null);
registerSlide(null,$(".forthpage"),$(".fivepgae"),$(".sixpage"),null)
registerSlide(null,$(".fivepgae"),$(".sixpage"),$(".sevenpage"),null)
registerSlide(null,$(".sixpage"),$(".sevenpage"),$(".eightpage"),null)
registerSlide(null,$(".sevenpage"),$(".eightpage"),null,null)
/////////////////

function registerSlide(page0Do, page0, page1, page2, page2Do) {
    //上滑事件
    var start_y;
    page1.on("touchstart",function(e) {
        if (page1.attr("touchable") == "false") {
            start_y = Infinity;
            return;
        }
        start_y = e.originalEvent.targetTouches[0].pageY;
        var page1_index = parseInt(page1.css("z-index"));
        if (page1_index <= 0) {
            page1_index = 999;
            page1.css("z-index", page1_index);
        }
        if (page0 != null) {
            page0.attr("touchable", "false");
            page0.css("animation", "1");
            page0.css("-webkit-animation", "1");
            page0.css("top", "-100%");
            page0.css("opacity", "0");
            page0.css("z-index", page1_index+1);
            page0.css("visibility", "visible");
            page0.show();
        }
        if (page2 != null) {
            page2.attr("touchable", "false");
            page2.css("animation", "1");
            page2.css("-webkit-animation", "1");
            page2.css("top", "0");
            page2.css("opacity", "1");
            page2.css("z-index", page1_index-1);
            page2.css("visibility", "visible");
            page2.show();
        }
    });
    var page_height = parseInt(page1.css("height"));
    page1.on("touchmove",function(e) {
        if (page1.attr("touchable") == "false" || start_y == Infinity)
            return;
        var delta_y = e.originalEvent.targetTouches[0].pageY - start_y;
        if (delta_y <= 0) {
            if (page2 != null) {
                page1.css("animation", "1");
                page1.css("-webkit-animation", "1");
                page1.css("top", "-"+(-delta_y)+"px");
                page1.css("opacity", 1 + (delta_y/page_height));
            }
        } else {
            if (page0 != null) {
                page0.css("animation", "1");
                page0.css("-webkit-animation", "1");
                page0.css("top", -(1-delta_y/page_height)*100+"%");
                page0.css("opacity", delta_y/page_height);
            }
        }
    });
    page1.on("touchend",function(e) {
        if (page1.attr("touchable") == "false" || start_y == Infinity)
            return;
        var delta_y = e.originalEvent.changedTouches[0].pageY - start_y;
        if (delta_y < -80) {
            if (page2 != null) {
                if (page0 != null)
                    page0.css("visibility", "hidden");
                page1.css("animation", "slidetotop .4s forwards ease-out");
                page1.css("-webkit-animation", "slidetotop .4s forwards ease-out");
                page1.attr("touchable", "false");
                setTimeout(function(){page2.attr("touchable", "true");}, 200);
                if (page2.attr("alreadyDo") != "true") {
                    page2.attr("alreadyDo", "true");
                    setTimeout(function(){
                        if (page2Do != null) {
                            page2Do();
                        }
                    }, 400);
                }
            }
        } else if (delta_y > 80) {
            if (page0 != null) {
                if (page2 != null)
                    page2.css("visibility", "hidden");
                page0.css("animation", "slidetoorigin .4s forwards ease-out");
                page0.css("-webkit-animation", "slidetoorigin .4s forwards ease-out");
                page1.attr("touchable", "false");
                setTimeout(function(){page0.attr("touchable", "true");}, 300);
                if (page0.attr("alreadyDo") != "true") {
                    page0.attr("alreadyDo", "true");
                    setTimeout(function(){
                        if (page0Do != null) {
                            page0Do();
                        }
                    }, 400);
                }
            }
        } else {
            if (page2 != null) {
                page1.css("animation", "slidetoorigin .1s forwards ease-out");
                page1.css("-webkit-animation", "slidetoorigin .1s forwards ease-out");
            }
            if (page0 != null) {
                page0.css("animation", "slidetotop .1s forwards ease-out");
                page0.css("-webkit-animation", "slidetotop .1s forwards ease-out");
            }
        }
    });
}
function registerHSlide(page0Do, page0, page1, page2, page2Do) {
    //上滑事件
    var start_x;
    page1.on("touchstart", function (e) {
        if (page1.attr("touchable") == "false") {
            start_x = Infinity;
            return;
        }
        start_x = e.originalEvent.targetTouches[0].pageX;
        var page1_index = parseInt(page1.css("z-index"));
        if (page1_index <= 0) {
            page1_index = 999;
            page1.css("z-index", page1_index);
        }
        if (page0 != null) {
            page0.attr("touchable", "false");
            page0.css("animation", "1");
            page0.css("-webkit-animation", "1");
            page0.css("left", "-100%");
            page0.css("opacity", "0");
            page0.css("z-index", page1_index + 1);
            page0.css("visibility", "visible");
            page0.show();
        }
        if (page2 != null) {
            page2.attr("touchable", "false");
            page2.css("animation", "1");
            page2.css("-webkit-animation", "1");
            page2.css("left", "0");
            page2.css("opacity", "1");
            page2.css("z-index", page1_index - 1);
            page2.css("visibility", "visible");
            page2.show();
        }
    });
    var page_width = parseInt(page1.css("width"));
    page1.on("touchmove", function (e) {
        if (page1.attr("touchable") == "false" || start_x == Infinity)
            return;
        var delta_x = e.originalEvent.targetTouches[0].pageX - start_x;
        if (delta_x <= 0) {
            if (page2 != null) {
                page1.css("animation", "1");
                page1.css("-webkit-animation", "1");
                page1.css("left", "-" + (-delta_x) + "px");
                page1.css("opacity", 1 + (delta_x / page_width));
            }
        } else {
            if (page0 != null) {
                page0.css("animation", "1");
                page0.css("-webkit-animation", "1");
                page0.css("left", -(1 - delta_x / page_width) * 100 + "%");
                page0.css("opacity", delta_x / page_width);
            }
        }
    });
    page1.on("touchend", function (e) {
        if (page1.attr("touchable") == "false" || start_x == Infinity)
            return;
        var delta_x = e.originalEvent.changedTouches[0].pageX - start_x;
        if (delta_x < -80) {
            if (page2 != null) {
                if (page0 != null)
                    page0.css("visibility", "hidden");
                page1.css("animation", "slidetoleft .4s forwards ease-out");
                page1.css("-webkit-animation", "slidetoleft .4s forwards ease-out");
                page1.attr("touchable", "false");
                setTimeout(function () {
                    page2.attr("touchable", "true");
                }, 200);
                if (page2.attr("alreadyDo") != "true") {
                    page2.attr("alreadyDo", "true");
                    setTimeout(function () {
                        if (page2Do != null) {
                            page2Do();
                        }
                    }, 400);
                }
            }
        } else if (delta_x > 80) {
            if (page0 != null) {
                if (page2 != null)
                    page2.css("visibility", "hidden");
                page0.css("animation", "slidetoorigin .4s forwards ease-out");
                page0.css("-webkit-animation", "slidetoorigin .4s forwards ease-out");
                page1.attr("touchable", "false");
                setTimeout(function () {
                    page0.attr("touchable", "true");
                }, 300);
                if (page0.attr("alreadyDo") != "true") {
                    page0.attr("alreadyDo", "true");
                    setTimeout(function () {
                        if (page0Do != null) {
                            page0Do();
                        }
                    }, 400);
                }
            }
        } else {
            if (page2 != null) {
                page1.css("animation", "slidetoorigin .1s forwards ease-out");
                page1.css("-webkit-animation", "slidetoorigin .1s forwards ease-out");
            }
            if (page0 != null) {
                page0.css("animation", "slidetoleft .1s forwards ease-out");
                page0.css("-webkit-animation", "slidetoleft .1s forwards ease-out");
            }
        }
    });
}
