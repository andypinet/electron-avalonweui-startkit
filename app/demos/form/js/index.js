function handleReasons(reasons, vm) {
    reasons.forEach(function (reason) {
        switch (reason.element.dataset.fid) {
            case 'loginform_username':
                vm.aaaField.errorMessage = reason.getMessage();
                break;
            case 'loginform_password':
                vm.bbbField.errorMessage = reason.getMessage();
                break;
            case 'loginform_equalpassword':
                vm.cccField.errorMessage = reason.getMessage();
                break;
            default: break;
        }
    });
}

function clearErrorMessages(fid, vm) {
    switch (fid) {
        case 'loginform_username':
            vm.aaaField.errorMessage = '';
            break;
        case 'loginform_password':
            vm.bbbField.errorMessage = '';
            break;
        case 'loginform_equalpassword':
            vm.cccField.errorMessage = '';
            break;
        default: break;
    }
}

window.main = function () {
    var appvm = avalon.define({
        $id: "test",
        aaa: "",
        bbb: '',
        ccc: '',
        aaaField: {
            errorMessage: ''
        },
        bbbField: {
            errorMessage: ''
        },
        cccField: {
            errorMessage: ''
        },
        validate: {
            onError: function (reasons) {
                handleReasons(reasons, appvm);
            },
            onSuccess: function (reasons) {
                console.dir(this);
                var self = this;
                clearErrorMessages(self.dataset.fid, appvm);
            },
            onValidateAll: function (reasons) {
                if (reasons.length) {
                    console.log('有表单没有通过');
                } else {
                    console.log('全部通过');
                }
            }
        }
    });
    avalon.scan(document.body);
};

window.main();