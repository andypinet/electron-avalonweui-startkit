exports.initRoute = function (vm) {
    return function () {
        page.base('');
        page('/', index);
        page('/index', index);
        page('/about', about);
        page('/contact', contact);
        page('/contact/:contactName', contact);
        page({
            hashbang:true
        });

        function index() {
            vm.route = "index";
            document.querySelector('p')
                .textContent = 'viewing index';
        }

        function about() {
            vm.route = "about";
            document.querySelector('p')
                .textContent = 'viewing about';
        }

        function contact(ctx) {
            vm.route = "contact";
            document.querySelector('p')
                .textContent = 'viewing contact ' + (ctx.params.contactName || '');
        }
    }
};