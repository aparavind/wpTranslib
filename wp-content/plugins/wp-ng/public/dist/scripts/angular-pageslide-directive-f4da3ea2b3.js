!function(e,t){"function"==typeof define&&define.amd?define(["angular"],t):"object"==typeof module&&module.exports?module.exports=t(require("angular")):t(e.angular)}(this,function(m){m.module("pageslide-directive",[]).directive("pageslide",["$document","$timeout",function(h,f){return{restrict:"EA",transclude:!1,scope:{psOpen:"=?",psAutoClose:"@",psSide:"@",psSpeed:"@",psClass:"@",psSize:"@",psZindex:"@",psPush:"@",psContainer:"@",psKeyListener:"@",psBodyClass:"@",psClickOutside:"@",onopen:"&?",onclose:"&?"},link:function(s,e,t){var i={};i.side=s.psSide||"right",i.speed=s.psSpeed||"0.5",i.size=s.psSize||"300px",i.zindex=s.psZindex||1e3,i.className=s.psClass||"ng-pageslide",i.push="true"===s.psPush,i.container=s.psContainer||!1,i.keyListener="true"===s.psKeyListener,i.bodyClass=s.psBodyClass||!1,i.clickOutside="false"!==s.psClickOutside,i.autoClose=s.psAutoClose||!1,i.push=i.push&&!i.container,e.addClass(i.className);var o,n,l=!1;function p(e){var t=e.touches&&e.touches[0]||e.target;l&&n.contains(t)&&!o.contains(t)&&(l=!1,s.psOpen=!1,s.$apply()),s.psOpen&&(l=!0)}function a(e){if(i.bodyClass){var t=i.className+"-body",s=new RegExp(t+"-closed|"+t+"-open");n.className=n.className.replace(s,"");var o=t+"-"+e;" "!==n.className[n.className.length-1]?n.className+=" "+o:n.className+=o}}if(n=i.container?document.getElementById(i.container):document.body,"div"!==(o=e[0]).tagName.toLowerCase()&&"pageslide"!==o.tagName.toLowerCase())throw new Error("Pageslide can only be applied to <div> or <pageslide> elements");if(0===o.children.length)throw new Error("You need to have content inside the <pageslide>");function c(){s.psOpen?"function"==typeof s.onopen&&s.onopen()():"function"==typeof s.onclose&&s.onclose()()}function r(e,t){switch(t.side){case"right":case"left":e.style.width=t.size,e.style.height="100%",e.style.top="0px",e.style.bottom="0px";break;case"top":case"bottom":e.style.height=t.size,e.style.width="100%",e.style.left="0px",e.style.right="0px"}s.psOpen?u(e,t):d(e,t)}function d(e,t){switch(t.side){case"right":e.style.right="-"+t.size,t.push&&(n.style.right="0px",n.style.left="0px");break;case"left":e.style.left="-"+t.size,t.push&&(n.style.left="0px",n.style.right="0px");break;case"top":e.style.top="-"+t.size,t.push&&(n.style.top="0px",n.style.bottom="0px");break;case"bottom":e.style.bottom="-"+t.size,t.push&&(n.style.bottom="0px",n.style.top="0px")}t.keyListener&&h.off("keydown",y),t.clickOutside&&h.off("touchend click",p),l=!1,a("closed"),s.psOpen=!1}function u(e,t){switch(t.side){case"right":e.style.right="0px",t.push&&(n.style.right=t.size,n.style.left="-"+t.size);break;case"left":e.style.left="0px",t.push&&(n.style.left=t.size,n.style.right="-"+t.size);break;case"top":e.style.top="0px",t.push&&(n.style.top=t.size,n.style.bottom="-"+t.size);break;case"bottom":e.style.bottom="0px",t.push&&(n.style.bottom=t.size,n.style.top="-"+t.size)}s.psOpen=!0,t.keyListener&&h.on("keydown",y),t.clickOutside&&h.on("touchend click",p),a("open")}function y(e){27===(e.keyCode||e.which)&&(d(o,i),f(function(){s.$apply()}))}m.element(o.children),n.appendChild(o),o.style.zIndex=i.zindex,o.style.position="fixed",o.style.transitionDuration=i.speed+"s",o.style.webkitTransitionDuration=i.speed+"s",o.style.height=i.size,o.style.transitionProperty="top, bottom, left, right",i.push&&(n.style.position="absolute",n.style.transitionDuration=i.speed+"s",n.style.webkitTransitionDuration=i.speed+"s",n.style.transitionProperty="top, bottom, left, right"),i.container&&(o.style.position="absolute",n.style.position="relative",n.style.overflow="hidden"),o.addEventListener("transitionend",c),r(o,i),s.$watch("psOpen",function(e){e?u(o,i):d(o,i)}),s.$watch("psSize",function(e,t){t!==e&&(i.size=e,r(o,i))}),s.$on("$destroy",function(){o.parentNode===n&&(i.clickOutside&&h.off("touchend click",p),n.removeChild(o)),o.removeEventListener("transitionend",c)}),i.autoClose&&(s.$on("$locationChangeStart",function(){d(o,i)}),s.$on("$stateChangeStart",function(){d(o,i)}))}}}])});