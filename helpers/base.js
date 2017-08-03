module.exports = () => {
    function handleError(err, cb) {
        global.logger.logError(err);
        //curl -X POST --data-urlencode 'payload={"channel": "#pvr_dc", "username": "webhookbot", "text": "This is posted to #pvr_dc and comes from a bot named webhookbot.", "icon_emoji": ":ghost:"}' https://hooks.slack.com/services/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 
        if (cb)
            cb();
    }


    // function getQueryObj(req) {
    //     return {
    //         options: {
    //             server: req.mongoUrl || global.mongoUrl,
    //             source: req.deviceDB || global.deviceDB,
    //             type: req.collection,
    //             query: req.q || {},
    //             params: req.p || {},
    //             sort: req.s || {}
    //         }
    //     }
    // }

    function getQueryObj(collection, q, p, s) {
        return {
            options: {
                server: global.mongoUrl,
                source: global.deviceDB,
                type: collection,
                query: q || {},
                params: p || {},
                sort: s || {}
            }
        }
    }

    function getQueryObj2(mongoUrl, db, collection, q, p, s) {
        return {
            options: {
                server: mongoUrl,
                source: db,
                type: collection,
                query: q || {},
                params: p || {},
                sort: s || {}
            }
        }
    }

    function merge(obj1, obj2) {
        //obj2 will over ride obj1 for same attributes 
        //console.log("Merge Process: started");
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        //console.log("Merge Process: complete");
        return obj3;
    }

    function logger(r) {
        r.nDay = parseInt(global.moment().format('YYYYMMDD'));
        r.nHour = global.moment().hour();
        r.nWeek = global.moment().week();
        r.nMonth = global.moment().month();
        r.nYear = global.moment().year();
        r.bussinessDay = global.settings.nDay;
        r.locationId = global.locationId;
        var option = getQueryObj(global.logsCollection, r);
        return option;
    }

    return {
        handleError: handleError,
        getQueryObj: getQueryObj,
        getQueryObj2: getQueryObj2,
        merge: merge,
        logger: logger
    }
}