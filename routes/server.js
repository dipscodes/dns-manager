import dnsRoutes from "./dns";
import express, { json } from "express";

const app = express();

app.use(json());

app.use("/api/dns", dnsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
