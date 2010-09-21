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
 * jQuery.mb.components: jquery.mb.sounds
 * version: 0.1- 9-giu-2010 - 30
 * © 2001 - 2010 Matteo Bicocchi (pupunzi), Open Lab
 *
 * HTML5 AUDIO TAG doesn't work i IE8 <
 */
String.prototype.asId = function () {
  return this.replace(/[^a-zA-Z0-9_]+/g, '');
};

(function($){
  $.mbAudio ={
    name:"mb.sounds",
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
      var sID=typeof sound == "string"?sound:sound.ogg.split(".")[0].asId();
      var soundEl= typeof sound == "string"?eval("$.mbAudio.sounds."+sound):sound;
      var loop= soundEl.loop?soundEl.loop:$.mbAudio.defaults.loop;
      var volume= typeof soundEl.volume == "number" ?soundEl.volume:$.mbAudio.defaults.volume;
      if($.mbAudio.loaded[sID]!=1){
        var audio=$("<audio>").attr("id",sID);
        var oggSource=$("<source>").attr({src:soundEl.ogg, type:"audio/ogg"});
        var mp3Source=$("<source>").attr({src:soundEl.mp3, type:"audio/mpeg"});
        audio.append(mp3Source).append(oggSource);

        $("body").append(audio);
        $.mbAudio.loaded[sID]=1;
      }

      var player= document.getElementById(sID);
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
      var sID=typeof sound == "string"?sound:sound.ogg.split(".")[0].asId();
      var player= document.getElementById(sID);
      player.pause();
      player.currentTime=0;
      $(player).unbind('ended');
    }
  }
})(jQuery);
