/*******************************************************************************
 jquery.mb.components
 Copyright (c) 2001-2010. Matteo Bicocchi (Pupunzi); Open lab srl, Firenze - Italy
 email: info@pupunzi.com
 site: http://pupunzi.com

 Licences: MIT, GPL
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 ******************************************************************************/

/*
 * jQuery.mb.components: jquery.mb.audio
 * version: 0.1- 9-giu-2010 - 30
 * © 2001 - 2010 Matteo Bicocchi (pupunzi), Open Lab
 *
 * HTML5 AUDIO TAG doesn't work i IE8 <
 */

(function($){
  $.mbAudio ={
    name:"mb.audio",
    author:"Matteo Bicocchi",
    version:"0.1",
    defaults:{
      id:"",
      ogg:"",
      mp3:"",
      loop:false,
      volume:1
    },
    sounds:{},
    loaded:new Object(),
    play:function(sound){
      var soundEl= eval("$.mbAudio.sounds."+sound);
      var loop= soundEl.loop?soundEl.loop:$.mbAudio.defaults.loop;
      var volume= typeof soundEl.volume == "number" ?soundEl.volume:$.mbAudio.defaults.volume;
      if($.mbAudio.loaded[sound]!=1){
        var audio=$("<audio>").attr("id",sound);
        var oggSource=$("<source>").attr({src:soundEl.ogg, type:"audio/ogg"});
        var mp3Source=$("<source>").attr({src:soundEl.mp3, type:"audio/mpeg"});
        audio.append(mp3Source).append(oggSource);

        $("body").append(audio);
        $.mbAudio.loaded[sound]=1;
      }

      var player= document.getElementById(sound);
      if(loop){
        counter=0;
        $(player).bind("ended",function(){
          this.currentTime = 0;
          if(typeof loop == "number"){
            counter++;
            if(counter==loop){
              $(this).unbind('ended');
            }
          }
        });

        player.addEventListener('timeupdate', function(){},false);
      }
      player.volume=volume;
      player.play();
    },
    stop:function(sound){
      var player= document.getElementById(sound);
      player.pause();
      player.currentTime=0;
      $(player).unbind('ended');
    }
  }
})(jQuery);
