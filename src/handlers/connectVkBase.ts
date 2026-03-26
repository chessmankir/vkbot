
import {getDescriptionByVkId} from "../db/getDescriptionDb";
import {linkVkToPubg} from "../db/linkVkToPubg";
import {getDescription} from "./getDescription";
import {MessageContext} from "vk-io";

export function connectVkBase(vk: any){
    vk.updates.on("message_new", async (context: MessageContext) => {
        if (!context.text) return;
        const text = context.text.trim();
        const senderId = context.senderId;
        if (text.toLowerCase().startsWith("+привязать")) {
            const parts = text.split(/\s+/);
            const pubgId = parts[1];s
            if (!pubgId) {
                return context.send("Укажи PUBG ID. Пример: +привязать 51020303");
            }
            if (!/^\d+$/.test(pubgId)) {
                return context.send("PUBG ID должен состоять только из цифр");
            }
            const result = await linkVkToPubg(pubgId, senderId);
            if (!result.ok) {
                return context.send(result.message ?? "");
            }

            return context.send(
                `Аккаунт привязан ✅\nPUBG ID: ${result.member.pubg_id}\nНик: ${result.member.nickname ?? "без ника"}`
            );

        }
       if (context.text == "описание") {
            const text = context.text.trim();
            const senderId = context.senderId;
            getDescription(senderId, context);
        }
    });

    vk.updates.start().then(() => {
        console.log("VK bot started 🚀");
    });
}