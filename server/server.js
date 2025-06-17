const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const AuthRouter = require("./routes/auth-routes");
const boardRoutes = require("./routes/board-routes");
const listRoutes = require("./routes/list-routes");
const cardRoutes = require("./routes/card-routes");

app.use("/api/auth", AuthRouter);
app.use("/api/boards", boardRoutes);
app.use("/api", listRoutes);
app.use("/api", cardRoutes);

// 8. ===== Server Port and Start =====
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, function () {
      console.log("Server is running on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
