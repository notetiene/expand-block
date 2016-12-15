/**
   * @fileOverview This file contains the expand-block library. The
   * library adds expand/collapse functionality on HTMLElement
   * @author Etienne Prud’homme
   * @name expand-block.js<expand-block>
   * @license MIT
   * Created: 2016-12-14
   */
!function(){"use strict";function t(t){"auto"===t?this.style.height="auto":this.style.height=t+"px"}function e(){var t=this;return new Promise(function(e){function n(){t.removeEventListener("transitionend",n,!1),e()}t.addEventListener("transitionend",n,!1),t.super.expand.call(t,!1)})}function n(){var t,n,i,s=this,o=document.getElementsByClassName("expand-block");for(i=e.call(s),n=o.length;n--;)t=o[n],t.contains(s)&&t!==s&&(i=i.then(e.bind(t)))}function i(){var t=this;return new Promise(function(e){function n(){t.removeEventListener("transitionend",n,!1),e()}t.addEventListener("transitionend",n,!1),t.collapse()})}HTMLElement.prototype.super=HTMLElement.prototype,HTMLElement.prototype.expand=function(e){var i=this,s=i.getElementsByClassName("expand-inner")[0];if(s){var o=s.offsetHeight;t.call(i,o)}e===!0&&n().call(i)},HTMLElement.prototype.collapse=function(e){var n=this;return e===!0?i.call(n):void t.call(this,0)},HTMLElement.prototype.isCollapsed=function(){return"0px"===this.style.height||""===this.style.height||0===this.style.height},HTMLElement.prototype.isExpanded=function(){return!this.isCollapsed()}}();
//# sourceMappingURL=expand-block.js.map
