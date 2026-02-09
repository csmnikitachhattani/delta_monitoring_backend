const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Next.js frontend
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
