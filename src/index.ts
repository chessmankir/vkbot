import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Server is running");
});

app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});