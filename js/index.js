(function($) {
    if (typeof $.fn.myProgress != "undefined") {
        return false;
    }
    $.fn.myProgress = function(options) {
        initOptions(options);
        var this_ = $(this);
        var $percent = $(this).find("div.percent-show>span");
        var progress_in = $(this).find("div.progress-in");
        initCss(options, $(this));
        var t = setInterval(function() {
            $percent.html(parseInt(progress_in.width() / this_.width() * 100));
        }, options.speed / 100);
        progress_in.animate({
            width: options.percent + "%"
        }, options.speed, function() {
            clearInterval(t);
            t = null;
            $percent.html(options.percent);
            options.percent == 100 && progress_in.css("border-radius", 0);
        });
        return $(this);
    };
    function initOptions(options) {
        (!options.hasOwnProperty("speed") || isNaN(options.speed)) && (options.speed = 1e3);
        (!options.hasOwnProperty("percent") || isNaN(options.percent)) && (options.percent = 100);
        !options.hasOwnProperty("height") && (options.height = "8px");
        !options.hasOwnProperty("direction") && (options.direction = "left");
        options.fontSize = Math.floor(parseInt(options.height) * 6 / 10) + "px";
        options.lineHeight = options.height;
    }
    function initCss(options, obj) {
        obj.css({
            width: options.width,
            height: options.height
        }).find("div.percent-show").css({
            lineHeight: options.lineHeight,
            fontSize: options.fontSize
        });
        if (options.direction == "right") {
            obj.find("div.progress-in").addClass("direction-right");
        } else {
            obj.find("div.progress-in").addClass("direction-left");
        }
    }
})(jQuery);

var $fingerprint = {};

var $video = {};

var pauseCount = 0;

var movie1 = 4;

//视频1停顿的位置
var movie2 = 6;

//视频2停顿的位置
var movie3 = 9;

//视频3停顿的位置
$(function() {
    $video = $("#video");
    $fingerprint = $("#fingerprint");
    stopDefault();
    // 阻止video 默认点击
    AndroidOrIos();
    //判断 ios OR an
    div2InIt();
    acquiring();
    var timer = 200;
    var timerFunc = setInterval(function() {
        spanEach();
        timer += 200;
        if (timer == 8e3) {
            $("#section0").hide();
            $("#section1").css("display", "flex");
            play_dream();
            var setTime = setTimeout(function() {
                $("#section1").children(".fingerprint-trigger").show();
                play_red_music();
                clearInterval(setTime);
                setTime = null;
            }, 1500);
            clearInterval(timerFunc);
            timerFunc = null;
        }
    }, 200);
    var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt, acquiring, false);
    $("#section1>.fingerprint-trigger").click(function() {
        stop_red_music();
        stop_bg_music();

        $("#section1").hide();
        $video[0].play();
        $("#section2").show();
    });
    $video.on("timeupdate", function() {
        timeupdate(this);
    }).on("ended", ended);
});

function stop_bg_music() {
    var bg_music = document.getElementById('bg_music');
    bg_music.pause();
}

function play_dream() {
    var music_dream = document.getElementById('dream_music');
    music_dream.play();
}

function play_red_music() {
    var music_red = document.getElementById("red_music");
    music_red.play();
}
function stop_red_music() {
    var music_red = document.getElementById("red_music");
    music_red.pause();
}

function play_red_no_loop_music() {
    var music_no_loop_red = document.getElementById('red_no_loop_music');
    music_no_loop_red.play();
}

function stop_red_no_loop_music() {
    var music_no_loop_red = document.getElementById('red_no_loop_music');
    music_no_loop_red.pause();
}

function play_yellow_music() {
    var music_yellow = document.getElementById("yellow_music");
    music_yellow.play();
}
function stop_yellow_music() {
    var music_yellow = document.getElementById("yellow_music");
    music_yellow.pause();
}


function timeupdate(self) {
    console.log(self);
    var currentTime = self.currentTime.toFixed(3);
    if (currentTime >= movie1) {
        if (pauseCount < 1 && pauseCount >= 0) {
            play_red_no_loop_music();
            $video[0].pause();
            $fingerprint.show();
            pauseCount++;
        }
    }
    if (currentTime >= movie2) {
        if (pauseCount < 2 && pauseCount >= 1) {
            play_red_no_loop_music();
            $video[0].pause();
            $fingerprint.show();
            pauseCount++;
        }
    }
    if (currentTime >= movie3) {
        if (pauseCount < 3 && pauseCount >= 2) {
            play_yellow_music();
            $video[0].pause();
            $fingerprint.children().remove();
            $fingerprint.addClass("glowworm");
            $fingerprint.css("animation", "none");
            $fingerprint.html("<div></div> <p>打开你的故事</p>");
            $fingerprint.css("display", "flex");
            pauseCount++;
        }
    }
}

function play_dream() {
    var music_dream = document.getElementById('dream_music');
    music_dream.play();
}

function play_red_music() {
    var music_red = document.getElementById("red_music");
    music_red.play();
}
function stop_red_music() {
    var music_red = document.getElementById("red_music");
    music_red.pause();
}

function play_yellow_music() {
    var music_yellow = document.getElementById("yellow_music");
    music_yellow.play();
}
function stop_yellow_music() {
    var music_yellow = document.getElementById("yellow_music");
    music_yellow.pause();
}

function ended() {
    $("#mask").css("display", "flex");
}

function triggerClick(that) {
    stop_yellow_music();
    stop_red_no_loop_music();

    $video[0].play();
    $(that).hide();
}

var isAndroid = 0;

var listIndex = 0;

function AndroidOrIos() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        isAndroid = 1;
    } else if (/android/.test(ua)) {
        isAndroid = 2;
    }
}

function stopDefault() {
    $video.click(function(event) {
        event.preventDefault();
    });
    $video.on("touchstart", function(event) {
        event.preventDefault();
    });
}

function spanEach() {
    var titleList = [ "想有个院子", "想一层一代人", "想邻居变朋友" ];
    if (listIndex < titleList.length) {
        listIndex++;
    } else {
        listIndex = 0;
    }
    $(".progress-text .text1").html(titleList[listIndex]);
}

function div2InIt() {
    // 初始化调用
    $("#div2").myProgress({
        speed: 4e3,
        percent: 100,
        width: "100%"
    });
}

function acquiring() {
    // 获取设备宽高
    /*
    var h = document.documentElement.clientHeight, w = document.documentElement.clientWidth, hint = h > w, ntransform_origin = w / 2;
    if (hint) {
	    //竖屏
	    $(".container").css({
		    height: w,
		    width: h,
		    transform: "rotate(90deg)",
		    "transform-origin": ntransform_origin
	    });
    } else {
        //横屏
        $(".container").css({
            height: h,
            width: w,
            "transform-origin": 0,
            transform: "rotate(0deg)"
        });
    }
    */
    
    var orientation = window.orientation;
    if (orientation != 0) {
        $("#model").css("display", "none");
    } else {
        $("#model").css("display", "flex");
    }
    
}
