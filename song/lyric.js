function parseLrc(data) {
    // console.log(data);
    var lrcArray = []; //新建数组,用于存放歌词
    var lrcGet = data.lrc.lyric; //提取歌词
    console.log(lrcGet);
    var lrc = lrcGet.split('\n');
    console.log(lrc);
  
  
    $.each(lrc, function(i, item) {
      //过滤空白文本
      if (item.split(']')[1] == "" || item == "" || item.indexOf('作曲') !== -1 || item.indexOf('作词') !== -1) {
        return true;
      }
      //转化时间
      var timeStr = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
      var min = parseInt(timeStr.split(':')[0]) * 60;
      var sec = parseFloat(timeStr.split(':')[1]);
      var time = parseFloat((min + sec).toFixed(2));
      //添加进数组
      lrcArray.push({
        t: time,
        c: item.substring(item.indexOf(']') + 1)
      });
    });
  
    console.log(lrcArray);
  
    //显示歌词
    var html = "";
    $.each(lrcArray, function(i, v) {
      html += '<li>' + v.c + '</li>';
    });
    $('.lyricsList').append(html);
  
    //同步高亮歌词
    $('#audio')[0].ontimeupdate = function() {
      $.each(lrcArray, function(i, v) {
        if ($('#audio')[0].currentTime >= lrcArray[i].t) {
          $('.lyricsList').css('margin-top', '');
          $('.lyricsList li').eq(i).addClass('highlight');
          $('.lyricsList li').eq(i).siblings().removeClass('highlight');
          if (i > 2) {
            $('.lyricsList').css('margin-top', (-i + 2) * 30 + 'px');
          }
        }
      });
    };
  }