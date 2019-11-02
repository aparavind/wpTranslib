!function(){"use strict";var l=0;function B(){return Object.create(null)}function h(e,t){var n,a=typeof e;return"function"==a||"object"==a&&null!==e?"function"==typeof(n=e.$$hashKey)?n=e.$$hashKey():void 0===n&&(n=e.$$hashKey=(t||function(){return++l})()):n=e,a+":"+n}function H(e){var t=e[0],n=e[e.length-1],a=[t];do{if(!(t=t.nextSibling))break;a.push(t)}while(t!==n);return angular.element(a)}var P=function(e,t,n,a,l,r,s,o){e[n]=a,l&&(e[l]=r),e.$index=t,e.$first=0===t,e.$last=t===s-1,e.$middle=!(e.$first||e.$last),e.$odd=!(e.$even=0==(1&t)),o&&(e.$group=o)},D=function(e,t){var n,a=e.length;if(0===a)return!1;for(n=0;n<a;n++)if(K(t,e[n]))return!0;return!1},O=function(e,t){var n,a=e.length;if(0===a)return-1;for(n=0;n<a;n++)if(K(t,e[n]))return n;return-1},V=function(e,t,n){var a,l=e,r=typeof n;if(e==t)return null;do{if("string"===r){if(a=" "+l.className+" ",1===l.nodeType&&0<=a.replace(/[\t\r\n\f]/g," ").indexOf(n))return l}else if(l==n)return l}while((l=l.parentNode)&&l!=t&&9!==l.nodeType);return null},y=function(e){var t;t=e.className.replace(/[\t\r\n\f]/g," ").trim().split(" ");for(var n=0;n<t.length;n++)/\s+/.test(t[n])&&(t.splice(n,1),n--);return t},M=function(e,t){return-1!==y(e).indexOf(t)},U=function(e,t){var n,a,l;if(-1!==e.text().toLowerCase().indexOf(t.toLowerCase()))return!0;for(l=(n=e.children()).length,a=0;a<l;a++)if(-1!==n.eq(a).text().toLowerCase().indexOf(t.toLowerCase()))return!0;return!1};function z(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}var F=angular.element,K=angular.equals,j=angular.copy,r=angular.extend,e=angular.module("nya.bootstrap.select",[]);e.provider("nyaBsConfig",function(){var n=null,a={"en-us":{defaultNoneSelection:"Nothing selected",noSearchResult:"NO SEARCH RESULT",numberItemSelected:"%d items selected",selectAll:"Select All",deselectAll:"Deselect All"}},l=j(a);this.setLocalizedText=function(e,t){if(!e)throw new Error("localeId must be a string formatted as languageId-countryId");l[e]||(l[e]={}),l[e]=r(l[e],t)},this.useLocale=function(e){n=e},this.$get=["$locale",function(e){var t;return(t=n?l[n]:l[e.id])||(t=a["en-us"]),t}]}),e.controller("nyaBsSelectCtrl",function(){var t=this;t.keyIdentifier=null,t.valueIdentifier=null,t.isMultiple=!1,t.onCollectionChange=function(){},t.setId=function(e){t.id=e||"id#"+Math.floor(1e4*Math.random())}}),e.directive("nyaBsSelect",["$parse","$document","$timeout","$compile","nyaBsConfig",function(L,k,I,R,g){var C='<li class="no-search-result"><span>NO SEARCH RESULT</span></li>',m='<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">SELECT ALL</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">DESELECT ALL</button></div></div>';return{restrict:"ECA",require:["ngModel","nyaBsSelect"],controller:"nyaBsSelectCtrl",compile:function(t,e){t.addClass("btn-group");var n,a,l,r,s,o,i,c,d,u=t.children(),p=F('<button class="btn btn-default dropdown-toggle" type="button"><span class="pull-left filter-option"></span><span class="pull-left special-title"></span>&nbsp;<span class="caret"></span></button>'),f=F('<div class="dropdown-menu open"></div>'),h=F('<ul class="dropdown-menu inner"></ul>'),N=g,v=void 0!==e.multiple;for(y(t[0]).forEach(function(e){/btn-(?:primary|info|success|warning|danger|inverse)/.test(e)&&(t.removeClass(e),p.removeClass("btn-default"),p.addClass(e)),/btn-(?:lg|sm|xs)/.test(e)&&(t.removeClass(e),p.addClass(e))}),h.append(u),r=u.length,s=0;s<r;s++)((o=u.eq(s)).hasClass("nya-bs-option")||o.attr("nya-bs-option"))&&(o.find("a").attr("tabindex","0"),i=o.attr("value"),angular.isString(i)&&""!==i&&(o.attr("data-value",i),o.removeAttr("value")));return"true"===e.liveSearch&&(n=F('<div class="bs-searchbox"><input type="text" class="form-control"></div>'),e.noSearchTitle?C=C.replace("NO SEARCH RESULT",e.noSearchTitle):e.noSearchTitleTpl?C=C.replace("NO SEARCH RESULT",e.noSearchTitleTpl):N.noSearchResultTpl?C=C.replace("NO SEARCH RESULT",N.noSearchResultTpl):N.noSearchResult&&(C=C.replace("NO SEARCH RESULT",N.noSearchResult)),a=F(C),f.append(n),h.append(a)),"true"===e.actionsBox&&v&&(N.selectAllTpl?m=m.replace("SELECT ALL",N.selectAllTpl):N.selectAll&&(m=m.replace("SELECT ALL",N.selectAll)),N.deselectAllTpl?m=m.replace("DESELECT ALL",N.deselectAllTpl):N.selectAll&&(m=m.replace("DESELECT ALL",N.deselectAll)),l=F(m),f.append(l)),F(p[0].querySelector(".special-title")).append((d=e.titleTpl?F(e.titleTpl):e.title?document.createTextNode(e.title):N.defaultNoneSelectionTpl?F(N.defaultNoneSelectionTpl):N.defaultNoneSelection?document.createTextNode(N.defaultNoneSelection):document.createTextNode("Nothing selected"),c&&(e.titleTpl||N.defaultNoneSelectionTpl)?R(d)(c):d)),f.append(h),t.append(p),t.append(f),function(i,o,f,e){var c,t,s,d=e[0],u=e[1],p=!1,n=L(u.valueExp),h=void 0!==f.multiple,v=F(o[0].querySelector(".dropdown-toggle")),g=v.next(),C=F(g[0].querySelector(".dropdown-menu.inner")),m=F(g[0].querySelector(".bs-searchbox")),y=F(C[0].querySelector(".no-search-result")),a=F(g[0].querySelector(".bs-actionsbox"));u.valueExp&&(s=function(e,t){return n(e,t)}),u.setId(o.attr("id")),h&&(u.isMultiple=!0,d.$isEmpty=function(e){return!e||0===e.length}),void 0!==f.disabled&&i.$watch(f.disabled,function(e){p=e?(v.addClass("disabled"),v.attr("disabled","disabled"),t=v.attr("tabindex"),v.attr("tabindex","-1"),!0):(v.removeClass("disabled"),v.removeAttr("disabled"),t?v.attr("tabindex",t):v.removeAttr("tabindex"),!1)}),u.onCollectionChange=function(e,t){var n,a=[],l=!1,r=j(d.$modelValue);if(r){if(Array.isArray(e)&&0<e.length){if(s)for(n=0;n<e.length;n++)a.push(s(i,e[n]));else for(n=0;n<e.length;n++)u.valueIdentifier?a.push(e[n][u.valueIdentifier]):u.keyIdentifier&&a.push(e[n][u.keyIdentifier]);if(h){for(n=0;n<r.length;n++)D(a,r[n])||(l=!0,r.splice(n,1),n--);l&&(d.$setViewValue(r),q())}else D(a,r)||(r=a[0],d.$setViewValue(r),q())}t&&q()}},C.on("click",function(e){if(!p&&!F(e.target).hasClass("dropdown-header")){var t,n=V(e.target,C[0],"nya-bs-option");if(null!==n){if((t=F(n)).hasClass("disabled"))return;T(t)}}});var l=function(e){null===V(e.target,o.parent()[0],o[0])&&(o.hasClass("open")&&o.triggerHandler("blur"),o.removeClass("open"))};function b(){var e,t,n=C.children(),a=n.length;for(e=0;e<a;e++)if((t=n.eq(e)).hasClass("active")&&t.hasClass("nya-bs-option")&&!t.hasClass("not-match"))return t;return null}function S(e){for(var t,n=e.childNodes,a=n.length,l=0;l<a;l++)if(1===(t=n[l]).nodeType&&"a"===t.tagName.toLowerCase()){t.focus();break}}function $(e){var t;t=e?C.children().eq(0):C.children().eq(C.children().length-1);for(var n=0;n<C.children().length;n++){var a=C.children().eq(n);if(!a.hasClass("not-match")&&a.hasClass("selected"))return C.children().eq(n)[0]}return!t.hasClass("nya-bs-option")||t.hasClass("disabled")||t.hasClass("not-match")?w(t[0],e?"nextSibling":"previousSibling"):t[0]}function w(e,t){if(!e||M(e,"nya-bs-option")){for(var n=e;(n=z(n,t))&&n.nodeType;)if(M(n,"nya-bs-option")&&!M(n,"disabled")&&!M(n,"not-match"))return n;return null}}function r(e){var t,n,a;if(h&&!p&&0<(t=C[0].querySelectorAll(".nya-bs-option")).length){n=d.$viewValue,a=Array.isArray(n)?j(n):[];for(var l=0;l<t.length;l++){var r,s,o=F(t[l]);if(!o.hasClass("disabled"))void 0!==(r=x(o))&&(s=O(a,r),e&&-1==s?(a.push(r),o.addClass("selected")):e||-1==s||(a.splice(s,1),o.removeClass("selected")))}d.$setViewValue(a),i.$digest(),q()}}function T(e){var t,n,a,l=d.$viewValue;void 0!==(t=x(e))&&(h?(n=Array.isArray(l)?j(l):[],-1===(a=O(n,t))?(n.push(t),e.addClass("selected")):(n.splice(a,1),e.removeClass("selected"))):(C.children().removeClass("selected"),n=t,e.addClass("selected"))),d.$setViewValue(n),i.$digest(),h||(o.hasClass("open")&&o.triggerHandler("blur"),o.removeClass("open"),v[0].focus()),q()}function x(e){var t;return s?(t=e.data("isolateScope"),s(t)):u.valueIdentifier||u.keyIdentifier?(t=e.data("isolateScope"))[u.valueIdentifier]||t[u.keyIdentifier]:e.attr("data-value")}function A(e){var t=e.find("a");return 0===t.children().length||t.children().eq(0).hasClass("check-mark")?t[0].firstChild.cloneNode(!1):t.children().eq(0)[0].cloneNode(!0)}function q(){var u=d.$viewValue;o.triggerHandler("change");var p=F(v[0].querySelector(".filter-option"));F(v[0].querySelector(".special-title"));if(void 0===u)return v.addClass("show-special-title"),void p.empty();h&&0===u.length?(v.addClass("show-special-title"),p.empty()):(v.removeClass("show-special-title"),I(function(){var e,t,n,a,l,r,s,o=C.children(),i=o.length,c=[],d=[];if(h&&"count"===f.selectedTextFormat?r=1:h&&f.selectedTextFormat&&(l=f.selectedTextFormat.match(/\s*count\s*>\s*(\d+)\s*/))&&(r=parseInt(l[1],10)),void 0!==r&&u.length>r)return p.empty(),void(N.numberItemSelectedTpl?p.append(F(N.numberItemSelectedTpl.replace("%d",u.length))):N.numberItemSelected?p.append(document.createTextNode(N.numberItemSelected.replace("%d",u.length))):p.append(document.createTextNode(u.length+" items selected")));for(n=0;n<i;n++)(t=o.eq(n)).hasClass("nya-bs-option")&&(e=x(t),h?Array.isArray(u)&&D(u,e)&&((a=t.attr("title"))?c.push(document.createTextNode(a)):(c.push(A(t)),d.push(t.data("isolateScope")))):K(u,e)&&((a=t.attr("title"))?c.push(document.createTextNode(a)):(c.push(A(t)),d.push(t.data("isolateScope")))));if(0===c.length)p.empty(),v.addClass("show-special-title");else if(1===c.length)v.removeClass("show-special-title"),p.empty(),s=d[0]?R(c[0])(d[0]):c[0],p.append(s);else for(v.removeClass("show-special-title"),p.empty(),n=0;n<c.length;n++)s=d[n]?R(c[n])(d[n]):c[n],p.append(s),n<c.length-1&&p.append(document.createTextNode(", "))}))}function E(){var e,t,n=C.find("li"),a=n.length;for(t=0;t<a;t++)if((e=n.eq(t)).hasClass("nya-bs-option")||e.attr("nya-bs-option")){c=e[0].clientHeight;break}if(/\d+/.test(f.size)){var l=parseInt(f.size,10);C.css("max-height",l*c+"px"),C.css("overflow-y","auto")}}k.on("click",l),v.on("blur",function(){o.hasClass("open")||o.triggerHandler("blur")}),v.on("click",function(){var e;o.toggleClass("open"),o.hasClass("open")&&void 0===c&&E(),"true"===f.liveSearch&&o.hasClass("open")?(m.children().eq(0)[0].focus(),(e=$(!0))&&(C.children().removeClass("active"),F(e).addClass("active"))):o.hasClass("open")&&(e=$(!0))&&S(e)}),"true"===f.actionsBox&&h&&(a.find("button").eq(0).on("click",function(){r(!0)}),a.find("button").eq(1).on("click",function(){r(!1)})),"true"===f.liveSearch&&m.children().on("input",function(){var e,t,n,a=m.children().val(),l=0,r=C.children(),s=r.length;if(a){for(e=0;e<s;e++)(t=r.eq(e)).hasClass("nya-bs-option")&&(U(t.find("a"),a)?(t.removeClass("not-match"),l++):t.addClass("not-match"));0===l?y.addClass("show"):y.removeClass("show")}else{for(e=0;e<s;e++)(t=r.eq(e)).hasClass("nya-bs-option")&&t.removeClass("not-match");y.removeClass("show")}(n=$(!0))&&(r.removeClass("active"),F(n).addClass("active"))}),d.$render=function(){var e,t,n=d.$modelValue,a=C.children(),l=a.length;if(void 0===n)for(e=0;e<l;e++)a.eq(e).hasClass("nya-bs-option")&&a.eq(e).removeClass("selected");else for(e=0;e<l;e++)a.eq(e).hasClass("nya-bs-option")&&(t=x(a.eq(e)),h?D(n,t)?a.eq(e).addClass("selected"):a.eq(e).removeClass("selected"):K(n,t)?a.eq(e).addClass("selected"):a.eq(e).removeClass("selected"));q()},o.on("keydown",function(e){var t=e.keyCode;if(27===t||13===t||38===t||40===t)if(e.preventDefault(),p)e.stopPropagation();else{var n,a,l,r,s=V(e.target,o[0],v[0]);"true"===f.liveSearch?a=V(e.target,o[0],m[0]):n=V(e.target,o[0],g[0]),s?13!==t&&38!==t&&40!==t||o.hasClass("open")||(e.stopPropagation(),o.addClass("open"),void 0===c&&E(),"true"===f.liveSearch?(m.children().eq(0)[0].focus(),(r=$(!0))&&(C.children().removeClass("active"),F(r).addClass("active"))):(r=$(!0))&&S(r)):n?27===t?(v[0].focus(),o.hasClass("open")&&o.triggerHandler("blur"),o.removeClass("open"),e.stopPropagation()):38===t?(e.stopPropagation(),(r=w(e.target.parentNode,"previousSibling"))?S(r):(r=$(!1))&&S(r)):40===t?(e.stopPropagation(),(r=w(e.target.parentNode,"nextSibling"))?S(r):(r=$(!0))&&S(r)):13===t&&(e.stopPropagation(),(l=F(e.target.parentNode)).hasClass("nya-bs-option")&&(T(l),h||v[0].focus())):a&&(27===t?(v[0].focus(),o.removeClass("open"),e.stopPropagation()):38===t?(e.stopPropagation(),(l=b())&&((r=w(l[0],"previousSibling"))?(l.removeClass("active"),F(r).addClass("active")):(r=$(!1))&&(l.removeClass("active"),F(r).addClass("active")))):40===t?(e.stopPropagation(),(l=b())&&((r=w(l[0],"nextSibling"))?(l.removeClass("active"),F(r).addClass("active")):(r=$(!0))&&(l.removeClass("active"),F(r).addClass("active")))):13===t&&(l=b())&&(T(l),h||v[0].focus()))}}),i.$on("$destroy",function(){C.off(),v.off(),m.off&&m.off(),k.off("click",l)})}}}}]),e.directive("nyaBsOption",["$parse",function(p){var f=/^\s*(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/;return{restrict:"A",transclude:"element",priority:1e3,terminal:!0,require:["^nyaBsSelect","^ngModel"],compile:function(e,t){var n=t.nyaBsOption,N=document.createComment(" end nyaBsOption: "+n+" "),a=n.match(f);if(!a)throw new Error("invalid expression");var L,k,I,r,R,s=t.value,o=s?p(s):null,O=a[3]||a[1],V=a[2],i=a[4],c=a[5]?p(a[5]):null,l=a[6],d={$id:h},u={};return l?r=p(l):(L=function(e,t){return h(t)},k=function(e){return e}),function(a,$,e,t,w){var T,x,A=t[0],q=t[1],n={};r&&(I=function(e,t,n){return V&&(d[V]=e),d[O]=t,d.$index=n,r(a,d)}),c&&(R=function(e,t){return V&&(u[V]=e),u[O]=t,c(a,u)}),V&&(A.keyIdentifier=V),O&&(A.valueIdentifier=O),o&&(A.valueExp=s,T=function(e,t){return V&&(n[V]=e),n[O]=t,o(a,n)});var E=B();function l(e){var l,t,r,n,a,s,o,i,c,d,u,p,f,h,v,g,C=$[0],m=B(),y=[];if(R&&(p=[]),function(e){if(null==e||(t=e)&&t.window===t)return!1;var t,n=e.length;return!(1!==e.nodeType||!n)||"string"==typeof e||Array.isArray(e)||0===n||"number"==typeof n&&0<n&&n-1 in e}(e))s=e,a=I||L;else{for(var b in a=I||k,s=[],e)e.hasOwnProperty(b)&&"$"!=b.charAt(0)&&s.push(b);s.sort()}for(o=s.length,i=new Array(o),l=0;l<o;l++)if(n=a(t=e===s?l:s[l],r=e[t],l),v={},V&&(v[V]=t),v[O]=r,y.push(v),R&&(d=R(t,r),-1===p.indexOf(d)&&d&&p.push(d)),E[n])c=E[n],delete E[n],R&&(c.group=d),c.key=t,c.value=r,m[n]=c,i[l]=c;else{if(m[n])throw i.forEach(function(e){e&&e.scope&&(E[e.id]=e)}),new Error("Duplicates in a select are not allowed. Use 'track by' expression to specify unique keys.");i[l]={id:n,scope:void 0,clone:void 0,key:t,value:r},m[n]=!0,d&&(i[l].group=d)}for(var S in p&&0<p.length&&(i=function(e,t,n){var a,l,r=[],s=[];for(a=0;a<t.length;a++)for(l=0;l<e.length;l++)e[l][n]?e[l][n]===t[a]&&s.push(e[l]):r.push(e[l]);return s=s.concat(r)}(i,p,"group")),E)(h=H((c=E[S]).clone)).removeData("isolateScope"),h.remove(),c.scope.$destroy();for(l=0;l<o;l++)(c=i[l]).scope?(u=C,c.clone[0]!=u&&F(C).after(c.clone),C=(g=c).clone[g.clone.length-1],P(c.scope,l,O,c.value,V,c.key,o,c.group)):w(function(e,t){var n;n=t,e.data("isolateScope",n),c.scope=t;var a=N.cloneNode(!1);e[e.length++]=a,F(C).after(e),e.addClass("nya-bs-option"),r=T?T(c.key,c.value):c.value||c.key,A.isMultiple?Array.isArray(q.$modelValue)&&D(q.$modelValue,r)&&e.addClass("selected"):K(r,q.$modelValue)&&e.addClass("selected"),C=a,c.clone=e,m[c.id]=c,P(c.scope,l,O,c.value,V,c.key,o,c.group)}),p&&(f&&f===c.group?c.clone.removeClass("first-in-group"):c.clone.addClass("first-in-group"),f=c.group,c.clone.addClass("group-item"));E=m,A.onCollectionChange(y,x)}"true"===e.deepWatch?(x=!0,a.$watch(i,l,!0)):(x=!1,a.$watchCollection(i,l))}}}}])}();