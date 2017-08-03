"user strict"

var login = new function () {
    this.show = async function (req) {
        var name = 'loginScreen'
        screens.show(name);
        var ref = JSON.parse(JSON.stringify(req));
        const result = await this.setupScreen(ref);
        screens.hide(name);
        return result;
    }

    this.setupScreen = function (ref) {
        return new Promise(function (resolve, reject) {
            // login.indentifyScreen('signup');
        });

    }
    this.indentifyScreen = function (i) {
        var request = {
            login: function () {
                rb('.loginScreen .loginContainer', 'login', {}, '.btnLogin', function (el, data) {

                });
                bind('.loginScreen .info .btnSignup', function () {
                    login.indentifyScreen('signup');
                    $('.signupContainer').show();
                    $('.loginContainer').hide();
                })
            },
            signup: function () {
                render('.loginScreen .signupContainer', 'signup', {}, function () {
                    bind('.loginScreen .signupContainer .rows .signIn', function () {
                        login.indentifyScreen('login');
                        $('.signupContainer').hide();
                        $('.loginContainer').show();
                    });
                    bind('.loginScreen .rows .btnContinue', function () {

                    });
                });
            }
        };
        request[i]();
    }
}