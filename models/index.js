const { MongoClient } = require("mongodb"); // Import MongoClient

const uri = process.env.MONGO_URI; // Address of Cluster or Server (MongoDB)

const connection = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // Make new connection

// Run the connection
try {
  connection.connect();

  // If connection succeed
  console.log("MongoDB connected!");
} catch (e) {
  // If connection error
  console.error(e);
}

// Export connection
module.exports = connection;
