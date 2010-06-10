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
 */

(function($){

  $.mbAudio ={
    name:"mb.audio",
    author:"Matteo Bicocchi",
    version:"0.1",
    defaults:{
      id:"",
      ogg:"",
      mp3:""
    },
    sounds:{},
    loaded:new Object(),
    play:function(sound){
      var soundEl= eval("$.mbAudio.sounds."+sound);

     // $.extend($.mbAudio.defaults,opt);
      if($.mbAudio.loaded[sound]!=1){

        var audio="<audio id='"+sound+"'>";
        var oggSource="<source src='"+soundEl.ogg+"' type='audio/ogg'>";
        var mp3Source="<source src='"+soundEl.mp3+"' type='audio/mpeg'>";
        $("body").append(audio);
        audio=$("#"+sound);
        audio.append(mp3Source).append(oggSource);
        $.mbAudio.loaded[sound]=1;
      }
        var player= document.getElementById(sound);
        player.play();
    }
  }
})(jQuery);
