!function(l,o){"use strict";function s(n,t){var e,o;o=s.providers=s.providers||{},"function"==typeof t?o.hasOwnProperty(n)?(e=o[n],o[n]=function(n){return new t(n,new e(n))}):o[n]=t:console.error('Provider "'+n+'" is not a function')}function a(n){var t;t=a.listeners=a.listeners||[],"function"==typeof n?t.push(n):n&&console.error("Ready listener not a function")}s("ScopeCollection",function(r){function n(){this.collection=[]}return n.prototype={add:function(n){var t=r("SvgCumulativeIconSetScope"),e=r("FontIconSetScope");n instanceof t||n instanceof e?this.collection.push(n):this.collection.unshift(n)},preload:function(e){var n=r("Promise"),o=[];return this.collection.forEach(function(n){var t;(t=n.preload(e))&&"object"==typeof t&&"function"==typeof t.then&&o.push(t)}),0<o.length?n.all(o.map(function(n){return n.then(null,function(){return null})})).then(function(){return null}):null},getIconScope:function(n,e){var o=r("Promise"),t=(r("SvgCumulativeIconSetScope"),this.collection);return o.all(t.map(function(t){return o.resolve(t.hasIcon(n,e)).then(function(n){return!!n&&t},function(){return!1})})).then(function(n){var t;for(t=0;t<n.length;t++)if(n[t])return n[t];return o.reject()})},getIcon:function(t,e){return this.getIconScope(t,e).then(function(n){return n.getIcon(t,e)})}},n}),s("SvgIconSet",function(p){function o(n,t){var e,o,r,i,c,s,a,u=p("log"),l=p("parseSvgOptions"),f=p("SvgIcon"),h=p("nodeWrapper");s="function"==typeof t.iconIdResolver?t.iconIdResolver:function(n){return n},a=l(t),this.icons={},c=a.viewBox||n[0].getAttribute("viewBox"),i=a.iconSize;try{for(o=n[0].querySelectorAll("[id]"),e=0;e<o.length;e++)r=o[e],this.icons[s(r.getAttribute("id"))]=new f(h(r.cloneNode(!0)),{iconSize:i,viewBox:c})}catch(n){u.warn(n)}this.iconSize=i,this.viewBox=c,this.iconIdResolver=s}return o.loadByUrl=function(n,t){return p("loadSvgByUrl")(n).then(function(n){return new o(n,t)})},o.prototype={notExists:function(n){var t=this.icons;return n.filter(function(n){return!t.hasOwnProperty(n)})},exists:function(n){return this.icons.hasOwnProperty(n)},getIconById:function(n){return this.icons.hasOwnProperty(n)?this.icons[n]:null},merge:function(n){var t=this,e=n.icons;return Object.keys(e).forEach(function(n){t.icons[n]=e[n]}),this},mergeByUrl:function(n,t){var e=this;return o.loadByUrl(n,t).then(function(n){return e.merge(n)})}},o}),s("iconManager",function(l){var c=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i,f="__SINGLE_ICONS_COLLECTION";function n(){this._collections={},this._defaultCollectionId=null,this._defaultSvgIconSize=24}function s(n,t){var e=l("log"),o=l("Promise"),r='icon "'+n+'" not found';return t&&(r+=' in "'+t+'" icon set'),e.warn(r),o.reject(r)}function a(n,t){return function(){return s(n,t)}}return n.prototype={addIcon:function(n,t,e){var o,r=t;return"object"==typeof t&&(r=t.url),"svg"!=(o=i("function"==typeof r?r():r+""))&&o?this.addImageIcon(n,t):this.addSvgIcon(n,t,e);function i(n){return n.split("?")[0].split(/[/\\]/).slice(-1)[0].split(".").slice(-1)[0].toLowerCase()}},addSvgIcon:function(n,t,e){var o=l("SvgIconScope");return this._getSingleIconsCollection().add(new o(n,t,e)),this},addImageIcon:function(n,t,e){var o=l("ImageIconScope");return this._getSingleIconsCollection().add(new o(n,t,e)),this},addSvgIconSet:function(n,t,e){var o,r=l("SvgCumulativeIconSetScope"),i=l("SvgIconSetScope");return o=(e=e||{}).cumulative?r:i,this._getCollection(n).add(new o(n,t,e)),this},addFontIconSet:function(n,t,e){var o=l("FontIconSetScope");return this._getCollection(n).add(new o(n,t,e)),this},addSpriteIconSet:function(n,t,e){var o=l("SpriteIconSetScope");return this._getCollection(n).add(new o(n,t,e)),this},addIconSetAlias:function(n,t){return this._collections.hasOwnProperty(t)||(this._collections[t]=this._getCollection(n)),this},setDefaultIconSet:function(n){return this._defaultCollectionId=n,this},setDefaultSvgIconSize:function(n){return this._defaultSvgIconSize=n,this},getDefaultSvgIconSize:function(){return this._defaultSvgIconSize},preload:function(n){var t,e=this,o=this._collections,r={},i=!1,c=!1,s=[],a={},u=l("Promise");return-1!=["string","number"].indexOf(typeof n)&&(n=[n]),n&&"object"==typeof n?((Array.isArray(n)?n:Object.keys(n)).forEach(function(n){r[String(n).toLowerCase()]=!0}),i=!0):n&&(c=!0),Object.keys(o).forEach(function(n){var t;(t=o[n].preload(c||i&&r.hasOwnProperty(String(n).toLowerCase())))&&"object"==typeof t&&"function"==typeof t.then&&(s.push(t),n!=f&&(a[n]=t.then(function(){return e._getCollection(n)})))}),(t=u.all(s)).iconSets=a,t},getIcon:function(n,t){var e,o,r,i;if(t=t||[],n=(e=(n=n||"").split(/\s+/).filter(function(n){return n}))[0],Array.prototype.push.apply(t,e.slice(1)),c.test(n))return this.hasSingleIcon(n)||this.addIcon(n,n),this._getSingleIconsCollection().getIcon(n,t).then(null,a(n));if(i=null,-1!=(o=(r=n).indexOf(":"))&&(i=n.slice(0,o),r=n.slice(o+1)),i){if(this.hasIconSet(i))return this._getCollection(i).getIcon(r,t).then(null,a(r,i))}else{if(this.hasSingleIcon(r,t))return this._getSingleIconsCollection().getIcon(r,t).then(null,a(r));if(this.hasDefaultIconSet())return this._getCollection(this._defaultCollectionId).getIcon(r,t).then(null,a(r,this._defaultCollectionId))}return s(n)},hasSingleIcon:function(t,e){return 0<this._getSingleIconsCollection().collection.filter(function(n){return n.hasIcon(t,e)}).length},hasIconSet:function(n){return this._collections.hasOwnProperty(n)},hasDefaultIconSet:function(){return this._defaultCollectionId&&this.hasIconSet(this._defaultCollectionId)},_getCollection:function(n){var t=l("ScopeCollection");return this._collections.hasOwnProperty(n)||(this._collections[n]=new t),this._collections[n]},_getSingleIconsCollection:function(){return this._getCollection(f)}},new n}),s("inherit",function(n){return function(t,n,e,o){return t.prototype=Object.create(n.prototype,o||{}),Object.keys(e||{}).forEach(function(n){t.prototype[n]=e[n]}),t}}),s("initIconElement",function(n){return function(n,t,e){var o,r="webicon";t||"string"==typeof t||(e=String(e||"").split(":").slice(-1)[0].trim(),t=/[/\\.]/.test(e)?(1<(o=e.split(/[/\\]/).slice(-1)[0].split(".")).length&&(o=o.slice(0,-1)),o.join(".")):e.split(/\s/)[0]),function(o,n){""==n||function(){var n=o.parent();if(n.attr("aria-label")||n.text().trim())return!0;if("BODY"!=n.prop("tagName")&&(n.parent().attr("aria-label")||n.parent().text().trim()))return!0;return!1}()?t("aria-hidden","true"):(t("aria-label",n),t("role","img"));function t(n,t){var e=o[0];e.hasAttribute(n)||function(n,t){var e,o,r;if(n.hasChildNodes())for(e=n.childNodes,o=0;o<e.length;o++)if(1===(r=e[o]).nodeType&&r.hasAttribute(t)&&(void 0,"none"!==((i=i=r).currentStyle?i.currentStyle:l.getComputedStyle(i)).display))return!0;var i;return!1}(e,n)||(t="string"==typeof t?t.trim():"").length&&o.attr(n,t)}}(n,t||""),n.hasClass(r)||n.addClass(r)}}),s("loadSvgByUrl",function(s){return function(n){var t=s("httpGet"),e=s("log"),o=s("Promise"),r=s("nodeWrapper"),i=n,c=null;return"object"==typeof n&&(i=n.url,c=n.params),t(i,c).then(function(n){var t=r("<div>").append(n.data),e=t.find("svg");return 0<e.length?e:t.children().first()},function(n){var t="string"==typeof n?n:String(n.message||n.data||n.responseText||n.statusText);return e.warn(t),o.reject(t)})}}),s("parseSvgOptions",function(n){return function(n){if(n)switch(typeof n){case"number":n={iconSize:n};break;case"string":n={viewBox:n}}else n={};return{iconSize:n.iconSize,viewBox:n.viewBox}}}),s("publicApi",function(n){var t,o=n("iconManager");return(t={icon:function(n,t,e){return o.addIcon(n,t,e),this},svgSet:function(n,t,e){return o.addSvgIconSet(n,t,e),this},font:function(n,t,e){return o.addFontIconSet(n,t,e),this},sprite:function(n,t,e){return o.addSpriteIconSet(n,t,e),this},sourceAlias:function(n,t){return o.addIconSetAlias(n,t),this},defaultSvgSetUrl:function(n,t){return o.addSvgIconSet(n,n,t).setDefaultIconSet(n),this},defaultSource:function(n){return o.setDefaultIconSet(n),this},defaultSvgIconSize:function(n){return o.setDefaultSvgIconSize(n),this},preload:function(n,t){var e;return"function"==typeof n&&(t=n,n=null),e=o.preload(n),t&&t(e),this},extension:n("ready")}).iconSet=t.svgSet,t.defaultIconSetUrl=t.defaultSvgSetUrl,t.defaultSvgIconSetUrl=t.defaultSvgSetUrl,t.alias=t.sourceAlias,t.default=t.defaultSource,t}),a(function(n){var t,e,o;o='<style type="text/css">@charset "UTF-8";webicon,[webicon],[data-webicon],.webicon,.webicon{display:inline-block;}.svg-webicon svg{fill:currentColor;}</style>',(e=(t=n("nodeWrapper")(l.document).find("head")).find("style")[0])&&e.outerHTML==o||t.prepend(o)}),s("AbstractCssClassIcon",function(n){var s=n("AbstractIcon");return n("inherit")(function(n,t){s.call(this,n),this.className=t},s,{render:function(n){var t,e,o,r,i;function c(){return n.attr("class").split(/\s+/)}return o=s.prototype.render.call(this,n),t=c(),n.addClass(this.className),e=(r=t,i=c(),r=r||[],i.filter(function(n){return-1==r.indexOf(n)})).join(" "),function(){n.removeClass(e),o&&o()}}})}),s("AbstractElementIcon",function(n){var e=n("AbstractIcon");return n("inherit")(function(n,t){e.call(this,n),this.element=t},e,{cloneNode:function(){return this.element[0].cloneNode(!0)},render:function(n){var t;return t=e.prototype.render.call(this,n),n.append(this.cloneNode()),function(){for(;n.firstChild;)n.removeChild(n.firstChild);t&&t()}}})}),s("AbstractIcon",function(n){function t(n){this.iconClassName=n}return t.prototype={render:function(n){var t=this.iconClassName;return n.addClass(t),function(){n.removeClass(t)}}},t}),s("FontIcon",function(n){var t=n("AbstractCssClassIcon");return n("inherit")(function(n){t.call(this,"font-webicon",n)},t)}),s("ImageIcon",function(s){var t=s("AbstractElementIcon"),n=s("inherit");function a(n){n.attr({width:"100%",height:"100%"}),n.css({"pointer-events":"none",display:"inline-block"}),t.call(this,"image-webicon",n)}return a.loadByUrl=function(n){var t,e,o=s("buildUrlParams"),r=s("nodeWrapper"),i=s("Promise"),c=n;return"object"==typeof n&&(c=n.url,(t=o(n.params))&&(c=[c,t].join("?"))),new i(function(n,t){(e=r("<img>")).bind("load",function(){n(new a(e))}),e.bind("error",t),e.attr("src",c)})},n(a,t)}),s("SpriteIcon",function(n){var t=n("AbstractCssClassIcon");return n("inherit")(function(n){t.call(this,"sprite-webicon",n)},t)}),s("SvgIcon",function(d){var v=d("AbstractElementIcon"),n=d("inherit");function e(t,n){var e,o,r,i,c,s,a,u,l,f,h=d("nodeWrapper"),p=d("iconManager");if(n=d("parseSvgOptions")(n),["id","x","y"].forEach(function(n){t.removeAttr(n)}),"svg"!=(l=t[0]).tagName)if("symbol"==l.tagName){for(o=(e=h('<svg xmlns="http://www.w3.org/2000/svg">'))[0],r=l.attributes,s=0;s<r.length;s++)o.setAttribute(r[s].name,r[s].value);t=e.append(h(l).children())}else t=h('<svg xmlns="http://www.w3.org/2000/svg">').append(t);l=t[0],c={xmlns:"http://www.w3.org/2000/svg",version:"1.0"},Object.keys(c).forEach(function(n){l.getAttribute(n)||l.setAttribute(n,c[n])}),f=n.iconSize||p.getDefaultSvgIconSize(),(r={fit:"",height:"100%",width:"100%",preserveAspectRatio:"xMidYMid meet",viewBox:l.getAttribute("viewBox")||n.viewBox}).viewBox||(a=l.getAttribute("width"),u=l.getAttribute("height"),null!==a&&null!==u&&(r.viewBox="0 0 "+parseFloat(a)+" "+parseFloat(u))),r.viewBox=r.viewBox||"0 0 "+f+" "+f,Object.keys(r).forEach(function(n){l.setAttribute(n,r[n])}),i={"pointer-events":"none",display:"inline-block"},Object.keys(i).forEach(function(n){l.style[n]=i[n]}),this.iconSize=f,v.call(this,"svg-webicon",t)}return e.loadByUrl=function(n,t){return d("loadSvgByUrl")(n).then(function(n){return new e(n,t)})},n(e,v)}),s("AbstractCssClassIconSetScope",function(n){var i=n("AbstractScope");return n("inherit")(function(n,t,e){var o,r;i.call(this,n,e),this._classResolver="function"!=typeof(o=t)?(r=(o=(o||"")+"").split(/[?%]/),function(n){return r.join(n)}):o},i,{_resolveCssClass:function(n,t){return this._classResolver(n,t)}})}),s("AbstractRemoteResourceScope",function(a){var u=a("AbstractScope");return a("inherit")(function(n,t,e){u.call(this,n,e),this._urlResolver=(o=t,c=a("mergeObjects"),s=null,r&&"object"==typeof r?(r=o.url,s=o.params):r=o,i="function"==typeof r?r:function(){return r},function(){var n,t,e=null;return(t=n=i.apply(null,Array.prototype.slice.call(arguments)))&&"object"==typeof n&&(t=n.url,e=n.params),"//"===(t=String(t||"")).slice(0,2)&&(t=l.document.location.protocol+t),{url:t,params:c({},s||{},e||{})}}),this._preloadable=this.options.preloadable||void 0===this.options.preloadable,this._cache=null,this._resource=null;var o,r,i,c,s},u,{preload:function(n){return this._preloadable||n?this._getResource():null},_resolveUrl:function(n){return this._urlResolver(n)},_getResource:function(){var n,t=this;return this._cache?this._cache:((n=this._cache=this._loadResource()).then(function(n){t._resource=n},function(){t._cache=null}),n)},_loadResource:function(){return a("Promise").reject()}})}),s("AbstractRemoteSvgResourceScope",function(n){var i=n("AbstractRemoteResourceScope"),t=n("inherit"),c=n("parseSvgOptions");return t(function(n,t,e){var o=c(e),r=this;i.call(this,n,t,e),Object.keys(o).forEach(function(n){r.options[n]=o[n]})},i)}),s("AbstractScope",function(n){function t(n,t){t=t&&"object"==typeof t?t:{},this.id=n,this.options=t,this._iconIdParser=e(t.iconIdParser),this._iconIdResolver=e(t.iconIdResolver)}return t.prototype={preload:function(){return null},hasIcon:function(){return!0},_parseIconId:function(n,t){return this._iconIdParser(n,t)},_resolveIconId:function(n){return this._iconIdResolver(n)}},t;function e(n){return"function"==typeof n?n:function(n){return n}}}),s("FontIconSetScope",function(e){var o=e("AbstractCssClassIconSetScope");return e("inherit")(function(n,t,e){o.call(this,n,t,e)},o,{getIcon:function(n,t){return new(e("FontIcon"))(this._resolveCssClass(this._parseIconId(n,t),t))}})}),s("ImageIconScope",function(n){var o=n("AbstractRemoteResourceScope");return n("inherit")(function(n,t,e){o.call(this,n,t,e)},o,{_loadResource:function(){return n("ImageIcon").loadByUrl(this._resolveUrl())},hasIcon:function(n,t){return this._parseIconId(n,t)==this._resolveIconId(this.id)},getIcon:function(){return this._getResource()}})}),s("SpriteIconSetScope",function(e){var o=e("AbstractCssClassIconSetScope");return e("inherit")(function(n,t,e){o.call(this,n,t,e)},o,{getIcon:function(n,t){return new(e("SpriteIcon"))(this._resolveCssClass(this._parseIconId(n,t),t))}})}),s("SvgCumulativeIconSetScope",function(i){var o=i("AbstractRemoteSvgResourceScope");return i("inherit")(function(n,t,e){o.call(this,n,t,e),this.waitDuration=this.options.waitDuration||10,this.waitPromise=null,this.waitIconIds=[]},o,{_loadResource:function(){return i("SvgIconSet").loadByUrl(this._resolveUrl(this.waitIconIds),this.options)},preload:function(){return null},getIcon:function(e,n){var o=i("Promise"),t=i("timeout"),r=this;return e=this._parseIconId(e,n),this._resource&&this._resource.exists(e)?o.resolve(this._resource.getIconById(e)):(this.waitPromise?-1==this.waitIconIds.indexOf(e)&&this.waitIconIds.push(e):(this.waitIconIds=[e],this.waitPromise=t(this.waitDuration).then(function(){return r.waitPromise=null,r._resource?r._resource.mergeByUrl(r._resolveUrl(r._resource.notExists(r.waitIconIds)),r.options):r._getResource()})),this.waitPromise.then(function(n){var t=n.getIconById(e);return t||o.reject()}))}})}),s("SvgIconScope",function(n){var o=n("AbstractRemoteSvgResourceScope");return n("inherit")(function(n,t,e){o.call(this,n,t,e)},o,{_loadResource:function(){return n("SvgIcon").loadByUrl(this._resolveUrl(),this.options)},hasIcon:function(n,t){return this._parseIconId(n,t)==this._resolveIconId(this.id)},getIcon:function(){return this._getResource()}})}),s("SvgIconSetScope",function(t){var o=t("AbstractRemoteSvgResourceScope");return t("inherit")(function(n,t,e){o.call(this,n,t,e)},o,{_loadResource:function(){return t("SvgIconSet").loadByUrl(this._resolveUrl(),this.options)},hasIcon:function(t,n){return t=this._parseIconId(t,n),this._getResource().then(function(n){return n.exists(t)})},getIcon:function(e,n){var o=t("Promise");return e=this._parseIconId(e,n),this._getResource().then(function(n){var t=n.getIconById(e);return t||o.reject()})}})}),s("IconDirective",function(u){function n(a){return{restrict:"EA",scope:!0,link:function(n,t,e){var o,r=u("initIconElement"),i=e.$normalize(e.$attr.alt||""),c=e.$normalize(e.$attr.icon||e.$attr.webicon||""),s=null;o=i?e[i]:null,r(t,o,e[c]),c&&e.$observe(c,function(n){s&&s(),s=null,n&&a(n).then(function(n){s=n.render(t)})})}}}return n.$inject=["$webicon"],n}),s("IconProvider",function(t){function n(){var e=[];this.preload=function(){return e.push(Array.prototype.slice.call(arguments)),this},this.$get=["$injector",function(o){var n,r=t("iconManager");return t("ensureDependenciesRegistered")(o),(n=function(n){return r.getIcon(n)}).preload=function(n,t){var e;return("function"==typeof n||Array.isArray(n)&&"function"==typeof n.slice(-1)[0])&&(t=n,n=null),e=r.preload(n),t&&o.invoke(t,null,{$promise:e}),e},n.$checkLazyPreload=function(){var t=this;e.length&&e.forEach(function(n){t.preload.apply(t,n)})},n}]}return n.prototype=t("publicApi"),n}),s("buildUrlParams",function(n){return function(e){var o=[];return e=e||{},Object.keys(e).filter(function(){return void 0!==e[key]&&null!==e[key]}).map(function(n){return Array.isArray(e[n])?e[n]:[e[n]]}).forEach(function(t){e[t].forEach(function(n){o.push(encodeURIComponent(t)+"="+encodeURIComponent(n+""))})}),o.join("&")}}),s("ensureDependenciesRegistered",function(t){var e=!1;return function(n){e||(t("$injector",function(){return n}),t("log",function(){return n.get("$log")}),t("httpGet",function(){var o=n.get("$http"),r=n.get("$templateCache");return function(n,t){var e={cache:r};return t&&"object"==typeof t&&0<Object.keys(t).length&&(e.params=t),o.get(n,e)}}),t("Promise",function(){var e=n.get("$q"),o=n.get("$rootScope");function r(t){return function(){var n=Array.prototype.slice.call(arguments);o.$$phase?t.apply(this,n):o.$apply(function(){t.apply(this,n)})}}function i(n){var t;return"function"!=typeof n?i.resolve(n):(n(r((t=e.defer()).resolve),r(t.reject)),t.promise)}return i.reject=e.reject,i.resolve=e.when,i.all=e.all,i}),t("timeout",function(){var e=n.get("$timeout");return function(n,t){return"function"!=typeof n&&(t=n,n=function(){}),e(n,t)}}),e=!0)}}),s("mergeObjects",function(){return function(t){var n=Array.prototype.slice.call(arguments);if(0==n.length)return{};if(n.length<2){if(!Array.isArray(t))return t;t=(n=t)[0]}return n.slice(1).forEach(function(n){t=function t(e,o){if(!e||!o||"object"!=typeof e||"object"!=typeof o||Array.isArray(e)||Array.isArray(o))return o;Object.keys(o).forEach(function(n){e.hasOwnProperty(n)?e[n]=t(e[n],o[n]):e[n]=o[n]});return e}(t,n)}),t}}),s("nodeWrapper",function(n){return n("angular").element});var u={api:{url:"https://api.icons8.com/api/iconsets/svg-symbol"}};var t={svgSets:{url:"//cdn.rawgit.com/icons8/welovesvg/78f7305/libs",libs:["brandico","elusive-icons","entypo","font-awesome","fontelico","foundation-icons","glyphicons-halflings","icomoon-free","icons8-color-icons","icons8-win10","icons8-wpf","ionicons","ligaturesymbols","linecons",{lib:"maki",name:"maki-12"},{lib:"maki",name:"maki-18"},{lib:"maki",name:"maki-24"},"material-icons","meteocons","metrize-icons","mfglabs-iconset","octicons","open-iconic","openwebicons","raphael-icons","simple-line-icons","stateface","stroke7","typicons","weather-icons","webhostinghub-glyphs","zocial"]},aliases:{"color-icons":"icons8-color-icons","flat-color-icons":"icons8-color-icons",win10:"icons8-win10","wpf-ui-framework-icons":"icons8-wpf",wpf:"icons8-wpf",glyphicons:"glyphicons-halflings",ion:"ionicons",lsf:"ligaturesymbols",maki:"maki-24","material-design-icons":"material-icons",material:"material-icons",weather:"weather-icons",icomoon:"icomoon-free",elusive:"elusive-icons",fa:"font-awesome",foundation:"foundation-icons",metrize:"metrize-icons",mfglabs:"mfglabs-iconset",iconic:"open-iconic",raphael:"raphael-icons","simple-line":"simple-line-icons",webhostinghub:"webhostinghub-glyphs"}};function n(n){a(n)}n(function(n){var t,e,o,r,i,c,s;e=u,i=(t=n)("publicApi"),c=t("iconManager"),s={ios8:["ios7","i7","i8","ios9","i9"],win8:["w8","windows8","windows-8","metro","windows-metro"],android:["android-kitkat","kitkat","ak"],androidL:["android-lollipop","android-l","lollipop","al"],color:["flat_color","c","colored"],win10:["w10","windows10","windows-10"]},o={},Object.keys(s).forEach(function(t){o[t.toLowerCase()]=t,s[t].forEach(function(n){o[n]=t})}),c.setDefaultIconSet("icons8").addSvgIconSet("icons8",function(n){var t={url:e.api.url,params:{}};return n&&(Array.isArray(n)||(n=[n]),t.params.icons=n.join(",")),r&&(t.params.token=r),t},{cumulative:!0,iconIdParser:function(n,t){var e;for(n=String(n||""),Array.isArray(t)||(t=[]),t=t.map(function(n){return String(n).toLowerCase()}),e=0;e<t.length;e++)if(o.hasOwnProperty(t[e]))return[o[t[e]],n].join("-");return[o.c,n].join("-")}}),i.icons8Token=function(n){r=n},t.has("configPerformer")&&t("configPerformer").strategy(function(n){void 0!==n.icons8Token&&i.icons8Token(n.icons8Token)})}),n(function(n){!function(n,t){var e,o,r,i,c,s=n("iconManager");function a(n,t){var e;switch(n){case"maki":e=u(i,{iconIdResolver:r});break;case"material-design-icons":e=u(i,{iconIdResolver:o});break;default:e=u(i)}s.addSvgIconSet(n,t,e)}function u(){var e={};return Array.prototype.slice.call(arguments).forEach(function(t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}o=function(n){return e(n).replace(/^ic-/,"").replace(/-\d+px$/,"")},r=function(n){return e(n).replace(/-\d+$/,"")},i={iconIdResolver:e=function(n){return String(n||"").replace(/_/g,"-")},iconIdParser:e,preloadable:!1},(c=t.svgSets).libs.forEach(function(n){var t,e;"object"==typeof n?(t=n.lib,e=n.filename||(n.name||t)+".svg",n=n.name||t):e=(t=n)+".svg",a(n,[c.url,t,e].join("/"))}),Object.keys(t.libs||{}).forEach(function(n){a(n,t.libs[n])}),Object.keys(t.aliases||{}).forEach(function(n){s.addIconSetAlias(t.aliases[n],n)})}(n,t)}),o.module("webicon",[]).config(["$provide","$compileProvider",function(n,t){var e=function(n){var r={},i={};function c(n,t){var e,o;if(!t){if(!r[n])throw e=new Error('Cannot found service provider "'+n+'"'),console.error(e),e;if(!i.hasOwnProperty(n))try{i[n]=new r[n](c)}catch(e){throw console.error(e),e}return i[n]}if(i.hasOwnProperty(n))throw e=new Error('Cannot override instantiated service "'+n+'"'),console.error(e),e;"function"==typeof t?r.hasOwnProperty(n)?(o=r[n],r[n]=function(n){return new t(n,new o(n))}):r[n]=t:console.error('Provider "'+n+'" is not a function')}return Object.keys(s.providers).forEach(function(n){r[n]=s.providers[n]}),c.has=function(n){return r.hasOwnProperty(n)},c("ready",function(t){return function(n){"function"==typeof n?n(t):n&&console.error("Ready listener not a function")}}),n&&("function"==typeof n?n(c):console.error("Injector initializer not a function")),(a.listeners||[]).forEach(function(n){n(c)}),c}(function(n){n("angular",function(){return o})});n.provider("$webicon",e("IconProvider")),t.directive("webicon",e("IconDirective"))}]).run(["$webicon",function(n){n.$checkLazyPreload()}])}(window,window.angular);