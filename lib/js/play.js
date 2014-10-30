var audio = document.getElementById('audio'),
  avator = document.getElementById('avator');
var $audio = $('#audio'),
  $avator = $('#avator'),
  $lrcwrap = $('#lrcwrap'),
  $lrcbox = $('#lrcbox'),
  $lrclist = $lrcbox.find('p');

var tools = {
  atimer: function() {
    // if($audio.get(0).currentTime != 0){
    return $audio.get(0).duration;
    // }else{
    //     return 0;
    // }
  },
  ctimer: function() {
    return $audio.get(0).currentTime;
  },
  lrcinit: function() {
    $lrcbox.css('margin-top', 0); //初始化

    var lrcVal,
      lrcArray = [],
      lrcTimeArray = [],
      html = "",
      musicName,
      singer;
    // var lrc = 'never_ever_meet_again.lrc';
    var lrc = 'lrcs/the_road_to_ordinary.lrc'
    var lrc = 'lrcs/141029.lrc';
    var lrc = 'https://raw.githubusercontent.com/lamentchina/tmp3/master/public/lrcs/141029.lrc';
    // var lrc = 'lrcs/1.lrc'
    //ajax获取歌词lrc文件
    loadLrc(lrc);

    function loadLrc(url) {

      if (lrc === "") {
        //没有歌词
        $lrcbox.html("<div class=\"no-lrc\">暂无歌词</div>");
      } else {
        $.get(url, function(result) {
          //获取歌词内容
          lrcVal = result.replace(/\[\d\d:\d\d.\d\d]/g, "");
          lrcArray = lrcVal.split("\n");

          //歌曲名
          lrcArray[0].replace(/\[\w\w\:(.*?)\]/g, function() {
            musicName = arguments[1] || "暂无";
          });

          //歌手
          lrcArray[1].replace(/\[\w\w\:(.*?)\]/g, function() {
            singer = arguments[1] || "暂无";
          });

          //获取歌曲名和歌手名
          html +=
            "<p class=\"lrc-line\" data-timeLine=\"0\"><span class=\"mr15\">" +
            musicName + "</span>  " + singer + "</p>";

          //只保留歌词部分
          lrcArray.splice(0, 4);

          //获取歌词时间轴
          result.replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,
            function() {

              var min = arguments[1] | 0, //分
                sec = arguments[2] | 0, //秒
                realMin = min * 60 + sec; //计算总秒数

              lrcTimeArray.push(realMin);
            });

          //将歌词装入容器
          for (var i = 0; i < lrcTimeArray.length; i++) {
            html += "<p class=\"lrc-line\" data-timeLine=\"" +
              lrcTimeArray[i] + "\">" + lrcArray[i] + "</p>";
          }

          $lrcbox.html(html);

        });

      }

    }

  },
  lrcm: function(atime, ctime) {
    //歌曲总时间 timeall
    //当前时间 currenttime
    var lrcBox = document.getElementById("lrcbox"),
      domList = lrcBox.getElementsByTagName("p"),
      timer,
      index,
      s,
      m = parseInt($lrcbox.css('margin-top').split("-")[1]) || 0;

    for (var i = 0; i < domList.length; i++) {
      //如果当前时间等于遍历的歌词的时间
      var dataTimeLine = ~~($(domList[i]).data('timeLine'));

      //等到唱第一句歌词的时候再滚动
      if (dataTimeLine > 0 && dataTimeLine === parseInt(ctime)) {

        //当前歌词的下标
        index = i;

        //当前下标值和上次记录的下标值不同才滚动，一个下标值只滚动一次
        if (s != i) {
          //记录下标值
          s = i;
          //歌词颜色变化
          for (var j = 0; j < domList.length; j++) {
            $(domList[j]).removeClass("current");
          }
          if (index > 0) {
            $(domList[index]).addClass("current");
          }

          //歌词滚动
          clearInterval(timer);
          timer = setInterval(function() {
            m += 1;
            if (m >= index * 30) {
              clearInterval(timer);
            } else {
              $lrcbox.css({
                'margin-top': "-" + m + "px"
              });
            }
          }, 10);
        }
      }
    }
  }
}
tools.lrcinit();
setTimeout(function() {
  $lrcwrap.toggleClass('flipped')
}, 10 * 1000)
setInterval(function() {
  tools.lrcm(tools.atimer(), tools.ctimer());
}, 1000)

var process = function(percentage) {
    var deg = 180 / 100 * percentage,
      m = $(".fill,.full"),
      p = $(".btn-play");
    m.css("transform", "rotate(" + 180 + "deg)");
    // $('.full').css('transform', 'rotate('+deg/2+'deg)')
    $(".fix").css("transform", "rotate(" + 180 * 2 + "deg)").data("percentage",
      percentage);
    p.text(percentage+"%");
  }, t,
  run = function(start, end) {
    clearInterval(t);
    var i = start,
      asc = end > start;
    t = setInterval(function() {
      if ((asc && i > end) || (!asc && i < end)) {
        clearInterval(t);
        return;
      }
      process(i);
      if (asc) i++;
      else i--;
    }, 100);
  }

$lrcwrap.tap(function() {
  $lrcwrap.toggleClass('flipped')
})
$('#btn_play').tap(function() {
  var $this = $(this);
  if (this.className.indexOf('play') >= 0) {
    this.className = 'btn-center btn-pause';
    $avator.addClass('animate').removeClass('animate-pause');
    audio.play();
    run(0,100);
  } else {
    this.className = 'btn-center btn-play';
    $avator.addClass('animate-pause').removeClass('anaimate');
    audio.pause();
  }
})
