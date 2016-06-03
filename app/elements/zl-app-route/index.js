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
            onInit: function (a) {
            },
            onReady: function (a) {
                var self = this;
                ele = a;
                var route = window.zl.deepFind(self, options.path);
                check(route);
            },
            onViewChange: function (a) {
            },
            onDispose: function (a) {
            }
        }
    }
};

exports.inittemplate = (function () {
    return {
        template: '<div class="zl-view"><slot name="page"></slot></div>',
        defaults: {
        },
        soleSlot: 'page'
    };
});