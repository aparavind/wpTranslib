!function(){"use strict";function c(i){return{restrict:"A",link:function(u,c,f){var t=c[0];function n(c){c&&i(function(){t.focus()},u.$eval(f.focusDelay)||0)}f.focusIf?u.$watch(f.focusIf,n):n(!0)}}}angular.module("focus-if",[]).directive("focusIf",c),c.$inject=["$timeout"]}();