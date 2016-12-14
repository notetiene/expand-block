/**
 * @fileOverview This file contains the expand-block library. The
 * library adds expand/collapse functionality on HTMLElement
 * @author Etienne Prud’homme
 * @name expand-block.js<expand-block>
 * @license MIT
 * Created: 2016-12-14
 */

/**
 * Expands a container according to its inner content (using
 * `.expand-inner`) that was collapsed.
 * @param {int} height
 */
HTMLElement.prototype._height = function(height) {
  if(height === 'auto') {
    this.style.height = 'auto';
  } else {
    this.style.height = height + 'px';
  }
};

/**
 * Link for subclasses shadowing.
 */
HTMLElement.prototype.super = HTMLElement.prototype;

/**
 * Expands the element and returns a {@link Promise} that resolves
 * when the transition of the element ended.
 * @returns {Promise} A {@link Promise} that resolves when the
 * transition ended.
 */
HTMLElement.prototype._expandPromise = function() {
  var that = this;
  return new Promise(function(resolve) {
    function handler() {
      that.removeEventListener('transitionend', handler, false);
      resolve();
    }

    that.addEventListener('transitionend', handler, false);
    that.super.expand.call(that, false);
  });
};

/**
 * Expands the parents of a container according to their inner content
 * (using `.expand-inner`) that was collapsed.
 */
HTMLElement.prototype._expandParents = function() {
  var that = this;
  var parents = document.getElementsByClassName('expand-block');
  var parent;
  var i;
  var queue;

  queue = that._expandPromise();

  for(i = parents.length; i--;) {
    parent = parents[i];
    if(parent.contains(that) && parent !== that) {
      queue = queue.then(parent._expandPromise.bind(parent));
    }
  }
};

/**
 * Expands a container according to its inner content (using
 * `.expand-inner`) that was collapsed.
 * @param {bool} expandParents - If set to true, expand all parents
 * containing the `expand-block` class.
 */
HTMLElement.prototype.expand = function(expandParents) {

  var inner = this.getElementsByClassName('expand-inner')[0];

  if(inner) {
    var height = inner.offsetHeight;
    this._height(height);
  }

  if(expandParents === true) {
    this._expandParents();
  }
};

/**
 * Returns a {@link Promise} that revolves when the collapsing transition ended
 * in the current element.
 * @returns {Promise} A {@link Promise} that revolves when the collapsing
 * transition ended in the current element.
 */
HTMLElement.prototype._promiseCollapse = function() {
  var that = this;

  return new Promise(function(resolve) {
    function handler() {
      that.removeEventListener('transitionend', handler, false);
      resolve();
    }
    that.addEventListener('transitionend', handler, false);
    that.collapse();
  });
};

/**
 * Sets the element Height to 0 (collapse the element).
 * @param {bool} retPromise - If set to true, will return a Promise that
 * resolves when the element collapsed (from a transition).
 * @returns {Promise|undefined} A {@link Promise} if {@link retPromise} is set
 * to true.
 */
HTMLElement.prototype.collapse = function(retPromise) {
  var that = this;

  if(retPromise === true) {
    return that._promiseCollapse.call(that);
  }

  this._height(0);
};

/**
 * Checks if the element is collapsed.
 * @returns {Boolean} True if collapsed, otherwise false.
 */
HTMLElement.prototype.isCollapsed = function() {
  return this.style.height === '0px' || this.style.height === '' || this.style.height === 0;
};

/**
 * Checks if the element is collapsed.
 * @returns {Boolean} True if expanded, otherwise false.
 */
HTMLElement.prototype.isExpanded = function() {
  return !this.isCollapsed();
};

// expand-block.js<expand-block> ends here
