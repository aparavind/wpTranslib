"use strict";angular.module("slick",[]).directive("slick",["$timeout","$compile",function(e,s){return{restrict:"AEC",scope:{initOnload:"@",data:"=",currentIndex:"=",accessibility:"@",adaptiveHeight:"@",arrows:"@",asNavFor:"@",appendArrows:"@",appendDots:"@",autoplay:"@",autoplaySpeed:"@",centerMode:"@",centerPadding:"@",cssEase:"@",customPaging:"&",customPagingScope:"=",dots:"@",draggable:"@",easing:"@",fade:"@",focusOnSelect:"@",infinite:"@",initialSlide:"@",lazyLoad:"@",onBeforeChange:"&",onAfterChange:"&",onInit:"&",onReInit:"&",onSetPosition:"&",pauseOnHover:"@",pauseOnDotsHover:"@",responsive:"=",rtl:"@",slide:"@",slidesToShow:"@",slidesToScroll:"@",speed:"@",swipe:"@",swipeToSlide:"@",touchMove:"@",touchThreshold:"@",useCSS:"@",variableWidth:"@",vertical:"@",prevArrow:"@",nextArrow:"@"},link:function(r,n,i){var o,t,a;return o=function(){return e(function(){var e;return(e=$(n)).slick("unslick"),e.find(".slick-list").remove(),e})},t=function(){return e(function(){var t,e,o;return o=$(n),null!=r.currentIndex&&(t=r.currentIndex),e=function(e,n){var o;return o=r.customPagingScope||r,s(r.customPaging({slick:e,index:n}))(o)},o.on("init",function(e,n){if(i.onInit&&r.onInit(),null!=t)return n.slideHandler(t)}),o.on("beforeChange",function(e,n,o,i){if(r.onBeforeChange&&r.onBeforeChange({event:e,slick:n,currentSlide:o,nextSlide:i}),null!=t)return t=o,r.currentIndex=o}),o.on("afterChange",function(e,n,o,i){if(r.onAfterChange&&r.onAfterChange({event:e,slick:n,currentSlide:o,nextSlide:i}),null!=t)return r.$apply(function(){return t=o,r.currentIndex=o})}),o.slick({accessibility:"false"!==r.accessibility,adaptiveHeight:"true"===r.adaptiveHeight,arrows:"false"!==r.arrows,asNavFor:r.asNavFor?r.asNavFor:void 0,appendArrows:r.appendArrows?$(r.appendArrows):$(n),appendDots:r.appendDots?$(r.appendDots):$(n),autoplay:"true"===r.autoplay,autoplaySpeed:null!=r.autoplaySpeed?parseInt(r.autoplaySpeed,10):3e3,centerMode:"true"===r.centerMode,centerPadding:r.centerPadding||"50px",cssEase:r.cssEase||"ease",customPaging:i.customPaging?e:void 0,dots:"true"===r.dots,draggable:"false"!==r.draggable,easing:r.easing||"linear",fade:"true"===r.fade,focusOnSelect:"true"===r.focusOnSelect,infinite:"false"!==r.infinite,initialSlide:r.initialSlide||0,lazyLoad:r.lazyLoad||"ondemand",beforeChange:i.onBeforeChange?r.onBeforeChange:void 0,onReInit:i.onReInit?r.onReInit:void 0,onSetPosition:i.onSetPosition?r.onSetPosition:void 0,pauseOnHover:"false"!==r.pauseOnHover,responsive:r.responsive||void 0,rtl:"true"===r.rtl,slide:r.slide||"div",slidesToShow:null!=r.slidesToShow?parseInt(r.slidesToShow,10):1,slidesToScroll:null!=r.slidesToScroll?parseInt(r.slidesToScroll,10):1,speed:null!=r.speed?parseInt(r.speed,10):300,swipe:"false"!==r.swipe,swipeToSlide:"true"===r.swipeToSlide,touchMove:"false"!==r.touchMove,touchThreshold:r.touchThreshold?parseInt(r.touchThreshold,10):5,useCSS:"false"!==r.useCSS,variableWidth:"true"===r.variableWidth,vertical:"true"===r.vertical,prevArrow:r.prevArrow?$(r.prevArrow):void 0,nextArrow:r.nextArrow?$(r.nextArrow):void 0}),r.$watch("currentIndex",function(e,n){if(null!=t&&null!=e&&e!==t)return o.slick("slickGoTo",e)})})},r.initOnload?(a=!1,r.$watch("data",function(e,n){if(null!=e)return a&&o(),t(),a=!0})):t()}}}]);