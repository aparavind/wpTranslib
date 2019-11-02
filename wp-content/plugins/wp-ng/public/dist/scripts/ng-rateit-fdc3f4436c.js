angular.module("ngRateIt",["ng"]).directive("ngRateIt",["$q",function(r){"use strict";return{scope:{ngModel:"=",min:"=?min",max:"=?max",step:"=?step",readOnly:"&?readOnly",pristine:"=?pristine",resetable:"&?resetable",starWidth:"=?starWidth",starHeight:"=?starHeight",canelWidth:"=?canelWidth",cancelHeight:"=?cancelHeight",rated:"&?rated",reset:"&?reset",beforeRated:"&?beforeRated",beforeReset:"&?beforeReset"},templateUrl:"ngRateIt/ng-rate-it.html",require:"ngModel",replace:!0,link:function(e,t,n){n.readOnly||(e.readOnly=function(){return!1}),n.resetable||(e.resetable=function(){return!0}),n.beforeRated||(e.beforeRated=function(){var e=r.defer();return e.resolve(),e.promise}),n.rated||(e.rated=function(){}),n.beforeReset||(e.beforeReset=function(){var e=r.defer();return e.resolve(),e.promise}),n.reset||(e.reset=function(){})},controller:"ngRateItController"}}]).controller("ngRateItController",["$scope","$timeout",function(n,r){"use strict";n.isTouch=!!window.hasOwnProperty("ontouchstart")||0<window.navigator.msMaxTouchPoints,n.orgValue=angular.copy(n.ngModel),n.min=n.min||0,n.max=n.max||5,n.step=n.step||.5,n.pristine=n.orgValue===n.ngModel,n.starWidth=n.starWidth||16,n.starPartWidth=n.starWidth*n.step,n.starHeight=n.starHeight||16,n.canelWidth=n.canelWidth||n.starWidth,n.cancelHeight=n.cancelHeight||n.starHeight;var t=n.max-n.min,a=t/n.step,e=n.$watch("ngModel",function(){n.pristine=n.orgValue===n.ngModel}),i=function(e){return(e+1)/a*t};n.getStartParts=function(){return new Array(a)},n.getStarOffset=function(e){var t=1/n.step;return-n.starWidth/t*(e%t)},n.isSelected=function(e){return i(e)<=n.ngModel-n.min},n.removeRating=function(){n.resetable()&&!n.readOnly()&&n.beforeReset({rating:n.ngModel}).then(function(){n.ngModel=n.min,n.reset({rating:n.ngModel})})},n.setValue=function(e){if(!n.readOnly()){var t=angular.copy(n.min+i(e));n.beforeRated({rating:t}).then(function(){n.ngModel=t,r(function(){n.rated({rating:n.ngModel})})})}},n.$on("$destroy",function(){e()})}]).run(["$templateCache",function(e){"use strict";e.put("ngRateIt/ng-rate-it.html",'<div class="ngrateit" ng-class="{\'ngrateit-readonly\': readOnly()}"><a ng-if="!readOnly() && resetable()"ng-click="removeRating()"class="ngrateit-reset ngrateit-star"ng-style="{\'width\': canelWidth+\'px\', \'height\':cancelHeight+\'px\'}"></a><div ng-if="!hide" id="origin" class="ngrateit-rating" ng-class="{\'ngrateit-hashover\':!isTouch}"><span class="ngrateit-star ngrateit-bg-star"ng-repeat="i in getStartParts() track by $index" ng-class="{\'ngrateit-selected\': isSelected($index) }"ng-click="setValue($index)"'+"ng-style=\"{'width': starPartWidth+'px', 'height':starHeight+'px', 'background-position': getStarOffset($index)+'px 0'}\"></span></div></div>")}]);