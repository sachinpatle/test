const expressBrute = require('express-brute');

const bruteforce = (namespace, freeRetries, minWait) => {
    const store = new expressBrute.MemoryStore();
    const bruteforce = new expressBrute(store, {
        freeRetries,
        minWait
    });

    return (req, res, next) => {
        bruteforce.prevent(`${namespace}-${req.ip}`, (err, wait) => {
            if (err) {
                return next(err);
            }
            if (wait) {
                const message = `Lots of request for  ${namespace} namespace. Please retry in ${wait / 1000} seconds.`;
                return res.status(429).send(message);
            }
            next();
        });
    };
};

module.exports = bruteforce;
