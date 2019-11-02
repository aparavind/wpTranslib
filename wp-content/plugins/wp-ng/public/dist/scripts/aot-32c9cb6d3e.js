HTMLElement.prototype.AOTinitAll=function(t,i,n){"object"==typeof t?(n=i=t,t=void 0):"boolean"==typeof t&&(n=t,t=i=void 0),i=i||{},t=t||"aot",n=n||!1;var a=this.querySelectorAll(t);return[].forEach.call(a,function(t,a){for(var e in i.once=t.getAttribute("data-aot-once"),i.disable=t.getAttribute("data-aot-disable"),i.delay=t.getAttribute("data-aot-delay"),i.duration=t.getAttribute("data-aot-duration"),i.timeout=t.getAttribute("data-aot-timeout"),i.timeoutOnce=t.getAttribute("data-aot-timeout-once"),i.class=t.getAttribute("data-aot-class"),i.classOut=t.getAttribute("data-aot-class-out"),i)switch(i[e]){case null:delete i[e];break;case"true":i[e]=!0;break;case"false":i[e]=!1;break;default:var o=parseInt(i[e],10);isNaN(o)||(i[e]=o)}t.AOTinit(i,n)}),a},HTMLElement.prototype.AOTinit=function(t,a){var e=this;if("boolean"==typeof t&&(a=t,t=void 0),!0===a&&(this.AOTdestroy(),this.classList.remove("aot-initialized")),this.aot&&!0===this.aot.initialized)return this.aot;this.aot={initialized:!1,options:Object.assign({},{delay:0,duration:400,disable:!1,once:!1,timeout:0,timeoutOnce:!0,class:"aot-animate",classOut:"aot-hide"},t),elements:[]};var o=this.querySelectorAll("[data-aot]"),i=[];return[].forEach.call(o,function(t,a){t.classList.remove(e.aot.options.class),t.classList.add(e.aot.options.classOut),i.push({node:t})}),this.aot.elements=i,this.aot.animatedOnce=!1,this.classList.add("aot-initialized"),this.aot.initialized=!0,this.aot},HTMLElement.prototype.AOTdestroy=function(){delete this.aot},HTMLElement.prototype.AOTanimateAll=function(t,e){"boolean"==typeof t&&void 0===e&&(e=t,t=void 0),t=t||"aot",e=void 0===e||e;var a=this.querySelectorAll(t);return[].forEach.call(a,function(t,a){t.AOTanimate(e)}),a},HTMLElement.prototype.AOTanimate=function(d,t){var r=this;d=void 0===d||d,t=t||r.aot.options.timeout,t=!0===r.aot.options.timeoutOnce&&!0===r.aot.animatedOnce?0:t,setTimeout(function(){r.aot.animatedOnce=!0,[].forEach.call(r.aot.elements,function(t,a){var e,o,i=[r.aot.options.class],n=[r.aot.options.classOut],s=r.aot.options.once,l=r.aot.options.disable;if(null!==t.node.getAttribute("data-aot-once")&&(s=!0===t.node.getAttribute("data-aot-once")||!1),null!==t.node.getAttribute("data-aot-disable")&&(l=!0===t.node.getAttribute("data-aot-disable")||!1),!0!==s||!t.node.classList.contains(r.aot.options.class))if(e=t.node.getAttribute("data-aot"),t.node.getAttribute("data-aot-duration")||t.node.setAttribute("data-aot-duration",r.aot.options.duration),t.node.getAttribute("data-aot-delay")||t.node.setAttribute("data-aot-delay",r.aot.options.delay),i=e?i.concat(e.split(" ")):i,!0===d&&!1===l)for(t.node.classList.remove(n),o=0;o<i.length;o++)t.node.classList.add(i[o]);else{for(o=0;o<i.length;o++)t.node.classList.remove(i[o]);t.node.classList.add(n)}})},parseInt(t,10))};