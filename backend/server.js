// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Backend is Running 🚀");
// });

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// updated codeeeeeeeeeeeeeeeeeeeeeeeeee
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const connectDB = require("./config/database");

// dotenv.config();

// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Backend is Running 🚀");
// });

// app.get("/api/test", (req, res) => {
//   res.json({
//     success: true,
//     message: "Backend Connected Successfully",
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

dotenv.config();

connectDB();

const app = express();

// 👇 Replace app.use(cors()) with this
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Connected Successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});