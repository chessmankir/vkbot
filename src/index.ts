import "dotenv/config";
import express from "express";
import { VK } from "vk-io";
import { updateMessage } from "./handlers/test";
import { connectVkBase } from "./handlers/connectVkBase";
import {getDescription} from "./handlers/getDescription";

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Server is running");
});

app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});

const token = process.env.VKTOKEN;

if (!token) {
    throw new Error("VKTOKEN is not defined in .env");
}

const vk = new VK({
    token,
});

//updateMessage(vk);
connectVkBase(vk);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});