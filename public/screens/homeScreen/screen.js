var homeScreen = new function () {
    this.show = async(req) => {
        var name = 'homeScreen';
        screens.show(name);
        var ref = JSON.parse(JSON.stringify(req));
        const result = await this.setupScreen(ref);
        screens.hide(name);
        if (!result)
            return result;
    }
    this.setupScreen = function (ref) {
        var result;
        return new Promise(function (resolve, reject) {
            rb('.homeScreen .contentContainer .categoryContainer', 'itemCategory', {
                categories: cat
            }, '.categories', function (r, data) {
                var rr = $(r).attr('data-id');
                var selectCategory = cat.find(function (c) {
                    return c.id == rr
                });
                itemsScreen.show(selectCategory);
            });
            beginSlideShow();
            searchItem();
        });
    }
}

function beginSlideShow() {
    var images = new Array('../images/icon-breakfast.jpg', '../images/icon-bread.jpg', '../images/icon-chocolate.jpg');
    var nextimage = 0;
    doSlideshow();

    function doSlideshow() {
        if (nextimage >= images.length) {
            nextimage = 0;
        }
        $('.homeScreen .offerBlock')
            .css('background-image', 'url("' + images[nextimage++] + '")')
            .fadeIn(500, function () {
                setTimeout(doSlideshow, 3000);
            });
    }
}