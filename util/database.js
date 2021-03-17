const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://Web-Shop-Node:Web-Shop-Node@web-shop.cdbfc.mongodb.net/web-shop?retryWrites=true&w=majority'
    )
        .then(client => {
            console.log('Connected!');
            _db = client.db()
            callback()
        })
        .catch(err => {
                console.error(err)
                throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
