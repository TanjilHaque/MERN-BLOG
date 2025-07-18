const mongoose = require("mongoose");
require("dotenv").config();
exports.connectDB = async () => {
  try {
    const connectionStatus = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      "Database connected successfully, ",
      connectionStatus.connections[0].host
    );
  } catch (err) {
    console.log(`Error from database conncetion function ${err}`);
  }
};
