var ioUrl;
var appUrl;
var enablePassword;
// var socket = io();




//App mode
var env = 'LOCAL'; // LOCAL, STAGE, PROD

function setEnvironmentSpecifics(env) {
   switch (env) {
       case 'LOCAL':
           ioUrl = 'http://localhost:2222';
        //    ioUrl = 'http://localhost:15000';
           enablePassword = 0;
           break;
       case 'STAGE':
           ioUrl = 'http://172.16.16.51:2223';
           enablePassword = 0;
           break;
       case 'PROD':
           ioUrl = 'http://192.168.1.52:2223';
           enablePassword = 1;
           break; 
   }
   //common
   appUrl = ioUrl + '/services/';

}

setEnvironmentSpecifics(env);
