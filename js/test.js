
var screenAnimateElements = {

  '.screen-1' : [
     '.screen-1__heading',
     '.screen-1__phone',
     '.screen-1__shadow'
  ],
'.screen-2' : [
   '.screen-2__heading',
   '.screen-2__phone',
   '.screen-2__subheading',
   '.screen-2_point_i_1',
   '.screen-2_point_i_2',
   '.screen-2_point_i_3',
   '.screen-2_point'
],
'.screen-3' : [
   '.screen-3__heading',
   '.screen-3__subheading',
   '.screen-3__phone',
   '.screen-3__features'
],
'.screen-4' : [
   '.screen-4__heading',
   '.screen-4__subheading',
   '.screen-4__type',
   '.screen-4__type__item_i_1',
   '.screen-4__type__item_i_2',
   '.screen-4__type__item_i_3',
   '.screen-4__type__item_i_4',
],
'.screen-5' : [
   '.screen-5__heading',
   '.screen-5__subheading',
   '.screen-5__back'
 ]

};

function setScreenAnimate(screenCls) {

  var screen = document.querySelector(screenCls);
  var animateElements = screenAnimateElements[screenCls];

  var isSetAnimateClass = false;
  var isAnimateDone = false;

  screen.onclick = function(){
//初始化样式，增加init A A_init
  if(isSetAnimateClass == false){
    for(var i = 0; i < animateElements.length; i++){

      var element = document.querySelector(animateElements[i]);
      var baseCls = element.getAttribute('class');

      element.setAttribute('class', baseCls+' '+animateElements[i].substring(1)+'_animate_init');

    }
    isSetAnimateClass = true;
    return;
  }
   //init -> done
  if(isAnimateDone == false){
    for(var i = 0; i < animateElements.length; i++){

      var element = document.querySelector(animateElements[i]);
      var baseCls = element.getAttribute('class');

      element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
    }
    isAnimateDone = true;
    return;
  }
  //done -> init
  if(isAnimateDone == true){
    for(var i = 0; i < animateElements.length; i++){

      var element = document.querySelector(animateElements[i]);
      var baseCls = element.getAttribute('class');

      element.setAttribute('class', baseCls.replace('_animate_done','_animate_init'));
    }
    isAnimateDone = false;
    return;
  }

  }

}
for(k in screenAnimateElements){
  setScreenAnimate(k);
}
