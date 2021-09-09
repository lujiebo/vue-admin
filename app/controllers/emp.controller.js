var hdb = require("hdb");
var dbconfig = require("../../config/dbconfig.js");

var client = hdb.createClient(dbconfig.hana);

exports.listAll = function (req, res,) {
    var resData = {};
    var sql = "SELECT count(*) as total FROM SAPHANADB.zsy_d_0008";
    client.connect(function (err) {
        if (err) {
            res.send({
                "error": err.message
            });
        }
        client.exec(sql, function (err, data) {
            if (err) {
                res.send({
                    "error": err.message
                });
            }
            // client.end();
            var dataJson = {};
            dataJson.total = data[0].TOTAL;
            resData.code = 20000;
            resData.data = dataJson

            sql = "SELECT top 5 begda as date FROM SAPHANADB.zsy_d_0008";
            client.exec(sql, function (err, data2) {
                if (err) {
                    res.send({
                        "error": err.message
                    });
                }
                client.end();
                console.log(data2)
                resData.data.items = data2
                console.log(resData)
                res.send(resData)
            });
        });

    })
};

// query by id
exports.queryById = function (req, res) {
    var sql = "SELECT * FROM STONE.EMP_MASTER WHERE EMP_ID=?";
    client.connect(function (err) {
        if (err) {
            res.send({
                "error": err.message
            });
        }
        client.prepare(sql, function (err, statement) {
            if (err) {
                res.send({
                    "error": err.message
                });
            }
            statement.exec([req.params.emp_id], function (err, rows) {
                if (err) {
                    res.send({
                        "error": err.message
                    });
                }
                client.end();
                res.send({
                    rows
                });
            });
        });
    });
};

// create
exports.create = function (req, res) {
    var sql = "INSERT INTO STONE.EMP_MASTER VALUES(?,?,?,?,?,?,?,?)";
    client.connect(function (err) {
        if (err) {
            res.send({
                "error": err.message
            });
        }
        client.prepare(sql, function (err, statement) {
            if (err) {
                res.send({
                    "error": err.message
                });
            }

            var params = [
                req.body.EMP_ID,
                req.body.GENDER,
                req.body.AGE,
                req.body.EMAIL,
                req.body.PHONE_NR,
                req.body.EDUCATION,
                req.body.MARITAL_STAT,
                req.body.NR_OF_CHILDREN
            ];
            statement.exec(params, function (err, data) {
                if (err) {
                    res.send({
                        "error": err.message
                    });
                }
                client.end();
                res.sendStatus(200);
            });
        });
    });
};

// update
exports.update = function (req, res) {
    var sql = "UPDATE STONE.EMP_MASTER SET GENDER=?, AGE=?, EMAIL=?, PHONE_NR=?, EDUCATION=?, MARITAL_STAT=?, NR_OF_CHILDREN=? WHERE EMP_ID=?";
    client.connect(function (err) {
        if (err) {
            res.send({
                "error": err.message
            });
        }
        client.prepare(sql, function (err, statement) {
            if (err) {
                res.send({
                    "error": err.message
                });
            }

            var params = [
                req.body.GENDER,
                req.body.AGE,
                req.body.EMAIL,
                req.body.PHONE_NR,
                req.body.EDUCATION,
                req.body.MARITAL_STAT,
                req.body.NR_OF_CHILDREN,
                req.params.emp_id
            ];

            statement.exec(params, function (err, data) {
                if (err) {
                    res.send({
                        "error": err.message
                    });
                }
                client.end();
                res.sendStatus(200);
            });
        });
    });
};

// delete
exports.delete = function (req, res) {
    var sql = "DELETE FROM STONE.EMP_MASTER WHERE EMP_ID=?";
    client.connect(function (err) {
        if (err) {
            res.send({
                "error": err.message
            });
        }
        client.prepare(sql, function (err, statement) {
            if (err) {
                res.send({
                    "error": err.message
                });
            }

            statement.exec([req.params.emp_id], function (err, data) {
                if (err) {
                    res.send({
                        "error": err.message
                    });
                }
                client.end();
                res.sendStatus(200);
            });
        });
    });
};