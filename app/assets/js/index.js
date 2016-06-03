(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var reqAnimationFrame = function () {
    return window[Hammer.prefixed(window, "requestAnimationFrame")] || function (callback) {
        setTimeout(callback, 1000 / 60);
    };
}();
function dirProp(direction, hProp, vProp) {
    return direction & Hammer.DIRECTION_HORIZONTAL ? hProp : vProp;
}
/**
 * Carousel
 * @param container
 * @param direction
 * @constructor
 */
function HammerCarousel(container, direction) {
    this.container = container;
    this.direction = direction;
    this.panes = Array.prototype.slice.call(this.container.children, 0);
    this.containerSize = this.container[dirProp(direction, 'offsetWidth', 'offsetHeight')];
    this.currentIndex = 0;
    this.hammer = new Hammer.Manager(this.container);
    this.hammer.add(new Hammer.Pan({ direction: this.direction, threshold: 10 }));
    this.hammer.on("panstart panmove panend pancancel", Hammer.bindFn(this.onPan, this));
    this.show(this.currentIndex);
}
HammerCarousel.prototype = {
    /**
     * show a pane
     * @param {Number} showIndex
     * @param {Number} [percent] percentage visible
     * @param {Boolean} [animate]
     */
    show: function show(showIndex, percent, animate) {
        showIndex = Math.max(0, Math.min(showIndex, this.panes.length - 1));
        percent = percent || 0;
        var className = this.container.className;
        if (animate) {
            if (className.indexOf('animate') === -1) {
                this.container.className += ' animate';
            }
        } else {
            if (className.indexOf('animate') !== -1) {
                this.container.className = className.replace('animate', '').trim();
            }
        }
        var paneIndex, pos, translate;
        for (paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
            pos = this.containerSize / 100 * ((paneIndex - showIndex) * 100 + percent);
            if (this.direction & Hammer.DIRECTION_HORIZONTAL) {
                translate = 'translate3d(' + pos + 'px, 0, 0)';
            } else {
                translate = 'translate3d(0, ' + pos + 'px, 0)';
            }
            this.panes[paneIndex].style.transform = translate;
            this.panes[paneIndex].style.mozTransform = translate;
            this.panes[paneIndex].style.webkitTransform = translate;
        }
        this.currentIndex = showIndex;
    },
    /**
     * handle pan
     * @param {Object} ev
     */
    onPan: function onPan(ev) {
        var delta = dirProp(this.direction, ev.deltaX, ev.deltaY);
        var percent = 100 / this.containerSize * delta;
        var animate = false;
        if (ev.type == 'panend' || ev.type == 'pancancel') {
            if (Math.abs(percent) > 20 && ev.type == 'panend') {
                this.currentIndex += percent < 0 ? 1 : -1;
            }
            percent = 0;
            animate = true;
        }
        this.show(this.currentIndex, percent, animate);
    }
};

exports.HammerCarousel = HammerCarousel;

},{}],2:[function(require,module,exports){
"use strict";

exports.Approute = function (options) {
    var lastRoute = '';
    var lastRouteEle = {};
    var ele = {};

    function check(route) {
        var length = ele.target.children.length;
        for (var i = 0; i < length; i++) {
            (function (index) {
                var page = ele.target.children.item(index);
                if (page.dataset.route == route) {
                    lastRoute = route;
                    lastRouteEle = page;
                    page.setAttribute("selected", "");
                }
            })(i);
        }
    }

    function emit(newValue, oldValue) {
        lastRouteEle.removeAttribute("selected");
        check(newValue);
    }

    return {
        emit: emit,
        config: {
            onInit: function onInit(a) {},
            onReady: function onReady(a) {
                var self = this;
                ele = a;
                var route = window.zl.deepFind(self, options.path);
                check(route);
            },
            onViewChange: function onViewChange(a) {},
            onDispose: function onDispose(a) {}
        }
    };
};

exports.inittemplate = function () {
    return {
        template: '<div class="zl-view"><slot name="page"></slot></div>',
        defaults: {},
        soleSlot: 'page'
    };
};

},{}],3:[function(require,module,exports){
'use strict';

window.zl = function () {
    function deepFind(obj, path) {
        var paths = path.split('.'),
            current = obj,
            i;

        for (i = 0; i < paths.length; ++i) {
            if (current[paths[i]] == undefined) {
                return undefined;
            } else {
                current = current[paths[i]];
            }
        }
        return current;
    }

    return {
        deepFind: deepFind
    };
}();

},{}],4:[function(require,module,exports){
"use strict";

require("../../elements/zl-utils/index");

var _index = require("../../elements/zl-app-route/index");

var _hammerCarousel = require("../../elements/hammer-carousel");

var _route = require("./route");

var approute = new _index.Approute({
    path: "route"
});

avalon.component('zl-app-route', (0, _index.inittemplate)());

var con = function con() {
    return {
        $id: "test",
        route: "index",
        approuteconfig: approute.config
    };
};

var vm = avalon.define(con());

vm.$watch("route", function (newValue, oldValue) {
    approute.emit(newValue, oldValue);
});

window.ready = function () {
    var outer = new _hammerCarousel.HammerCarousel(document.querySelector(".hammer-carousel-panes.wrapper"), Hammer.DIRECTION_HORIZONTAL);
    (0, _route.initRoute)(vm)();
};

},{"../../elements/hammer-carousel":1,"../../elements/zl-app-route/index":2,"../../elements/zl-utils/index":3,"./route":5}],5:[function(require,module,exports){
'use strict';

exports.initRoute = function (vm) {
    return function () {
        page.base('');
        page('/', index);
        page('/index', index);
        page('/about', about);
        page('/contact', contact);
        page('/contact/:contactName', contact);
        page({
            hashbang: true
        });

        function index() {
            vm.route = "index";
            document.querySelector('p').textContent = 'viewing index';
        }

        function about() {
            vm.route = "about";
            document.querySelector('p').textContent = 'viewing about';
        }

        function contact(ctx) {
            vm.route = "contact";
            document.querySelector('p').textContent = 'viewing contact ' + (ctx.params.contactName || '');
        }
    };
};

},{}]},{},[4])