// const mongoose = require("mongoose");

// mongo_uri = process.env.MONGO_URI;


// const connectDB = async () => {
//   try {
//     await mongoose.connect(mongo_uri);

//     console.log("MongoDB Connected Successfully ✅");
//   } catch (error) {
//     console.log(mongo_uri);
//     console.log("Database Connection Failed ❌");
//     console.log(error.message);

//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  const mongo_uri = process.env.MONGO_URI;

  if (!mongo_uri) {
    console.error("MONGO_URI is not defined. Check backend/.env or environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongo_uri);
    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.error("Database Connection Failed ❌");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
