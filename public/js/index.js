'use strict'
$(document).ready(function () {
    makeTemplates();
    homeScreen.show({});
});

var screens = new function () {
    var ref = this;

    ref.nFormatter = function (num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    ref.isNumeric = function (str) {
        if (str.length == 10) {
            return /^\d+$/.test(str);
        } else {
            return false;
        }
    }
    ref.show = function (req) {
        $('.' + req).show()
       
    }
    ref.hide = function (req) {
        $('.' + req).hide()
       
    }


    ref.notify = function (text) {
        $('.mainContainer .notify').show();
        $('.mainContainer .notify').text(text);
        setTimeout(function () {
            $('.mainContainer .notify').hide();
            $('.mainContainer .notify').text(' ');
        }, 2000)
    }

    ref.getSettings = function (cb) {
        execute('tables', {}).then(function (res) {
            if (res.tableSection.length > 0) {
                // log(res[0]);
                ref.tableSections = JSON.parse(JSON.stringify(res['tableSection']));
                ref.tableList = JSON.parse(JSON.stringify(res['tableList']));
                cb(ref);
            } else {
                reservation.getSettings().then(function (res) {
                    if (res.length == 0) {
                        console.log('tables not found');
                        cb(false);
                    }
                })

            }

        });

    }

}