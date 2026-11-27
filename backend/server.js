import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./jobs/sixtyDayReservationJob.js";
import "./jobs/cancelUnpaidReservations.js";

import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(
    "/api/payments/webhook",
    express.raw({ type: "application/json" })
);

app.use(express.json());

app.use("/api/payments", paymentRoutes);


app.get("/", (req, res) => {
    res.send("Ophelia's Oasis backend is running!");
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});