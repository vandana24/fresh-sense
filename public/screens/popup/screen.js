var popupScreen = new function () {
    this.show = async(req) => {
        var name = 'popupScreen'
        screens.show(name);
        var ref = JSON.parse(JSON.stringify(req));
        const result = await this.setupScreen(ref);
        screens.hide(name);
        return result;
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