import {MongoClient,ObjectID} from 'mongodb';
import nconf from '../wrio_nconf';
import {Promise} from 'es6-promise';

let db = {
	db: {},
	ObjectID: ObjectID
} ;
export default db;

export function init() {

	let url;

	console.log("ENV:",process.env.NODE_ENV);

	if (process.env.NODE_ENV == 'testing1') {
		console.log("Mongodb testing mode entered");
		url = 'mongodb://mongo:27017/webrunes'
	} else {
		console.log("Normal mongodb mode entered");
		let host = nconf.get('mongo:host');
		let user = nconf.get('mongo:user');
		let password = nconf.get('mongo:password');
		let mongodbname = nconf.get('mongo:dbname');

		if (user) {
			url = `mongodb://${user}:${password}@${host}/${mongodbname}`;
		} else {
			url = `mongodb://${host}/${mongodbname}`;
		}
		//console.log("Mongo connect url",url);
	}

	return new Promise((resolve, reject) => {
		MongoClient.connect(url, function(err, database) {
			if (err) {
				return reject(err);
			}

			db.db = database;
			resolve(db.db);
		});
	});
}

