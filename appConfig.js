var env = 'LOCAL';

var host;
var dbName;
var dataBase;

function setEnvironmentSpecifics(env) {
    switch (env) {

        case 'LOCAL':
            exports.dbName = 'freshSense';
            exports.dataBase = 'mongodb://localhost:27017/';

            break;

        case 'STAGE':

            exports.dbName = 'PVRDC-POS-52';
            exports.dataBase = 'mongodb://10.0.0.4:27017/';

            break;

        case 'PROD':
            exports.dbName = 'PVRDC-POS-51';
            exports.dataBase = 'mongodb://13.76.169.98:29004/';
            break;

    }
}
setEnvironmentSpecifics(env);
exports.settings = {
    bill: 'bill',
    settings: 'settings',
    userProfile:'customers'
}