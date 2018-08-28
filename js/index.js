//获取元素
var getElem =  function(selector){
  return document.querySelector(selector);
}
var getAllElem = function(selector){
  return document.querySelectorAll(selector);
}
var getCls = function(element){
  return element.getAttribute('class');
}
var setCls = function(element, cls){
  return element.setAttribute('class',cls);
}
var addCls = function(element, cls){
  var baseCls = getCls(element);
  if(baseCls.indexOf(cls) === -1){
    setCls(element, baseCls+' '+cls);
  }
}
var delCls = function(element,cls){
  var baseCls = getCls(element);
  if(baseCls.indexOf(cls) != -1){
    setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
  }
}

//初始化样式
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
//所有元素的初始化状态
var setScreenAnimateInit = function(screenCls){

  // var screen = document.querySelector(screenCls);
  var animateElements = screenAnimateElements[screenCls];

  for(let i = 0; i < animateElements.length; i++){

    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute('class');

    element.setAttribute('class', baseCls+' '+animateElements[i].substring(1)+'_animate_init');

  }
}

var playScreenAnimateDone = function(screenCls){

  var animateElements = screenAnimateElements[screenCls];

  for(let i = 0; i < animateElements.length; i++){

    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute('class');

    element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
  }
}
//初始化所有元素
window.onload = function(){
  for(k in screenAnimateElements){
    if(k === '.screen-1'){
      continue;
    }
    setScreenAnimateInit(k);
  }
}
//滚动播放
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');

var switchNavItemsActive = function(idx){
  for(let i = 0; i < navItems.length; i++){
    delCls(navItems[i],'header__nav-item-status-active');
  }
    addCls(navItems[idx],'header__nav-item-status-active');
}
var switchOutlineItemsActive = function(idx){
  for(let i = 0; i < outlineItems.length; i++){
    delCls(outlineItems[i],'outline_status_active');
  }
    addCls(outlineItems[idx],'outline_status_active');
}

var navTip = getElem('.header__nav-tip');
//滚动发生事件
window.onscroll = function(){
  var top = document.body.scrollTop;
  if(top > 100){
    addCls(getElem('.header'), 'header_status_back');
    addCls(getElem('.outline'), 'outline_status_in');
    switchOutlineItemsActive(0);
  }else {
    delCls(getElem('.header'), 'header_status_back');
    delCls(getElem('.outline'), 'outline_status_in');
    switchNavItemsActive(0);
    navTip.style.left = (0*70) + 'px';
  }

  if(top > 1){
    playScreenAnimateDone('.screen-1');
  }
  if(top > 800-100){
    playScreenAnimateDone('.screen-2');
    switchNavItemsActive(1);
    switchOutlineItemsActive(1);
    navTip.style.left = (1*70) + 'px';
  }
  if(top > 2*800-100){
    playScreenAnimateDone('.screen-3');
    switchNavItemsActive(2);
    switchOutlineItemsActive(2);
    navTip.style.left = (2*70) + 'px';
  }
  if(top > 3*800-100){
    playScreenAnimateDone('.screen-4');
    switchNavItemsActive(3);
    switchOutlineItemsActive(3);
    navTip.style.left = (3*70) + 'px';
  }
  if(top > 4*800-100){
    playScreenAnimateDone('.screen-5');
    switchNavItemsActive(4);
    switchOutlineItemsActive(4);
    navTip.style.left = (4*70) + 'px';
  }

}
//大纲和导航的双向绑定

var setNavJump = function(i,lib){
  var item = lib[i];
  item.onclick = function(){
    document.body.scrollTop = i*800;
  }
}
for(let i = 0; i < navItems.length; i++){
  setNavJump(i,navItems);
}
for(let list = 0; list < outlineItems.length; list++){
  setNavJump(list,outlineItems);
}
//滑动门效果


var setTip = function(idx,lib){
  lib[idx].onmouseover = function(){
    navTip.style.left = (idx*70) + 'px';
  }
  var activeIdx = 0;
  lib[idx].onmouseout = function(){
    for(let i = 0; i < lib.length; i++){
      if(getCls(lib[i]).indexOf('header__nav-item-status-active') != -1){
        activeIdx = i;
        break;
      }
    }
    navTip.style.left = (activeIdx*70) + 'px';
  }
}
for(let i = 0; i < navItems.length; i++){
  setTip(i,navItems);
}

//优化
setTimeout(function(){
  playScreenAnimateDone('.screen-1');
},1000)
