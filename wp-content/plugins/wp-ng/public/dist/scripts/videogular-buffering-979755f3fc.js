"use strict";angular.module("com.2fdevs.videogular.plugins.buffering",[]).run(["$templateCache",function(n){n.put("vg-templates/vg-buffering",'<div class="bufferingContainer"><div ng-class="spinnerClass" class="loadingSpinner"></div></div>')}]).directive("vgBuffering",["VG_STATES","VG_UTILS",function(r,s){return{restrict:"E",require:"^videogular",templateUrl:function(n,e){return e.vgTemplate||"vg-templates/vg-buffering"},link:function(i,n,e,t){i.showSpinner=function(){i.spinnerClass={stop:t.isBuffering},n.css("display","block")},i.hideSpinner=function(){i.spinnerClass={stop:t.isBuffering},n.css("display","none")},i.setState=function(n){n?i.showSpinner():i.hideSpinner()},i.onStateChange=function(n){n===r.STOP&&i.hideSpinner()},i.onPlayerReady=function(n){n&&i.hideSpinner()},i.showSpinner(),s.isMobileDevice()?i.hideSpinner():i.$watch(function(){return t.isReady},function(n,e){!0!==t.isReady&&n===e||i.onPlayerReady(n)}),i.$watch(function(){return t.currentState},function(n,e){n!==e&&i.onStateChange(n)}),i.$watch(function(){return t.isBuffering},function(n,e){n!==e&&i.setState(n)})}}}]);