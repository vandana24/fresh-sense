var popupScreen = new function () {
    this.show =  function (req) {
        return new Promise(function (resolve, reject) {
            var name = 'popupScreen'
            screens.show(name);
            var ref = JSON.parse(JSON.stringify(req));
            popupScreen.setupScreen(ref).then(function (r) {
                screens.hide(name);
                resolve(r);
            });
        })

    }
    this.setupScreen = function (ref) {
        return new Promise(function (res, rej) {
            rb('.mainContainer .popupScreen', 'popup', {}, '.btn', function (ele, data) {

                var id = ele.attr('data-id');
                if (id == 'confirm') {
                    res(true);
                } else if (id == 'cancel') {
                    res(false);
                } else {
                    console.log('nothing');
                }
            });
            $('.popupScreen .popup .contentContainer .text').text(ref.text);
        })

    };
}