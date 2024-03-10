const express = require("express");
const { json } = require("express");
const cors = require("cors");
const dnsRoutes = require("./dns");

const app = express();

app.use(json());

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use("/api/dns", dnsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
