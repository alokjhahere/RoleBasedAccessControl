require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const permissionRoutes = require("./routes/permissionRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Backend Server is running" });
});

app.use("/auth", authRoute);
app.use("/roles", roleRoutes);
app.use("/permission", permissionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:", { PORT });
});
