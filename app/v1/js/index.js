import "../../elements/zl-utils/index";
import {
    Approute,
    inittemplate
} from "../../elements/zl-app-route/index";
import {
    HammerCarousel
} from  "../../elements/hammer-carousel";
import {
    initRoute
} from "./route";

var approute = new Approute({
    path: "route"
});

avalon.component('zl-app-route', inittemplate());

var con = function () {
    return {
        $id: "test",
        route: "index",
        approuteconfig: approute.config
    }
};

var vm = avalon.define(con());

vm.$watch("route", function (newValue, oldValue) {
    approute.emit(newValue, oldValue);
});

window.ready = function () {
    var outer = new HammerCarousel(document.querySelector(".hammer-carousel-panes.wrapper"), Hammer.DIRECTION_HORIZONTAL);
    initRoute(vm)();
};
