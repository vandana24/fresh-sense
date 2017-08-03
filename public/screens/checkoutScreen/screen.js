var checkout = new function () {
    var makebill = {
        time: new Date().getTime(),
        nDay: parseInt(moment().format('YYYYMMDD')),
        billNumber: '',
        subtotal: 0,
        total: 0,
        deliveryCharge: 0
    };
    this.show = async function (req) {
        var name = 'checkoutScreen';
        screens.show(name);
        var ref = JSON.parse(JSON.stringify(req));
        const result = await this.setupScreen(ref);
        screens.hide(name);
        if (!result)
            return result;
    }
    this.setupScreen = function (ref) {

        return new Promise(function (resolve, reject) {
            ref.forEach(function (v, i) {
                makebill.total += v.total;
                makebill.subtotal += v.subtotal;
                makebill.deliveryCharge = 20;

            })
            makebill.total +=makebill.deliveryCharge;
            render('.checkoutScreen .cartItemDetails', 'cartItemBill', makebill, function () {
                bind('.btnSave.mobile', function () {
                    makebill.mobile = $('.rows.mobile .value').val();
                    if (screens.isNumeric(makebill.mobile)) {
                        notify('thanks for update your mobile number');
                    } else {
                        notify('mobile number must be a numeric value');
                    }


                });

                bind('.btnSave.address', function () {
                    var temp;
                    $('.rows.address .value').each(function () {
                        temp = $(this).val()
                        if (temp == '') {
                            notify('all fields are madatory')
                        }

                    });
                    if (temp != '') {
                        $('.rows.address .value').each(function (v, i) {
                            makebill[$(this).attr('data-id')] = $(this).val();
                        });
                        notify('we will reach you soon');
                    }
                });
                bind('.btnSave.placeOrder', function () {
                    makebill.items = JSON.parse(JSON.stringify(ref));
                    makebill.billNumber = 'FS' + parseInt(Math.random() * 1000);
                    popupScreen.show({
                        text: 'confirm your order ?'
                    }).then(function (r) {
                        if (r)
                            execute('saveOrder', makebill).then(function (r) {
                                console.log(r + '--------save bill ----');
                                notify('your order has been placed');
                                setTimeout(function () {
                                    popupScreen.show({
                                        text: 'thankyou for your order\n'
                                    }).then(function (r) {
                                        homeScreen.show({});
                                    });
                                }, 2000)

                            })
                    })
                });
            });

        });
    }
}

function notify(t) {
    $('.notifyBar').show()
    $('.notifyBar').text(t);
    setTimeout(function () {
        $('.notifyBar').hide()
    }, 2000);
}