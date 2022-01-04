dbPassword = 'mongodb://admin:1122@crud-shard-00-00.zufth.mongodb.net:27017,crud-shard-00-01.zufth.mongodb.net:27017,crud-shard-00-02.zufth.mongodb.net:27017/PROJECT0?ssl=true&replicaSet=atlas-h0k5yk-shard-0&authSource=admin&retryWrites=true&w=majority';
testApp = 'mongodb://admin:1122@crud-shard-00-00.zufth.mongodb.net:27017,crud-shard-00-01.zufth.mongodb.net:27017,crud-shard-00-02.zufth.mongodb.net:27017/TEST_APP?ssl=true&replicaSet=atlas-h0k5yk-shard-0&authSource=admin&retryWrites=true&w=majority'
module.exports = {
    mongoURI: dbPassword,
    jwtSecret: 'mysecrettoken',
    testApp
};

