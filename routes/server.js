// app.js

const express = require("express");
const app = express();
const dnsRoutes = require("./routes/dns");

// Middleware to parse JSON requests
app.use(express.json());

// Routes for DNS operations
app.use("/api/dns", dnsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
