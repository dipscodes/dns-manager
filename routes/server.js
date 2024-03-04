import dnsRoutes from "./routes/dns";
import express, { json } from "express";

const app = express();

// Middleware to parse JSON requests
app.use(json());

// Routes for DNS operations
app.use("/api/dns", dnsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
