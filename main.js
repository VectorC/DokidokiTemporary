var playMusic = function(){
  $(".btn").click(function(){
    window.open('https://mega.co.nz/#!TUpUWbTA!aS_UDvJshsgTY4WVwTSvQ4--72dNhjV5IKyd4I8bI-8', '_blank');
  })
  
  if($.browser.webkit){
    //alert( "This is WebKit!" );
  }
  
  if($.browser.msie){
    //alert( "This is IE!" );
    $(".mp3").css("left", "100px");
  }
};

$(document).ready(playMusic);