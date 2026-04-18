import express from "express";
import cors from "cors";
import router from "./app/router/router";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

// test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

export default app;