'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

/**
 * Small utility to drag elements around.
 *
 * @param {string} el - the element to make draggable
 * @param {object} options
 * @param {string} options.cancel - CSS selector that matches some children of el
 *        on which to prevent dragging
 * @param {function} options.onDragStart - gets passed the target element as first argument
 * @param {function} options.onDragEnd
 */

var DragMe = (function() {
  function DragMe(el, options) {
    var _this = this;

    _classCallCheck(this, DragMe);

    this.onMousedown = function(e) {
      if (_this.options.cancel && _this.shouldCancel(e.target)) {
        return;
      }

      var style = window.getComputedStyle(_this.el)[_this.transform];
      var coords = style && style.match(/-*\d+/g);

      _this.origX = coords ? parseInt(coords[4], 10) : 0;
      _this.origY = coords ? parseInt(coords[5], 10) : 0;

      _this.dragStartX = e.pageX;
      _this.dragStartY = e.pageY;

      _this.body.addEventListener('mousemove', _this.onMove);
      _this.body.addEventListener('mouseup', _this.release);
      _this.body.addEventListener('mouseleave', _this.release);

      if (_this.options.onDragStart) _this.didExecuteOnDragStart = false;
    };

    this.onMove = function(e) {
      var x = _this.origX - _this.dragStartX + e.pageX;
      var y = _this.origY - _this.dragStartY + e.pageY;

      _this.el.classList.add('ui-dragging');
      _this.el.style[_this.transform] = 'translate(' + x + 'px, ' + y + 'px)';

      if (_this.options.onDragStart && !_this.didExecuteOnDragStart) {
        _this.options.onDragStart(e.target);
        _this.didExecuteOnDragStart = true;
      }
    };

    this.release = function() {
      _this.el.classList.remove('ui-dragging');

      _this.body.removeEventListener('mousemove', _this.onMove);
      _this.body.removeEventListener('mouseup', _this.release);
      _this.body.removeEventListener('mouseleave', _this.release);

      if (_this.options.onDragEnd && _this.didExecuteOnDragStart)
        _this.options.onDragEnd();
    };

    var defaults = {
      cancel: null,
      onDragStart: null,
      onDragEnd: null,
    };

    options = options || {};

    this.options = Object.assign(defaults, options);

    this.el = el;
    this.body = document.body;

    this.setup();

    [
      'mozTransform',
      'msTransform',
      'oTransform',
      'webkitTransform',
      'transform',
    ].forEach(function(prop) {
      if (prop in document.documentElement.style) {
        _this.transform = prop;
      }
    });
  }

  _createClass(DragMe, [
    {
      key: 'shouldCancel',
      value: function shouldCancel(target) {
        return target.closest(this.options.cancel);
      },
    },
    {
      key: 'setup',
      value: function setup() {
        this.el.classList.add('ui-draggable');
        this.el.addEventListener('mousedown', this.onMousedown);
      },
    },
    {
      key: 'cleanup',
      value: function cleanup() {
        this.el.classList.remove('ui-draggable');
        this.el.removeEventListener('mousedown', this.onMousedown);
      },
    },
  ]);

  return DragMe;
})();

exports.default = DragMe;
