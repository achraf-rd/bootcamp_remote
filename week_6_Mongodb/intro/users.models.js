const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error));

const db = client.db("users");
const collection = db.collection("users");
//insert user  
// for (let i = 0; i < 3; i++) {
// collection.insertOne({ name: `achraf${i+1}` , age: 25+i})
//           .then((result) => console.log(result))
//           .catch((err)=> console.log('insert user error : ',err));
// }

async function printusers() {
  const cursor = collection.find();
  const docs = await cursor.toArray();

  docs.forEach(doc => { console.log(doc); });
}

printusers()
  .then(() => client.close())
  .then(() => console.log("Connection closed"));



//Connection closed
// Error:  MongoTopologyClosedError: Topology is closed
// at C:\Users\me\Desktop\bootcamp\week_6_Mongodb\intro\node_modules\mongodb\lib\sdam\topology.js:217:46
// at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
// [Symbol(errorLabels)]: Set(0) {}
// }
// node:internal/process/promises:289
//         triggerUncaughtException(err, true /* fromPromise */);
//         ^

// MongoTopologyClosedError: Topology is closed
// at C:\Users\me\Desktop\bootcamp\week_6_Mongodb\intro\node_modules\mongodb\lib\sdam\topology.js:217:46
// at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
// [Symbol(errorLabels)]: Set(0) {}
// }
//this is the error

