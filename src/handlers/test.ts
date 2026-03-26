import { VK } from "vk-io";

export function updateMessage(vk: VK) {
    vk.updates.on("message_new", async (context) => {
        if (!context.text) return;

        if (context.text === "описание") {
            context.send("твое описание");
        }
    });

    vk.updates.start().then(() => {
        console.log("VK bot started 🚀");
    });
}