'use strict'

var itemsScreen = new function () {
    var cartItems = [];
    this.show = async function (req) {
        var name = 'itemsScreen';
        screens.show(name);
        var ref = JSON.parse(JSON.stringify(req));
        const result = await this.setupScreen(ref);
        screens.hide(name);
        if (!result)
            return result;
    }

    this.setupScreen = function (ref) {
        const screenMeta = {};
        return new Promise(function (resolve, reject) {
            rb('.itemsScreen .leftPanel', 'itemLeftPanel', cat, '.categoryName', function (el, data) {
                $('.categoryName.selected').removeClass('selected');
                $(el).addClass('selected');
                var selectedItems = items.filter(function (i) {
                    return i.c1 == data.id
                });
                render('.itemsScreen .rightPanel', 'itemList', selectedItems, function () {
                    bind('.itemName', function () {

                    });
                    bind('.itemsScreen .rightPanel .itemContainer .footer .addCart', function () {
                        var temp = $(this).tmplItem().data;
                        var itemAlreadyPresent = cartItems.find(function (i) {
                            return i.id == temp.id;
                        });
                        if (itemAlreadyPresent) {
                            itemAlreadyPresent.q += 1;
                            var findIdex = cartItems.findIndex(function (fi) {
                                return fi.id == itemAlreadyPresent.id;
                            });
                            cartItems.splice(findIdex, 1, itemAlreadyPresent);
                        } else {
                            cartItems.push(temp);
                        }
                        itemsScreen.updateCart();

                    });
                });
            });
            setTimeout(function () {
                $('.itemsScreen .categoryName[data-id="' + ref.id + '"]').trigger(eventToUse);
            }, 100)
        bind('.itemsScreen .itemCartContainer .footer',function(){
            checkout.show(cartItems);
        });
        });
    };
    this.updateCart = function () {
        render('.itemsScreen .itemCartContainer .itemIntoCart', 'itemIntoCart', cartItems, function () {
            bind('.itemsScreen .itemCartContainer .row .updatePrice .operation .multiplecation .tab.minus', function () {
                var rr = $(this).parent().parent().attr('data-id').trim();
                var findIndex = cartItems.findIndex(function (fi) {
                    return fi.id == rr;
                });
                var modifyItem = cartItems.find(function (fItem) {
                    return fItem.id == rr;
                });
                if (modifyItem.q == 1) {
                    cartItems.splice(findIndex, 1);
                    itemsScreen.updateCart();
                } else {
                    modifyItem.q -= 1;
                    cartItems.splice(findIndex, 1, modifyItem);
                    itemsScreen.updateCart();
                }

            });
            bind('.itemsScreen .itemCartContainer .row .updatePrice .operation .multiplecation .tab.addition', function () {
                var rr = $(this).parent().parent().attr('data-id');
                var findIndex = cartItems.findIndex(function (fi) {
                    return fi.id == rr;
                });
                var modifyItem = cartItems.find(function (fItem) {
                    return fItem.id == rr;
                });
                if (modifyItem.q < 5) {
                    modifyItem.q += 1;
                    cartItems.splice(findIndex, 1, modifyItem);
                    itemsScreen.updateCart();
                }
            });
            itemsScreen.updateTotal();
        });
    }
    this.updateTotal = function () {
        var subtotal = 0;
        cartItems.forEach(function (v, i) {
            v.subtotal = v.q * v.price;
            v.total = v.q * v.price;
            subtotal += v.subtotal;
        });
        $('.itemsScreen .itemCartContainer .row .total.subtotal .price').text(subtotal);
    }

};