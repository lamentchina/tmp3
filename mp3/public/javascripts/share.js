document.addEventListener("WeixinJSBridgeReady", function() {
  WeixinJSBridge && (WeixinJSBridge.on("menu:share:appmessage", function() {
    WeixinJSBridge.invoke("sendAppMessage", {
      img_url: song.cover,
      link: "http://www.javapk.net/demo/tools/player/",
      desc: song.twitter,
      title: '一首歌广播, 各位晚安.'
    }, function(r) {

    })
  }), WeixinJSBridge.on("menu:share:timeline", function() {
    WeixinJSBridge.invoke("shareTimeline", {
      "img_url":song.cover,
      "link":song.link,
      "desc":'一分钟广播，各位晚安',
      "title":song.twitter, // 注意这里要分享出去的内容是desc
      img_width: "240",
      img_height: "240"

    }, function(r) {})
  }))
}, false)
